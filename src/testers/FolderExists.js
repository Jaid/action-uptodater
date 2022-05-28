import path from "node:path"

import fsp from "@absolunet/fsp"

import chalk from "../lib/chalk"

import Tester from "../Tester"

export default class extends Tester {

  /**
   * @type {string}
   */
  file = null

  constructor(file) {
    super()
    this.file = path.resolve(file)
    this.shortFile = file
    this.setTitle(`Directory ${chalk.yellow(this.shortFile)} should exist`)
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
    const stat = await fsp.stat(this.file)
    if (!stat.isDirectory()) {
      return `${this.shortFile} is not a directory`
    }
    return true
  }

}