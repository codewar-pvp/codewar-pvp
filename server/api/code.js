const router = require('express').Router()
const {VM} = require('vm2')
const {Question} = require('../db/models')

const vm = new VM({
  timeout: 5000,
  sandbox: {}
})

// eslint-disable-next-line complexity
router.post('/:id', async (req, res, next) => {
  try {
    let resultArray = []
    let success = true

    const code = req.body.input
    const question = await Question.findById(req.params.id)

    const parsedInputs = JSON.parse(question.input)
    const parsedOutputs = JSON.parse(question.output)

    console.log('code: ', code)
    console.log('parsedInputs: ', parsedInputs)

    for (let i = 0; i < parsedInputs.length; i++) {
      let input = JSON.stringify(parsedInputs[i])
      let multi = false

      if (Array.isArray(parsedInputs[i])) {
        parsedInputs[i].forEach(elem => {
          if (Array.isArray(elem)) {
            multi = true
          }
        })
      }

      if (multi) {
        resultArray.push(vm.run(`(${code})(...${input})`))
      } else {
        resultArray.push(vm.run(`(${code})(${input})`))
      }
    }

    for (let i = 0; i < parsedOutputs.length; i++) {
      console.log('I AM RESULT ARRAY: ', resultArray)
      console.log('I am parsed outputs: ', parsedOutputs)
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
