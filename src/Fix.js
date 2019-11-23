import fsp from "@absolunet/fsp"

export default class Fix {

  /**
   * @type {string}
   */
  fileName = null

  /**
   * @type {string}
   */
  newContent = null

  /**
   * @type {import("src/testers/Tester").default}
   */
  tester = null

  constructor(fileName, newContent) {
    this.fileName = fileName
    this.newContent = newContent
  }

  async apply() {
    await fsp.outputFile(this.fileName, this.newContent)
  }

}