import Rule from "src/Rule"
import PkgFieldExact from "src/testers/PkgFieldExact"
import FileExact from "src/testers/FileExact"

export default new class extends Rule {

  title = "Node"

  constructor() {
    super()
    this.addTester(new PkgFieldExact("author", "Jaid <jaid.jsx@gmail.com> (https://github.com/Jaid)"))
    this.addTester(new FileExact("jsconfig.json", require("!raw-loader!./js.json").default))
  }

}