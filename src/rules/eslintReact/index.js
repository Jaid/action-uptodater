import Rule from "../../Rule.js"
import FileExact from "../../testers/FileExact.js"

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