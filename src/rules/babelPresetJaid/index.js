import Rule from "../../Rule.js"
import FileHasContent from "../../testers/FileHasContent.js"

export default new class extends Rule {

  title = "Depends on babel-preset-jaid"

  /**
   * @return {Promise<boolean>}
   */
  async isRelevantToRepo() {
    return this.hasDevelopmentDependency("babel-preset-jaid")
  }

  init() {
    this.addTester(new FileHasContent(".babelrc.json"))
  }

}