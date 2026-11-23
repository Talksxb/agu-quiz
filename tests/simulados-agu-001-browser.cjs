/* Somente contextos artificiais. Não equivale a Android físico/TalkBack. */
'use strict';
const { chromium } = require('playwright'), assert = require('node:assert/strict'), fs = require('node:fs'), path = require('node:path'), http = require('node:http');
const ROOT = path.resolve(__dirname, '..'), OUT = path.join(ROOT, 'tests/artifacts-simulados-agu'), E = require('../simulados-agu.js');
const server = process.env.AGU_TEST_URL ? null : http.createServer((req, res) => {
  const file = path.resolve(ROOT, '.' + new URL(req.url, 'http://localhost').pathname.replace(/\/$/, '/index.html'));
  if (!file.startsWith(ROOT + path.sep)) { res.writeHead(403); res.end(); return; }
  fs.readFile(file, (e, b) => { res.writeHead(e ? 404 : 200, { 'content-type': file.endsWith('.html') ? 'text/html; charset=utf-8' : file.endsWith('.css') ? 'text/css' : file.endsWith('.json') ? 'application/json' : 'application/javascript' }); res.end(e ? '' : b); });
});
async function main() {
  fs.mkdirSync(OUT, { recursive: true }); if (server) await new Promise(r => server.listen(0, '127.0.0.1', r));
  const base = process.env.AGU_TEST_URL || 'http://127.0.0.1:' + server.address().port + '/', browser = await chromium.launch({ headless: true, args: ['--no-sandbox'], executablePath: process.env.AGU_CHROMIUM_BIN || undefined }), results = [];
  async function scan(page, name, scans) {
    const size = await page.evaluate(() => ({ width: innerWidth, scroll: document.documentElement.scrollWidth })); assert.ok(size.scroll <= size.width + 1, name + ' overflow');
    await page.addScriptTag({ path: require.resolve('axe-core/axe.min.js') });
    const r = await page.evaluate(async () => { const r = await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] } }); return { violations: r.violations.map(x => ({ id: x.id, nodes: x.nodes.map(n => n.target) })), incomplete: r.incomplete.map(x => ({ id: x.id, nodes: x.nodes.map(n => n.target) })) }; });
    assert.deepEqual(r.violations, [], name); scans.push({ name, ...r });
  }
  try {
    for (const width of [320, 390, 768, 1280]) {
      const context = await browser.newContext({ viewport: { width, height: 850 }, reducedMotion: 'reduce' }), page = await context.newPage(), errors = [], scans = [];
      page.on('pageerror', e => errors.push(e.message)); await page.goto(new URL('livros-agu.html', base).href); await page.locator('#discipline-AMB').waitFor();
      const prior = await page.evaluate(() => { const seed = { agu_quiz_mvp1_2026: '{"fixture":"legado"}', agu_quiz_revisao_inteligente_v1: '{"schema":"agu-review-v1","cards":{},"attempts":[]}', agu_livros_reader_v1: '{"adm-54":{"page":3,"done":[]}}' }; for (const [k, v] of Object.entries(seed)) localStorage.setItem(k, v); return seed; });
      await page.locator('#sim-open').click(); await page.locator('#sim-count').waitFor(); assert.equal(await page.locator('#sim-count').inputValue(), '15'); assert.equal(await page.locator('#sim-minutes').inputValue(), '20'); await scan(page, 'configuração', scans);
      for (const [n, m] of [[5, 7], [10, 12], [15, 20]]) {
        await page.getByRole('button', { name: n + ' questões · ' + m + ' min', exact: true }).click();
        assert.equal(await page.locator('#sim-count').inputValue(), String(n)); assert.equal(await page.locator('#sim-minutes').inputValue(), String(m));
      }
      await page.getByRole('button', { name: 'Iniciar treino', exact: true }).click(); await page.locator('#sim-question-title').waitFor();
      assert.equal(await page.locator('[data-sim-go]').count(), 15); assert.equal(await page.locator('.sim-correction').count(), 0); assert.equal(await page.getByText('Revelar fundamento', { exact: true }).count(), 0);
      await page.locator('input[name="sim-answer"]').first().check(); await page.locator('#sim-confidence').selectOption('alta'); await scan(page, 'questão', scans);
      const beforeReload = await page.evaluate(key => JSON.parse(localStorage.getItem(key)).active, E.KEY);
      await page.reload(); await page.locator('#sim-open').click(); await page.locator('#sim-question-title').waitFor(); assert.equal(await page.locator('input[name="sim-answer"]:checked').count(), 1);
      assert.equal(await page.evaluate(key => JSON.parse(localStorage.getItem(key)).active.deadlineAt, E.KEY), beforeReload.deadlineAt);
      await page.getByRole('button', { name: 'Encerrar e corrigir', exact: true }).click(); await page.getByRole('button', { name: 'Confirmar encerramento', exact: true }).click();
      await page.locator('#sim-weak-title').waitFor(); await scan(page, 'resultado', scans); assert.ok(await page.locator('.sim-next').count() >= 14);
      assert.equal(await page.locator('.sim-card div:not([hidden])').count(), 0); await page.getByRole('button', { name: 'Revelar fundamento', exact: true }).first().click(); await scan(page, 'cartão revelado', scans);
      assert.equal(await page.locator('.sim-next:visible').count(), 3, 'A correção abre apenas os três fundamentos prioritários');
      const final = await page.evaluate(key => JSON.parse(localStorage.getItem(key)), E.KEY); assert.equal(final.history.length, 1); assert.equal(final.active, null); assert.equal(E.summary(final.history[0]).blank, 14);
      await page.getByText('Preparar aprofundamento no chat da disciplina', { exact: true }).click();
      const promptEvent = page.waitForEvent('download'); await page.getByRole('button', { name: 'Baixar roteiro', exact: true }).click();
      const promptFile = path.join(OUT, 'roteiro-' + width + '.txt'); await (await promptEvent).saveAs(promptFile);
      assert.equal(fs.readFileSync(promptFile, 'utf8'), E.contentPrompt(final.history[0]));
      const dl = page.waitForEvent('download'); await page.getByRole('button', { name: 'Exportar sessões', exact: true }).first().click(); const download = await dl, file = path.join(OUT, 'sessao-' + width + '.json'); await download.saveAs(file); assert.ok(E.validateDB(JSON.parse(fs.readFileSync(file, 'utf8'))));
      assert.deepEqual(await page.evaluate(keys => Object.fromEntries(keys.map(k => [k, localStorage.getItem(k)])), Object.keys(prior)), prior, 'Outros percursos e agendas preservados');
      await page.screenshot({ path: path.join(OUT, 'resultado-' + width + '.png'), fullPage: false });
      await page.getByRole('link', { name: 'Estudar esta seção', exact: true }).first().click(); await page.locator('#method-tabs').waitFor(); await page.waitForFunction(() => document.querySelectorAll('[data-source-section]').length > 0);
      assert.ok(await page.locator('#book').isVisible()); assert.ok(await page.locator('#read-full').isVisible());
      await page.locator('#sim-context').click(); await page.getByRole('button', { name: 'Iniciar treino', exact: true }).waitFor(); await page.locator('#sim-mode').selectOption('estudo'); await page.locator('#sim-count').fill('4'); await page.getByRole('button', { name: 'Iniciar treino', exact: true }).click();
      await page.locator('input[name="sim-answer"]').first().check(); await page.getByRole('button', { name: 'Conferir esta questão', exact: true }).click(); assert.equal(await page.locator('.sim-correction').count(), 1); assert.ok(await page.locator('input[name="sim-answer"]').first().isDisabled()); await scan(page, 'estudo', scans);
      assert.deepEqual(errors, []); results.push({ width, scans, independentContext: true, physicalAndroid: false }); await context.close();
    }
    // Arquivo real em contexto independente: importação, conflito, UTF-8 e arquivamento explícito.
    {
      const context = await browser.newContext({ viewport: { width: 390, height: 850 } }), page = await context.newPage(), scans = [];
      await page.goto(new URL('livros-agu.html?simulado=1', base).href); await page.locator('#sim-count').waitFor();
      const guard = 'agu_simulado_guard_fixture'; await page.evaluate(k => localStorage.setItem(k, 'preservar outro percurso'), guard);
      const file = path.join(OUT, 'sessao-390.json'), expected = JSON.parse(fs.readFileSync(file, 'utf8'));
      async function importFile(payload) {
        if (!await page.locator('#sim-import').isVisible()) await page.getByText('Histórico e exportação de sessões', { exact: true }).click();
        await page.locator('#sim-import').setInputFiles(payload);
        await page.waitForFunction(() => document.getElementById('sim-import')?.value === '');
      }
      await importFile(file);
      assert.deepEqual(await page.evaluate(key => JSON.parse(localStorage.getItem(key)).history, E.KEY), expected.history);
      await scan(page, 'arquivo importado', scans);
      const before = await page.evaluate(key => localStorage.getItem(key), E.KEY), conflict = E.copy(expected);
      conflict.history[0].answers[0].choice = (conflict.history[0].answers[0].choice + 1) % 5;
      await importFile({ name: 'conflito.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify(conflict)) });
      assert.equal(await page.evaluate(key => localStorage.getItem(key), E.KEY), before, 'O mesmo ID preserva o registro local');
      await importFile({ name: 'utf8-invalido.json', mimeType: 'application/json', buffer: Buffer.from([0xc3, 0x28]) });
      assert.match(await page.locator('#sim-alert').innerText(), /Importação recusada/);
      assert.equal(await page.evaluate(key => localStorage.getItem(key), E.KEY), before);
      await page.getByText('Arquivar sessões concluídas para abrir espaço', { exact: true }).click();
      const confirm = page.getByRole('button', { name: 'Já guardei o arquivo; iniciar novo histórico', exact: true }); assert.ok(await confirm.isDisabled());
      const downloadEvent = page.waitForEvent('download'); await page.getByRole('button', { name: 'Baixar histórico antes de arquivar', exact: true }).click();
      const archived = await downloadEvent, archivedFile = path.join(OUT, 'arquivo-antes-de-arquivar.json'); await archived.saveAs(archivedFile);
      assert.deepEqual(JSON.parse(fs.readFileSync(archivedFile, 'utf8')), JSON.parse(before));
      assert.equal(await page.evaluate(key => localStorage.getItem(key), E.KEY), before, 'Baixar não apaga o histórico');
      await scan(page, 'confirmação de arquivamento', scans);
      await confirm.click(); await page.waitForFunction(key => JSON.parse(localStorage.getItem(key)).history.length === 0, E.KEY);
      assert.equal(await page.evaluate(k => localStorage.getItem(k), guard), 'preservar outro percurso');
      await importFile(archivedFile); assert.deepEqual(await page.evaluate(key => JSON.parse(localStorage.getItem(key)).history, E.KEY), expected.history);
      await page.locator('#sim-scope').selectOption('amb-03'); assert.match(await page.locator('#sim-available').innerText(), /Serão usadas 8/);
      await page.getByRole('button', { name: 'Iniciar treino', exact: true }).click(); assert.equal(await page.locator('[data-sim-go]').count(), 8, 'Não repete itens para completar quinze');
      results.push({ importArchive: true, utf8Rejected: true, sameIdPreserved: true, roundTrip: true, insufficientPool: true, scans }); await context.close();
    }
    // A retomada após o prazo encerra uma vez sem aguardar 20 minutos de relógio real.
    {
      const context = await browser.newContext(), page = await context.newPage(); await page.goto(base);
      const bank = JSON.parse(fs.readFileSync(path.join(ROOT, 'dados/simulados-agu.json'))), s = E.create(bank, { count: 5, minutes: 20, mode: 'simulado' }, [], Date.now() - 21 * 60000);
      await page.evaluate(([key, s]) => localStorage.setItem(key, JSON.stringify({ schema: 'agu-simulado-local-v1', active: s, history: [] })), [E.KEY, s]);
      await page.goto(new URL('livros-agu.html?simulado=1', base).href); await page.locator('#sim-weak-title').waitFor();
      assert.equal(await page.evaluate(key => JSON.parse(localStorage.getItem(key)).history.length, E.KEY), 1);
      await page.reload(); await page.locator('#sim-count').waitFor(); assert.equal(await page.evaluate(key => JSON.parse(localStorage.getItem(key)).history.length, E.KEY), 1); await context.close();
      results.push({ expiredResume: true, duplicated: false });
    }
    for (const kind of ['corrupt', 'quota', 'concurrent']) {
      const context = await browser.newContext(), page = await context.newPage(); await page.goto(base);
      const raw = kind === 'corrupt' ? '{invalid' : JSON.stringify(E.empty()); await page.evaluate(([key, raw]) => localStorage.setItem(key, raw), [E.KEY, raw]);
      if (kind === 'quota') await page.addInitScript(key => { const set = Storage.prototype.setItem; Storage.prototype.setItem = function (k, v) { if (k === key) throw Error('Quota sintética'); return set.call(this, k, v); }; }, E.KEY);
      await page.goto(new URL('livros-agu.html?simulado=1', base).href);
      if (kind === 'corrupt') { await page.getByRole('button', { name: 'Exportar registro preservado', exact: true }).waitFor(); assert.equal(await page.locator('#sim-count').count(), 0); }
      else {
        await page.getByRole('button', { name: 'Iniciar treino', exact: true }).click(); await page.locator('#sim-question-title').waitFor();
        if (kind === 'concurrent') {
          const another = await context.newPage(); await another.goto(base); await another.evaluate(key => localStorage.setItem(key, JSON.stringify({ schema: 'agu-simulado-local-v1', active: null, history: [], extension: 'other tab' })), E.KEY); await page.waitForFunction(() => document.querySelector('#sim-alert').textContent.includes('outra aba')); assert.ok(await page.locator('input[name="sim-answer"]').first().isDisabled());
        } else { assert.match(await page.locator('#sim-alert').innerText(), /memória/); assert.equal(await page.evaluate(key => localStorage.getItem(key), E.KEY), raw); }
      }
      results.push({ storage: kind, preserved: true }); await context.close();
    }
    fs.writeFileSync(path.join(OUT, 'resultado.json'), JSON.stringify(results, null, 2) + '\n');
    console.log('SIMULADOS_AGU_CHROMIUM_OK', JSON.stringify({ widths: [320, 390, 768, 1280], scans: results.flatMap(r => r.scans || []).length, storageAdversarial: 3, physicalAndroid: false }));
  } finally { await browser.close(); if (server) server.close(); }
}
main().catch(e => { console.error(e.stack || e); process.exitCode = 1; if (server) server.close(); });
