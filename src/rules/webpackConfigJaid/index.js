import Rule from "../../Rule.js"
import FileHasContent from "../../testers/FileHasContent.js"
import ScriptExact from "../../testers/ScriptExact.js"

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