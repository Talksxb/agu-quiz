// LEIT-META-001 — verificações estáticas e fluxo sintético do laboratório isolado.
// Não substitui Chromium, testes assistivos ou Android físico.
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const html = fs.readFileSync(path.join(__dirname,'..','laboratorio-leitura.html'),'utf8');
assert.match(html,/<html lang="pt-BR">/);
assert.match(html,/<meta name="viewport"/);
assert.match(html,/DIG-LGPD-01/);
assert.match(html,/ADM-MOT-01/);
assert.match(html,/agu_leitura_lab_v1/);
assert.match(html,/recuperação ativa|Recuperação ativa/i);
assert.doesNotMatch(html,/<script\s+src=/);
assert.doesNotMatch(html,/\bfetch\s*\(/);
assert.doesNotMatch(html,/api[_-]?key/i);
assert.equal((html.match(/correct:\d/g)||[]).length,6,'Dois textos com três questões cada');
const script = html.match(/<script>([\s\S]*?)<\/script>/);
assert.ok(script,'JavaScript inline necessário');
new vm.Script(script[1],{filename:'laboratorio-leitura.html'});
// Smoke test sem navegador: iniciar, finalizar, responder, salvar uma sessão.
const elements=new Map(), events=new Map(), stored=new Map();
let ts=0, intervalId=1;
function element(tag='div'){
 return {tag,style:{},value:'',hidden:false,textContent:'',children:[],attributes:{},
 append(...x){this.children.push(...x)},
 replaceChildren(...x){this.children=[...x]},
 addEventListener(type,fn){events.set(this.id+':'+type,fn)},
 setAttribute(k,v){this.attributes[k]=v},
 scrollIntoView(){}};
}
const document={
 getElementById(id){if(!elements.has(id)){const e=element();e.id=id;elements.set(id,e)}return elements.get(id)},
 createElement:element,
 createTextNode(s){return {textContent:s}},
 querySelector(q){const i=Number(q.match(/q(\d+)/)[1]);return {value:[0,2,1][i]}}
};
for(const [id,value] of [['unit','DIG-LGPD-01'],['mode','full'],['target','170'],['baseline','173']]){
 const e=document.getElementById(id);e.value=value;
}
const storage={
 getItem(k){return stored.get(k)??null},
 setItem(k,v){stored.set(k,v)},
 removeItem(k){stored.delete(k)}
};
const ctx={document,localStorage:storage,performance:{now:()=>ts},setInterval:()=>intervalId++,clearInterval(){},setTimeout:()=>intervalId++,clearTimeout(){},alert(msg){throw Error('Unexpected alert: '+msg)},confirm:()=>true};
vm.runInNewContext(script[1],ctx,{timeout:2000});
function click(id){const f=events.get(id+':click');assert.equal(typeof f,'function','event '+id);f()}
click('start');assert.equal(document.getElementById('reading').hidden,false);
ts=148000;click('done');assert.equal(document.getElementById('evaluation').hidden,false);
click('grade');assert.equal(document.getElementById('result').hidden,false);
assert.equal(document.getElementById('score').textContent,'3/3');
assert.equal(JSON.parse(stored.get('agu_leitura_lab_v1')).length,1);
console.log('LEIT-META-001: verificação estática, compilação e fluxo sintético aprovados.');
