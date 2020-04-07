import Rule from "src/Rule"
import ScriptExact from "src/testers/ScriptExact"

export default new class extends Rule {

  title = "GitHub Action"

  /**
   * @return {Promise<boolean>}
   */
  async isRelevantToRepo() {
    const fileExists = await this.fileExists("action.yml")
    return fileExists
  }

  init() {
    this.addTester(new ScriptExact("build", "rm -rf build && NODE_ENV=production webpack"))
    this.addTester(new ScriptExact("buildPush", "npm run build && git add build && git-flush-cli 'Rebuilt src/'"))
    this.addTester(new ScriptExact("testOnGithub", "name=$(package-name-cli) && git-flush-cli 'Testing changes' && npm run buildPush && cd ../test && git pull && echo $(date-now) >> changefile.txt && git-flush-cli 'Random commit for testing action Jaid/$name' && cd ../$name"))
    this.addTester(new ScriptExact("prepareRelease", "npm run buildPush"))
  }

}