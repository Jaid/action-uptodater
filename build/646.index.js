/*!
*** action-uptodater 2.5.0
*** Copyright © 2022, Jaid <jaid.jsx@gmail.com> (https://github.com/Jaid)
*** @license MIT
*** See https://github.com/Jaid/action-node-boilerplate
!*/
export const id=646;export const ids=[646];export const modules={9426:e=>{var i;i=function(){return function(e){var i={};function t(l){if(i[l])return i[l].exports;var n=i[l]={i:l,l:!1,exports:{}};return e[l].call(n.exports,n,n.exports,t),n.l=!0,n.exports}return t.m=e,t.c=i,t.d=function(e,i,l){t.o(e,i)||Object.defineProperty(e,i,{enumerable:!0,get:l})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,i){if(1&i&&(e=t(e)),8&i)return e;if(4&i&&"object"==typeof e&&e&&e.__esModule)return e;var l=Object.create(null);if(t.r(l),Object.defineProperty(l,"default",{enumerable:!0,value:e}),2&i&&"string"!=typeof e)for(var n in e)t.d(l,n,function(i){return e[i]}.bind(null,n));return l},t.n=function(e){var i=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(i,"a",i),i},t.o=function(e,i){return Object.prototype.hasOwnProperty.call(e,i)},t.p="",t(t.s=0)}([function(e,i,t){t.r(i),i.default=(e,i=16,t="…")=>{const l=e+"";return l.length<i?l:l.slice(0,i-t.length)+t}}])},e.exports=i()},3079:e=>{e.exports=function(e,i,t){if(0===arguments.length)return[];if(1===arguments.length){if(null==e)return[];if(Array.isArray(e))return e}return Array.prototype.slice.call(arguments)}},4757:(e,i,t)=>{t.d(i,{Z:()=>r});var l=t(8245),n=t(3079),o=t(8632),s=t(3885);const r=class{testers=[];id=null;title=null;passedTests=0;failedTests=0;consoleIcon=o.Z.pass;pkg=null;incrementPassedTests(){this.passedTests++}incrementFailedTests(){this.consoleIcon=o.Z.fail,this.failedTests++}getTitle(){return(0,s.Z)(this.title)?this.title:this.id}isRelevantToRepo(){return!0}hasTesters(){return(0,s.Z)(this.testers)}hasDependency(e,i){const t=i?n(i):["dependencies","devDependencies","optionalDependencies","peerDependencies","bundleDependencies","bundledDependencies"];if((0,s.x)(this.pkg))return!1;for(const i of t){var l;if(null!==(l=this.pkg[i])&&void 0!==l&&l[e])return!0}return!1}hasProductionDependency(e){return this.hasDependency(e,"dependencies")}hasDevelopmentDependency(e){return this.hasDependency(e,"devDependencies")}async fileExists(e){return await l.pathExists(e)}addTester(e){e.rule=this,this.testers.push(e)}}},8345:(e,i,t)=>{t.d(i,{Z:()=>a});var l=t(6486),n=t(5089),o=t(4592),s=t(8632),r=t(3885);const a=class{title="Tester";passed=!1;rule=null;consoleIcon=s.Z.fail;fixes=[];appliedFixes=[];logMessages=[];async test(){return!0}setTitle(e){this.ansiTitle=e,this.title=(0,n.Z)(e)}setFunction(e){this.test=e}hasFix(){return(0,r.Z)(this.fixes)}log(e){this.logMessages.push(e)}async run(e){const i=await this.test(e);if(!0!==i){if(this.log((0,l.isString)(i)?i:"Failed"),e.shouldFix&&((0,l.isFunction)(this.collectFixes)&&this.collectFixes(),(0,r.Z)(this.fixes))){for(const e of this.fixes)await e.apply(),this.appliedFixes.push(e);const i=await this.test(e);if(!0===i)return this.log("Fixed successfully"),this.consoleIcon=s.Z.fix,this.rule.incrementPassedTests(),!0;this.consoleIcon=s.Z.fixFailed,this.log("Tried to apply a fix, but the test still failed on second run"),(0,l.isString)(i)&&this.log(i)}return this.rule.incrementFailedTests(),!1}return this.passed=!0,this.consoleIcon=s.Z.pass,this.rule.incrementPassedTests(),this.log("Passed! <3"),!0}addFix(e,i){const t=new o.Z(e,i);t.tester=this,this.fixes.push(t)}}},8632:(e,i,t)=>{t.d(i,{Z:()=>o});var l=t(5264),n=t(4723);const o={pass:n.Z.green(l.ZP.tick),fail:n.Z.red(l.ZP.cross),fix:"🔧",fixFailed:"💣"}},1646:(e,i,t)=>{t.r(i),t.d(i,{default:()=>r});var l=t(8142),n=t(1680),o=t(4757),s=t(4868);const r=new class extends o.Z{title="Node package that gets published publicly";async isRelevantToRepo(){const e=await(0,n.Z)();return!!e&&!e.private&&!!e.name}init(){this.addTester(new s.Z("name",l.context.repo.repo))}}},4868:(e,i,t)=>{t.d(i,{Z:()=>h});var l=t(3169),n=t(6486),o=t(4723);const s=t(9426).default;var r=t(3885),a=t(1680),d=t(8345);const h=class extends d.Z{field=null;expectedValue=null;pkg=null;constructor(e,i){super(),this.field=e,this.expectedValue=i,this.setTitle(`${o.Z.yellow(`package.json[${e}]`)} should be ${o.Z.blue(s(l.stringify(i),50))}`)}async test(){if(this.pkg=await(0,a.Z)(),null===this.pkg)return"package.json does not exist";if((0,r.x)(this.pkg))return"package.json has no content";const e=this.pkg[this.field];if(void 0===e)return`package.json has no key ${this.field}`;return!!(0,n.isEqual)(this.expectedValue,e)||`Actual value of pkg[${this.field}] is ${l.stringify(e)}`}collectFixes(){if(null!==this.pkg){const e=JSON.parse(JSON.stringify(this.pkg));e[this.field]=this.expectedValue,this.addFix("package.json",JSON.stringify(e,null,2))}}}},5264:(e,i,t)=>{t.d(i,{ZP:()=>d});var l=t(7742);const{platform:n}=l,o={square:"█",squareDarkShade:"▓",squareMediumShade:"▒",squareLightShade:"░",squareTop:"▀",squareBottom:"▄",squareLeft:"▌",squareRight:"▐",squareCenter:"■",bullet:"●",dot:"․",ellipsis:"…",pointerSmall:"›",triangleUp:"▲",triangleUpSmall:"▴",triangleDown:"▼",triangleDownSmall:"▾",triangleLeftSmall:"◂",triangleRightSmall:"▸",home:"⌂",heart:"♥",musicNote:"♪",musicNoteBeamed:"♫",arrowUp:"↑",arrowDown:"↓",arrowLeft:"←",arrowRight:"→",arrowLeftRight:"↔",arrowUpDown:"↕",almostEqual:"≈",notEqual:"≠",lessOrEqual:"≤",greaterOrEqual:"≥",identical:"≡",infinity:"∞",subscriptZero:"₀",subscriptOne:"₁",subscriptTwo:"₂",subscriptThree:"₃",subscriptFour:"₄",subscriptFive:"₅",subscriptSix:"₆",subscriptSeven:"₇",subscriptEight:"₈",subscriptNine:"₉",oneHalf:"½",oneThird:"⅓",oneQuarter:"¼",oneFifth:"⅕",oneSixth:"⅙",oneEighth:"⅛",twoThirds:"⅔",twoFifths:"⅖",threeQuarters:"¾",threeFifths:"⅗",threeEighths:"⅜",fourFifths:"⅘",fiveSixths:"⅚",fiveEighths:"⅝",sevenEighths:"⅞",line:"─",lineBold:"━",lineDouble:"═",lineDashed0:"┄",lineDashed1:"┅",lineDashed2:"┈",lineDashed3:"┉",lineDashed4:"╌",lineDashed5:"╍",lineDashed6:"╴",lineDashed7:"╶",lineDashed8:"╸",lineDashed9:"╺",lineDashed10:"╼",lineDashed11:"╾",lineDashed12:"−",lineDashed13:"–",lineDashed14:"‐",lineDashed15:"⁃",lineVertical:"│",lineVerticalBold:"┃",lineVerticalDouble:"║",lineVerticalDashed0:"┆",lineVerticalDashed1:"┇",lineVerticalDashed2:"┊",lineVerticalDashed3:"┋",lineVerticalDashed4:"╎",lineVerticalDashed5:"╏",lineVerticalDashed6:"╵",lineVerticalDashed7:"╷",lineVerticalDashed8:"╹",lineVerticalDashed9:"╻",lineVerticalDashed10:"╽",lineVerticalDashed11:"╿",lineDownLeft:"┐",lineDownLeftArc:"╮",lineDownBoldLeftBold:"┓",lineDownBoldLeft:"┒",lineDownLeftBold:"┑",lineDownDoubleLeftDouble:"╗",lineDownDoubleLeft:"╖",lineDownLeftDouble:"╕",lineDownRight:"┌",lineDownRightArc:"╭",lineDownBoldRightBold:"┏",lineDownBoldRight:"┎",lineDownRightBold:"┍",lineDownDoubleRightDouble:"╔",lineDownDoubleRight:"╓",lineDownRightDouble:"╒",lineUpLeft:"┘",lineUpLeftArc:"╯",lineUpBoldLeftBold:"┛",lineUpBoldLeft:"┚",lineUpLeftBold:"┙",lineUpDoubleLeftDouble:"╝",lineUpDoubleLeft:"╜",lineUpLeftDouble:"╛",lineUpRight:"└",lineUpRightArc:"╰",lineUpBoldRightBold:"┗",lineUpBoldRight:"┖",lineUpRightBold:"┕",lineUpDoubleRightDouble:"╚",lineUpDoubleRight:"╙",lineUpRightDouble:"╘",lineUpDownLeft:"┤",lineUpBoldDownBoldLeftBold:"┫",lineUpBoldDownBoldLeft:"┨",lineUpDownLeftBold:"┥",lineUpBoldDownLeftBold:"┩",lineUpDownBoldLeftBold:"┪",lineUpDownBoldLeft:"┧",lineUpBoldDownLeft:"┦",lineUpDoubleDownDoubleLeftDouble:"╣",lineUpDoubleDownDoubleLeft:"╢",lineUpDownLeftDouble:"╡",lineUpDownRight:"├",lineUpBoldDownBoldRightBold:"┣",lineUpBoldDownBoldRight:"┠",lineUpDownRightBold:"┝",lineUpBoldDownRightBold:"┡",lineUpDownBoldRightBold:"┢",lineUpDownBoldRight:"┟",lineUpBoldDownRight:"┞",lineUpDoubleDownDoubleRightDouble:"╠",lineUpDoubleDownDoubleRight:"╟",lineUpDownRightDouble:"╞",lineDownLeftRight:"┬",lineDownBoldLeftBoldRightBold:"┳",lineDownLeftBoldRightBold:"┯",lineDownBoldLeftRight:"┰",lineDownBoldLeftBoldRight:"┱",lineDownBoldLeftRightBold:"┲",lineDownLeftRightBold:"┮",lineDownLeftBoldRight:"┭",lineDownDoubleLeftDoubleRightDouble:"╦",lineDownDoubleLeftRight:"╥",lineDownLeftDoubleRightDouble:"╤",lineUpLeftRight:"┴",lineUpBoldLeftBoldRightBold:"┻",lineUpLeftBoldRightBold:"┷",lineUpBoldLeftRight:"┸",lineUpBoldLeftBoldRight:"┹",lineUpBoldLeftRightBold:"┺",lineUpLeftRightBold:"┶",lineUpLeftBoldRight:"┵",lineUpDoubleLeftDoubleRightDouble:"╩",lineUpDoubleLeftRight:"╨",lineUpLeftDoubleRightDouble:"╧",lineUpDownLeftRight:"┼",lineUpBoldDownBoldLeftBoldRightBold:"╋",lineUpDownBoldLeftBoldRightBold:"╈",lineUpBoldDownLeftBoldRightBold:"╇",lineUpBoldDownBoldLeftRightBold:"╊",lineUpBoldDownBoldLeftBoldRight:"╉",lineUpBoldDownLeftRight:"╀",lineUpDownBoldLeftRight:"╁",lineUpDownLeftBoldRight:"┽",lineUpDownLeftRightBold:"┾",lineUpBoldDownBoldLeftRight:"╂",lineUpDownLeftBoldRightBold:"┿",lineUpBoldDownLeftBoldRight:"╃",lineUpBoldDownLeftRightBold:"╄",lineUpDownBoldLeftBoldRight:"╅",lineUpDownBoldLeftRightBold:"╆",lineUpDoubleDownDoubleLeftDoubleRightDouble:"╬",lineUpDoubleDownDoubleLeftRight:"╫",lineUpDownLeftDoubleRightDouble:"╪",lineCross:"╳",lineBackslash:"╲",lineSlash:"╱"},s={...o,..."linux"===n?{circleQuestionMark:"?⃝",questionMarkPrefix:"?⃝"}:{circleQuestionMark:"?",questionMarkPrefix:"?"},tick:"✔",info:"ℹ",warning:"⚠",cross:"✖",squareSmall:"◻",squareSmallFilled:"◼",circle:"◯",circleFilled:"◉",circleDotted:"◌",circleDouble:"◎",circleCircle:"ⓞ",circleCross:"ⓧ",circlePipe:"Ⓘ",radioOn:"◉",radioOff:"◯",checkboxOn:"☒",checkboxOff:"☐",checkboxCircleOn:"ⓧ",checkboxCircleOff:"Ⓘ",pointer:"❯",triangleUpOutline:"△",triangleLeft:"◀",triangleRight:"▶",lozenge:"◆",lozengeOutline:"◇",hamburger:"☰",smiley:"㋡",mustache:"෴",star:"★",play:"▶",nodejs:"⬢",oneSeventh:"⅐",oneNinth:"⅑",oneTenth:"⅒"},r={...o,tick:"√",info:"i",warning:"‼",cross:"×",squareSmall:"□",squareSmallFilled:"■",circle:"( )",circleFilled:"(*)",circleDotted:"( )",circleDouble:"( )",circleCircle:"(○)",circleCross:"(×)",circlePipe:"(│)",circleQuestionMark:"(?)",radioOn:"(*)",radioOff:"( )",checkboxOn:"[×]",checkboxOff:"[ ]",checkboxCircleOn:"(×)",checkboxCircleOff:"( )",questionMarkPrefix:"？",pointer:">",triangleUpOutline:"∆",triangleLeft:"◄",triangleRight:"►",lozenge:"♦",lozengeOutline:"◊",hamburger:"≡",smiley:"☺",mustache:"┌─┐",star:"✶",play:"►",nodejs:"♦",oneSeventh:"1/7",oneNinth:"1/9",oneTenth:"1/10"},a="win32"!==l.platform?"linux"!==l.env.TERM:Boolean(l.env.CI)||Boolean(l.env.WT_SESSION)||"{cmd::Cmder}"===l.env.ConEmuTask||"vscode"===l.env.TERM_PROGRAM||"xterm-256color"===l.env.TERM||"alacritty"===l.env.TERM||"JetBrains-JediTerm"===l.env.TERMINAL_EMULATOR,d=a?s:r},5089:(e,i,t)=>{function l(e){if("string"!=typeof e)throw new TypeError(`Expected a \`string\`, got \`${typeof e}\``);return e.replace(function({onlyFirst:e=!1}={}){const i=["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)","(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"].join("|");return new RegExp(i,e?void 0:"g")}(),"")}t.d(i,{Z:()=>l})}};
//# sourceMappingURL=646.index.js.map