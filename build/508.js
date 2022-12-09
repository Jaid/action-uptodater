/*!
*** action-uptodater 2.5.1
*** Copyright © 2022, Jaid <jaid.jsx@gmail.com> (https://github.com/Jaid)
*** @license MIT
*** See https://github.com/Jaid/action-node-boilerplate
!*/
export const id=508;export const ids=[508];export const modules={4757:(s,e,t)=>{t.d(e,{a:()=>o});var i=t(8245),n=t(3079),a=t(8632),l=t(3885);const o=class{testers=[];id=null;title=null;passedTests=0;failedTests=0;consoleIcon=a.a.pass;pkg=null;incrementPassedTests(){this.passedTests++}incrementFailedTests(){this.consoleIcon=a.a.fail,this.failedTests++}getTitle(){return(0,l.a)(this.title)?this.title:this.id}isRelevantToRepo(){return!0}hasTesters(){return(0,l.a)(this.testers)}hasDependency(s,e){const t=e?n(e):["dependencies","devDependencies","optionalDependencies","peerDependencies","bundleDependencies","bundledDependencies"];if((0,l.b)(this.pkg))return!1;for(const e of t){var i;if(null!==(i=this.pkg[e])&&void 0!==i&&i[s])return!0}return!1}hasProductionDependency(s){return this.hasDependency(s,"dependencies")}hasDevelopmentDependency(s){return this.hasDependency(s,"devDependencies")}async fileExists(s){return await i.pathExists(s)}addTester(s){s.rule=this,this.testers.push(s)}}},8345:(s,e,t)=>{t.d(e,{a:()=>r});var i=t(6486),n=t(5089),a=t(4592),l=t(8632),o=t(3885);const r=class{title="Tester";passed=!1;rule=null;consoleIcon=l.a.fail;fixes=[];appliedFixes=[];logMessages=[];async test(){return!0}setTitle(s){this.ansiTitle=s,this.title=(0,n.a)(s)}setFunction(s){this.test=s}hasFix(){return(0,o.a)(this.fixes)}log(s){this.logMessages.push(s)}async run(s){const e=await this.test(s);if(!0!==e){if(this.log((0,i.isString)(e)?e:"Failed"),s.shouldFix&&((0,i.isFunction)(this.collectFixes)&&this.collectFixes(),(0,o.a)(this.fixes))){for(const s of this.fixes)await s.apply(),this.appliedFixes.push(s);const e=await this.test(s);if(!0===e)return this.log("Fixed successfully"),this.consoleIcon=l.a.fix,this.rule.incrementPassedTests(),!0;this.consoleIcon=l.a.fixFailed,this.log("Tried to apply a fix, but the test still failed on second run"),(0,i.isString)(e)&&this.log(e)}return this.rule.incrementFailedTests(),!1}return this.passed=!0,this.consoleIcon=l.a.pass,this.rule.incrementPassedTests(),this.log("Passed! <3"),!0}addFix(s,e){const t=new a.a(s,e);t.tester=this,this.fixes.push(t)}}},8632:(s,e,t)=>{t.d(e,{a:()=>a});var i=t(5264),n=t(9486);const a={pass:n.a.green(i.a.tick),fail:n.a.red(i.a.cross),fix:"🔧",fixFailed:"💣"}},5508:(s,e,t)=>{t.r(e),t.d(e,{default:()=>o});var i=t(4757),n=t(416),a=t(2080),l=t(4868);const o=new class extends i.a{title="Node";init(){this.addTester(new l.a("author","Jaid <jaid.jsx@gmail.com> (https://github.com/Jaid)")),this.addTester(new a.a("index.js")),this.addTester(new n.a("tsconfig.json")),this.addTester(new a.a("jsconfig.json")),this.addTester(new a.a("tsconfigBase.json"))}}},416:(s,e,t)=>{t.d(e,{a:()=>o});var i=t(9411),n=t(8245),a=t(9486),l=t(8345);const o=class extends l.a{file=null;constructor(s){super(),this.file=i.resolve(s),this.shortFile=s,this.setTitle(`${a.a.yellow(this.shortFile)} should exist`)}async test(){return!!await n.pathExists(this.file)||`${this.shortFile} does not exist`}}},2080:(s,e,t)=>{t.d(e,{a:()=>o});var i=t(9411),n=t(8245),a=t(9486),l=t(8345);const o=class extends l.a{file=null;constructor(s){super(),this.file=i.resolve(s),this.shortFile=s,this.setTitle(`${a.a.yellow(this.shortFile)} should not exist`)}async test(){return!await n.pathExists(this.file)||`${this.shortFile} does exist`}collectFixes(){this.addFix(this.shortFile,!1)}}},4868:(s,e,t)=>{t.d(e,{a:()=>d});var i=t(3169),n=t(6486),a=t(9486);const l=t(9426).default;var o=t(3885),r=t(1680),h=t(8345);const d=class extends h.a{field=null;expectedValue=null;pkg=null;constructor(s,e){super(),this.field=s,this.expectedValue=e,this.setTitle(`${a.a.yellow(`package.json[${s}]`)} should be ${a.a.blue(l(i.stringify(e),50))}`)}async test(){if(this.pkg=await(0,r.a)(),null===this.pkg)return"package.json does not exist";if((0,o.b)(this.pkg))return"package.json has no content";const s=this.pkg[this.field];if(void 0===s)return`package.json has no key ${this.field}`;return!!(0,n.isEqual)(this.expectedValue,s)||`Actual value of pkg[${this.field}] is ${i.stringify(s)}`}collectFixes(){if(null!==this.pkg){const s=JSON.parse(JSON.stringify(this.pkg));s[this.field]=this.expectedValue,this.addFix("package.json",JSON.stringify(s,null,2))}}}}};
//# sourceMappingURL=508.js.map