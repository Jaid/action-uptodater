/*!
*** action-uptodater 2.5.0
*** Copyright © 2022, Jaid <jaid.jsx@gmail.com> (https://github.com/Jaid)
*** @license MIT
*** See https://github.com/Jaid/action-node-boilerplate
!*/
export const id=627;export const ids=[627];export const modules={4757:(e,s,t)=>{t.d(s,{Z:()=>a});var i=t(8245),n=t(3079),l=t(8632),o=t(3885);const a=class{testers=[];id=null;title=null;passedTests=0;failedTests=0;consoleIcon=l.Z.pass;pkg=null;incrementPassedTests(){this.passedTests++}incrementFailedTests(){this.consoleIcon=l.Z.fail,this.failedTests++}getTitle(){return(0,o.Z)(this.title)?this.title:this.id}isRelevantToRepo(){return!0}hasTesters(){return(0,o.Z)(this.testers)}hasDependency(e,s){const t=s?n(s):["dependencies","devDependencies","optionalDependencies","peerDependencies","bundleDependencies","bundledDependencies"];if((0,o.x)(this.pkg))return!1;for(const s of t){var i;if(null!==(i=this.pkg[s])&&void 0!==i&&i[e])return!0}return!1}hasProductionDependency(e){return this.hasDependency(e,"dependencies")}hasDevelopmentDependency(e){return this.hasDependency(e,"devDependencies")}async fileExists(e){return await i.pathExists(e)}addTester(e){e.rule=this,this.testers.push(e)}}},8345:(e,s,t)=>{t.d(s,{Z:()=>r});var i=t(6486),n=t(5089),l=t(4592),o=t(8632),a=t(3885);const r=class{title="Tester";passed=!1;rule=null;consoleIcon=o.Z.fail;fixes=[];appliedFixes=[];logMessages=[];async test(){return!0}setTitle(e){this.ansiTitle=e,this.title=(0,n.Z)(e)}setFunction(e){this.test=e}hasFix(){return(0,a.Z)(this.fixes)}log(e){this.logMessages.push(e)}async run(e){const s=await this.test(e);if(!0!==s){if(this.log((0,i.isString)(s)?s:"Failed"),e.shouldFix&&((0,i.isFunction)(this.collectFixes)&&this.collectFixes(),(0,a.Z)(this.fixes))){for(const e of this.fixes)await e.apply(),this.appliedFixes.push(e);const s=await this.test(e);if(!0===s)return this.log("Fixed successfully"),this.consoleIcon=o.Z.fix,this.rule.incrementPassedTests(),!0;this.consoleIcon=o.Z.fixFailed,this.log("Tried to apply a fix, but the test still failed on second run"),(0,i.isString)(s)&&this.log(s)}return this.rule.incrementFailedTests(),!1}return this.passed=!0,this.consoleIcon=o.Z.pass,this.rule.incrementPassedTests(),this.log("Passed! <3"),!0}addFix(e,s){const t=new l.Z(e,s);t.tester=this,this.fixes.push(t)}}},8632:(e,s,t)=>{t.d(s,{Z:()=>l});var i=t(5264),n=t(4723);const l={pass:n.Z.green(i.ZP.tick),fail:n.Z.red(i.ZP.cross),fix:"🔧",fixFailed:"💣"}},2627:(e,s,t)=>{t.r(s),t.d(s,{default:()=>l});var i=t(4757),n=t(8410);const l=new class extends i.Z{title="Depends on eslint-config-jaid-react";async isRelevantToRepo(){return this.hasDevelopmentDependency("eslint-config-jaid-react")}init(){this.addTester(new n.Z(".eslintrc.json",'{\n  "extends": "jaid-react"\n}'))}}},8410:(e,s,t)=>{t.d(s,{Z:()=>c});var i=t(6005),n=t(9411),l=(t(8245),t(4723));const o=t(7088).default,a=e=>i.createHash("md5").update(e).digest("hex");var r=t(8345);const c=class extends r.Z{expectedHash=null;file=null;constructor(e,s){super(),this.expectedContent=s,this.expectedHash=a(s),this.file=n.resolve(e),this.shortFile=e,this.setTitle(`${l.Z.yellow(this.shortFile)} should have md5 ${l.Z.blue(this.expectedHash)}`)}async test(){const e=await o(this.file);if(!e)return`${this.shortFile} does not exist`;const s=a(e);return!(s!==this.expectedHash)||`They are not equal, got hash ${s} from file`}collectFixes(){this.addFix(this.shortFile,this.expectedContent)}}}};
//# sourceMappingURL=627.index.js.map