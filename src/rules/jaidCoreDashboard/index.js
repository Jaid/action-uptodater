import Rule from "../../Rule.js"
import FileHasContent from "../../testers/FileHasContent.js"

export default new class extends Rule {

  title = "Depends on jaid-core-dashboard"

  /**
   * @return {Promise<boolean>}
   */
  async isRelevantToRepo() {
    return this.hasProductionDependency("jaid-core-dashboard")
  }

  init() {
    this.addTester(new FileHasContent("src/plugins/dashboard/index.js"))
  }

}