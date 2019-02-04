const {VM} = require('vm2')
const fs = require('fs')
const {expect} = require('chai')
const input = [
  [54, 77, 22, 656, 2, 6, 444],
  [7, 3, 5],
  [23, 999999, 24, 65, 21]
]
const output = [54, 5, 24]
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
                userCodeResult: (${userCode})(${JSON.stringify(item)}),
                userConsoleHistory: console.logHistory
              }
            })()`)
    } catch (error) {
      console.log(error.stack)
      throw new SyntaxError('code failure - stopping tests')
    }
    try {
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
    } catch (error) {
      console.error(error)
    }
  })
})
