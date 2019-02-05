const {VM} = require('vm2')
const fs = require('fs')
const {expect} = require('chai')
const input = [
  [[1, 5, 17, 65, 88, 98], [2, 5, 34, 54, 65, 66, 67, 88, 99, 132]],
  [[3, 5, 7], [4, 6, 7]]
]
const output = [[5, 65, 88], [7]]
const userCode = fs.readFileSync(`./userCode-${process.env.sandboxId}.js`)

describe(`medianNum question`, () => {
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
                userCodeResult: (${userCode})(${JSON.stringify(
        input[idx][0]
      )},${JSON.stringify(input[idx][1])}),
                userConsoleHistory: console.logHistory
              }
            })()`)
    } catch (error) {
      console.log(error.stack)
      throw new SyntaxError('code failure - stopping tests')
    }
    const {userCodeResult, userConsoleHistory} = result
    userConsoleHistory.forEach(line => console.log(line))
    it(`The input for the question: [${JSON.stringify(
      input[idx][0]
    )},${JSON.stringify(
      input[idx][1]
    )}], output expected to be an array`, () => {
      expect(userCodeResult).to.be.a('array')
    })
    it(`Expected output: ${output[idx]}, got: ${userCodeResult}`, () => {
      expect(userCodeResult).to.eql(output[idx])
    })
  })
})
