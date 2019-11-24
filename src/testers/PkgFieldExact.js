import Tester from "src/Tester"
import {isEmpty} from "has-content"
import {isEqual} from "lodash"
import json5 from "json5"

export default class extends Tester {

  /**
   * @type {string}
   */
  field = null

  /**
   * @type {string}
   */
  expectedValue = null

  constructor(field, value) {
    super()
    this.field = field
    this.expectedValue = value
    this.setName(`pkg.${field} should be ${json5.stringify(value)}`)
  }

  /**
   * @param {import("src/index").ProjectInfo} projectInfo
   * @return {Promise<Pick<boolean, string>>}
   */
  async test(projectInfo) {
    if (projectInfo.pkg === null) {
      return "package.json does not exist"
    }
    if (isEmpty(projectInfo.pkg)) {
      return "package.json has no content"
    }
    const actualValue = projectInfo[this.field]
    if (actualValue === undefined) {
      return `package.json has no key ${this.field}`
    }
    const equals = isEqual(this.expectedValue, actualValue)
    if (!equals) {
      return `Actual value of pkg[${this.field}] is ${json5.stringify(actualValue)}`
    }
    return true
  }

}