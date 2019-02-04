module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    // console.log(`A socket connection to the server has been made: ${socket.id}`)
    // console.log('userId', socket.handshake.session.passport || undefined)
    console.log('userId', socket.handshake.session.passport || undefined)
    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })

    socket.on('challenge', user => {
      socket.join(user.name)
      socket.broadcast.emit('challenge', user)
    })

    socket.on('acceptChallenge', user => {
      socket.join(user.challenger.name)
      socket.emit('gameStarted')
      socket.to(user.challenger.name).emit('readyToPlay', user);
    })

    socket.on('challengeMessage', user => {
      socket.to(user.challenger.name).emit('readyToPlay', user);
    })





    socket.on('login', function(user) {
      console.log('login', user)
      socket.handshake.session.user = user
      socket.handshake.session.save()
    })

    // we dont need this logout event, boilermaker already handled it!
    socket.on('logout', function(user) {
      if (socket.handshake.session.user) {
        delete socket.handshake.session.user
        socket.handshake.session.save()
      }
    })
  })


}
