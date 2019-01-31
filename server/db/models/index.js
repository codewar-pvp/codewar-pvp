const User = require('./user')
const Question = require('./question')

User.belongsToMany(User, {as: 'friends', through: 'user_friend'})

module.exports = {
  User,
  Question
}
