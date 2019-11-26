import fsp from "@absolunet/fsp"
import {getInput} from "@actions/core"
import {exec} from "@actions/exec"
import {context, GitHub} from "@actions/github"
import isGitRepoDirty from "is-git-repo-dirty"
import chalk from "chalk"

import pullBody from "./pullBody.hbs"

export default class Fix {

  /**
   * @type {string}
   */
  static branchName = null

  /**
   * @type {number}
   */
  static commits = 0

  /**
   * @type {string}
   */
  fileName = null

  /**
   * @type {string|boolean}
   */
  newContent = null

  /**
   * @type {import("src/Tester").default}
   */
  tester = null

  /**
   * @type {boolean}
   */
  hasBeenApplied = false

  static async push() {
    if (Fix.commits === 0) {
      return
    }
    const token = getInput("token", {required: true})
    await exec("git", ["push", `https://${process.env.GITHUB_ACTOR}:${token}@github.com/${process.env.GITHUB_REPOSITORY}.git`, `HEAD:${Fix.branchName}`])
    const octokit = new GitHub(token)
    const sha7 = context.sha.slice(0, 8)
    const autoApprove = getInput("approve", {required: true})
    const pullCreateResult = await octokit.pulls.create({
      ...context.repo,
      title: "test",
      body: pullBody({
        ...context.repo,
        sha7,
        autoApprove,
        sha: context.sha,
        actionRepo: "Jaid/action-uptodater",
        actionPage: "https://github.com/marketplace/actions/validate-boilerplate-code",
        branch: Fix.branchName,
      }),
      head: Fix.branchName,
      base: "master",
    })
    const greenPullLink = chalk.greenBright(`https://github.com/${context.repo.owner}/${context.repo.repo}/pull/${pullCreateResult.data.number}`)
    console.log(`Pull created: ${greenPullLink}`)
    if (!autoApprove) {
      return
    }
    await octokit.pulls.merge({
      ...context.repo,
      pull_number: pullCreateResult.data.number,
      commit_title: `Automatically merged boilerplate update from #${pullCreateResult.data.number}`,
    })
    await octokit.git.deleteRef({
      ...context.repo,
      ref: `heads/${Fix.branchName}`,
    })

  }

  static async commit(message) {
    if (Fix.branchName === null) {
      Fix.branchName = `fix-${context.sha.slice(0, 8)}`
      console.log(`First commit, switching to new branch ${Fix.branchName}`)
      await exec("git", ["checkout", "-b", Fix.branchName])
      await exec("git", ["config", "user.email", "action@github.com"])
      await exec("git", ["config", "user.name", "GitHub Action"])
    }
    await exec("git", ["add", "--all"])
    await exec("git", ["commit", "--all", "--message", message])
    Fix.commits++
  }

  constructor(fileName, newContent) {
    this.fileName = fileName
    this.newContent = newContent
  }

  log(line) {
    this.tester.logMessages.push(line)
  }

  async apply() {
    this.log(this.getAnsiTitle())
    if (this.newContent === false) {
      await fsp.unlink(this.fileName)
    } else {
      await fsp.outputFile(this.fileName, this.newContent)
    }
    const isDirtyNow = await isGitRepoDirty()
    if (!isDirtyNow) {
      return
    }
    const commitMessage = `autofix: ${this.tester.title}`
    this.log(`${chalk.gray("Commit:")} ${commitMessage}`)
    await Fix.commit(commitMessage)
  }

  /**
   * @return {string}
   */
  getAnsiTitle() {
    if (this.newContent === false) {
      return `Delete ${chalk.yellow(this.fileName)}`
    } else {
      return `Modify ${chalk.yellow(this.fileName)}`
    }
  }

}