import crypto from "node:crypto"

export default input => {
  return crypto.createHash("md5").update(input).digest("hex")
}