import Rule from "../../Rule.js"
import FileExact from "../../testers/FileExact.js"
import eslintRcText from "./eslintrc.txt"

export default new class extends Rule {

  title = "Depends on eslint-config-jaid"

  /**
   * @return {Promise<boolean>}
   */
  async isRelevantToRepo() {
    return this.hasDevelopmentDependency("eslint-config-jaid")
  }

  init() {
    this.addTester(new FileExact(".eslintrc.json", eslintRcText))
  }

}