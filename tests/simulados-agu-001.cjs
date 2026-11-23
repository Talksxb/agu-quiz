'use strict';
const assert = require('node:assert/strict'), fs = require('node:fs'), path = require('node:path');
const E = require('../simulados-agu.js'), P = require('../scripts/gerar-simulados.cjs');
const ROOT = path.resolve(__dirname, '..'), read = f => JSON.parse(fs.readFileSync(path.join(ROOT, f), 'utf8'));
const bank = read('dados/simulados-agu.json'), source = read('livros/editorial/simulados-agu-001.json'), approvals = read('livros/editorial/simulados-agu-aprovacoes.json');
const chapters = Object.fromEntries([...new Set(source.records.map(q => q.chapterId))].map(id => [id, read('livros/metodo/' + id + '.json')]));
let count = 0; const test = (name, fn) => { fn(); count++; console.log('OK', name); }, now = Date.parse('2026-11-23T15:00:00Z');
const config = { count: 15, minutes: 20, mode: 'simulado', strategy: 'misto' };
const memory = () => { const data = new Map([['legado', 'bytes anteriores']]); return { data, getItem: k => data.get(k) ?? null, setItem: (k, v) => data.set(k, v) }; };
test('24 questões, cinco alternativas, fontes e cartões; compilação idempotente', () => {
  assert.equal(bank.questions.length, 24); assert.ok(E.bankOK(bank)); assert.ok(bank.questions.every(q => q.options.length === 5));
  assert.equal(P.build(ROOT, true).changed, 0); for (const q of bank.questions) assert.ok(q.card.front !== q.stem && q.card.back !== q.options[q.correct]);
});
test('15/20, mistura equilibrada, sem repetição e sem inventar itens para preencher', () => {
  const s = E.create(bank, config, [], now); assert.equal(s.questions.length, 15); assert.equal(Date.parse(s.deadlineAt) - now, 1200000);
  assert.equal(new Set(s.questions.map(q => q.id)).size, 15);
  for (const id of Object.keys(chapters)) assert.equal(s.questions.filter(q => q.chapterId === id).length, 5);
  const limited = E.create(bank, { ...config, chapterId: 'amb-03' }, [], now); assert.equal(limited.questions.length, 8);
  assert.throws(() => E.create(bank, { ...config, count: 0 })); assert.throws(() => E.create(bank, { ...config, minutes: -1 }));
});
test('prioriza novas, erros de alta confiança e acertos inseguros dentro de cada matéria', () => {
  const only = { ...bank, questions: bank.questions.slice(0, 4) }, s = E.create(only, { ...config, count: 2 }, [], now, () => 0);
  s.answers[0] = { choice: s.questions[0].correct, confidence: 'baixa', revealed: false }; s.answers[1] = { choice: (s.questions[1].correct + 1) % 5, confidence: 'alta', revealed: false };
  const db = E.finish({ ...E.empty(), active: s }, now + 60000);
  assert.equal(E.select(only, { count: 1, strategy: 'dificuldades' }, db.history, () => 0).questions[0].id, s.questions[1].id);
  assert.equal(E.select(only, { count: 1, strategy: 'novas' }, db.history, () => 0).questions[0].id, only.questions[2].id);
});
test('corrige acertos, erros, omissões e confiança sem modificar a sessão respondida', () => {
  let s = E.create(bank, { ...config, count: 4 }, [], now); const original = E.copy(s);
  s = E.mark(s, 0, { choice: s.questions[0].correct, confidence: 'baixa' }, now + 1);
  s = E.mark(s, 1, { choice: (s.questions[1].correct + 1) % 5, confidence: 'alta' }, now + 2);
  s = E.mark(s, 2, { choice: s.questions[2].correct, confidence: 'alta' }, now + 3);
  assert.equal(original.answers[0].choice, null);
  const db = E.finish({ ...E.empty(), active: s }, now + 60000), score = E.summary(db.history[0]);
  assert.deepEqual([score.correct, score.wrong, score.blank, score.uncertain, score.highConfidenceErrors, score.percent], [2, 1, 1, 1, 1, 50]);
  assert.equal(E.weaknesses(db.history[0])[0].q.id, s.questions[1].id); assert.match(E.contentPrompt(db.history[0]), /Conferir fontes oficiais/);
});
test('prazo absoluto vale após recarga; resposta no limite é recusada; tempo não duplica resultado', () => {
  const s = E.create(bank, config, [], now), deadline = Date.parse(s.deadlineAt);
  assert.equal(E.expired(E.copy(s), deadline - 1), false); assert.equal(E.expired(E.copy(s), deadline), true);
  assert.throws(() => E.mark(s, 0, { choice: 1 }, deadline), /tempo/);
  const finished = E.finish({ ...E.empty(), active: s }, deadline + 10 * 60000); assert.equal(finished.history[0].reason, 'tempo'); assert.equal(E.summary(finished.history[0]).elapsedSeconds, 1200);
  assert.throws(() => E.finish(finished), /Nenhuma/); assert.equal(finished.history.length, 1);
});
test('modo estudo permite consulta individual e bloqueia mudar resposta já revelada', () => {
  const s = E.create(bank, { ...config, mode: 'estudo' }, [], now); assert.equal(s.deadlineAt, null); assert.equal(E.expired(s, now + 1e9), false);
  const seen = E.mark(s, 0, { choice: 0, revealed: true }, now + 1e9); assert.throws(() => E.mark(seen, 0, { choice: 1 }), /conferida/);
  assert.throws(() => E.mark(E.create(bank, config, [], now), 0, { revealed: true }, now), /inválida/);
});
test('retomada e gravação preservam todas as outras chaves', () => {
  const m = memory(), loaded = E.load(m); let db = loaded.db; db.active = E.create(bank, config, [], now);
  const raw = E.save(m, db, loaded.raw); assert.equal(E.load(m).db.active.deadlineAt, db.active.deadlineAt); assert.equal(m.data.get('legado'), 'bytes anteriores'); assert.equal(E.load(m).raw, raw);
});
test('JSON inválido, quota e concorrência preservam bytes; não há restauração destrutiva', () => {
  const m = memory(); m.data.set(E.KEY, '{inválido'); assert.throws(() => E.load(m)); assert.equal(m.getItem(E.KEY), '{inválido');
  m.data.delete(E.KEY); const db = { ...E.empty(), active: E.create(bank, config, [], now) }, raw = E.save(m, db, null);
  assert.throws(() => E.save(m, E.empty(), null), /outra aba/); assert.equal(m.getItem(E.KEY), raw);
  m.setItem = () => { throw Error('quota sintética'); }; assert.throws(() => E.save(m, E.empty(), raw), /quota/); assert.equal(m.getItem(E.KEY), raw);
});
test('importação preserva conflitos e sessão ativa; snapshots sobrevivem a banco atualizado', () => {
  const local = { ...E.empty(), active: E.create(bank, config, [], now) }, historical = E.finish(local, now + 60000);
  const target = E.copy(local); target.active.id += '-outro';
  const merged = E.merge(target, historical); assert.equal(merged.active.id, target.active.id); assert.equal(merged.history.length, 1);
  assert.equal(E.merge(merged, historical).history.length, 1);
  const changed = E.copy(bank); changed.questions[0].correct = (changed.questions[0].correct + 1) % 5;
  assert.deepEqual(merged.history[0].questions, historical.history[0].questions);
  assert.equal(E.validateDB(JSON.parse('{"schema":"agu-simulado-local-v1","active":null,"history":[],"__proto__":{}}')), false);
  assert.throws(() => E.merge(E.empty(), { ...E.empty(), history: Array(81).fill(historical.history[0]) }));
});
test('mudança de regra, fonte ou seção retira item até revisão por hash correspondente', () => {
  const changed = E.copy(source); changed.records[0].correct = 0; assert.equal(P.compile(changed, approvals, chapters).pending.length, 1);
  const next = E.copy(chapters); next['amb-03'].sections[5].sha256 = 'a'.repeat(64); const result = P.compile(source, approvals, next); assert.ok(result.pending.length > 0);
  const pending = P.compile(source, { records: [] }, chapters); assert.equal(pending.bank.questions.length, 0);
  const dup = E.copy(source); dup.records.push(dup.records[0]); assert.throws(() => P.compile(dup, approvals, chapters), /duplicada/);
});
console.log('SIMULADOS_AGU_001_OK', count, 'cenários');
