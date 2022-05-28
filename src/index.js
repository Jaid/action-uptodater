import {endGroup, setFailed, startGroup} from "@actions/core"
import {context} from "@actions/github"
import CommitManager from "./lib/esm/commit-from-action.js"
import getBooleanInput from "./lib/esm/get-boolean-action-input.js"
import hasContent from "./lib/esm/has-content.js"
import {isFunction} from "lodash"
import pFilter from "p-filter"
import zahl from "./lib/esm/zahl.js"

import Fix from "./Fix.js"
import chalk from "./lib/chalk.js"
import getPkg from "./lib/getPkg.js"
import pullBody from "./pullBody.hbs"

/**
 * @typedef {Object} ProjectInfo
 * @prop {Object} pkg
 * @prop {boolean} shouldFix
 * @prop {boolean} autoApprove
 */

/**
 * @type {import("src/Rule").default[]}
 */
let rules = []

const rulesRequire = require.context("./rules/", true, /index.js$/)
for (const value of rulesRequire.keys()) {
  const {ruleName} = value.match(/[/\\](?<ruleName>.+?)[/\\]index\.js$/).groups
  const rule = new rulesRequire(value).default
  rule.id = ruleName
  rules.push(rule)
}

async function main() {
  console.log(`${process.env.REPLACE_PKG_NAME} v${process.env.REPLACE_PKG_VERSION}`)
  console.log(`${zahl(Object.keys(rules).length, "rule")} loaded`)
  const projectInfo = {
    pkg: await getPkg(),
    shouldFix: getBooleanInput("fix"),
    autoApprove: getBooleanInput("approve"),
  }
  for (const rule of rules) {
    rule.pkg = {...projectInfo.pkg}
    if (isFunction(rule.init)) {
      await rule.init()
    }
  }
  if (projectInfo.shouldFix) {
    if (projectInfo.autoApprove) {
      console.log("Autofixing is enabled, pull requests will be automatically approved and merged")
    } else {
      console.log("Autofixing is enabled, approving pull requests must be done manually")
    }
    Fix.commitManager = new CommitManager({
      autoApprove: projectInfo.autoApprove,
      autoRemoveBranch: getBooleanInput("removeBranch", {required: true}),
      githubTokenInputName: "token",
      branchPrefix: "fix-",
      pullRequestTitle: commitManager => `Applied ${zahl(commitManager.commits, "fix")} from jaid/action-uptodater`,
      pullRequestBody: commitManager => pullBody({
        ...context.repo,
        sha7: context.sha?.slice(0, 8),
        autoApprove: projectInfo.autoApprove,
        sha: context.sha,
        actionRepo: "Jaid/action-uptodater",
        actionPage: "https://github.com/marketplace/actions/uptodater",
        branch: commitManager.branch,
      }),
      mergeMessage: commitManager => `Automatically merged boilerplate update from #${commitManager.pullNumber}`,
      ignoreFiles: ["package-lock.json"],
    })
  }
  /**
   * @type {import("src/Rule").default[]}
   */
  rules = await pFilter(Object.values(rules), async rule => {
    const isRelevantToRepo = await rule.isRelevantToRepo(projectInfo)
    return isRelevantToRepo
  })
  console.log(`Selected rules: ${rules.map(rule => rule.id).join(", ")}`)
  for (const rule of rules) {
    for (const tester of rule.testers) {
      await tester.run(projectInfo)
    }
  }
  await Fix.commitManager?.push()
  const totalFailedTests = rules.reduce((count, rule) => count + rule.failedTests, 0)
  for (const rule of rules) {
    const tests = rule.passedTests + rule.failedTests
    const backgroundColor = rule.failedTests ? chalk.bgRed : chalk.bgGreen
    console.log(`${backgroundColor("  ")}${rule.consoleIcon}${backgroundColor(` ${rule.getTitle()} (${rule.passedTests}/${tests})`.padEnd(60))}`)
    for (const tester of rule.testers) {
      let testerLine = `${tester.consoleIcon} ${tester.ansiTitle}`
      if (hasContent(tester.appliedFixes)) {
        testerLine += ` (${zahl(tester.appliedFixes, "fix")} applied)`
      }
      startGroup(testerLine)
      for (const logMessage of tester.logMessages) {
        console.log(logMessage)
      }
      endGroup()
    }
  }
  if (totalFailedTests !== 0) {
    const message = projectInfo.shouldFix ? `${zahl(totalFailedTests, "test")} did fail and could not automatically be fixed` : `${zahl(totalFailedTests, "test")} did fail and autofixing is disabled`
    setFailed(message)
  }
}

main().catch(error => {
  console.error(error)
  setFailed("jaid/action-uptodater threw an Error")
})