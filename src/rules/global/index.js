import Rule from "../../Rule"
import FileExact from "../../testers/FileExact"
import FileHasContent from "../../testers/FileHasContent"
import FileShouldNotExist from "../../testers/FileShouldNotExist"

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