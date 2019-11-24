import path from "path"

import fsp from "@absolunet/fsp"
import Tester from "src/testers/Tester"
import chalk from "chalk"

export default class extends Tester {

  /**
   * @type {string}
   */
  file = null

  constructor(file) {
    super()
    this.file = path.resolve(file)
    this.shortFile = file
    this.setName(`${chalk.yellow(this.shortFile)} should not exist`)
  }

  async test() {
    const exists = await fsp.pathExists(this.file)
    if (!exists) {
      return `${this.shortFile} does exist`
    }
    return true
  }

  collectFixes() {
    this.addFix(this.shortFile, false)
  }


}