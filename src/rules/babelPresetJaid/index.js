import Rule from "src/Rule"
import FileHasContent from "src/testers/FileHasContent"

export default new class extends Rule {

  title = "Depends on babel-preset-jaid"

  /**
   * @return {Promise<boolean>}
   */
  async isRelevantToRepo() {
    return this.hasDevelopmentDependency("babel-preset-jaid")
  }

  init() {
    this.addTester(new FileHasContent("jest.config.js"))
  }

}