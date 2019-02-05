module.exports = io => {
  io.on('connection', socket => {
    console.log('all rooms', io.sockets.adapter.rooms)
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    console.log('userId', socket.handshake.session.passport || undefined)
    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
      console.log('socket.handshake.session =>', socket.handshake.session)
      // emit leave event for all friend rooms:
      if (socket.handshake.session.user) {
        console.log(
          'socket handshake session user name',
          socket.handshake.session.user.name
        )
        const {name, friends} = socket.handshake.session.user
        friends.forEach(friend => {
          io.to(friend.name).emit('friendLeave', name)
          socket.leave(friend.name)
        })
      }

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
      socket.join(name)
      friends.forEach(friend => {
        socket.join(friend.name)
        console.log(friend)
        io.to(friend.name).emit('friendJoin', name)
      })
      // fetch all friends in user's room
      io.in(name).clients((error, clientIds) => {
        if (error) throw error
        const names = new Set()
        clientIds.forEach(clientId => {
          const friendName =
            io.sockets.connected[clientId].handshake.session.user.name
          if (friendName !== name) names.add(friendName)
        })
        console.log('all rooms', io.sockets.adapter.rooms)
        console.log(`online friend set for ${name}`, Array.from(names))
        socket.emit('gotAllFriends', Array.from(names))
      })
    })

    socket.on('challenge', user => {
      socket.broadcast.emit('challenge', user)
    })

    socket.on('logout', function(user) {
      console.log('logged out')
      if (socket.handshake.session.user) {
        console.log(
          'socket handshake session user name',
          socket.handshake.session.user.name
        )
        const {name, friends} = socket.handshake.session.user
        friends.forEach(friend => {
          io.to(friend.name).emit('friendLeave', name)
          socket.leave(friend.name)
        })
      }
    })
  })
}
