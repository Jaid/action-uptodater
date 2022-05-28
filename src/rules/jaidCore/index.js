import Rule from "../../Rule.js"
import FileExact from "../../testers/FileExact.js"
import FileHasContent from "../../testers/FileHasContent.js"
import FolderExists from "../../testers/FolderExists.js"

export default new class extends Rule {

  title = "Depends on jaid-core"

  /**
   * @return {Promise<boolean>}
   */
  async isRelevantToRepo() {
    return this.hasProductionDependency("jaid-core") && this.hasProductionDependency("yargs")
  }

  init() {
    this.addTester(new FileExact("src/index.js", require("!raw-loader!./srcIndex.js").default))
    this.addTester(new FolderExists("src/plugins"))
    this.addTester(new FileHasContent("src/core.js"))
  }

}