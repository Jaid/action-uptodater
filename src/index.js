import resolveAny from "resolve-any"

const rules = {}
const rulesRequire = require.context("./rules/", true, /index.js$/)
for (const value of rulesRequire.keys()) {
  const {ruleName} = value.match(/[/\\](?<ruleName>.+?)[/\\]index\.js$/).groups
  rules[ruleName] = rulesRequire(value)
}

async function main() {
  const relevantRuleNames = []
  for (const [ruleName, rule] of Object.entries(rules)) {
    if (rule.test) {
      const isRelevantToRepo = await resolveAny(rule.test)
      if (isRelevantToRepo) {
        relevantRuleNames.push(ruleName)
      }
    }
  }
  Object.keys(rules).filter(async ruleName => {
    const rule = rules[ruleName]
    if (!rule.test) {
      return false
    }
    return rule.test()
  })
  console.log(`Applied rules: ${relevantRuleNames.join(" ")}`)
}

main()