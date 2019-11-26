import path from "path"

import fsp from "@absolunet/fsp"
import Tester from "src/Tester"
import hasha from "hasha"
import chalk from "chalk"

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
    this.expectedContent = expectedContent
    this.expectedHash = hasha(expectedContent, {
      algorithm: "md5",
    })
    this.file = path.resolve(file)
    this.shortFile = file
    this.setTitle(`${chalk.yellow(this.shortFile)} should have md5 ${chalk.blueBright(this.expectedHash)}`)
  }

  /**
   * @param {import("src/index").ProjectInfo} projectInfo
   * @return {Promise<Pick<boolean, string>>}
   */
  async test() {
    const exists = await fsp.pathExists(this.file)
    if (!exists) {
      return `${this.shortFile} does not exist`
    }
    const actualHash = await hasha.fromFile(this.file, {
      algorithm: "md5",
    })
    if (actualHash === this.expectedHash) {
      return true
    }
    return `They are not equal, got hash ${actualHash} from file`
  }

  collectFixes() {
    this.addFix(this.shortFile, this.expectedContent)
  }

}