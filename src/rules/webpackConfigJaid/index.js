import FileExact from "src/testers/FileExact"
import FileHasContent from "src/testers/FileHasContent"
import FileShouldNotExist from "src/testers/FileShouldNotExist"
import Rule from "src/Rule"
import hasContent from "has-content"

export default new class extends Rule {

  title = "With dependency webpack-config-jaid"

  /**
   * @param {import("src/index").ProjectInfo} projectInfo
   * @return {Promise<boolean>}
   */
  async isRelevantToRepo(projectInfo) {
    return hasConent(projectInfo.pkg?.webpackConfigJaid)
  }

  constructor() {
    super()
    this.testers = [
      new FileExact("license.txt", require("./license.txt").default),
      new FileExact(".editorconfig", require("./editorconfig.txt").default),
      new FileHasContent("readme.md"),
      new FileShouldNotExist(".travis.yml"),
    ]
  }

}