import hasDependency from "lib/hasDependency"

import Rule from "src/Rule"
import FileHasContent from "src/testers/FileHasContent"
import ScriptExact from "src/testers/ScriptExact"

export default new class extends Rule {

  title = "Depends on webpack-config-jaid"

  /**
   * @return {Promise<boolean>}
   */
  async isRelevantToRepo() {
    return hasDependency("webpack-config-jaid")
  }

  init() {
    this.addTester(new FileHasContent("webpack.config.babel.js"))
    this.addTester(new ScriptExact("prepareActionJest", "npm run build:prod"))
  }

}