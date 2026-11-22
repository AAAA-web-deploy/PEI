const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const code = fs.readFileSync(fs.existsSync('app.js') ? 'app.js' : 'dist/app.js','utf8');
function node() {return { attrs:{}, classList:{names:new Set(),add(x){this.names.add(x)}}, style:{}, value:'', textContent:'', disabled:false, setAttribute(k,v){this.attrs[k]=v},removeAttribute(k){delete this.attrs[k]},closest(){return null},addEventListener(type,fn){this.handler=fn},select(){},remove(){} };}
function run(cfg) {
 const x=node(),tg=node(),address=node(),button=node(),notice=node();
 const doc={querySelectorAll(s){return ({'.social-x':[x],'.social-telegram':[tg],'.address-text':[address],'.copy-address':[button]})[s]||[]},querySelector(){return notice},createElement(){return node()},body:{append(){}},execCommand(){return true}};
 let copied=''; const sandbox={document:doc,window:{PEI_SITE_CONFIG:cfg,isSecureContext:true},navigator:{clipboard:{async writeText(value){copied=value}}},URL,setTimeout:()=>1,clearTimeout(){}};
 vm.runInNewContext(code,sandbox); return {x,tg,address,button,getCopied:()=>copied};
}
(async()=>{
 let state=run({contractAddress:null,xUrl:null,telegramUrl:null});
 assert.equal(state.button.disabled,true); assert.equal(state.x.attrs['aria-disabled'],'true'); assert.equal(state.tg.attrs['aria-disabled'],'true');
 const ca='0x1234567890abcdef1234567890abcdef12345678';
 state=run({contractAddress:ca,xUrl:'https://x.com/PepeTest',telegramUrl:'https://t.me/PepeTest'});
 assert.equal(state.button.disabled,false); assert.equal(state.address.textContent,ca); assert.equal(state.x.href,'https://x.com/PepeTest'); assert.equal(state.tg.href,'https://t.me/PepeTest'); await state.button.handler(); assert.equal(state.getCopied(),ca);
 state=run({contractAddress:'0x123',xUrl:'https://x.com.evil.example/fake',telegramUrl:'javascript:alert(1)'});
 assert.equal(state.button.disabled,true); assert.equal(state.x.attrs['aria-disabled'],'true'); assert.equal(state.tg.attrs['aria-disabled'],'true');
 console.log('PASS: empty values, valid addresses and links, copy, and invalid inputs');
})().catch(e=>{console.error(e);process.exit(1)});
