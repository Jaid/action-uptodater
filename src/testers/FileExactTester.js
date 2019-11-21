import path from "path"

import fsp from "@absolunet/fsp"
import Tester from "src/testers/Tester"
import hasha from "hasha"

export default class extends Tester {

  /**
   * @type {string}
   */
  expectedHash = null

  /**
   * @type {string}
   */
  file = null

  constructor(file, expectedContent) {
    super()
    this.expectedHash = hasha(expectedContent, {})
    this.file = path.resolve(file)
    this.shortFile = file
    this.name = `${this.shortFile} should have md5 ${this.expectedHash}`
  }

  async test() {
    const exists = await fsp.pathExists(this.file)
    if (!exists) {
      console.log(`${this.shortFile} does not exist`)
      return false
    }
    const actualHash = await hasha.fromFile(this.file, {
      algorithm: "md5",
    })
    if (actualHash === this.expectedHash) {
      return true
    }
    console.log(`They are not equal, got hash ${actualHash} from file`)
    return false
  }

}