import FileExact from "src/testers/FileExact"
import FileHasContent from "src/testers/FileHasContent"
import FileShouldNotExist from "src/testers/FileShouldNotExist"
import Rule from "src/Rule"

export default new class extends Rule {

  title = "Any repository"

  constructor() {
    super()
    this.addTester(new FileExact("license.txt", require("./license.txt").default))
    this.addTester(new FileExact(".editorconfig", require("./editorconfig.txt").default))
    this.addTester(new FileExact(".github/funding.yml", require("!raw-loader!./funding.yml").default))
    this.addTester(new FileHasContent("readme.md"))
    this.addTester(new FileShouldNotExist(".travis.yml"))
  }

}