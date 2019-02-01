/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Question = db.model('question')

describe('Question model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correct title and test specs', () => {
      let quest

      beforeEach(async () => {
        quest = await Question.create({
          title: 'Test Question #1',
          testSpecs: 'Test Specs would go here'
        })
      })

      it('the title is correct', () => {
        expect(quest.title).to.equal('Test Question #1')
      })

      it('the test specs are correct', () => {
        expect(quest.testSpecs).to.equal('Test Specs would go here')
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
