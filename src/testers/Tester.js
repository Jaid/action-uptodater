import stripAnsi from "strip-ansi"
import figures from "figures"
import chalk from "chalk"

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

  setName(ansiName) {
    this.name = stripAnsi(ansiName)
    this.ansiName = ansiName
  }

  setFunction(testFunction) {
    this.test = testFunction
  }

  async run() {
    const result = await this.test()
    if (result === false) {
      console.log(`${chalk.green(figures.tick)} ${this.name}`)
      return false
    }
    console.log(`${chalk.red(figures.cross)} ${this.name}`)
    return true
  }

}