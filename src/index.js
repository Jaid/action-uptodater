const rules = {}
const rulesRequire = require.context("./rules/", true, /index.js$/)
for (const value of rulesRequire.keys()) {
  const {ruleName} = value.match(/[/\\](?<ruleName>.+?)[/\\]index\.js$/).groups
  rules[ruleName] = rulesRequire(value)
}

async function main() {
  console.log(`Rules: ${Object.keys(rules).join(" ")}`)
}

main()