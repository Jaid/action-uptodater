import Rule from "src/Rule"
import FileExact from "src/testers/FileExact"

export default new class extends Rule {

  title = "Depends on eslint-config-jaid-react"

  /**
   * @return {Promise<boolean>}
   */
  async isRelevantToRepo() {
    return this.hasDevelopmentDependency("eslint-config-jaid-react")
  }

  init() {
    this.addTester(new FileExact(".eslintrc.json", require("./eslintrc.txt").default))
  }

}