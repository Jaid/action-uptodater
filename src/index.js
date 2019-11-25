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
import pFilter from "p-filter"

import pullBody from "./pullBody.hbs"

// GitHub Actions CI supports color, chalk just does not know that
chalk.level = chalk.Level.Ansi256

/**
 * @typedef {Object} ProjectInfo
 * @prop {Object} pkg
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
  console.log(`Selected rules: ${relevantRules.map(rule => rule.id)}`)
}

main().catch(error => {
  console.error(error)
  setFailed("jaid/action-uptodater failed")
})