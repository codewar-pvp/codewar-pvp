module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    console.log('userId', socket.handshake.session.passport || undefined)
    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
      console.log('socket.handshake.session =>', socket.handshake.session)

      // emit leave event for all friend rooms:
      const {user, friends} = socket.handshake.session.user
      friends.forEach(friend => {
        io.to(friend.name).emit('friendLeave', user.name)
      })

      // delete socket.handshake.session.user
      // delete socket.handshake.session.passport
      // socket.handshake.session.save()
    })

    socket.on('login', function(user) {
      console.log('login event fired!')
      socket.handshake.session.user = user
      console.log('socket.handshake.session =>', socket.handshake.session)
      socket.handshake.session.save()
      const {name, friends} = socket.handshake.session.user
      // join user to logged in room and emit join event for all friend rooms:
      socket.join(`${name}`)
      friends.forEach(friend => {
        socket.join(friend.name)
        io.to(friend.name).emit('friendJoin')
      })
    })

    socket.on('challenge', user => {
      socket.broadcast.emit('challenge', user)
    })

    socket.on('logout', function(user) {
      console.log('logged out')
      // if (socket.handshake.session.user) {
      //   delete socket.handshake.session.user
      //   socket.handshake.session.save()
      // }
    })
  })
}
