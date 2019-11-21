import FileExactTester from "src/testers/FileExactTester.js"
import FileHasContentTester from "root/src/testers/FileHasContentTester.js"

import Rule from "../Rule"

export default new class extends Rule {

  constructor() {
    super()
    this.testers = [
      new FileExactTester("license.txt", require("./license.txt").default),
      new FileExactTester(".editorconfig", require("./editorconfig.txt").default),
      new FileHasContentTester("readme.md"),
    ]
  }

}