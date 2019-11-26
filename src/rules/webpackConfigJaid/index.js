import FileHasContent from "src/testers/FileHasContent"
import Rule from "src/Rule"
import hasContent from "has-content"

export default new class extends Rule {

  title = "Depends on webpack-config-jaid"

  /**
   * @param {import("src/index").ProjectInfo} projectInfo
   * @return {Promise<boolean>}
   */
  async isRelevantToRepo(projectInfo) {
    return hasContent(projectInfo.pkg?.webpackConfigJaid)
  }

  constructor() {
    super()
    this.addTester(new FileHasContent("webpack.config.babel.js"))
  }

}