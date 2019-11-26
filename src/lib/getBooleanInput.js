import {getInput} from "@actions/core"

export default function (key, options) {
  const value = getInput(key, options)
  return /^\s*(true|1)\s*$/i.test(value)
}