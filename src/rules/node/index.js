import Rule from "src/Rule"
import FileExact from "src/testers/FileExact"
import FileShouldNotExist from "src/testers/FileShouldNotExist.js"
import PkgFieldExact from "src/testers/PkgFieldExact"

import jsConfig from "./js.json"
import jsConfigReact from "./jsReact.json"

export default new class extends Rule {

  title = "Node"

  constructor() {
    super()
    this.addTester(new PkgFieldExact("author", "Jaid <jaid.jsx@gmail.com> (https://github.com/Jaid)"))
    this.addTester(new FileShouldNotExist("index.js"))
    let jsConfigTester = null
    console.log(this.pkg)
    if (this.hasDependency("react-dom")) {
      jsConfigTester = new FileExact("jsconfig.json", JSON.stringify(jsConfigReact, null, 2))
    } else {
      jsConfigTester = new FileExact("jsconfig.json", JSON.stringify(jsConfig, null, 2))
    }
    this.addTester(jsConfigTester)
  }

}