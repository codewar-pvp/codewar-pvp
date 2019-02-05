module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    console.log('userId', socket.handshake.session.passport || undefined)
    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })

    socket.on('challenge', user => {
      socket.broadcast.emit('challenge', user)
    })

    socket.on('login', function(user) {
      socket.handshake.session.user = user
      socket.handshake.session.save()
    })

    socket.on('logout', function(user) {
      if (socket.handshake.session.user) {
        delete socket.handshake.session.user
        socket.handshake.session.save()
      }
    })
  })
}
