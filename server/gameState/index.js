// ticker for powerup dice roll (how often? / ms)
const tickerRate = 5000
// store of all powerUps:
const powerUps = {
  freeze(userSocket, opponentSocket, userCode, opponentCode) {
    // return {
    //   isFrozen: true,
    //   blinkerText: require('blinkerMessages').frozen
    // }
    // const restoredCode = opponentCode
    let blinkBool = true

    const blinkerText = require('./blinkerMessages').frozen

    const splicedBlinkText = '\n\n' + blinkerText

    const freezeId = setInterval(() => {
      blinkBool = !blinkBool
      opponentSocket.emit('updateLocalState', {
        code: blinkBool ? splicedBlinkText.toString() : '',
        editorDisabled: true,
        disablePowerUps: true
      })
      userSocket.emit(
        'challengerCodeDownload',
        blinkBool ? splicedBlinkText.toString() : ''
      )
    }, 500)
    setTimeout(() => {
      clearInterval(freezeId)
      userSocket.emit('challengerCodeDownload', hashCode(opponentCode))
      opponentSocket.emit('updateLocalState', {
        code: opponentCode,
        editorDisabled: false,
        disablePowerUps: false
      })
    }, 7000)
    return [userCode, opponentCode]
  },
  // removeLine(userSocket, opponentSocket) {},
  // newLeaf(userSocket, opponentSocket) {
  //   return {code: ''}
  // }
  swap(userSocket, opponentSocket, userCode, opponentCode) {
    // return {
    //   isFrozen: true,
    //   blinkerText: require('blinkerMessages').frozen
    // }
    // const restoredCode = opponentCode
    let blinkBool = true

    const blinkerText = require('./blinkerMessages').swap

    const splicedBlinkText = '\n\n' + blinkerText

    const swapId = setInterval(() => {
      blinkBool = !blinkBool
      userSocket.emit('updateLocalState', {
        code: blinkBool ? splicedBlinkText.toString() : '',
        editorDisabled: true,
        disablePowerUps: true
      })
      opponentSocket.emit('updateLocalState', {
        code: blinkBool ? splicedBlinkText.toString() : '',
        editorDisabled: true,
        disablePowerUps: true
      })
      userSocket.emit(
        'challengerCodeDownload',
        blinkBool ? splicedBlinkText.toString() : ''
      )
      opponentSocket.emit(
        'challengerCodeDownload',
        blinkBool ? splicedBlinkText.toString() : ''
      )
    }, 500)
    setTimeout(() => {
      clearInterval(swapId)
      userSocket.emit('updateLocalState', {
        code: opponentCode,
        editorDisabled: false,
        disablePowerUps: false
      })
      opponentSocket.emit('updateLocalState', {
        code: userCode,
        editorDisabled: false,
        disablePowerUps: false
      })
      userSocket.emit('challengerCodeDownload', hashCode(userCode))
      opponentSocket.emit('challengerCodeDownload', hashCode(opponentCode))
    }, 3000)
    return [opponentCode, userCode]
  }
}
// helper functions:
function getGameStateKey(a, b) {
  return [a, b].sort().join('-')
}
function getRandomPowerUp() {
  const pUpsArr = Object.keys(powerUps)
  console.log()
  const pUpIdx = Math.floor(Math.floor(Math.random() * pUpsArr.length))
  console.log('powerUp!', pUpsArr[pUpIdx])
  return pUpsArr[pUpIdx]
}
function rollPowerUpDie() {
  // 1 in 3 chance that Math.floor will
  // return 0 ; here you can change the odds of
  //granting a powerup here every 'tick'
  return !Math.floor(Math.random() * 3)
}
function getRandomPlayer(a, b) {
  // pick random player to give powerup to:
  return [a, b][Math.floor(Math.random() * 2)]
  // const newRoom = slug.split('-').slice()
  // const removed = newRoom.splice(chosenPlayerIdx, 1)[0]
}
function hashCode(code) {
  return code
    ? code
        .split('\n')
        .map(val => {
          return val
            .split('')
            .map(char => {
              const binStr = char.charCodeAt(0).toString(2)
              const idx = binStr.length - 1
              return ' /\\{}[]()$!123456789;+-=|&%`<>"\''.includes(char)
                ? char
                : binStr[idx]
            })
            .join('')
        })
        .join('\n')
    : ''
}

module.exports = {
  gameStateStore: {},
  getGameStateKey,
  hashCode,
  newGameState(
    userName,
    opponentName,
    userSocketId,
    opponentSocketId,
    userSocket,
    opponentSocket,
    funcHeader
  ) {
    const stateKey = getGameStateKey(userName, opponentName)
    console.log(`gameRoom: ${stateKey} created!`)
    return {
      [userName]: {
        socketId: userSocketId,
        powerUps: [],
        code: funcHeader,
        socket: userSocket,
        opponentName: opponentName
      },
      [opponentName]: {
        socketId: opponentSocketId,
        powerUps: [],
        code: funcHeader,
        socket: opponentSocket,
        opponentName: userName
      },
      funcHeader,
      usePowerUp(key, name) {
        const {socket} = this[name]
        const [callerCode, opponentCode] = powerUps[key](
          socket,
          this[this[name].opponentName].socket,
          this[name].code,
          this[this[name].opponentName].code
        )
        this[name].code = callerCode
        this[this[name].opponentName].code = opponentCode
      },
      kickOff() {
        console.log(`gameRoom: ${stateKey} kicked off!`)
        console.log(this)
        setInterval(() => {
          // 1 in 3 chance that it will be 0 / false,
          if (rollPowerUpDie()) {
            // pick random powerUp and player:
            const randomPowerUp = getRandomPowerUp()
            const randomPlayer = getRandomPlayer(userName, opponentName)
            // const newRoom = slug.split('-').slice()
            // const removed = newRoom.splice(chosenPlayerIdx, 1)[0]
            // newRoom.push(removed)
            console.log('powerup going to', randomPlayer)
            // console.log(
            //   'gameState[removed].socketId',
            //   gameState[removed].socketId
            // )
            // io
            //   .to(gameState[removed].socketId)
            //   .emit('grantPowerUp', pUpsArr[powerUpIdx])
            this[randomPlayer].powerUps = [
              randomPowerUp,
              ...this[randomPlayer].powerUps
            ]
            this[randomPlayer].socket.emit('grantPowerUp', randomPowerUp)
          } else {
            console.log('no power ups today...')
          }
        }, tickerRate)
      }
    }
  }
}
