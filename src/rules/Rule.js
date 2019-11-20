import path from "path"

import hasContent from "has-content"
import hasha from "hasha"
import globby from "globby"

export default class Rule {

  testers = []

  isRelevantToRepo() {
    return true
  }

  hasTesters() {
    return hasContent(this.testers)
  }

  addTester(testFunction) {
    this.testers.push(testFunction)
  }

  matchFileExact(fileName, expectedContents) {
    this.addTester(async () => {
      const file = path.resolve(fileName)
      const [expectedHash, fileHash] = await Promise.all([
        hasha.async(expectedContents, {
          algorithm: "md5",
        }),
        hasha.fromFile(file, {
          algorithm: "md5",
        }),
      ])
      console.log(`Testing file ${file} for hash ${expectedHash}`)
      if (expectedHash === fileHash) {
        return true
      }
      console.log(`They are not equal, got hash ${fileHash} from file`)
      return false
    })
  }

}