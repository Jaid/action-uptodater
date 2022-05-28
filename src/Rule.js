
import fsp from "@absolunet/fsp"
import ensureArray from "ensure-array"
import hasContent, {isEmpty} from "has-content"

import icons from "./lib/consoleIcons.js"

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
   * @param {string|string[]} dependencyField
   * @return {boolean}
   */
  hasDependency(dependency, dependencyField) {
    const dependencyFields = dependencyField ? ensureArray(dependencyField) : [
      "dependencies",
      "devDependencies",
      "optionalDependencies",
      "peerDependencies",
      "bundleDependencies",
      "bundledDependencies",
    ]
    if (isEmpty(this.pkg)) {
      return false
    }
    for (const key of dependencyFields) {
      if (this.pkg[key]?.[dependency]) {
        return true
      }
    }
    return false
  }

  /**
   * @param {string} dependency
   * @return {boolean}
   */
  hasProductionDependency(dependency) {
    return this.hasDependency(dependency, "dependencies")
  }

  /**
   * @param {string} dependency
   * @return {boolean}
   */
  hasDevelopmentDependency(dependency) {
    return this.hasDependency(dependency, "devDependencies")
  }

  /**
   * @param {string} file
   * @return {Promise<boolean>}
   */
  async fileExists(file) {
    const exists = await fsp.pathExists(file)
    return exists
  }

  /**
   * @param {import("src/Tester").default} tester
   */
  addTester(tester) {
    tester.rule = this
    this.testers.push(tester)
  }

}