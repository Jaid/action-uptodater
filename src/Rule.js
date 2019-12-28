
import hasContent, {isEmpty} from "has-content"

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

  /**
   * @type {Object}
   */
  pkg = null

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
   * @param {string} dependency
   * @return {boolean}
   */
  hasDependency(dependency) {
    console.log(`Looking for dependency ${dependency}`)
    const dependencyFields = [
      "dependencies",
      "devDependencies",
      "optionalDependencies",
      "peerDependencies",
      "bundleDependencies",
      "bundledDependencies",
    ]
    if (isEmpty(this.pkg)) {
      console.log("Empty")
      return false
    }
    for (const key of dependencyFields) {
      if (this.pkg[key]?.[dependency]) {
        console.log("True")
        return true
      }
    }
    return false
  }

  /**
   * @param {import("src/Tester").default} tester
   */
  addTester(tester) {
    tester.rule = this
    this.testers.push(tester)
  }

}