import chalk from "chalk"
import figures from "figures"

export default {
  pass: chalk.green(figures.tick),
  fail: chalk.red(figures.cross),
  fix: "🔧",
  fixFailed: "💣",
}