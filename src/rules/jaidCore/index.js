import FileHasContent from "src/testers/FileHasContent"
import Rule from "src/Rule"
import hasDependency from "lib/hasDependency"
import FolderExists from "src/testers/FolderExists"
import FileExact from "src/testers/FileExact"

export default new class extends Rule {

  title = "Depends on jaid-core"

  /**
   * @return {Promise<boolean>}
   */
  async isRelevantToRepo() {
    return hasDependency("jaid-core")
  }

  constructor() {
    super()
    this.addTester(new FileExact("src/index.js", require("!raw-loader!./srcIndex.js").default))
    this.addTester(new FolderExists("src/plugins"))
    this.addTester(new FileHasContent("src/core.js"))
  }

}