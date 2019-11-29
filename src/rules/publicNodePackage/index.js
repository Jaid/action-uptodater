import Rule from "src/Rule"
import getPkg from "lib/getPkg"
import FileExact from "src/testers/FileExact"

export default new class extends Rule {

  title = "Node packages that gets published publicly"

  /**
   * @return {Promise<boolean>}
   */
  async isRelevantToRepo() {
    const pkg = await getPkg()
    if (!pkg) {
      return false
    }
    if (pkg.private) {
      return false
    }
    if (!pkg.name) {
      return false
    }
    return true
  }

  constructor() {
    super()
    this.addTester(new FileExact(".github/workflows/publishPackage.yml", require("!raw-loader!./publishPackage.yml").default))
  }

}