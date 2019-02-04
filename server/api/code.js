const router = require('express').Router()
const {Question} = require('../db/models')
const axios = require('axios')
const {awsApiPath, apiKey} =
  process.env.NODE_ENV !== 'production' ? require('../../secrets') : process.env

// eslint-disable-next-line complexity
router.post('/:id', async (req, res, next) => {
  try {
    const userCode = req.body.input
    const {testSpecs} = await Question.findById(req.params.id)
    const response = await axios.post(awsApiPath, {
      apiKey,
      userCode,
      testSpecs
    })
    res.status(201).json({output: response.data})
  } catch (err) {
    next(err)
  }
})

module.exports = router
