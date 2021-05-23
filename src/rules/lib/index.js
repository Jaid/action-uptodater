import Rule from "src/Rule"
import FileExact from "src/testers/FileExact"

import jestConfig from "!raw-loader!./jest.config.js"

export default new class extends Rule {

  title = "Node library"

  /**
   * @return {Promise<boolean>}
   */
  async isRelevantToRepo() {
    console.log(JSON.stringify(this.pkg))
    if (!this.hasDependency("webpack-config-jaid")) {
      return false
    }
    if (!this.pkg.webpackConfigJaid) {
      return false
    }
    // Rule “lib” should run for packages depending on webpack-config-jaid
    // webpack-config-jaid also depends on itself, but it imports its own source instead of a Node dependency
    // So we need to add it as an exception here
    if (this.pkg.name === "webpack-config-jaid") {
      return true
    }
    if (this.pkg.webpackConfigJaid.endsWith("Lib") || this.pkg.webpackConfigJaid.endsWith("Class")) {
      return true
    }
    return false
  }

  init() {
    this.addTester(new FileExact("jest.config.js", jestConfig))
  }

}