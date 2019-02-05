const {VM} = require('vm2')
const fs = require('fs')
const {expect} = require('chai')
const input = ['castle', 'elephant', 'andromeda']
const output = ['cstl', 'lphnt', 'ndrmd']
const userCode = fs.readFileSync(`./userCode-${process.env.sandboxId}.js`)

describe(`noVowels question`, () => {
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
                userCodeResult: (${userCode})('${item}'),
                userConsoleHistory: console.logHistory
              }
            })()`)
    } catch (error) {
      console.log(error.stack)
      throw new SyntaxError('code failure - stopping tests')
    }
    const {userCodeResult, userConsoleHistory} = result
    userConsoleHistory.forEach(line => console.log(line))
    it(`The input for the question: (${item}), output expected to be a string`, () => {
      expect(userCodeResult).to.be.a('string')
    })
    it(`Expected output: ${output[idx]}, got: ${userCodeResult}`, () => {
      expect(userCodeResult).to.eql(`${output[idx]}`)
    })
  })
})
