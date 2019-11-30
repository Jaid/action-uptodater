import {setFailed, startGroup, endGroup} from "@actions/core"
import zahl from "zahl"
import hasContent from "has-content"
import chalk from "chalk"
import pFilter from "p-filter"
import getPkg from "lib/getPkg"
import getBooleanInput from "get-boolean-action-input"

import Fix from "./Fix"

// GitHub Actions CI supports color, chalk just does not know that
chalk.level = chalk.Level.Ansi256

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

console.log(`${zahl(Object.keys(rules).length, "rule")} loaded`)

async function main() {
  const projectInfo = {
    pkg: await getPkg(),
    shouldFix: getBooleanInput("fix"),
    autoApprove: getBooleanInput("approve"),
  }
  if (projectInfo.shouldFix) {
    if (projectInfo.autoApprove) {
      console.log("Autofixing is enabled, pull requests will be automatically approved and merged")
    } else {
      console.log("Autofixing is enabled, approving pull requests must be done manually")
    }
  }
  /**
   * @type {import("src/Rule").default[]}
   */
  rules = await pFilter(Object.values(rules), async rule => {
    // TODO: Add argument forwarding to resolve-any
    // const isRelevantToRepo = await resolveAny(rule.isRelevantToRepo)
    const isRelevantToRepo = await rule.isRelevantToRepo(projectInfo)
    return isRelevantToRepo
  })
  console.log(`Selected rules: ${rules.map(rule => rule.id).join(", ")}`)
  for (const rule of rules) {
    for (const tester of rule.testers) {
      await tester.run(projectInfo)
    }
  }
  await Fix.push(projectInfo.autoApprove)
  const totalPassedTests = rules.reduce((count, rule) => count + rule.passedTests, 0)
  const totalFailedTests = rules.reduce((count, rule) => count + rule.failedTests, 0)
  const totalTests = totalPassedTests + totalFailedTests
  console.log(chalk.bgCyan(`  === Summary (${totalPassedTests}/${zahl(totalTests, "test")} passed) ===  `))
  for (const rule of rules) {
    const tests = rule.passedTests + rule.failedTests
    const backgroundColor = rule.failedTests ? chalk.bgRed : chalk.bgGreen
    console.log(`${backgroundColor("  ")}${rule.consoleIcon}${backgroundColor(`${rule.getTitle()} (${rule.passedTests}/${tests})`.padEnd(60))}`)
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