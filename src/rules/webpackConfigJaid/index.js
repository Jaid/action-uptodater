import FileHasContent from "src/testers/FileHasContent"
import Rule from "src/Rule"
import hasDependency from "lib/hasDependency"
import ScriptExact from "src/testers/ScriptExact"

export default new class extends Rule {

  title = "Depends on webpack-config-jaid"

  /**
   * @return {Promise<boolean>}
   */
  async isRelevantToRepo() {
    return hasDependency("webpack-config-jaid")
  }

  constructor() {
    super()
    this.addTester(new FileHasContent("webpack.config.babel.js"))
    this.addTester(new ScriptExact("prepareActionJest", "npm run build:prod"))
  }

}