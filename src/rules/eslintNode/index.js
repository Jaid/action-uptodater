import Rule from "src/Rule"
import FileExact from "src/testers/FileExact"

export default new class extends Rule {

  title = "Depends on eslint-config-jaid"

  /**
   * @return {Promise<boolean>}
   */
  async isRelevantToRepo() {
    return this.hasDevelopmentDependency("eslint-config-jaid")
  }

  init() {
    this.addTester(new FileExact(".eslintrc.js", require("./eslintrc.txt").default))
  }

}