import path from "path"

import resolveAny from "resolve-any"
import {pick} from "lodash"
import {setFailed, startGroup, endGroup, getInput} from "@actions/core"
import {context, GitHub} from "@actions/github"
import {exec} from "@actions/exec"
import zahl from "zahl"
import fsp from "@absolunet/fsp"
import octokitCreatePullRequest from "octokit-create-pull-request"
import Octokit from "@octokit/rest"

/**
 * @type {Object<string, import("./rules/Rule").default>}
 */
const rules = {}

const rulesRequire = require.context("./rules/", true, /index.js$/)
for (const value of rulesRequire.keys()) {
  const {ruleName} = value.match(/[/\\](?<ruleName>.+?)[/\\]index\.js$/).groups
  rules[ruleName] = new rulesRequire(value).default
}

console.log(`${zahl(Object.keys(rules).length, "rule")} loaded`)

async function getPkg() {
  const file = path.resolve("package.json")
  const exists = await fsp.pathExists(file)
  if (!exists) {
    return null
  }
  const pkg = await fsp.readJson(file)
  return pkg
}

async function main() {
  const info = {
    pkg: await getPkg(),
  }
  const relevantRuleNames = []
  for (const [ruleName, rule] of Object.entries(rules)) {
    if (!rule.isRelevantToRepo) {
      console.debug("Rule %s does not have a isRelevantToRepo function, this is probably unintended", ruleName)
      continue
    }
    const isRelevantToRepo = await resolveAny(rule.isRelevantToRepo)
    if (isRelevantToRepo) {
      relevantRuleNames.push(ruleName)
    }
  }
  console.log(`Matching rules: ${relevantRuleNames.join(" ")}`)
  const relevantRules = pick(rules, relevantRuleNames)
  let passedTests = 0
  let failedTests = 0
  for (const [ruleName, rule] of Object.entries(relevantRules)) {
    try {
      startGroup(`Rule ${ruleName}`)
      if (!rule.hasTesters()) {
        console.log("Rule does not have any testers, skipping")
        continue
      }
      for (const tester of rule.testers) {
        const result = await tester.run()
        if (result === false) {
          failedTests++
          continue
        }
        passedTests++
      }
    } catch (error) {
      console.error(`Processing rule ${ruleName} failed`)
      console.error(error)
    }
    endGroup()
  }
  const totalTests = passedTests + failedTests
  if (failedTests) {
    setFailed(`Only ${passedTests}/${totalTests} tests passed`)
    const token = getInput("token", {required: true})
    const {owner, repo} = context.repo
    // const pullRequestId = await octokit.createPullRequest({
    //   owner,
    //   repo,
    //   title: "Pull Request",
    //   body: "abc",
    //   head: "uibpobiiu",
    //   changes: {
    //     commit: "testcommit",
    //     files: {
    //       "readme.md": "hi",
    //     },
    //   },
    // })
    const readmeContent = await fsp.readFile("readme.md")
    await fsp.outputFile("readme.md", `${readmeContent}1`)
    await exec("git", "status")
    await exec("git", ["config", "user.email", "action@github.com"])
    await exec("git", ["config", "user.name", "GitHub Action"])
    await exec("git", "status")
    await exec("git", ["add", "."])
    await exec("git", ["commit", "--all", "--message", "Automated Test Commit"])
    await exec("git", ["push"])
    // console.log(pullRequestId)
  }
}

main().catch(error => {
  console.error(error)
  setFailed("jaid/action-node-boilerplate failed")
})