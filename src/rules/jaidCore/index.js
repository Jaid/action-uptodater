import hasDependency from "lib/hasDependency"

import Rule from "src/Rule"
import FileExact from "src/testers/FileExact"
import FileHasContent from "src/testers/FileHasContent"
import FolderExists from "src/testers/FolderExists"

export default new class extends Rule {

  title = "Depends on jaid-core"

  /**
   * @return {Promise<boolean>}
   */
  async isRelevantToRepo() {
    return hasDependency("jaid-core")
  }

  init() {
    this.addTester(new FileExact("src/index.js", require("!raw-loader!./srcIndex.js").default))
    this.addTester(new FolderExists("src/plugins"))
    this.addTester(new FileHasContent("src/core.js"))
  }

}