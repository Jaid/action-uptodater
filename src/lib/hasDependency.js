import hasContent, {isEmpty} from "has-content"

import getPkg from "./getPkg"

const dependencyFields = [
  "dependencies",
  "devDependencies",
  "optionalDependencies",
  "peerDependencies",
  "bundleDependencies",
  "bundledDependencies",
]

export default async function (dependency) {
  const pkg = await getPkg()
  if (isEmpty(pkg)) {
    return false
  }
  for (const key of dependencyFields) {
    if (hasContent(pkg[key]?.[dependency])) {
      return true
    }
  }
  return false
}