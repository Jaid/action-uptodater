import Rule from "../Rule"

export default new class extends Rule {

  constructor() {
    super()
    this.assertFileHasExact("license.txt", require("./license.txt").default)
    this.assertFileHasExact(".editorconfig", require("./editorconfig.txt").default)
    this.assertFileHasContent("readme.md")
  }

}