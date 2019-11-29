import Rule from "src/Rule"
import getPkg from "lib/getPkg"
import PkgFieldExact from "src/testers/PkgFieldExact"
import {context} from "@actions/github"

export default new class extends Rule {

  title = "Node package that gets published publicly"

  /**
   * @return {Promise<boolean>}
   */
  async isRelevantToRepo() {
    const pkg = await getPkg()
    if (!pkg) {
      return false
    }
    if (pkg.private) {
      return false
    }
    if (!pkg.name) {
      return false
    }
    return true
  }

  constructor() {
    super()
    this.addTester(new PkgFieldExact("name", context.repo.repo))
  }

}