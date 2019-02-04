const {VM} = require('vm2')
const fs = require('fs')
const {expect} = require('chai')
const input = [
  ['name', 'my', 'Joe', 'hi'],
  ["Jason's", 'name', 'is', 'actually', 'spelled', 'JSON']
]
const output = [
  ['Joe', 'hi', 'my', 'name'],
  ['JSON', "Jason's", 'actually', 'is', 'name', 'spelled']
]
const userCode = fs.readFileSync(`./userCode-${process.env.sandboxId}.js`)

describe(`twoSum question`, () => {
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
      )}), output expected to be an array`, () => {
        expect(userCodeResult).to.be.a('array')
      })
      it(`Expected output: ${output[idx]}, got: ${userCodeResult}`, () => {
        expect(userCodeResult).to.eql(output[idx])
      })
    } catch (error) {
      console.error(error)
    }
  })
})
