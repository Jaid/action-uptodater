import stripAnsi from "strip-ansi"
import figures from "figures"
import chalk from "chalk"
import Fix from "src/Fix"
import {isString} from "lodash"

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

  async run() {
    const result = await this.test()
    if (result !== true) {
      console.log(`${chalk.red(figures.cross)} ${this.ansiName}`)
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