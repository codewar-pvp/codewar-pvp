const router = require('express').Router()
const {VM} = require('vm2')

const vm = new VM({
  timeout: 5000,
  sandbox: {}
})

router.post('/', async (req, res, next) => {
  try {
    let resultArray = []
    let success = true
    let output

    const code = req.body.input.code
    const tests = req.body.input.question.tests

    for (let i = 0; i < tests.length; i++) {
      resultArray.push(vm.run(`(${code})(${tests[i].input})`))
    }

    for (let i = 0; i < tests.length; i++) {
      if (tests[i].outputType !== 'string') {
        output = JSON.parse(tests[i].output)
      } else {
        output = tests[i].output
      }

      if (resultArray[i] !== output) {
        success = false
        break
      }
    }

    if (success) {
      res.json({output: 'You passed the tests!'})
    } else {
      res.json({output: 'You failed the tests! Try again!'})
    }
  } catch (err) {
    if (err.message === 'Script execution timed out.') {
      err.status = 400
    }
    next(err)
  }
})

module.exports = router
