/*!
*** action-uptodater 2.5.0
*** Copyright © 2022, Jaid <jaid.jsx@gmail.com> (https://github.com/Jaid)
*** @license MIT
*** See https://github.com/Jaid/action-node-boilerplate
!*/
export const id=990;export const ids=[990];export const modules={3079:e=>{e.exports=function(e,i,l){if(0===arguments.length)return[];if(1===arguments.length){if(null==e)return[];if(Array.isArray(e))return e}return Array.prototype.slice.call(arguments)}},4757:(e,i,l)=>{l.d(i,{Z:()=>r});var t=l(8245),n=l(3079),o=l(8632),s=l(3885);const r=class{testers=[];id=null;title=null;passedTests=0;failedTests=0;consoleIcon=o.Z.pass;pkg=null;incrementPassedTests(){this.passedTests++}incrementFailedTests(){this.consoleIcon=o.Z.fail,this.failedTests++}getTitle(){return(0,s.Z)(this.title)?this.title:this.id}isRelevantToRepo(){return!0}hasTesters(){return(0,s.Z)(this.testers)}hasDependency(e,i){const l=i?n(i):["dependencies","devDependencies","optionalDependencies","peerDependencies","bundleDependencies","bundledDependencies"];if((0,s.x)(this.pkg))return!1;for(const i of l){var t;if(null!==(t=this.pkg[i])&&void 0!==t&&t[e])return!0}return!1}hasProductionDependency(e){return this.hasDependency(e,"dependencies")}hasDevelopmentDependency(e){return this.hasDependency(e,"devDependencies")}async fileExists(e){return await t.pathExists(e)}addTester(e){e.rule=this,this.testers.push(e)}}},8345:(e,i,l)=>{l.d(i,{Z:()=>d});var t=l(6486),n=l(5089),o=l(4592),s=l(8632),r=l(3885);const d=class{title="Tester";passed=!1;rule=null;consoleIcon=s.Z.fail;fixes=[];appliedFixes=[];logMessages=[];async test(){return!0}setTitle(e){this.ansiTitle=e,this.title=(0,n.Z)(e)}setFunction(e){this.test=e}hasFix(){return(0,r.Z)(this.fixes)}log(e){this.logMessages.push(e)}async run(e){const i=await this.test(e);if(!0!==i){if(this.log((0,t.isString)(i)?i:"Failed"),e.shouldFix&&((0,t.isFunction)(this.collectFixes)&&this.collectFixes(),(0,r.Z)(this.fixes))){for(const e of this.fixes)await e.apply(),this.appliedFixes.push(e);const i=await this.test(e);if(!0===i)return this.log("Fixed successfully"),this.consoleIcon=s.Z.fix,this.rule.incrementPassedTests(),!0;this.consoleIcon=s.Z.fixFailed,this.log("Tried to apply a fix, but the test still failed on second run"),(0,t.isString)(i)&&this.log(i)}return this.rule.incrementFailedTests(),!1}return this.passed=!0,this.consoleIcon=s.Z.pass,this.rule.incrementPassedTests(),this.log("Passed! <3"),!0}addFix(e,i){const l=new o.Z(e,i);l.tester=this,this.fixes.push(l)}}},8632:(e,i,l)=>{l.d(i,{Z:()=>o});var t=l(5264),n=l(4723);const o={pass:n.Z.green(t.ZP.tick),fail:n.Z.red(t.ZP.cross),fix:"🔧",fixFailed:"💣"}},3990:(e,i,l)=>{l.r(i),l.d(i,{default:()=>o});var t=l(4757),n=l(6380);const o=new class extends t.Z{title="Depends on babel-preset-jaid";async isRelevantToRepo(){return this.hasDevelopmentDependency("babel-preset-jaid")}init(){this.addTester(new n.Z("jest.config.json"))}}},6380:(e,i,l)=>{l.d(i,{Z:()=>r});var t=l(9411),n=l(8245),o=l(4723),s=l(8345);const r=class extends s.Z{file=null;constructor(e){super(),this.file=t.resolve(e),this.shortFile=e,this.setTitle(`${o.Z.yellow(this.shortFile)} should exist and have content`)}async test(){if(!await n.pathExists(this.file))return`${this.shortFile} does not exist`;return!!(await n.stat(this.file)).size||`${this.shortFile} does exist, but is empty`}}},5264:(e,i,l)=>{l.d(i,{ZP:()=>h});var t=l(7742);const{platform:n}=t,o={square:"█",squareDarkShade:"▓",squareMediumShade:"▒",squareLightShade:"░",squareTop:"▀",squareBottom:"▄",squareLeft:"▌",squareRight:"▐",squareCenter:"■",bullet:"●",dot:"․",ellipsis:"…",pointerSmall:"›",triangleUp:"▲",triangleUpSmall:"▴",triangleDown:"▼",triangleDownSmall:"▾",triangleLeftSmall:"◂",triangleRightSmall:"▸",home:"⌂",heart:"♥",musicNote:"♪",musicNoteBeamed:"♫",arrowUp:"↑",arrowDown:"↓",arrowLeft:"←",arrowRight:"→",arrowLeftRight:"↔",arrowUpDown:"↕",almostEqual:"≈",notEqual:"≠",lessOrEqual:"≤",greaterOrEqual:"≥",identical:"≡",infinity:"∞",subscriptZero:"₀",subscriptOne:"₁",subscriptTwo:"₂",subscriptThree:"₃",subscriptFour:"₄",subscriptFive:"₅",subscriptSix:"₆",subscriptSeven:"₇",subscriptEight:"₈",subscriptNine:"₉",oneHalf:"½",oneThird:"⅓",oneQuarter:"¼",oneFifth:"⅕",oneSixth:"⅙",oneEighth:"⅛",twoThirds:"⅔",twoFifths:"⅖",threeQuarters:"¾",threeFifths:"⅗",threeEighths:"⅜",fourFifths:"⅘",fiveSixths:"⅚",fiveEighths:"⅝",sevenEighths:"⅞",line:"─",lineBold:"━",lineDouble:"═",lineDashed0:"┄",lineDashed1:"┅",lineDashed2:"┈",lineDashed3:"┉",lineDashed4:"╌",lineDashed5:"╍",lineDashed6:"╴",lineDashed7:"╶",lineDashed8:"╸",lineDashed9:"╺",lineDashed10:"╼",lineDashed11:"╾",lineDashed12:"−",lineDashed13:"–",lineDashed14:"‐",lineDashed15:"⁃",lineVertical:"│",lineVerticalBold:"┃",lineVerticalDouble:"║",lineVerticalDashed0:"┆",lineVerticalDashed1:"┇",lineVerticalDashed2:"┊",lineVerticalDashed3:"┋",lineVerticalDashed4:"╎",lineVerticalDashed5:"╏",lineVerticalDashed6:"╵",lineVerticalDashed7:"╷",lineVerticalDashed8:"╹",lineVerticalDashed9:"╻",lineVerticalDashed10:"╽",lineVerticalDashed11:"╿",lineDownLeft:"┐",lineDownLeftArc:"╮",lineDownBoldLeftBold:"┓",lineDownBoldLeft:"┒",lineDownLeftBold:"┑",lineDownDoubleLeftDouble:"╗",lineDownDoubleLeft:"╖",lineDownLeftDouble:"╕",lineDownRight:"┌",lineDownRightArc:"╭",lineDownBoldRightBold:"┏",lineDownBoldRight:"┎",lineDownRightBold:"┍",lineDownDoubleRightDouble:"╔",lineDownDoubleRight:"╓",lineDownRightDouble:"╒",lineUpLeft:"┘",lineUpLeftArc:"╯",lineUpBoldLeftBold:"┛",lineUpBoldLeft:"┚",lineUpLeftBold:"┙",lineUpDoubleLeftDouble:"╝",lineUpDoubleLeft:"╜",lineUpLeftDouble:"╛",lineUpRight:"└",lineUpRightArc:"╰",lineUpBoldRightBold:"┗",lineUpBoldRight:"┖",lineUpRightBold:"┕",lineUpDoubleRightDouble:"╚",lineUpDoubleRight:"╙",lineUpRightDouble:"╘",lineUpDownLeft:"┤",lineUpBoldDownBoldLeftBold:"┫",lineUpBoldDownBoldLeft:"┨",lineUpDownLeftBold:"┥",lineUpBoldDownLeftBold:"┩",lineUpDownBoldLeftBold:"┪",lineUpDownBoldLeft:"┧",lineUpBoldDownLeft:"┦",lineUpDoubleDownDoubleLeftDouble:"╣",lineUpDoubleDownDoubleLeft:"╢",lineUpDownLeftDouble:"╡",lineUpDownRight:"├",lineUpBoldDownBoldRightBold:"┣",lineUpBoldDownBoldRight:"┠",lineUpDownRightBold:"┝",lineUpBoldDownRightBold:"┡",lineUpDownBoldRightBold:"┢",lineUpDownBoldRight:"┟",lineUpBoldDownRight:"┞",lineUpDoubleDownDoubleRightDouble:"╠",lineUpDoubleDownDoubleRight:"╟",lineUpDownRightDouble:"╞",lineDownLeftRight:"┬",lineDownBoldLeftBoldRightBold:"┳",lineDownLeftBoldRightBold:"┯",lineDownBoldLeftRight:"┰",lineDownBoldLeftBoldRight:"┱",lineDownBoldLeftRightBold:"┲",lineDownLeftRightBold:"┮",lineDownLeftBoldRight:"┭",lineDownDoubleLeftDoubleRightDouble:"╦",lineDownDoubleLeftRight:"╥",lineDownLeftDoubleRightDouble:"╤",lineUpLeftRight:"┴",lineUpBoldLeftBoldRightBold:"┻",lineUpLeftBoldRightBold:"┷",lineUpBoldLeftRight:"┸",lineUpBoldLeftBoldRight:"┹",lineUpBoldLeftRightBold:"┺",lineUpLeftRightBold:"┶",lineUpLeftBoldRight:"┵",lineUpDoubleLeftDoubleRightDouble:"╩",lineUpDoubleLeftRight:"╨",lineUpLeftDoubleRightDouble:"╧",lineUpDownLeftRight:"┼",lineUpBoldDownBoldLeftBoldRightBold:"╋",lineUpDownBoldLeftBoldRightBold:"╈",lineUpBoldDownLeftBoldRightBold:"╇",lineUpBoldDownBoldLeftRightBold:"╊",lineUpBoldDownBoldLeftBoldRight:"╉",lineUpBoldDownLeftRight:"╀",lineUpDownBoldLeftRight:"╁",lineUpDownLeftBoldRight:"┽",lineUpDownLeftRightBold:"┾",lineUpBoldDownBoldLeftRight:"╂",lineUpDownLeftBoldRightBold:"┿",lineUpBoldDownLeftBoldRight:"╃",lineUpBoldDownLeftRightBold:"╄",lineUpDownBoldLeftBoldRight:"╅",lineUpDownBoldLeftRightBold:"╆",lineUpDoubleDownDoubleLeftDoubleRightDouble:"╬",lineUpDoubleDownDoubleLeftRight:"╫",lineUpDownLeftDoubleRightDouble:"╪",lineCross:"╳",lineBackslash:"╲",lineSlash:"╱"},s={...o,..."linux"===n?{circleQuestionMark:"?⃝",questionMarkPrefix:"?⃝"}:{circleQuestionMark:"?",questionMarkPrefix:"?"},tick:"✔",info:"ℹ",warning:"⚠",cross:"✖",squareSmall:"◻",squareSmallFilled:"◼",circle:"◯",circleFilled:"◉",circleDotted:"◌",circleDouble:"◎",circleCircle:"ⓞ",circleCross:"ⓧ",circlePipe:"Ⓘ",radioOn:"◉",radioOff:"◯",checkboxOn:"☒",checkboxOff:"☐",checkboxCircleOn:"ⓧ",checkboxCircleOff:"Ⓘ",pointer:"❯",triangleUpOutline:"△",triangleLeft:"◀",triangleRight:"▶",lozenge:"◆",lozengeOutline:"◇",hamburger:"☰",smiley:"㋡",mustache:"෴",star:"★",play:"▶",nodejs:"⬢",oneSeventh:"⅐",oneNinth:"⅑",oneTenth:"⅒"},r={...o,tick:"√",info:"i",warning:"‼",cross:"×",squareSmall:"□",squareSmallFilled:"■",circle:"( )",circleFilled:"(*)",circleDotted:"( )",circleDouble:"( )",circleCircle:"(○)",circleCross:"(×)",circlePipe:"(│)",circleQuestionMark:"(?)",radioOn:"(*)",radioOff:"( )",checkboxOn:"[×]",checkboxOff:"[ ]",checkboxCircleOn:"(×)",checkboxCircleOff:"( )",questionMarkPrefix:"？",pointer:">",triangleUpOutline:"∆",triangleLeft:"◄",triangleRight:"►",lozenge:"♦",lozengeOutline:"◊",hamburger:"≡",smiley:"☺",mustache:"┌─┐",star:"✶",play:"►",nodejs:"♦",oneSeventh:"1/7",oneNinth:"1/9",oneTenth:"1/10"},d="win32"!==t.platform?"linux"!==t.env.TERM:Boolean(t.env.CI)||Boolean(t.env.WT_SESSION)||"{cmd::Cmder}"===t.env.ConEmuTask||"vscode"===t.env.TERM_PROGRAM||"xterm-256color"===t.env.TERM||"alacritty"===t.env.TERM||"JetBrains-JediTerm"===t.env.TERMINAL_EMULATOR,h=d?s:r},5089:(e,i,l)=>{function t(e){if("string"!=typeof e)throw new TypeError(`Expected a \`string\`, got \`${typeof e}\``);return e.replace(function({onlyFirst:e=!1}={}){const i=["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)","(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"].join("|");return new RegExp(i,e?void 0:"g")}(),"")}l.d(i,{Z:()=>t})}};
//# sourceMappingURL=990.index.js.map