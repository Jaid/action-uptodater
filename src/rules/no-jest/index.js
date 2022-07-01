import Rule from "../../Rule.js"
import FileShouldNotExist from "src/testers/FileShouldNotExist.js"

export default new class extends Rule {

  title = "Node library"

  /**
   * @return {Promise<boolean>}
   */
  async isRelevantToRepo() {
    return !this.hasDevelopmentDependency("jest")
  }

  init() {
    this.addTester(new FileShouldNotExist("jest.config.json"))
    this.addTester(new FileShouldNotExist("jest.config.js"))
    this.addTester(new FileShouldNotExist("jest.config.ts"))
  }

}