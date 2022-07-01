import Rule from "../../Rule.js"
import FileExact from "../../testers/FileExact.js"
import FileHasContent from "../../testers/FileHasContent.js"
import FileShouldNotExist from "../../testers/FileShouldNotExist.js"
import editorconfigText from "./editorconfig.hbs"
import licenseText from "./license.hbs"

import fundingText from "./funding.hbs"

export default new class extends Rule {

  title = "Any repository"

  init() {
    this.addTester(new FileExact("license.txt", licenseText()))
    this.addTester(new FileExact(".editorconfig", editorconfigText()))
    this.addTester(new FileExact(".github/funding.yml", licenseText({
      year: (new Date()).getFullYear()
    })))
    this.addTester(new FileHasContent("readme.md"))
    this.addTester(new FileShouldNotExist(".travis.yml"))
  }

}