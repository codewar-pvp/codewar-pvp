const router = require('express').Router()
const {Question} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const questions = await Question.findAll()
    res.json(questions)
    console.log('req.session:', req.session, '\n')
  } catch (err) {
    next(err)
  }
})
