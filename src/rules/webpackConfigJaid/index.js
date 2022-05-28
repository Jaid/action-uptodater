import Rule from "../../Rule"
import FileHasContent from "../../testers/FileHasContent"
import ScriptExact from "../../testers/ScriptExact"

export default new class extends Rule {

  title = "Depends on webpack-config-jaid"

  /**
   * @return {Promise<boolean>}
   */
  async isRelevantToRepo() {
    return this.hasDependency("webpack-config-jaid")
  }

  init() {
    this.addTester(new FileHasContent("webpack.config.babel.js"))
    this.addTester(new ScriptExact("prepareActionJest", "npm run build:prod"))
  }

}