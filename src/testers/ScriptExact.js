import json5 from "json5"
import {isEqual} from "lodash"

import chalk from "../lib/chalk.js"
import {isEmpty} from "../lib/esm/has-content.js"
import getPkg from "../lib/getPkg.js"
import Tester from "../Tester.js"

export default class extends Tester {

  /**
   * @type {string}
   */
  scriptName = null

  /**
   * @type {string}
   */
  expectedValue = null

  /**
   * @type {Object}
   */
  pkg = null

  constructor(scriptName, value) {
    super()
    this.scriptName = scriptName
    this.expectedValue = value
    this.setTitle(`${chalk.yellow(`package.json[${scriptName}]`)} should be ${chalk.blue(json5.stringify(value))}`)
  }

  /**
   * @return {Promise<Pick<boolean, string>>}
   */
  async test() {
    this.pkg = await getPkg()
    if (this.pkg === null) {
      return "package.json does not exist"
    }
    if (isEmpty(this.pkg)) {
      return "package.json has no content"
    }
    if (isEmpty(this.pkg.scripts)) {
      return "package.json[scripts] has no content"
    }
    const actualValue = this.pkg.scripts[this.scriptName]
    if (actualValue === undefined) {
      return `package.json[scripts] has no key ${this.scriptName}`
    }
    const equals = isEqual(this.expectedValue, actualValue)
    if (!equals) {
      return `Actual value of pkg[scripts][${this.scriptName}] is ${json5.stringify(actualValue)}`
    }
    return true
  }

  collectFixes() {
    if (this.pkg === null) {
      return
    }
    const pkgCopy = JSON.parse(JSON.stringify(this.pkg))
    if (!pkgCopy.scripts) {
      pkgCopy.scripts = {}
    }
    pkgCopy.scripts[this.scriptName] = this.expectedValue
    this.addFix("package.json", JSON.stringify(pkgCopy, null, 2))
  }

}