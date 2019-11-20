import resolveAny from "resolve-any"

const rules = {}
const rulesRequire = require.context("./rules/", true, /index.js$/)
for (const value of rulesRequire.keys()) {
  const {ruleName} = value.match(/[/\\](?<ruleName>.+?)[/\\]index\.js$/).groups
  rules[ruleName] = rulesRequire(value)
}

async function main() {
  const ruleTestResults = {}
  for (const [ruleName, rule] of Object.entries(rules)) {
    let isRelevantToRepo = false
    if (rule.test) {
      isRelevantToRepo = await resolveAny(rule.test)
    }
    ruleTestResults[ruleName] = isRelevantToRepo
  }
  Object.keys(rules).filter(async ruleName => {
    const rule = rules[ruleName]
    if (!rule.test) {
      return false
    }
    return rule.test()
  })
  // .console.log(`Rules: ${Object.keys(rules).join(" ")}`)
}

main()