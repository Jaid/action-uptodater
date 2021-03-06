import fsp from "@absolunet/fsp"
import crypto from "crypto"
import path from "path"
import readFileString from "read-file-string"

import chalk from "lib/chalk"
import getMd5OfString from "lib/getMd5OfString"

import Tester from "src/Tester"

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
    this.expectedHash = getMd5OfString(expectedContent)
    this.file = path.resolve(file)
    this.shortFile = file
    this.setTitle(`${chalk.yellow(this.shortFile)} should have md5 ${chalk.blue(this.expectedHash)}`)
  }

  /**
   * @param {import("src/index").ProjectInfo} projectInfo
   * @return {Promise<Pick<boolean, string>>}
   */
  async test() {
    const fileContent = await readFileString(this.file)
    if (!fileContent) {
      return `${this.shortFile} does not exist`
    }
    const actualHash = getMd5OfString(fileContent)
    if (actualHash === this.expectedHash) {
      return true
    }
    return `They are not equal, got hash ${actualHash} from file`
  }

  collectFixes() {
    this.addFix(this.shortFile, this.expectedContent)
  }

}