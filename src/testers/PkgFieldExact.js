import cropString from "crop-string"
import {isEmpty} from "../lib/esm/has-content.js"
import json5 from "json5"
import {isEqual} from "lodash"

import chalk from "../lib/chalk.js"
import getPkg from "../lib/getPkg.js"
import Tester from "../Tester.js"

export default class extends Tester {

  /**
   * @type {string}
   */
  field = null

  /**
   * @type {string}
   */
  expectedValue = null

  /**
   * @type {Object}
   */
  pkg = null

  constructor(field, value) {
    super()
    this.field = field
    this.expectedValue = value
    this.setTitle(`${chalk.yellow(`package.json[${field}]`)} should be ${chalk.blue(cropString(json5.stringify(value), 50))}`)
  }

  /**
   * @return {Promise<boolean|string>}
   */
  async test() {
    this.pkg = await getPkg()
    if (this.pkg === null) {
      return "package.json does not exist"
    }
    if (isEmpty(this.pkg)) {
      return "package.json has no content"
    }
    const actualValue = this.pkg[this.field]
    if (actualValue === undefined) {
      return `package.json has no key ${this.field}`
    }
    const equals = isEqual(this.expectedValue, actualValue)
    if (!equals) {
      return `Actual value of pkg[${this.field}] is ${json5.stringify(actualValue)}`
    }
    return true
  }

  collectFixes() {
    if (this.pkg === null) {
      return
    }
    const pkgCopy = JSON.parse(JSON.stringify(this.pkg))
    pkgCopy[this.field] = this.expectedValue
    this.addFix("package.json", JSON.stringify(pkgCopy, null, 2))
  }

}