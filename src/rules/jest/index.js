import Rule from "../../Rule.js"
import FileExact from "../../testers/FileExact.js"
import jestConfig from "./jest.config.hbs"
import jestLightConfig from "./jest.config-light.hbs"

export default new class extends Rule {

  title = "Node library"

  /**
   * @return {Promise<boolean>}
   */
  async isRelevantToRepo() {
    return this.hasDevelopmentDependency("jest")
  }

  init() {
    if (this.hasDevelopmentDependency("jest-light-runner")) {
      this.addTester(new FileExact("jest.config.json", jestLightConfig()))
    } else {
      this.addTester(new FileExact("jest.config.json", jestConfig()))
    }
  }

}