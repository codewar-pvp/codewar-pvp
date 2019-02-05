module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    // console.log(`A socket connection to the server has been made: ${socket.id}`)
    // console.log('userId', socket.handshake.session.passport || undefined)
    // console.log('userId', socket.handshake.session.passport || undefined)
    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })

    socket.on('challenge', user => {
      // friends to replace
      socket.join(user.challenger.name)

      // game room
      socket.join(user.name + user.challenger.name)
      socket.to(user.challenger.name).emit('challenge', user)
    })

    socket.on('acceptChallenge', user => {
      // socket.join(user.challenger.name)
      socket.join(user.challenger.name + user.name)
      socket.to(user.challenger.name + user.name).emit('gameStarted')
      socket.to(user.challenger.name + user.name).emit('readyToPlay', user)
    })

    // socket.on('challengeMessage', user => {
    //   socket.to(user.name + user.opponent.name).emit('readyToPlay', user);
    //   // socket.to(user.opponent.name + user.name).emit('readyToPlay', user);

    // })

    socket.on('newMessage', message => {
      socket
        .to(message.user.challenger.name + message.user.name)
        .emit('newMessage', message)
      socket
        .to(message.user.name + message.user.challenger.name)
        .emit('newMessage', message)
    })

    socket.on('login', function(user) {
      // friends to replace
      socket.join(user.name)

      //session info
      socket.handshake.session.user = user
      socket.handshake.session.save()
    })

    socket.on('logout', function(user) {
      if (socket.handshake.session.user) {
        delete socket.handshake.session.user
        socket.handshake.session.save()
      }
    })

    // socket.on('disconnect', function() {
    //   if (socket.handshake.session.user) {
    //     // delete socket.handshake.session.user
    //     socket.handshake.session.user = {}
    //     socket.handshake.session.save()
    //   }
    // })
  })
}
