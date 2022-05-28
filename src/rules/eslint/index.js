import Rule from "../../Rule"
import FileExact from "../../testers/FileExact"

export default new class extends Rule {

  title = "Depends on eslint"

  /**
   * @return {Promise<boolean>}
   */
  async isRelevantToRepo() {
    return this.hasDependency("eslint")
  }

  init() {
    this.addTester(new FileExact(".eslintignore", require("./eslintignore.txt").default))
  }

}