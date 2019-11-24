import path from "path"

import hasContent, {isEmpty} from "has-content"
import hasha from "hasha"
import fsp from "@absolunet/fsp"

export default class {

  /**
   * @type {import("src/Tester").default[]}
   */
  testers = []

  /**
   * @type {string}
   */
  id = null

  /**
   * @type {string}
   */
  title = null

  getTitle() {
    if (hasContent(this.title)) {
      return this.title
    }
    return this.id
  }

  /**
 * @
 */
  isRelevantToRepo(projectInfo) {
    return true
  }

  hasTesters() {
    return hasContent(this.testers)
  }

  addTester(name, testFunction) {
    this.testers.push({
      name,
      test: testFunction,
    })
  }

  assertFileHasExact(fileName, expectedContents) {
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
      console.log(`Assert that ${file} has hash ${expectedHash}`)
      if (expectedHash === fileHash) {
        return true
      }
      console.log(`They are not equal, got hash ${fileHash} from file`)
      return false
    })
  }

  assertFileExists(fileName) {
    this.addTester(async () => {
      const file = path.resolve(fileName)
      console.log(`Assert that ${file} exists`)
      const exists = await fsp.pathExists(file)
      if (!exists) {
        console.log(`${file} does not exist`)
      }
      return exists
    })
  }

  assertFileHasContent(fileName) {
    this.addTester(async () => {
      const file = path.resolve(fileName)
      console.log(`Assert that ${file} exists and is not empty`)
      const exists = await fsp.pathExists(file)
      if (!exists) {
        console.log(`${file} does not exist`)
        return false
      }
      const content = await fsp.readFile(file)
      if (isEmpty(content)) {
        console.log(`${file} is empty`)
        return false
      }
      return exists
    })
  }

}