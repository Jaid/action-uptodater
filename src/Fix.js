import fsp from "@absolunet/fsp"
import {getInput} from "@actions/core"

import chalk from "./lib/chalk.js"

const commitMessagePrefix = getInput("commitMessagePrefix", {required: true})

export default class Fix {

  /**
   * @type {import("commit-from-action").default}
   */
  static commitManager = null

  /**
   * @type {string}
   */
  fileName = null

  /**
   * @type {string|boolean}
   */
  newContent = null

  /**
   * @type {import("src/Tester").default}
   */
  tester = null

  /**
   * @type {boolean}
   */
  hasBeenApplied = false

  constructor(fileName, newContent) {
    this.fileName = fileName
    this.newContent = newContent
  }

  log(line) {
    this.tester.logMessages.push(line)
  }

  async apply() {
    this.log(this.getAnsiTitle())
    if (this.newContent === false) {
      await fsp.unlink(this.fileName)
    } else {
      await fsp.outputFile(this.fileName, this.newContent)
    }
    await Fix.commitManager?.commit(`${commitMessagePrefix} ${this.tester.title}`)
  }

  /**
   * @return {string}
   */
  getAnsiTitle() {
    if (this.newContent === false) {
      return `Delete ${chalk.yellow(this.fileName)}`
    } else {
      return `Modify ${chalk.yellow(this.fileName)}`
    }
  }

}