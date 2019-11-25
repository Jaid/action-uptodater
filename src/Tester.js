import stripAnsi from "strip-ansi"
import Fix from "src/Fix"
import {isString, isFunction} from "lodash"
import hasContent from "has-content"
import icons from "lib/consoleIcons"

export default class {

  /**
   * @type {string}
   */
  title = "Tester"

  /**
   * @type {boolean}
   */
  passed = false

  /**
   * @type {import("src/Rule").default}
   */
  rule = null

  /**
   * @type {string} Explanation of why the test failed
   */
  message = "Failed"

  /**
   * @type {string}
   */
  consoleIcon = icons.fail

  /**
   * @type {Function}
   * This should be overriden
   */
  async test() {
    return true
  }

  /**
   * @type {import("src/Fix").default[]}
   */
  fixes = []

  setTitle(ansiTitle) {
    this.ansiTitle = ansiTitle
    this.title = stripAnsi(ansiTitle)
  }

  setFunction(testFunction) {
    this.test = testFunction
  }

  hasFix() {
    return hasContent(this.fixes)
  }

  /**
   * @param {import("./index").ProjectInfo} projectInfo
   * @return {Promise<boolean>}
   */
  async run(projectInfo) {
    const result = await this.test(projectInfo)
    if (result !== true) {
      if (projectInfo.shouldFix) {
        if (isFunction(this.collectFixes)) {
          this.collectFixes()
        }
        if (hasContent(this.fixes)) {
          for (const fix of this.fixes) {
            await fix.apply()
          }
          this.consoleIcon = icons.fix
        }
      }
      if (isString(result)) {
        this.message = result
      }
      this.rule.incrementFailedTests()
      return false
    }
    this.passed = true
    this.consoleIcon = icons.pass
    this.rule.incrementPassedTests()
    return true
  }

  addFix(fileName, content) {
    const fix = new Fix(fileName, content)
    fix.tester = this
    this.fixes.push(fix)
  }

}