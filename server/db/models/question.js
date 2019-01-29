const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Question = db.define('question', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  level: {
    type: Sequelize.STRING
  },
  rating: {
    type: Sequelize.INTEGER
  },
  author: {
    type: Sequelize.STRING,
    defaultValue: 'anonymous'
  },
  category: {
    type: Sequelize.STRING
  },
  testSpecs: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  funcHeader: {
    type: Sequelize.TEXT
  }
})

module.exports = Question
