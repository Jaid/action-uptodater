/*!
*** action-uptodater 2.5.0
*** Copyright © 2022, Jaid <jaid.jsx@gmail.com> (https://github.com/Jaid)
*** @license MIT
*** See https://github.com/Jaid/action-node-boilerplate
!*/
export const id=789;export const ids=[789];export const modules={4757:(s,e,t)=>{t.d(e,{a:()=>l});var i=t(8245),n=t(3079),a=t(8632),r=t(3885);const l=class{testers=[];id=null;title=null;passedTests=0;failedTests=0;consoleIcon=a.a.pass;pkg=null;incrementPassedTests(){this.passedTests++}incrementFailedTests(){this.consoleIcon=a.a.fail,this.failedTests++}getTitle(){return(0,r.a)(this.title)?this.title:this.id}isRelevantToRepo(){return!0}hasTesters(){return(0,r.a)(this.testers)}hasDependency(s,e){const t=e?n(e):["dependencies","devDependencies","optionalDependencies","peerDependencies","bundleDependencies","bundledDependencies"];if((0,r.b)(this.pkg))return!1;for(const e of t){var i;if(null!==(i=this.pkg[e])&&void 0!==i&&i[s])return!0}return!1}hasProductionDependency(s){return this.hasDependency(s,"dependencies")}hasDevelopmentDependency(s){return this.hasDependency(s,"devDependencies")}async fileExists(s){return await i.pathExists(s)}addTester(s){s.rule=this,this.testers.push(s)}}},8345:(s,e,t)=>{t.d(e,{a:()=>c});var i=t(6486),n=t(5089),a=t(4592),r=t(8632),l=t(3885);const c=class{title="Tester";passed=!1;rule=null;consoleIcon=r.a.fail;fixes=[];appliedFixes=[];logMessages=[];async test(){return!0}setTitle(s){this.ansiTitle=s,this.title=(0,n.a)(s)}setFunction(s){this.test=s}hasFix(){return(0,l.a)(this.fixes)}log(s){this.logMessages.push(s)}async run(s){const e=await this.test(s);if(!0!==e){if(this.log((0,i.isString)(e)?e:"Failed"),s.shouldFix&&((0,i.isFunction)(this.collectFixes)&&this.collectFixes(),(0,l.a)(this.fixes))){for(const s of this.fixes)await s.apply(),this.appliedFixes.push(s);const e=await this.test(s);if(!0===e)return this.log("Fixed successfully"),this.consoleIcon=r.a.fix,this.rule.incrementPassedTests(),!0;this.consoleIcon=r.a.fixFailed,this.log("Tried to apply a fix, but the test still failed on second run"),(0,i.isString)(e)&&this.log(e)}return this.rule.incrementFailedTests(),!1}return this.passed=!0,this.consoleIcon=r.a.pass,this.rule.incrementPassedTests(),this.log("Passed! <3"),!0}addFix(s,e){const t=new a.a(s,e);t.tester=this,this.fixes.push(t)}}},8632:(s,e,t)=>{t.d(e,{a:()=>a});var i=t(5264),n=t(9486);const a={pass:n.a.green(i.a.tick),fail:n.a.red(i.a.cross),fix:"🔧",fixFailed:"💣"}},4789:(s,e,t)=>{t.r(e),t.d(e,{default:()=>r});var i=t(4757),n=t(6380),a=t(4763);const r=new class extends i.a{title="Depends on webpack-config-jaid";async isRelevantToRepo(){return this.hasDependency("webpack-config-jaid")}init(){this.addTester(new n.a("webpack.config.js")),this.addTester(new a.a("prepareActionJest","npm run build:prod"))}}},6380:(s,e,t)=>{t.d(e,{a:()=>l});var i=t(9411),n=t(8245),a=t(9486),r=t(8345);const l=class extends r.a{file=null;constructor(s){super(),this.file=i.resolve(s),this.shortFile=s,this.setTitle(`${a.a.yellow(this.shortFile)} should exist and have content`)}async test(){if(!await n.pathExists(this.file))return`${this.shortFile} does not exist`;return!!(await n.stat(this.file)).size||`${this.shortFile} does exist, but is empty`}}},4763:(s,e,t)=>{t.d(e,{a:()=>o});var i=t(3169),n=t(6486),a=t(9486),r=t(3885),l=t(1680),c=t(8345);const o=class extends c.a{scriptName=null;expectedValue=null;pkg=null;constructor(s,e){super(),this.scriptName=s,this.expectedValue=e,this.setTitle(`${a.a.yellow(`package.json[${s}]`)} should be ${a.a.blue(i.stringify(e))}`)}async test(){if(this.pkg=await(0,l.a)(),null===this.pkg)return"package.json does not exist";if((0,r.b)(this.pkg))return"package.json has no content";if((0,r.b)(this.pkg.scripts))return"package.json[scripts] has no content";const s=this.pkg.scripts[this.scriptName];if(void 0===s)return`package.json[scripts] has no key ${this.scriptName}`;return!!(0,n.isEqual)(this.expectedValue,s)||`Actual value of pkg[scripts][${this.scriptName}] is ${i.stringify(s)}`}collectFixes(){if(null!==this.pkg){const s=JSON.parse(JSON.stringify(this.pkg));s.scripts||(s.scripts={}),s.scripts[this.scriptName]=this.expectedValue,this.addFix("package.json",JSON.stringify(s,null,2))}}}}};
//# sourceMappingURL=789.js.map