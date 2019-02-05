const {VM} = require('vm2')
const fs = require('fs')
const {expect} = require('chai')
const input = [
  [[[1, 3], [6, 9]], [2, 5]],
  [[[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], [4, 8]]
]
const output = [[[1, 5], [6, 9]], [[1, 2], [3, 10], [12, 16]]]
const userCode = fs.readFileSync(`./userCode-${process.env.sandboxId}.js`)

describe(`insertIntervals question`, () => {
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
    )}), output expected to be an array`, () => {
      expect(userCodeResult).to.be.a('array')
    })
    it(`Expected output: ${output[idx]}, got: ${userCodeResult}`, () => {
      expect(userCodeResult).to.eql(output[idx])
    })
  })
})
