import Rule from "../Rule"

export default new class extends Rule {

  isRelevantToRepo() {
    return true
  }

  constructor() {
    super()
    this.matchFileExact("license.txt", require("./license.txt"))
  }

}