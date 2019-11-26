import Tester from "src/Tester"
import {isEmpty} from "has-content"
import {isEqual} from "lodash"
import json5 from "json5"
import getPkg from "lib/getPkg"

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
    this.setTitle(`pkg.${field} should be ${json5.stringify(value)}`)
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
    const actualValue = this[this.field]
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
    this.pkg[this.field] = this.expectedValue
    this.addFix("package.json", JSON.stringify(this.pkg))
  }

}