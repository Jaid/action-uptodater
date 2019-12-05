import fsp from "@absolunet/fsp"
import path from "path"

export default async function () {
  const file = path.resolve("package.json")
  const exists = await fsp.pathExists(file)
  if (!exists) {
    return null
  }
  const pkg = await fsp.readJson5(file)
  return pkg
}