const router = require('express').Router()
const {VM} = require('vm2')
const {Question} = require('../db/models')

const vm = new VM({
  timeout: 5000,
  sandbox: {}
})

router.post('/:id', async (req, res, next) => {
  try {
    let resultArray = []
    let success = true

    const code = req.body.input

    const question = await Question.findById(req.params.id)

    const parsedInputs = JSON.parse(question.input)
    const parsedOutputs = JSON.parse(question.output)

    for (let i = 0; i < parsedInputs.length; i++) {
      let input = JSON.stringify(parsedInputs[i])
      let multi = false

      parsedInputs[i].forEach(elem => {
        if (Array.isArray(elem)) {
          multi = true
        }
      })

      if (multi) {
        resultArray.push(vm.run(`(${code})(...${input})`))
      } else {
        resultArray.push(vm.run(`(${code})(${input})`))
      }
    }

    for (let i = 0; i < parsedOutputs.length; i++) {
      if (JSON.stringify(resultArray[i]) !== JSON.stringify(parsedOutputs[i])) {
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
