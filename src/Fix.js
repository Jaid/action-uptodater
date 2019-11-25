import fsp from "@absolunet/fsp"
import {exec} from "@actions/exec"
import {context} from "@actions/github"
import isGitRepoDirty from "is-git-repo-dirty"

export default class Fix {

  static branchCreated = false

  /**
   * @type {string}
   */
  fileName = null

  /**
   * @type {string|boolean}
   */
  newContent = null

  /**
   * @type {import("src/testers/Tester").default}
   */
  tester = null

  constructor(fileName, newContent) {
    this.fileName = fileName
    this.newContent = newContent
  }

  async apply() {
    if (this.newContent === false) {
      console.log(`Delete ${this.fileName}`)
      await fsp.unlink(this.fileName)
    } else {
      console.log(`Modify ${this.fileName}`)
      await fsp.outputFile(this.fileName, this.newContent)
    }
    if (!Fix.branchCreated) {
      const branchName = `fix-${context.sha.slice(0, 8)}`
      await exec("git", ["checkout", "-b", branchName])
      await exec("git", ["config", "user.email", "action@github.com"])
      await exec("git", ["config", "user.name", "GitHub Action"])
    }
    const isDirtyNow = await isGitRepoDirty()
    if (!isDirtyNow) {
      return
    }
    await exec("git", ["add", "."])
    await exec("git", ["commit", "--all", "--message", `autofix: ${this.tester.name}`])
  }

}