import Rule from "../../Rule.js"
import FileExact from "../../testers/FileExact.js"
import FileHasContent from "../../testers/FileHasContent.js"
import FileShouldNotExist from "../../testers/FileShouldNotExist.js"

export default new class extends Rule {

  title = "Any repository"

  init() {
    this.addTester(new FileExact("license.txt", require("./license.txt").default))
    this.addTester(new FileExact(".editorconfig", require("./editorconfig.txt").default))
    this.addTester(new FileExact(".github/funding.yml", require("!raw-loader!./funding.yml").default))
    this.addTester(new FileHasContent("readme.md"))
    this.addTester(new FileShouldNotExist(".travis.yml"))
  }

}