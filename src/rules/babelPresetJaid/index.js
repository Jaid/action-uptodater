import hasDependency from "lib/hasDependency"

import Rule from "src/Rule"
import FileHasContent from "src/testers/FileHasContent"

export default new class extends Rule {

  title = "Depends on babel-preset-jaid"

  /**
   * @return {Promise<boolean>}
   */
  async isRelevantToRepo() {
    return hasDependency("babel-preset-jaid")
  }

  constructor() {
    super()
    this.addTester(new FileHasContent("jest.config.js"))
  }

}