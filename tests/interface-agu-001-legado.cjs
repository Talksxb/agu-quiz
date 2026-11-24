/* Reverte apenas o delta explícito de apresentação antes dos hashes históricos. */
'use strict';
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const delta = require('./fixtures/interface-agu-001-delta.json');
const hash = value => crypto.createHash('sha256').update(value).digest('hex');
module.exports = html => {
  html = require('./questoes-agu-001-legado.cjs')(html);
  assert.equal(hash(html), delta.after, 'HTML fora do delta INTERFACE-AGU-001');
  for (const change of [...delta.changes].reverse()) {
    assert.equal(html.split(change.after).length, 2, 'Delta visual deve ser único');
    html = html.replace(change.after, change.before);
  }
  assert.equal(hash(html), delta.before, 'HTML anterior deve permanecer integral');
  return html;
};
