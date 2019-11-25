import fsp from "@absolunet/fsp"

export default class Fix {

  /**
   * @type {string}
   */
  fileName = null

  /**
   * @type {string|boolean}
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
    if (this.newContent === false) {
      console.log(`Delete ${this.fileName}`)
      await fsp.unlink(this.fileName)
    } else {
      console.log(`Modify ${this.fileName}`)
      await fsp.outputFile(this.fileName, this.newContent)
    }
  }

}