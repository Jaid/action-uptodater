import stripAnsi from "strip-ansi"
import figures from "figures"
import chalk from "chalk"
import Fix from "src/Fix"
import {isString} from "lodash"
import hasContent from "has-content"

export default class Tester {

  /**
   * @type {string}
   */
  name = "Tester"

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

  setName(ansiName) {
    this.name = stripAnsi(ansiName)
    this.ansiName = ansiName
  }

  setFunction(testFunction) {
    this.test = testFunction
  }

  hasFix() {
    return hasContent(this.fixes)
  }

  async run() {
    const result = await this.test()
    if (result !== true) {
      const icon = this.hasFix() ? "🔧" : chalk.red(figures.cross)
      console.log(`${icon} ${this.ansiName}`)
      if (isString(result)) {
        console.log(result)
      }
      return false
    }
    console.log(`${chalk.green(figures.tick)} ${this.ansiName}`)
    return true
  }

  addFix(fileName, content) {
    const fix = new Fix(fileName, content)
    fix.tester = this
    this.fixes.push(fix)
  }

}