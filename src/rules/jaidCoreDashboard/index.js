import FileHasContent from "src/testers/FileHasContent"
import Rule from "src/Rule"
import hasDependency from "lib/hasDependency"

export default new class extends Rule {

  title = "Depends on jaid-core-dashboard"

  /**
   * @return {Promise<boolean>}
   */
  async isRelevantToRepo() {
    return hasDependency("jaid-core-dashboard")
  }

  constructor() {
    super()
    this.addTester(new FileHasContent("src/plugins/dashboard/index.js"))
  }

}