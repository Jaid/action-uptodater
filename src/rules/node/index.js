import Rule from "src/Rule"
import PkgFieldExact from "src/testers/PkgFieldExact"

export default new class extends Rule {

  title = "Node"

  constructor() {
    super()
    this.addTester(new PkgFieldExact("author", "Jaid <jaid.jsx@gmail.com> (https://github.com/Jaid)"))
  }

}