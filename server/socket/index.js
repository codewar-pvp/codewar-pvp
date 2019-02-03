module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    console.log(socket.handshake.session.passport || undefined)
    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })

    socket.on('challenge', user => {
      socket.broadcast.emit('challenge', user)
    })

    socket.on('login', function(userdata) {
      socket.handshake.session.userdata = userdata
      socket.handshake.session.save()
    })
    socket.on('logout', function(userdata) {
      if (socket.handshake.session.userdata) {
        delete socket.handshake.session.userdata
        socket.handshake.session.save()
      }
    })
  })
}
