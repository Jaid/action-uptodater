import Rule from "src/Rule"
import FileExact from "src/testers/FileExact"
import FileShouldNotExist from "src/testers/FileShouldNotExist.js"
import PkgFieldExact from "src/testers/PkgFieldExact"

import tsConfig from "./ts.json"

export default new class extends Rule {

  title = "Node"

  init() {
    this.addTester(new PkgFieldExact("author", "Jaid <jaid.jsx@gmail.com> (https://github.com/Jaid)"))
    this.addTester(new FileShouldNotExist("index.js"))
    this.addTester(new FileExact("tsconfig.json", JSON.stringify(tsConfig, null, 2)))
    this.addTester(new FileShouldNotExist("jsconfig.json"))
  }

}