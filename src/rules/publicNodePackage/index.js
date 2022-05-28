import {context} from "@actions/github"

import getPkg from "../../lib/getPkg"

import Rule from "../../Rule"
import PkgFieldExact from "../../testers/PkgFieldExact"

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

  init() {
    this.addTester(new PkgFieldExact("name", context.repo.repo))
  }

}