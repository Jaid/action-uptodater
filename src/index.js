import resolveAny from "resolve-any"
import {pick} from "lodash"
import {setFailed} from "@actions/core"

const rules = {}
const rulesRequire = require.context("./rules/", true, /index.js$/)
for (const value of rulesRequire.keys()) {
  const {ruleName} = value.match(/[/\\](?<ruleName>.+?)[/\\]index\.js$/).groups
  rules[ruleName] = new rulesRequire(value).default
}

async function main() {
  const relevantRuleNames = []
  for (const [ruleName, rule] of Object.entries(rules)) {
    if (!rule.test) {
      console.debug("Rule %s does not have a test function, this is probably unintended", ruleName)
      continue
    }
    const isRelevantToRepo = await resolveAny(rule.test)
    if (isRelevantToRepo) {
      relevantRuleNames.push(ruleName)
    }
  }
  Object.keys(rules).filter(async ruleName => {
    const rule = rules[ruleName]
    if (!rule.test) {
      return false
    }
    return rule.test()
  })
  console.log(`Matching rules: ${relevantRuleNames.join(" ")}`)
  const relevantRules = pick(rules, relevantRuleNames)
  for (const [ruleName, rule] of Object.entries(relevantRules)) {
    try {
      console.group(`Rule ${ruleName}`)
    } catch (error) {
      console.error(`Processing rule ${ruleName} failed`)
      console.error(error)
    }
    console.groupEnd()
  }
}

main().catch(error => {
  console.error(error)
  setFailed("jaid/action-node-boilerplate failed")
})