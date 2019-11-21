import path from "path"

import fsp from "@absolunet/fsp"
import Tester from "src/testers/Tester"

export default class extends Tester {

  /**
   * @type {string}
   */
  file = null

  constructor(file) {
    super()
    this.file = path.resolve(file)
    this.shortFile = file
    this.name = `${this.shortFile} should exist`
  }

  async test() {
    const exists = await fsp.pathExists(this.file)
    if (!exists) {
      console.log(`${this.shortFile} does not exist`)
      return false
    }
    return true
  }

}