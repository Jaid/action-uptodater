import Rule from "../Rule"

export default new class extends Rule {

  constructor() {
    super()
    this.matchFileExact("license.txt", require("./license.txt").default)
  }

}