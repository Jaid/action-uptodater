import Rule from "../../Rule.js"
import FileExact from "../../testers/FileExact.js"
import FileHasContent from "../../testers/FileHasContent.js"
import FolderExists from "../../testers/FolderExists.js"
import indexText from "./srcIndex.js?raw"

export default new class extends Rule {

  title = "Depends on jaid-core"

  /**
   * @return {Promise<boolean>}
   */
  async isRelevantToRepo() {
    return this.hasProductionDependency("jaid-core") && this.hasProductionDependency("yargs")
  }

  init() {
    this.addTester(new FileExact("src/index.js", indexText))
    this.addTester(new FolderExists("src/plugins"))
    this.addTester(new FileHasContent("src/core.js"))
  }

}