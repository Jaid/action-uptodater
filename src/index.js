import path from "path"

import {setFailed, getInput, startGroup, endGroup } from "@actions/core"
import zahl from "zahl"
import fsp from "@absolunet/fsp"
import hasContent from "has-content"
import chalk from "chalk"
import pFilter from "p-filter"

// GitHub Actions CI supports color, chalk just does not know that
chalk.level = chalk.Level.Ansi256

/**
 * @typedef {Object} ProjectInfo
 * @prop {Object} pkg
 * @prop {boolean} shouldFix
 */

/**
 * @type {import("src/Rule").default[]}
 */
const rules = []

const rulesRequire = require.context("./rules/", true, /index.js$/)
for (const value of rulesRequire.keys()) {
  const {ruleName} = value.match(/[/\\](?<ruleName>.+?)[/\\]index\.js$/).groups
  const rule = new rulesRequire(value).default
  rule.id = ruleName
  rules.push(rule)
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
  const projectInfo = {
    pkg: await getPkg(),
    shouldFix: Boolean(getInput("fix", {required: true})),
  }
  /**
   * @type {import("src/Rule").default[]}
   */
  const relevantRules = await pFilter(Object.values(rules), async rule => {
    // TODO: Add argument forwarding to resolve-any
    // const isRelevantToRepo = await resolveAny(rule.isRelevantToRepo)
    const isRelevantToRepo = await rule.isRelevantToRepo(projectInfo)
    return isRelevantToRepo
  })
  console.log(`Selected rules: ${relevantRules.map(rule => rule.id).join(", ")}`)
  for (const rule of rules) {
    for (const tester of rule.testers) {
      await tester.run(projectInfo)
    }
  }
  console.log(chalk.bold("Summary:"))
  for (const rule of rules) {
    const totalTests = rule.passedTests + rule.failedTests
    console.log(`${rule.consoleIcon} ${rule.getTitle()} (${rule.passedTests}/${totalTests})`)
    for (const tester of rule.testers) {
      let testerLine = `${tester.consoleIcon} ${tester.ansiTitle}`
      if (hasContent(tester.appliedFixes)) {
        testerLine += ` (${zahl(tester.appliedFixes, "fix")} applied)`
      }
      startGroup(testerLine)
      if (tester.passed) {
        console.log("Passed!")
      } else {
        console.log(tester.message)
      }
      for (const fix of tester.appliedFixes) {
        console.log(fix.getAnsiTitle())
      }
      endGroup()
    }
  }
}

main().catch(error => {
  console.error(error)
  setFailed("jaid/action-uptodater failed")
})