import hasDependency from "lib/hasDependency"

import Rule from "src/Rule"
import FileHasContent from "src/testers/FileHasContent"

export default new class extends Rule {

  title = "Depends on jaid-core-dashboard"

  /**
   * @return {Promise<boolean>}
   */
  async isRelevantToRepo() {
    return hasDependency("jaid-core-dashboard")
  }

  init() {
    this.addTester(new FileHasContent("src/plugins/dashboard/index.js"))
  }

}