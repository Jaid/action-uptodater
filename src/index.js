import path from "path"

import resolveAny from "resolve-any"
import {pick} from "lodash"
import {setFailed, getInput} from "@actions/core"
import {context, GitHub} from "@actions/github"
import {exec} from "@actions/exec"
import zahl from "zahl"
import fsp from "@absolunet/fsp"
import isGitRepoDirty from "is-git-repo-dirty"
import hasContent, {isEmpty} from "has-content"
import chalk from "chalk"
import readPackageJson from "read-package-json-fast"

import pullBody from "./pullBody.hbs"

/**
 * @typedef {Object} ProjectInfo
 * @prop {Object} pkg
 */

/**
 * @type {Object<string, import("./rules/Rule").default>}
 */
const rules = {}

const rulesRequire = require.context("./rules/", true, /index.js$/)
for (const value of rulesRequire.keys()) {
  const {ruleName} = value.match(/[/\\](?<ruleName>.+?)[/\\]index\.js$/).groups
  const rule = new rulesRequire(value).default
  rule.id = ruleName
  rules[ruleName] = rule
}

console.log(`${zahl(Object.keys(rules).length, "rule")} loaded`)

async function getPkg() {
  const file = path.resolve("package.json")
  const exists = await fsp.pathExists(file)
  if (!exists) {
    return null
  }
  const pkg = await readPackageJson(file)
  return pkg
}

async function main() {
  const projectInfo = {
    pkg: await getPkg(),
  }
  const relevantRuleNames = []
  for (const [ruleName, rule] of Object.entries(rules)) {
    if (!rule.isRelevantToRepo) {
      console.debug("Rule %s does not have a isRelevantToRepo function, this is probably unintended", ruleName)
      continue
    }
    // TODO: Add argument forwarding to resolve-any
    // const isRelevantToRepo = await resolveAny(rule.isRelevantToRepo)
    const isRelevantToRepo = rule.isRelevantToRepo(projectInfo)
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
      if (!rule.hasTesters()) {
        console.log("Rule does not have any testers, skipping")
        continue
      }
      console.log(`Rule ${ruleName} (${zahl(rule.testers, "tester")})`)
      for (const tester of rule.testers) {
        const result = await tester.run(projectInfo)
        if (result === false) {
          failedTests++
          if (hasContent(tester.collectFixes)) {
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
  }
  if (failedTests) {
    const token = getInput("token", {required: true})
    const totalTests = passedTests + failedTests
    const failedMessage = `Only ${passedTests}/${totalTests} tests passed`
    if (isEmpty(fixes)) {
      setFailed(failedMessage)
      return
    }
    const shouldPush = getInput("push", {required: true})
    if (!shouldPush) {
      setFailed(failedMessage)
      return
    }
    let fixedTests = 0
    const branchName = `fix-${context.sha.slice(0, 8)}`
    await exec("git", ["checkout", "-b", branchName])
    await exec("git", ["config", "user.email", "action@github.com"])
    await exec("git", ["config", "user.name", "GitHub Action"])
    const useEmojis = getInput("useEmojis", {required: true})
    for (const fix of fixes) {
      console.log(`Change ${fix.fileName}`)
      await fsp.outputFile(fix.fileName, fix.newContent)
      const isDirtyNow = await isGitRepoDirty()
      if (!isDirtyNow) {
        continue
      }
      const commitMessagePrefix = useEmojis ? "🔧" : "Autofix:"
      await exec("git", ["add", "."])
      await exec("git", ["commit", "--all", "--message", `${commitMessagePrefix} ${fix.tester.name}`])
      fixedTests++
    }
    if (!fixedTests) {
      setFailed(`${failedMessage}, no autofixes applied`)
      return
    }
    console.log(`${fixedTests}/${zahl(failedTests, "test")} could successfully apply an autofix`)
    const isEverythingFixed = fixedTests === failedTests
    if (!isEverythingFixed) {
      setFailed(`${failedMessage}, ${zahl(fixedTests, "fix")} applied`)
    }
    await exec("git", ["push", `https://${process.env.GITHUB_ACTOR}:${token}@github.com/${process.env.GITHUB_REPOSITORY}.git`, `HEAD:${branchName}`])
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
        branch: branchName,
      }),
      head: branchName,
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
      ref: `heads/${branchName}`,
    })
  }
}

main().catch(error => {
  console.error(error)
  setFailed("jaid/action-uptodater failed")
})