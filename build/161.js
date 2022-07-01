/*!
*** action-uptodater 2.5.1
*** Copyright © 2022, Jaid <jaid.jsx@gmail.com> (https://github.com/Jaid)
*** @license MIT
*** See https://github.com/Jaid/action-node-boilerplate
!*/
export const id=161;export const ids=[161];export const modules={4757:(e,s,t)=>{t.d(s,{a:()=>o});var i=t(8245),n=t(3079),a=t(8632),l=t(3885);const o=class{testers=[];id=null;title=null;passedTests=0;failedTests=0;consoleIcon=a.a.pass;pkg=null;incrementPassedTests(){this.passedTests++}incrementFailedTests(){this.consoleIcon=a.a.fail,this.failedTests++}getTitle(){return(0,l.a)(this.title)?this.title:this.id}isRelevantToRepo(){return!0}hasTesters(){return(0,l.a)(this.testers)}hasDependency(e,s){const t=s?n(s):["dependencies","devDependencies","optionalDependencies","peerDependencies","bundleDependencies","bundledDependencies"];if((0,l.b)(this.pkg))return!1;for(const s of t){var i;if(null!==(i=this.pkg[s])&&void 0!==i&&i[e])return!0}return!1}hasProductionDependency(e){return this.hasDependency(e,"dependencies")}hasDevelopmentDependency(e){return this.hasDependency(e,"devDependencies")}async fileExists(e){return await i.pathExists(e)}addTester(e){e.rule=this,this.testers.push(e)}}},8345:(e,s,t)=>{t.d(s,{a:()=>r});var i=t(6486),n=t(5089),a=t(4592),l=t(8632),o=t(3885);const r=class{title="Tester";passed=!1;rule=null;consoleIcon=l.a.fail;fixes=[];appliedFixes=[];logMessages=[];async test(){return!0}setTitle(e){this.ansiTitle=e,this.title=(0,n.a)(e)}setFunction(e){this.test=e}hasFix(){return(0,o.a)(this.fixes)}log(e){this.logMessages.push(e)}async run(e){const s=await this.test(e);if(!0!==s){if(this.log((0,i.isString)(s)?s:"Failed"),e.shouldFix&&((0,i.isFunction)(this.collectFixes)&&this.collectFixes(),(0,o.a)(this.fixes))){for(const e of this.fixes)await e.apply(),this.appliedFixes.push(e);const s=await this.test(e);if(!0===s)return this.log("Fixed successfully"),this.consoleIcon=l.a.fix,this.rule.incrementPassedTests(),!0;this.consoleIcon=l.a.fixFailed,this.log("Tried to apply a fix, but the test still failed on second run"),(0,i.isString)(s)&&this.log(s)}return this.rule.incrementFailedTests(),!1}return this.passed=!0,this.consoleIcon=l.a.pass,this.rule.incrementPassedTests(),this.log("Passed! <3"),!0}addFix(e,s){const t=new a.a(e,s);t.tester=this,this.fixes.push(t)}}},8632:(e,s,t)=>{t.d(s,{a:()=>a});var i=t(5264),n=t(9486);const a={pass:n.a.green(i.a.tick),fail:n.a.red(i.a.cross),fix:"🔧",fixFailed:"💣"}},8161:(e,s,t)=>{t.r(s),t.d(s,{default:()=>a});var i=t(4757),n=t(8410);const a=new class extends i.a{title="Depends on eslint-config-jaid-react";async isRelevantToRepo(){return this.hasDevelopmentDependency("eslint-config-jaid-react")}init(){this.addTester(new n.a(".eslintrc.json",'{\n  "extends": "jaid-react"\n}'))}}},8410:(e,s,t)=>{t.d(s,{a:()=>c});var i=t(6005),n=t(9411),a=(t(8245),t(9486));const l=t(7088).default,o=e=>i.createHash("md5").update(e).digest("hex");var r=t(8345);const c=class extends r.a{expectedHash=null;file=null;constructor(e,s){super(),this.expectedContent=s,this.expectedHash=o(s),this.file=n.resolve(e),this.shortFile=e,this.setTitle(`${a.a.yellow(this.shortFile)} should have md5 ${a.a.blue(this.expectedHash)}`)}async test(){const e=await l(this.file);if(!e)return`${this.shortFile} does not exist`;const s=o(e);return!(s!==this.expectedHash)||`They are not equal, got hash ${s} from file`}collectFixes(){this.addFix(this.shortFile,this.expectedContent)}}}};
//# sourceMappingURL=161.js.map