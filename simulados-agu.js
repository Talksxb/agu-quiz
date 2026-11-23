/* Simulados: seleção e resultados locais. Não escreve na agenda de cartões. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.AGUSimulado = api;
})(typeof window === 'object' ? window : globalThis, function () {
  'use strict';
  const KEY = 'agu_simulados_v1', MAX = 80, MAX_BYTES = 8 * 1024 * 1024;
  const copy = x => JSON.parse(JSON.stringify(x));
  const obj = x => x && typeof x === 'object' && !Array.isArray(x);
  const text = (x, n = 12000) => typeof x === 'string' && x.trim().length > 0 && x.length <= n;
  const id = x => typeof x === 'string' && /^[a-z0-9][a-z0-9-]{1,100}$/.test(x);
  const stamp = x => typeof x === 'string' && /^\d{4}-\d\d-\d\dT/.test(x) && Number.isFinite(Date.parse(x));
  const official = value => { try { const u = new URL(value); return u.protocol === 'https:' && !u.username && !u.password && (/\.(gov|leg|jus)\.br$/.test(u.hostname) || u.hostname === 'cdn.cebraspe.org.br'); } catch { return false; } };
  const assert = (ok, message) => { if (!ok) throw Error(message); };
  function safeTree(value, depth = 0, budget = { n: 0 }) {
    if (++budget.n > 250000 || depth > 24) return false;
    if (typeof value === 'string') return value.length <= 20000;
    if (typeof value === 'number') return Number.isFinite(value);
    if (value === null || typeof value === 'boolean') return true;
    if (!obj(value) && !Array.isArray(value)) return false;
    return Object.entries(value).every(([k, v]) => !['__proto__', 'constructor', 'prototype'].includes(k) && safeTree(v, depth + 1, budget));
  }
  function questionOK(q) {
    return obj(q) && id(q.id) && text(q.version, 30) && text(q.topic, 120) && id(q.chapterId) && id(q.sectionId) &&
      text(q.curricularId, 40) && text(q.title, 180) && text(q.stem) && ['autoral', 'adaptada'].includes(q.nature) &&
      q.status === 'aprovado_pontualmente' && Array.isArray(q.options) && q.options.length >= 2 && q.options.length <= 5 &&
      q.options.every(x => text(x, 1600)) && new Set(q.options).size === q.options.length && Number.isInteger(q.correct) &&
      q.correct >= 0 && q.correct < q.options.length && Array.isArray(q.feedback) && q.feedback.length === q.options.length &&
      q.feedback.every(x => text(x, 2400)) && text(q.explanation, 4000) && text(q.card?.front, 700) && text(q.card?.back, 2400) &&
      Array.isArray(q.sources) && q.sources.length > 0 && q.sources.length <= 6 && q.sources.every(s => official(s.url) && text(s.locator, 700) && /^\d{4}-\d\d-\d\d$/.test(s.checkedAt) && s.status === 'confirmado_pontualmente') &&
      /^[a-f0-9]{64}$/.test(q.contentSha256 || '') && /^[a-f0-9]{64}$/.test(q.sectionSha256 || '');
  }
  function bankOK(b) { return obj(b) && b.schema === 'agu-simulado-bank-v1' && Array.isArray(b.questions) && b.questions.length <= 2000 && b.questions.every(questionOK) && new Set(b.questions.map(q => q.id)).size === b.questions.length; }
  function sessionOK(s, complete) {
    if (!obj(s) || !id(s.id) || !stamp(s.startedAt) || !['simulado', 'estudo'].includes(s.mode) ||
        !['misto', 'novas', 'dificuldades'].includes(s.strategy) || !Array.isArray(s.questions) || s.questions.length < 1 ||
        s.questions.length > 30 || !s.questions.every(questionOK) || new Set(s.questions.map(q => q.id)).size !== s.questions.length ||
        !Array.isArray(s.answers) || s.answers.length !== s.questions.length || !Number.isInteger(s.cursor) || s.cursor < 0 || s.cursor >= s.questions.length) return false;
    if (s.mode === 'simulado' ? (!stamp(s.deadlineAt) || Date.parse(s.deadlineAt) <= Date.parse(s.startedAt) || Date.parse(s.deadlineAt) - Date.parse(s.startedAt) > 90 * 60000) : s.deadlineAt !== null) return false;
    for (let i = 0; i < s.answers.length; i++) {
      const a = s.answers[i];
      if (!obj(a) || !(a.choice === null || (Number.isInteger(a.choice) && a.choice >= 0 && a.choice < s.questions[i].options.length)) || ![null, 'baixa', 'media', 'alta'].includes(a.confidence) || typeof a.revealed !== 'boolean') return false;
      if (s.mode === 'simulado' && a.revealed) return false;
    }
    return complete ? stamp(s.finishedAt) && Date.parse(s.finishedAt) >= Date.parse(s.startedAt) && ['manual', 'tempo'].includes(s.reason) : !s.finishedAt && !s.reason;
  }
  function validateDB(db) {
    return obj(db) && safeTree(db) && db.schema === 'agu-simulado-local-v1' &&
      (db.active === null || sessionOK(db.active, false)) && Array.isArray(db.history) && db.history.length <= MAX &&
      db.history.every(s => sessionOK(s, true)) && (db.active === null || db.history.length < MAX) && new Set(db.history.map(s => s.id)).size === db.history.length &&
      !db.history.some(s => s.id === db.active?.id);
  }
  const empty = () => ({ schema: 'agu-simulado-local-v1', active: null, history: [] });
  function load(storage) {
    const raw = storage.getItem(KEY);
    if (raw === null) return { raw, db: empty() };
    assert(new TextEncoder().encode(raw).length <= MAX_BYTES, 'Histórico excede o limite de leitura. Exporte os dados antes de continuar.');
    const db = JSON.parse(raw); assert(validateDB(db), 'Histórico de simulados inválido. Os dados foram preservados.'); return { raw, db };
  }
  function save(storage, db, expected) {
    assert(validateDB(db), 'Sessão incompatível; gravação recusada.');
    const raw = JSON.stringify(db); assert(new TextEncoder().encode(raw).length <= MAX_BYTES, 'Limite do histórico atingido. Exporte suas sessões.');
    assert(storage.getItem(KEY) === expected, 'O histórico mudou em outra aba. Exporte esta sessão e recarregue a página.');
    storage.setItem(KEY, raw); return raw;
  }
  function latest(history) {
    const map = new Map();
    for (const s of [...history].sort((a, b) => Date.parse(a.finishedAt) - Date.parse(b.finishedAt))) {
      s.questions.forEach((q, i) => map.set(q.id, { q, answer: s.answers[i], correct: s.answers[i].choice === q.correct }));
    }
    return map;
  }
  function select(bank, config, history = [], random = Math.random) {
    assert(bankOK(bank), 'Banco de questões inválido.');
    assert(Number.isInteger(config.count) && config.count >= 1 && config.count <= 30, 'Escolha entre 1 e 30 questões.');
    const prior = latest(history), pool = bank.questions.filter(q => !config.chapterId || q.chapterId === config.chapterId);
    const strategy = config.strategy || 'misto'; assert(['misto', 'novas', 'dificuldades'].includes(strategy), 'Estratégia inválida.');
    const priority = q => { const a = prior.get(q.id); return !a ? (strategy === 'novas' ? 6 : strategy === 'dificuldades' ? 0 : 2) : !a.correct ? (a.answer.confidence === 'alta' ? 5 : 4) : a.answer.confidence !== 'alta' ? 3 : 1; };
    const groups = new Map();
    for (const q of pool) { const group = groups.get(q.chapterId) || []; group.push({ q, p: strategy === 'misto' ? 0 : priority(q), tie: random() }); groups.set(q.chapterId, group); }
    for (const group of groups.values()) group.sort((a, b) => b.p - a.p || a.tie - b.tie);
    const order = [...groups.values()]; // A rodada começa em grupo sorteado e intercala matérias.
    if (order.length) { const offset = Math.floor(random() * order.length); order.push(...order.splice(0, offset)); }
    const chosen = [];
    while (chosen.length < Math.min(config.count, pool.length)) for (const g of order) { if (g.length && chosen.length < config.count) chosen.push(g.shift().q); }
    assert(chosen.length > 0, 'Ainda não há questões revisadas neste recorte.');
    return { questions: copy(chosen), requested: config.count, available: pool.length };
  }
  function create(bank, config, history = [], now = Date.now(), random = Math.random) {
    assert(['simulado', 'estudo'].includes(config.mode), 'Modo inválido.');
    assert(Number.isInteger(config.minutes) && config.minutes >= 1 && config.minutes <= 90, 'Escolha entre 1 e 90 minutos.');
    const selection = select(bank, config, history, random);
    return { id: 'sim-' + now.toString(36) + '-' + Math.floor(random() * 1e10).toString(36), mode: config.mode, strategy: config.strategy || 'misto',
      startedAt: new Date(now).toISOString(), deadlineAt: config.mode === 'simulado' ? new Date(now + config.minutes * 60000).toISOString() : null,
      questions: selection.questions, answers: selection.questions.map(() => ({ choice: null, confidence: null, revealed: false })), cursor: 0 };
  }
  const expired = (s, now = Date.now()) => s.mode === 'simulado' && now >= Date.parse(s.deadlineAt);
  function mark(s, index, change, now = Date.now()) {
    assert(sessionOK(s, false), 'Sessão inválida.'); assert(!expired(s, now), 'O tempo terminou.');
    assert(Number.isInteger(index) && index >= 0 && index < s.questions.length, 'Questão inexistente.');
    assert(!s.answers[index].revealed, 'A resposta já foi conferida neste treino.');
    const next = copy(s); next.answers[index] = { ...next.answers[index], ...change };
    assert(sessionOK(next, false), 'Resposta inválida.'); return next;
  }
  function finish(db, now = Date.now()) {
    assert(validateDB(db) && db.active, 'Nenhuma sessão em andamento.'); assert(db.history.length < MAX, 'Exporte suas sessões; o histórico atingiu 80 registros.');
    const next = copy(db), s = next.active;
    s.finishedAt = new Date(Math.max(now, Date.parse(s.startedAt))).toISOString(); s.reason = expired(s, now) ? 'tempo' : 'manual'; next.history.push(s); next.active = null; return next;
  }
  function rows(s) { return s.questions.map((q, i) => ({ q, answer: s.answers[i], correct: s.answers[i].choice === q.correct, blank: s.answers[i].choice === null })); }
  function summary(s) {
    const all = rows(s), total = all.length, correct = all.filter(r => r.correct).length, blank = all.filter(r => r.blank).length;
    return { total, correct, blank, wrong: total - correct - blank, uncertain: all.filter(r => r.correct && r.answer.confidence !== 'alta').length,
      highConfidenceErrors: all.filter(r => !r.blank && !r.correct && r.answer.confidence === 'alta').length,
      percent: Math.round(correct * 100 / total), elapsedSeconds: Math.max(0, Math.floor((Math.min(Date.parse(s.finishedAt), s.deadlineAt ? Date.parse(s.deadlineAt) : Infinity) - Date.parse(s.startedAt)) / 1000)),
      byTopic: [...new Set(all.map(r => r.q.topic))].map(topic => ({ topic, total: all.filter(r => r.q.topic === topic).length, correct: all.filter(r => r.q.topic === topic && r.correct).length })) };
  }
  function weaknesses(s) { return rows(s).filter(r => !r.correct || r.answer.confidence !== 'alta').sort((a, b) => Number(b.answer.confidence === 'alta' && !b.correct) - Number(a.answer.confidence === 'alta' && !a.correct) || Number(a.correct) - Number(b.correct)); }
  function merge(db, incoming) {
    assert(validateDB(db) && validateDB(incoming), 'Arquivo de sessões inválido.');
    const next = copy(db), known = new Set([...db.history.map(s => s.id), db.active?.id]);
    for (const s of incoming.history) if (!known.has(s.id)) { next.history.push(copy(s)); known.add(s.id); }
    if (!next.active && incoming.active && !known.has(incoming.active.id)) next.active = copy(incoming.active);
    assert(validateDB(next), 'O conjunto excede os limites. Nenhuma sessão foi alterada.'); return next;
  }
  function contentPrompt(s) {
    return 'AGU | Conteúdo dirigido por questões\nUsar Base Mestra v5.2 FINAL. Não registrar domínio pela leitura.\n' +
      'Preparar explicação dos fundamentos abaixo, um caso novo e cartões candidatos curtos com regra, limite e aplicação. Conferir fontes oficiais atuais, diferenciar questão autoral/adaptada/oficial, preservar gabarito histórico e exigir revisão editorial antes de publicar. Não copiar enunciados nem importar auditoria privada para o Quiz.\n' +
      weaknesses(s).slice(0, 12).map(({ q, correct, answer }) => '\n' + q.curricularId + ' · ' + q.title + '\n' + (correct ? 'Acerto inseguro' : answer.choice === null ? 'Não respondida' : 'Erro') + ' · confiança ' + (answer.confidence || 'não informada') + '\nCapítulo ' + q.chapterId + ' · seção ' + q.sectionId + '\n' + q.sources.map(x => x.locator + ' — ' + x.url).join('\n')).join('\n');
  }
  return { KEY, MAX, MAX_BYTES, copy, questionOK, bankOK, validateDB, empty, load, save, select, create, expired, mark, finish, rows, summary, weaknesses, merge, contentPrompt };
});
