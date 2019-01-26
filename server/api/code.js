const router = require('express').Router()
const {VM} = require('vm2')

const vm = new VM({
  timeout: 5000,
  sandbox: {}
})

router.post('/', async (req, res, next) => {
  try {
    const result = vm.run(`(
            function () {
                ${req.body.input}
            }
            )()`)
    res.json({
      output: result
    })
  } catch (err) {
    if (err.message === 'Script execution timed out.') {
      err.status = 400
    }
    next(err)
  }
})

module.exports = router
