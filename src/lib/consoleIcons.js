import figures from "figures"

import chalk from "./chalk.js"

export default {
  pass: chalk.green(figures.tick),
  fail: chalk.red(figures.cross),
  fix: "🔧",
  fixFailed: "💣",
}