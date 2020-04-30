import Rule from "src/Rule"
import FileExact from "src/testers/FileExact"
import FileExists from "src/testers/FileExists"
import FileShouldNotExist from "src/testers/FileShouldNotExist.js"
import PkgFieldExact from "src/testers/PkgFieldExact"

import tsConfigBase from "./tsconfigBase.json"

export default new class extends Rule {

  title = "Node"

  init() {
    this.addTester(new PkgFieldExact("author", "Jaid <jaid.jsx@gmail.com> (https://github.com/Jaid)"))
    this.addTester(new FileShouldNotExist("index.js"))
    this.addTester(new FileExact("tsconfigBase.json", JSON.stringify(tsConfigBase, null, 2)))
    this.addTester(new FileExists("tsconfig.json"))
    this.addTester(new FileShouldNotExist("jsconfig.json"))
  }

}