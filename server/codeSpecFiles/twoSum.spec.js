const {VM} = require('vm2')
const fs = require('fs')
const {expect} = require('chai')

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

const input = [[[2, 7, 11, 15], 9], [[1234, 5678, 9012], 14690], [[2, 2, 3], 4]]
const output = [[0, 1], [1, 2], [0, 1]]
const userCode = fs.readFileSync(`./userCode-${process.env.sandboxId}.js`)

describe(`twoSum question`, () => {
  try {
    console.log('Log:')
    input.forEach((item, idx) => {
      let {userCodeResult, userConsoleHistory} = vm.run(`(function(){
        return {
          userCodeResult: ((${userCode})(${(input[idx][0], input[idx][1])})),
          userConsoleHistory: console.logHistory
        }
      })()`)
      userConsoleHistory.forEach(line => console.log(line))
      userConsoleHistory = []
      it(`The input for the question: ${(input[idx][0],
      input[idx][1])}, output expected to be an array`, () => {
        expect(userCodeResult).to.be.a('array')
      })
      it(`Expected output: ${output[idx]}, got: ${userCodeResult}`, () => {
        expect(userCodeResult).to.eql(output[idx])
      })
      userConsoleHistory.forEach(line => console.log(line))
    })
  } catch (error) {
    console.error(error)
  }
})
