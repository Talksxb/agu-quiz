/* Geração determinística: uma unidade revisada alimenta questão, correção e cartão. */
'use strict';
const fs = require('node:fs'), path = require('node:path'), crypto = require('node:crypto');
const E = require('../simulados-agu.js'), ROOT = path.resolve(__dirname, '..');
const hash = x => crypto.createHash('sha256').update(typeof x === 'string' ? x : JSON.stringify(x)).digest('hex');
const read = (root, file) => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
const assert = (ok, msg) => { if (!ok) throw Error(msg); };
function compile(source, approvals, chapters) {
  assert(source.schema === 'agu-simulado-editorial-v1' && Array.isArray(source.records), 'Fonte editorial inválida');
  const seen = new Set(), semantics = new Set(), questions = [], pending = [];
  for (const record of source.records) {
    assert(!seen.has(record.id) && !semantics.has(record.semanticKey), 'Unidade duplicada: ' + record.id);
    seen.add(record.id); semantics.add(record.semanticKey);
    const chapter = chapters[record.chapterId], section = chapter?.sections.find(s => s.id === record.sectionId);
    assert(chapter && section && chapter.curricularIds.includes(record.curricularId), 'Vínculo curricular/seção inexistente: ' + record.id);
    const { semanticKey, sourceRefs, locator, ...body } = record;
    assert(sourceRefs?.length && sourceRefs.every(k => source.sources[k]), 'Fonte não identificada');
    const q = { ...body, sources: sourceRefs.map(k => ({ ...source.sources[k], locator: locator[k] })), sectionSha256: section.sha256,
      chapterEdition: chapter.edition, status: 'aprovado_pontualmente' };
    const contentSha256 = hash(q), approval = approvals.records.find(a => a.id === q.id);
    if (!approval || approval.contentSha256 !== contentSha256) { pending.push({ id: q.id, reason: 'Conteúdo, seção ou fonte sem revisão correspondente', contentSha256 }); continue; }
    assert(approval.reviewer && /^\d{4}-\d\d-\d\d$/.test(approval.at) && approval.scope, 'Revisão sem identificação');
    q.contentSha256 = contentSha256;
    assert(E.questionOK(q), 'Questão incompleta: ' + q.id);
    questions.push(q);
  }
  return { bank: { schema: 'agu-simulado-bank-v1', edition: source.edition, checkedAt: source.checkedAt, questions }, pending };
}
function build(root = ROOT, check = false) {
  const source = read(root, 'livros/editorial/simulados-agu-001.json'), approvals = read(root, 'livros/editorial/simulados-agu-aprovacoes.json');
  const chapters = Object.fromEntries([...new Set(source.records.map(q => q.chapterId))].map(id => [id, read(root, 'livros/metodo/' + id + '.json')]));
  const result = compile(source, approvals, chapters);
  let changed = 0;
  for (const [file, data] of [['dados/simulados-agu.json', result.bank], ['livros/relatorios/simulados-agu.json', { schema: 'agu-simulado-build-v1', approved: result.bank.questions.length, pending: result.pending }]]) {
    const value = JSON.stringify(data, null, 2) + '\n', target = path.join(root, file);
    if (fs.existsSync(target) && fs.readFileSync(target, 'utf8') === value) continue;
    assert(!check, 'Artefato desatualizado: ' + file); fs.mkdirSync(path.dirname(target), { recursive: true }); fs.writeFileSync(target, value); changed++;
  }
  return { approved: result.bank.questions.length, pending: result.pending.length, changed };
}
if (require.main === module) { try { console.log(JSON.stringify(build(ROOT, process.argv.includes('--check')))); } catch (e) { console.error(e.message); process.exitCode = 1; } }
module.exports = { hash, compile, build };
