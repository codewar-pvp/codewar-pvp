const Sequelize = require('sequelize')
const db = require('../db')

const Test = db.define('test', {
  input: {
    type: Sequelize.STRING,
    allowNull: false
  },
  inputType: {
    type: Sequelize.STRING,
    allowNull: false
  },
  output: {
    type: Sequelize.STRING,
    allowNull: false
  },
  outputType: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Test
