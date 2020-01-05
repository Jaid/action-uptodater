import Rule from "src/Rule"
import FileExact from "src/testers/FileExact"

import jestConfig from "!raw-loader!./jest.config.js"

export default new class extends Rule {

  title = "Node library"

  /**
   * @return {Promise<boolean>}
   */
  async isRelevantToRepo() {
    if (! this.hasDependency("webpack-config-jaid")) {
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
    this.addTester(new FileExact("jest.config.js", jestConfig))
  }

}