/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Question = db.model('question')

describe('Question routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/questions/', () => {
    beforeEach(() => {
      return Question.create({
        title: 'Testing Question Route #1',
        testSpecs: 'Test specs go here'
      })
    })

    it('GET /api/questions', async () => {
      const res = await request(app)
        .get('/api/questions')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].title).to.be.equal('Testing Question Route #1')
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
