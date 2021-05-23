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
    console.log("step1")
    if (!this.hasDependency("webpack-config-jaid")) {
      return false
    }
    console.log("step2")
    if (!this.pkg.webpackConfigJaid) {
      return false
    }
    console.log("step3")
    // Rule “lib” should run for packages depending on webpack-config-jaid
    // webpack-config-jaid also depends on itself, but it imports its own source instead of a Node dependency
    // So we need to add it as an exception here
    if (this.pkg.name === "webpack-config-jaid") {
      return true
    }
    console.log("step4")
    if (this.pkg.webpackConfigJaid.endsWith("Lib") || this.pkg.webpackConfigJaid.endsWith("Class")) {
      return true
    }
    console.log("step5")
    return false
  }

  init() {
    this.addTester(new FileExact("jest.config.js", jestConfig))
  }

}