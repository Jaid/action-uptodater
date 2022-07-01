import FileExists from "src/testers/FileExists.js"
import Rule from "../../Rule.js"

export default new class extends Rule {

  title = "Node library"

  /**
   * @return {Promise<boolean>}
   */
  async isRelevantToRepo() {
    // Rule “lib” should run for packages depending on webpack-config-jaid
    // webpack-config-jaid also depends on itself, but it imports its own source instead of a Node dependency
    // So we need to add it as an exception here
    const pkgIsWebpackConfigJaid = this.pkg.name === "webpack-config-jaid"
    if (!this.hasDependency("webpack-config-jaid") && !pkgIsWebpackConfigJaid) {
      return false
    }
    if (!this.pkg.webpackConfigJaid) {
      return false
    }
    if (this.pkg.webpackConfigJaid.endsWith("Lib") || this.pkg.webpackConfigJaid.endsWith("Class")) {
      return true
    }
    return false
  }

  init() {
    this.addTester(new FileExists("readme/config.yml"))
  }

}