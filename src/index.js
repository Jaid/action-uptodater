import path from "path"

import resolveAny from "resolve-any"
import {pick, isFunction} from "lodash"
import {setFailed, startGroup, endGroup, getInput} from "@actions/core"
import {context, GitHub} from "@actions/github"
import {exec} from "@actions/exec"
import zahl from "zahl"
import fsp from "@absolunet/fsp"
import octokitCreatePullRequest from "octokit-create-pull-request"
import Octokit from "@octokit/rest"
import hasContent, {isEmpty} from "has-content"

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
  for (const [key, value] of Object.entries(process.env)) {
    console.log(`${key}: ${value}`)
  }
  for (const [key, value] of Object.entries(context)) {
    console.log(`context.${key}: ${value}`)
  }
  for (const [key, value] of Object.entries(context.payload)) {
    console.log(`context.payload.${key}: ${value}`)
  }
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
  /**
   * @type {import("src/Fix").default[]}
   */
  let fixes = []
  for (const [ruleName, rule] of Object.entries(relevantRules)) {
    let fixables = 0
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
          if (isFunction(tester.collectFixes)) {
            tester.collectFixes()
            fixables += tester.fixes.length
            if (fixables > 0) {
              fixes = [...fixes, ...tester.fixes]
            }
            console.log(`This tester registered ${zahl(fixables, "possible fix")}`)
          }
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
  if (failedTests) {
    const token = getInput("token", {required: true})
    const totalTests = passedTests + failedTests
    setFailed(`Only ${passedTests}/${totalTests} tests passed`)
    if (isEmpty(fixes)) {
      return
    }
    const shouldPush = getInput("push", {required: true})
    if (!shouldPush) {
      return
    }
    const newBranch = `fix-${context.sha.slice(0, 8)}`
    console.log(`New branch: ${newBranch}`)
    for (const fix of fixes) {
      console.log(`Change ${fix.fileName}`)
      await fsp.outputFile(fix.fileName, fix.newContent)
    }
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
    // const readmeContent = await fsp.readFile("readme.md")
    // await fsp.outputFile("readme.md", `${readmeContent}1`)
    console.log(`GITHUB_ACTOR: ${process.env.GITHUB_ACTOR}`)
    console.log(`INPUT_GITHUB_TOKEN: ${process.env.INPUT_GITHUB_TOKEN}`)
    console.log(`REPOSITORY: ${process.env.REPOSITORY}`)
    console.log(`INPUT_REPOSITORY: ${process.env.INPUT_REPOSITORY}`)
    console.log(`GITHUB_REPOSITORY: ${process.env.GITHUB_REPOSITORY}`)
    await exec("git", "status")
    await exec("git", ["config", "user.email", "action@github.com"])
    await exec("git", ["config", "user.name", "GitHub Action"])
    await exec("git", "status")
    await exec("git", ["add", "."])
    await exec("git", ["commit", "--all", "--message", "Automated Test Commit"])
    // await exec("git", ["push", `https://${process.env.GITHUB_ACTOR}:${token}@github.com/${process.env.GITHUB_REPOSITORY}.git`, "HEAD:master"])
    // console.log(pullRequestId)
  }
}

main().catch(error => {
  console.error(error)
  setFailed("jaid/action-node-boilerplate failed")
})