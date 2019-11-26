import Rule from "src/Rule"
import PkgFieldExact from "src/testers/PkgFieldExact"
import FileExact from "src/testers/FileExact"

import jsConfig from "./js.json"

export default new class extends Rule {

  title = "Node"

  constructor() {
    super()
    this.addTester(new PkgFieldExact("author", "Jaid <jaid.jsx@gmail.com> (https://github.com/Jaid)"))
    this.addTester(new FileExact("jsconfig.json", JSON.stringify(jsConfig, null, 2)))
  }

}