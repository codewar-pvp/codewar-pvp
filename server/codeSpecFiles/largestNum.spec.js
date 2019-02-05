const {VM} = require('vm2')
const fs = require('fs')
const {expect} = require('chai')
const input = [[1, 2, 3], [7, 2, 3, 99, 3], [10, 23, 342, 87]]
const output = [3, 99, 342]
const userCode = fs.readFileSync(`./userCode-${process.env.sandboxId}.js`)

describe(`largestNum question`, () => {
  console.log('Log:')
  input.forEach((item, idx) => {
    const vm = new VM({
      timeout: 5000,
      sandbox: {
        console: {
          log(logStr) {
            this.logHistory.push(logStr.toString())
          },
          logHistory: []
        }
      }
    })
    let result
    try {
      result = vm.run(`(function(){
              return {
                userCodeResult: (${userCode})(${JSON.stringify(item)}),
                userConsoleHistory: console.logHistory
              }
            })()`)
    } catch (error) {
      console.log(error.stack)
      throw new SyntaxError('code failure - stopping tests')
    }
    const {userCodeResult, userConsoleHistory} = result
    userConsoleHistory.forEach(line => console.log(line))
    it(`The input for the question: (${JSON.stringify(
      item
    )}, output expected to be a number`, () => {
      expect(userCodeResult).to.be.a('number')
    })
    it(`Expected output: ${output[idx]}, got: ${userCodeResult}`, () => {
      expect(userCodeResult).to.eql(output[idx])
    })
  })
})
