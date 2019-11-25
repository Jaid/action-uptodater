import path from "path"

import resolveAny from "resolve-any"
import {pick} from "lodash"
import {setFailed, getInput, startGroup, endGroup} from "@actions/core"
import {context, GitHub} from "@actions/github"
import {exec} from "@actions/exec"
import zahl from "zahl"
import fsp from "@absolunet/fsp"
import isGitRepoDirty from "is-git-repo-dirty"
import hasContent, {isEmpty} from "has-content"
import chalk from "chalk"
import pFilter from "p-filter"
import figures from "figures"

import pullBody from "./pullBody.hbs"

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
  // let passedTests = 0
  let failedTests = 0
  console.log(`Selected rules: ${relevantRules.map(rule => rule.id).join(", ")}`)
  for (const rule of rules) {
    console.log(chalk.yellow(`Rule ${rule.getTitle()} (${zahl(rule.testers, "tester")})`))
    for (const tester of rule.testers) {
      const result = await tester.run(projectInfo)
      if (result === false) {
        failedTests++
        if (tester.fixes) {
        //   fixables += tester.fixes.length
        //   if (fixables > 0) {
        //     fixes = [...fixes, ...tester.fixes]
        //   }
        //   console.log(`This tester registered ${zahl(fixables, "possible fix")}`)
        // }
        // continue
        }
      }
    }
  }
  console.log(chalk.bold("Summary:"))
  for (const rule of rules) {
    const totalTests = rule.passedTests + rule.failedTests
    const isRulePassed = rule.failedTests === 0
    const ruleIcon = isRulePassed ? chalk.green(figures.tick) : chalk.red(figures.cross)
    startGroup(`${ruleIcon} ${rule.getTitle()} (${rule.passedTests}/${totalTests})`)
    for (const tester of rule.testers) {
      if (tester.passed) {
        console.log(`${chalk.green(figures.tick)} ${tester.ansiTitle}`)
        continue
      }
      console.log(`${chalk.red(figures.cross)} ${tester.ansiTitle}`)
    }
    endGroup()
  }
}

main().catch(error => {
  console.error(error)
  setFailed("jaid/action-uptodater failed")
})