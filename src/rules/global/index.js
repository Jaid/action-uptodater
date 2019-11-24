import FileExact from "src/testers/FileExact"
import FileHasContent from "src/testers/FileHasContent"
import FileShouldNotExist from "src/testers/FileShouldNotExist"
import Rule from "src/Rule"

export default new class extends Rule {

  constructor() {
    super()
    this.testers = [
      new FileExact("license.txt", require("./license.txt").default),
      new FileExact(".editorconfig", require("./editorconfig.txt").default),
      new FileHasContent("readme.md"),
      new FileShouldNotExist(".travis.yml"),
    ]
  }

}