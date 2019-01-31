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

    const code = req.body.input.code
    const parsedInputs = JSON.parse(req.body.input.question.input)
    const parsedOutputs = JSON.parse(req.body.input.question.output)

    for (let i = 0; i < parsedInputs.length; i++) {
      let input = JSON.stringify(parsedInputs[i])
      resultArray.push([vm.run(`(${code})(${input})`)])
    }

    for (let i = 0; i < parsedOutputs.length; i++) {
      for (let j = 0; j < parsedOutputs[i].length; j++)
        if (resultArray[i][j] !== parsedOutputs[i][j]) {
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
