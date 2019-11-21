export default class Tester {

  /**
   * @type {string}
   */
  name = "Tester"

  /**
   * @type {Function}
   * This should be overriden
   */
  async test() {
    return true
  }

  setName(name) {
    this.name = name
  }

  setFunction(testFunction) {
    this.test = testFunction
  }

  async run() {
    const result = await this.test()
    if (result === false) {
      console.log(`(false) ${this.name}`)
      return false
    }
    console.log(`( true) ${this.name}`)
    return true
  }

}