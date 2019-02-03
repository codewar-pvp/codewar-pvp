module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })

    socket.on('challenge', user => {
      socket.join(user.name)
      socket.broadcast.emit('challenge', user)
    })

    socket.on('acceptChallenge', user => {
      socket.join(user.challenger.name)
      socket.to(user.challenger.name).emit('readyToPlay', user);
    })


  })


}
