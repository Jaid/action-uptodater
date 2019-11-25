
import hasContent from "has-content"
import icons from "lib/consoleIcons"

export default class {

  /**
   * @type {import("src/Tester").default[]}
   */
  testers = []

  /**
   * @type {string}
   */
  id = null

  /**
   * @type {string}
   */
  title = null

  /**
   * @type {number}
   */
  passedTests = 0

  /**
   * @type {number}
   */
  failedTests = 0

  /**
   * @type {string}
   */
  consoleIcon = icons.pass

  incrementPassedTests() {
    this.passedTests++
  }

  incrementFailedTests() {
    this.consoleIcon = icons.fail
    this.failedTests++
  }

  getTitle() {
    if (hasContent(this.title)) {
      return this.title
    }
    return this.id
  }

  isRelevantToRepo(projectInfo) {
    return true
  }

  hasTesters() {
    return hasContent(this.testers)
  }

  /**
   * @param {import("src/Tester").default} tester
   */
  addTester(tester) {
    tester.rule = this
    this.testers.push(tester)
  }

}