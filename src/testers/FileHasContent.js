import path from "path"

import fsp from "@absolunet/fsp"
import Tester from "src/Tester"
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
    this.setName(`${chalk.yellow(this.shortFile)} should exist and have content`)
  }

  async test() {
    const exists = await fsp.pathExists(this.file)
    if (!exists) {
      return `${this.shortFile} does not exist`
    }
    const stat = await fsp.stat(this.file)
    const bytes = stat.size
    if (!bytes) {
      return `${this.shortFile} does exist, but it empty`
    }
    return true
  }

}