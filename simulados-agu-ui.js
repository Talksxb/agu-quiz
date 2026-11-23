/* Interface integrada ao Método AGU; textos do banco entram apenas por textContent. */
(function () {
  'use strict';
  const E = window.AGUSimulado, $ = id => document.getElementById(id);
  const el = (tag, value, cls) => { const n = document.createElement(tag); if (value !== undefined) n.textContent = value; if (cls) n.className = cls; return n; };
  const button = (value, fn, cls) => { const n = el('button', value, cls); n.type = 'button'; n.addEventListener('click', fn); return n; };
  let bank, state, expected, locked = false, unsaved = false, opened = false, before, trigger, resultId = null, filter = '', tickHandle;
  const panel = el('section', undefined, 'card sim-panel'); panel.id = 'simulator'; panel.hidden = true; panel.setAttribute('aria-labelledby', 'sim-title');
  const heading = el('h2', 'Simulados e estudo por questões'); heading.id = 'sim-title'; heading.tabIndex = -1;
  const alert = el('p', '', 'sim-alert'); alert.id = 'sim-alert'; alert.setAttribute('role', 'status'); alert.hidden = true;
  const body = el('div'); body.id = 'sim-body';
  panel.append(button('Voltar ao percurso', close), heading, alert, body);
  document.querySelector('.wrap > header').after(panel);
  const launch = button('Simulados rápidos', () => open('', launch), 'primary sim-entry'); launch.id = 'sim-open';
  document.querySelector('.wrap > header').appendChild(launch);
  const contextual = button('Treinar este capítulo', () => open($('book').dataset.chapterId || '', contextual)); contextual.id = 'sim-context'; $('method-tabs').after(contextual);
  function message(value) { alert.textContent = value; alert.hidden = !value; }
  function commit() {
    if (locked) return false;
    try { expected = E.save(localStorage, state, expected); unsaved = false; return true; }
    catch (e) { unsaved = true; if (/outra aba/.test(e.message)) locked = true; message(e.message + ' A sessão continua em memória; use Exportar sessões para conservá-la.'); return false; }
  }
  function download(value, filename, type = 'application/json') {
    const url = URL.createObjectURL(new Blob([value], { type })), a = el('a'); a.href = url; a.download = filename; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  function exportData() { if (state) download(JSON.stringify(state, null, 2), 'AGU_Simulados_Sessoes.json'); }
  function close() {
    opened = false; panel.hidden = true; $('catalog').hidden = before.catalog; $('book').hidden = before.book; trigger?.focus();
  }
  async function loadBank() {
    const r = await fetch('dados/simulados-agu.json', { cache: 'no-cache' }); if (!r.ok) throw Error('Não foi possível carregar as questões. Tente novamente.');
    const data = await r.json(); if (!E.bankOK(data)) throw Error('O banco de questões está incompatível.');
    const chapters = new Map(await Promise.all([...new Set(data.questions.map(q => q.chapterId))].map(async id => {
      const r = await fetch('livros/metodo/' + id + '.json', { cache: 'no-cache' }); if (!r.ok) throw Error('Índice do capítulo indisponível.'); return [id, await r.json()];
    })));
    const questions = data.questions.filter(q => { const c = chapters.get(q.chapterId); return c.edition === q.chapterEdition && c.sections.some(s => s.id === q.sectionId && s.sha256 === q.sectionSha256); });
    if (questions.length !== data.questions.length) message('Questões com seção ou edição alterada foram retiradas deste treino até nova conferência.');
    return { ...data, questions };
  }
  async function open(chapterId = '', source = launch) {
    filter = chapterId; trigger = source;
    if (!opened) { before = { catalog: $('catalog').hidden, book: $('book').hidden }; opened = true; }
    window.AGULivros?.pause(); $('catalog').hidden = true; $('book').hidden = true; panel.hidden = false; heading.focus();
    if (!state) {
      try { const stored = E.load(localStorage); state = stored.db; expected = stored.raw; }
      catch (e) { locked = true; message(e.message); body.replaceChildren(el('p', 'O treino foi bloqueado para preservar seu histórico.'), button('Exportar registro preservado', () => { try { download(localStorage.getItem(E.KEY) || '', 'AGU_Simulados_Recuperacao.txt', 'text/plain'); } catch { message('O armazenamento não está acessível.'); } })); return; }
    }
    if (!bank) { body.replaceChildren(el('p', 'Carregando questões e vínculos com os capítulos…')); try { bank = await loadBank(); } catch (e) { body.replaceChildren(el('p', e.message), button('Tentar carregar novamente', () => open(filter, trigger))); return; } }
    if (filter && !bank.questions.some(q => q.chapterId === filter)) { message('Este capítulo ainda não tem questões neste banco. Escolha um dos recortes disponíveis para treinar.'); filter = ''; }
    if (state.active) { if (E.expired(state.active)) finish(); else renderQuestion(); } else if (resultId) renderResult(); else renderSetup();
  }
  function field(label, control) { const box = el('div', undefined, 'field'), l = el('label', label); l.htmlFor = control.id; box.append(l, control); return box; }
  function select(id, options, selected) { const n = el('select'); n.id = id; for (const [value, label] of options) { const o = el('option', label); o.value = value; n.appendChild(o); } n.value = selected; return n; }
  function renderSetup() {
    body.replaceChildren();
    body.append(el('p', 'Comece pelas questões. Depois da correção, volte ao fundamento, ao cartão e à seção que precisa estudar. O resultado orienta seu próximo passo; não certifica domínio.'));
    const presets = el('div', undefined, 'sim-presets'); presets.setAttribute('role', 'group'); presets.setAttribute('aria-label', 'Durações sugeridas');
    for (const [n, m] of [[5, 7], [10, 12], [15, 20]]) presets.appendChild(button(n + ' questões · ' + m + ' min', () => { $('sim-count').value = n; $('sim-minutes').value = m; availability(); }, n === 15 ? 'primary' : ''));
    const form = el('form'), controls = el('div', undefined, 'controls'); form.addEventListener('submit', e => { e.preventDefault(); start(); });
    const mode = select('sim-mode', [['simulado', 'Simulado · correção ao terminar'], ['estudo', 'Estudo · conferir uma por vez']], 'simulado');
    const scope = select('sim-scope', [['', 'Misturar as matérias disponíveis'], ...[...new Map(bank.questions.map(q => [q.chapterId, q.topic]))]], filter);
    const strategy = select('sim-strategy', [['misto', 'Prática variada'], ['novas', 'Introduzir questões ainda não feitas'], ['dificuldades', 'Priorizar erros e acertos inseguros']], 'misto');
    const count = el('input'); count.id = 'sim-count'; count.type = 'number'; count.min = 1; count.max = 30; count.value = 15; count.required = true;
    const minutes = el('input'); minutes.id = 'sim-minutes'; minutes.type = 'number'; minutes.min = 1; minutes.max = 90; minutes.value = 20; minutes.required = true;
    controls.append(field('Formato', mode), field('Matérias', scope), field('Objetivo', strategy), field('Questões', count), field('Minutos', minutes));
    mode.addEventListener('change', () => { minutes.disabled = mode.value === 'estudo'; availability(); });
    scope.addEventListener('change', availability); count.addEventListener('input', availability);
    const info = el('p', '', 'small muted'); info.id = 'sim-available'; info.setAttribute('role', 'status');
    const begin = el('button', 'Iniciar treino', 'primary'); begin.type = 'submit'; begin.disabled = locked || state.history.length >= E.MAX;
    form.append(controls, info, begin); body.append(presets, form);
    body.append(el('p', 'Banco inicial: questões autorais com cinco alternativas, fundamento pontualmente conferido e vínculo com capítulos de LGPD, agentes públicos e competências ambientais. As quatro paráfrases históricas já disponíveis permanecem no Leitor. Este teste não reproduz uma prova oficial.', 'small muted'));
    body.append(el('p', 'No simulado, o relógio continua ao fechar esta área ou recarregar. Tempo e tamanho são escolhas de treino. A pontuação é 1 por acerto e 0 por erro ou omissão, sem aplicar mínimos ou regras de um edital futuro.', 'small muted'));
    historyTools(); availability();
  }
  function availability() {
    const available = bank.questions.filter(q => !$('sim-scope').value || q.chapterId === $('sim-scope').value).length, requested = Number($('sim-count').value);
    $('sim-available').textContent = available + ' questões disponíveis neste recorte. ' + (requested > available ? 'Serão usadas ' + available + ', sem repetir para completar a quantidade.' : 'O treino usará ' + requested + ' questões diferentes.');
  }
  function start() {
    try {
      if (locked || state.active) throw Error('Recarregue o histórico antes de iniciar.');
      if (state.history.length >= E.MAX) throw Error('Limite de 80 sessões atingido. Exporte seu histórico antes de uma nova etapa.');
      state.active = E.create(bank, { mode: $('sim-mode').value, strategy: $('sim-strategy').value, chapterId: $('sim-scope').value, count: Number($('sim-count').value), minutes: Number($('sim-minutes').value) }, state.history);
      resultId = null; commit(); renderQuestion();
    } catch (e) { message(e.message); }
  }
  function change(index, value) {
    try { if (locked) throw Error('O histórico mudou; exporte esta sessão antes de recarregar.'); state.active = E.mark(state.active, index, value); commit(); updateCounts(); return true; }
    catch (e) { if (state.active && E.expired(state.active)) finish(); else message(e.message); return false; }
  }
  function updateCounts() {
    const s = state.active; if (!s) return;
    const n = s.answers.filter(a => a.choice !== null).length; if ($('sim-answered')) $('sim-answered').textContent = n + ' de ' + s.questions.length + ' respondidas';
    document.querySelectorAll('[data-sim-go]').forEach(b => { const a = s.answers[Number(b.dataset.simGo)]; b.dataset.answered = String(a.choice !== null); b.setAttribute('aria-label', 'Questão ' + (Number(b.dataset.simGo) + 1) + (a.choice !== null ? ', respondida' : ', não respondida')); });
  }
  function navigate(i) {
    if (!state.active || locked) return; if (E.expired(state.active)) { finish(); return; }
    state.active.cursor = i; commit(); renderQuestion();
  }
  function renderQuestion() {
    clearInterval(tickHandle); body.replaceChildren(); const s = state.active, index = s.cursor, q = s.questions[index], a = s.answers[index];
    const top = el('div', undefined, 'sim-top'), timer = el('span', '', 'sim-clock'); timer.id = 'sim-clock'; timer.setAttribute('role', 'timer'); timer.setAttribute('aria-live', 'off');
    const answered = el('span'); answered.id = 'sim-answered'; top.append(timer, answered); body.appendChild(top);
    const nav = el('nav', undefined, 'sim-jump'); nav.setAttribute('aria-label', 'Questões da sessão');
    s.questions.forEach((_, i) => { const b = button(String(i + 1), () => navigate(i)); b.dataset.simGo = i; b.setAttribute('aria-current', i === index ? 'step' : 'false'); nav.appendChild(b); }); body.appendChild(nav);
    body.append(el('p', 'Questão ' + (index + 1) + ' de ' + s.questions.length + ' · ' + q.topic + ' · ' + (q.nature === 'autoral' ? 'Autoral' : 'Adaptada'), 'small muted'));
    const title = el('h3', q.stem); title.id = 'sim-question-title'; title.tabIndex = -1; body.appendChild(title);
    const choices = el('fieldset', undefined, 'sim-options'); choices.appendChild(el('legend', 'Marque uma alternativa'));
    q.options.forEach((option, i) => { const l = el('label', undefined, 'sim-option'), radio = el('input'); radio.type = 'radio'; radio.name = 'sim-answer'; radio.value = i; radio.checked = a.choice === i; radio.disabled = a.revealed || locked; radio.addEventListener('change', () => change(index, { choice: i })); l.append(radio, el('span', String.fromCharCode(65 + i) + '. ' + option)); choices.appendChild(l); });
    const confidence = select('sim-confidence', [['', 'Não informada'], ['baixa', 'Baixa · chute ou dúvida'], ['media', 'Média · fundamento incompleto'], ['alta', 'Alta · consigo justificar']], a.confidence || '');
    confidence.disabled = a.revealed || locked; confidence.addEventListener('change', () => change(index, { confidence: confidence.value || null }));
    body.append(choices, field('Sua confiança antes da correção', confidence));
    const actions = el('div', undefined, 'controls-footer');
    if (index > 0) actions.appendChild(button('Anterior', () => navigate(index - 1)));
    if (s.mode === 'estudo' && !a.revealed) actions.appendChild(button('Conferir esta questão', () => { if (state.active.answers[index].choice === null) { message('Escolha uma alternativa antes de conferir.'); return; } change(index, { revealed: true }); renderQuestion(); }, 'primary'));
    if (!a.revealed) actions.appendChild(button('Limpar resposta', () => { if (change(index, { choice: null })) renderQuestion(); }));
    if (index < s.questions.length - 1) actions.appendChild(button('Próxima', () => navigate(index + 1)));
    actions.appendChild(button('Encerrar e corrigir', confirmFinish)); body.appendChild(actions);
    if (a.revealed) correction(body, E.rows(s)[index], false);
    body.append(el('p', 'As respostas ficam neste navegador. O backup geral do percurso não inclui estas sessões; use a exportação de sessões abaixo.', 'small muted'), button('Exportar sessões', exportData));
    updateCounts(); title.focus(); tick(); if (state.active && s.mode === 'simulado') tickHandle = setInterval(tick, 1000);
  }
  function tick() {
    if (!state?.active) return; const s = state.active;
    if (E.expired(s)) { finish(); return; }
    if ($('sim-clock')) { const seconds = s.deadlineAt ? Math.max(0, Math.ceil((Date.parse(s.deadlineAt) - Date.now()) / 1000)) : 0; $('sim-clock').textContent = s.mode === 'estudo' ? 'Estudo sem limite de tempo' : String(Math.floor(seconds / 60)).padStart(2, '0') + ':' + String(seconds % 60).padStart(2, '0'); }
  }
  function confirmFinish() {
    $('sim-confirm')?.remove(); const box = el('div', undefined, 'sim-confirm'); box.id = 'sim-confirm'; box.setAttribute('role', 'group'); box.setAttribute('aria-label', 'Confirmar encerramento');
    const blanks = state.active.answers.filter(a => a.choice === null).length;
    box.append(el('p', 'Encerrar agora? ' + blanks + ' questão(ões) sem resposta. Depois da correção, as respostas desta sessão ficam encerradas.'), button('Confirmar encerramento', finish, 'primary'), button('Continuar respondendo', () => { box.remove(); document.querySelector('#sim-body .controls-footer button')?.focus(); })); body.appendChild(box); box.querySelector('button').focus();
  }
  function finish() {
    clearInterval(tickHandle); if (!state?.active) return;
    resultId = state.active.id; state = E.finish(state); commit(); if (opened) renderResult();
  }
  function reading(q, label = 'Estudar esta seção') {
    const a = el('a', label, 'sim-reading'); a.href = 'livros-agu.html?livro=' + encodeURIComponent(q.chapterId) + '&secao=' + encodeURIComponent(q.sectionId); return a;
  }
  function correction(parent, row, showCard = true) {
    const { q, answer, correct, blank } = row, box = el('article', undefined, 'sim-correction');
    box.append(el('h4', q.title), el('p', (blank ? 'Não respondida' : correct ? 'Acerto' : 'Erro') + ' · resposta: ' + String.fromCharCode(65 + q.correct) + ' · confiança: ' + (answer.confidence || 'não informada'), 'sim-result-line'), el('p', q.explanation));
    if (!blank) box.appendChild(el('p', 'Sua alternativa: ' + q.options[answer.choice] + ' ' + q.feedback[answer.choice]));
    const detail = el('details'); detail.appendChild(el('summary', 'Examinar todas as alternativas')); const list = el('ol'); list.type = 'A';
    q.options.forEach((x, i) => list.appendChild(el('li', x + ' — ' + q.feedback[i]))); detail.appendChild(list); box.appendChild(detail);
    box.append(reading(q), el('p', q.curricularId + ' · ' + q.sectionId + ' · conferência pontual, sem certificação integral', 'small muted'));
    for (const s of q.sources) { const a = el('a', s.locator + ' · conferido em ' + s.checkedAt); a.href = s.url; a.target = '_blank'; a.rel = 'noopener noreferrer'; const p = el('p', undefined, 'small'); p.appendChild(a); box.appendChild(p); }
    if (showCard) card(box, q); parent.appendChild(box);
  }
  function card(parent, q) {
    const box = el('div', undefined, 'sim-card'); box.append(el('h4', 'Recupere o fundamento'), el('p', q.card.front));
    const answer = el('div'); answer.hidden = true; const reveal = button('Revelar fundamento', () => { answer.hidden = !answer.hidden; reveal.setAttribute('aria-expanded', String(!answer.hidden)); answer.replaceChildren(); if (!answer.hidden) answer.appendChild(el('p', q.card.back)); }); reveal.setAttribute('aria-expanded', 'false');
    box.append(reveal, answer); parent.appendChild(box);
  }
  function renderResult() {
    body.replaceChildren(); const s = state.history.find(s => s.id === resultId); if (!s) { resultId = null; renderSetup(); return; }
    const score = E.summary(s), weak = E.weaknesses(s), metrics = el('div', undefined, 'sim-metrics');
    for (const [n, label] of [[score.correct + '/' + score.total, 'Acertos'], [score.wrong, 'Erros'], [score.blank, 'Sem resposta'], [score.uncertain, 'Acertos inseguros']]) { const item = el('div'); item.append(el('strong', String(n)), el('span', label)); metrics.appendChild(item); }
    body.append(el('h3', 'Correção e próximo passo'), metrics, el('p', (s.reason === 'tempo' ? 'Tempo encerrado. ' : '') + 'Resultado: ' + score.percent + '% · ' + Math.floor(score.elapsedSeconds / 60) + ' min ' + score.elapsedSeconds % 60 + ' s · ' + (s.mode === 'simulado' ? 'simulado' : 'estudo com consulta após resposta') + '. Não é uma medida de domínio nem de aprovação em concurso.'));
    if (score.highConfidenceErrors) body.appendChild(el('p', score.highConfidenceErrors + ' erro(s) com alta confiança: priorize o fundamento antes de repetir a questão.', 'sim-alert'));
    const topics = el('ul'); score.byTopic.forEach(t => topics.appendChild(el('li', t.topic + ': ' + t.correct + '/' + t.total))); body.appendChild(topics);
    const actions = el('div', undefined, 'controls-footer'); actions.append(button('Montar novo treino', () => { resultId = null; renderSetup(); }), button('Rever dificuldades', () => { const first = $('sim-weak-title'); first?.focus(); first?.scrollIntoView({ block: 'start' }); }), button('Exportar sessões', exportData)); body.appendChild(actions);
    const next = el('h3', 'Estude a partir deste resultado'); next.id = 'sim-weak-title'; next.tabIndex = -1; body.appendChild(next);
    body.append(el('p', weak.length ? 'Tente explicar cada regra antes de revelar o cartão. Depois abra a seção e retorne a uma nova aplicação. Os cards abaixo são selecionados das correções revisadas; não criam avaliações na agenda dos baralhos.' : 'Você acertou com alta confiança neste conjunto. Em outro momento, experimente questões ainda não feitas e casos com fatos diferentes.'));
    const more = el('details'); more.appendChild(el('summary', 'Outros fundamentos para revisar · ' + Math.max(0, weak.length - 3)));
    if (weak.length > 3) body.appendChild(el('p', 'Comece por estes três fundamentos. Os demais ficam disponíveis para continuar depois.', 'small muted'));
    weak.forEach((row, i) => { const item = el('div', undefined, 'sim-next'); item.append(el('p', row.q.title + ' · ' + (row.blank ? 'não respondida' : row.correct ? 'acerto inseguro' : 'erro')), reading(row.q)); card(item, row.q); (i < 3 ? body : more).appendChild(item); });
    if (weak.length > 3) body.appendChild(more);
    if (weak.length) {
      const d = el('details'); d.appendChild(el('summary', 'Preparar aprofundamento no chat da disciplina')); d.appendChild(el('p', 'O roteiro abaixo é preparado a partir deste resultado. Copie para o chat da disciplina para produzir novas explicações e questões com fontes verificadas. Não há envio nem geração por IA em segundo plano.'));
      const label = el('label', 'Roteiro para o próximo conteúdo'); label.htmlFor = 'sim-prompt'; const ta = el('textarea'); ta.id = 'sim-prompt'; ta.readOnly = true; ta.value = E.contentPrompt(s); d.append(label, ta, button('Baixar roteiro', () => download(ta.value, 'AGU_Proximo_Conteudo.txt', 'text/plain'))); body.appendChild(d);
    }
    const all = el('details'); all.appendChild(el('summary', 'Correção completa · ' + score.total + ' questões')); E.rows(s).forEach(row => correction(all, row, false)); body.appendChild(all);
    historyTools(); heading.focus();
  }
  function historyTools() {
    const details = el('details'); details.appendChild(el('summary', 'Histórico e exportação de sessões')); details.appendChild(el('p', 'Histórico local deste navegador, separado do backup geral. São preservadas até 80 sessões com a versão das questões respondidas. Exportar não envia seus resultados a nenhum serviço.'));
    for (const s of [...state.history].reverse()) { const sc = E.summary(s); details.appendChild(button(new Date(s.startedAt).toLocaleString('pt-BR') + ' · ' + sc.correct + '/' + sc.total + ' · ' + s.mode, () => { resultId = s.id; renderResult(); })); }
    details.appendChild(button('Exportar sessões', exportData)); const input = el('input'); input.type = 'file'; input.id = 'sim-import'; input.accept = '.json,application/json'; const label = el('label', 'Importar arquivo de sessões'); label.htmlFor = input.id;
    input.disabled = locked || unsaved; input.addEventListener('change', async () => {
      const file = input.files[0]; if (!file) return;
      try {
        if (file.size > E.MAX_BYTES) throw Error('Arquivo maior que 8 MiB.');
        const decoded = new TextDecoder('utf-8', { fatal: true }).decode(await file.arrayBuffer()), incoming = JSON.parse(decoded), merged = E.merge(state, incoming);
        const raw = E.save(localStorage, merged, expected); expected = raw; state = merged; resultId = null;
        message('Arquivo importado. Sessões com o mesmo ID e a sessão ativa local foram preservadas.');
        if (state.active) { if (E.expired(state.active)) finish(); else renderQuestion(); } else renderSetup();
      } catch (e) { message('Importação recusada: ' + e.message); } input.value = '';
    });
    details.append(label, input); body.appendChild(details);
    if (state.history.length) {
      const archive = el('details'); archive.appendChild(el('summary', 'Arquivar sessões concluídas para abrir espaço'));
      archive.appendChild(el('p', 'Primeiro baixe e confira o arquivo. Ao confirmar, as sessões concluídas serão retiradas deste navegador; a sessão em andamento e os outros percursos serão preservados. Você poderá importar o arquivo depois, respeitado o limite de sessões.'));
      const confirm = button('Já guardei o arquivo; iniciar novo histórico', () => {
        try { const next = { ...state, history: [] }, raw = E.save(localStorage, next, expected); state = next; expected = raw; resultId = null; unsaved = false; message('Novo histórico iniciado. A sessão ativa e os outros percursos foram preservados.'); if (state.active) renderQuestion(); else renderSetup(); }
        catch (e) { message('O histórico foi preservado: ' + e.message); }
      }); confirm.disabled = true;
      const exportFirst = button('Baixar histórico antes de arquivar', () => { exportData(); confirm.disabled = locked; }); exportFirst.disabled = locked;
      archive.append(exportFirst, confirm); body.appendChild(archive);
    }
  }
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') tick(); });
  window.addEventListener('storage', e => { if (state && e.key === E.KEY && e.newValue !== expected) { locked = true; message('O histórico mudou em outra aba. Exporte sua sessão em memória e recarregue antes de continuar.'); document.querySelectorAll('#sim-body input, #sim-body select, #sim-body button').forEach(n => { if (n.textContent !== 'Exportar sessões') n.disabled = true; }); } });
  window.addEventListener('beforeunload', e => { if (unsaved) { e.preventDefault(); e.returnValue = ''; } });
  if (new URLSearchParams(location.search).get('simulado') === '1') open();
})();
