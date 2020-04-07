import figures from "figures"

import chalk from "lib/chalk"

export default {
  pass: chalk.green(figures.tick),
  fail: chalk.red(figures.cross),
  fix: "🔧",
  fixFailed: "💣",
}