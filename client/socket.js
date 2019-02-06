import io from 'socket.io-client'
import {
  addFriend,
  removeFriend,
  setOnlineFriendsOnStore,
  gotChallenge
} from './store'
import {changeStatus} from './store/warReducer'
import {gotMessage} from './store/chatReducer'
import store from './store'
import history from './history'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})

socket.on('challenge', challenger => {
  store.dispatch(gotChallenge(challenger, true))
})

socket.on('gameStarted', () => {
  store.dispatch(changeStatus(false, true, null, null))
})

socket.on('readyToPlay', user => {
  store.dispatch(gotChallenge(user, false))
  history.push(`/challenges/${user.challenger.question}`)
})

<<<<<<< HEAD
socket.on('game status', status => {
  store.dispatch(changeStatus(status.challengeStatus,
    status.fightStatus,
    status.lose,
    status.win))
})

socket.on('newMessage', (message) => {
=======
socket.on('newMessage', message => {
>>>>>>> 9b92be3af84f7331494473ee86527ffb58cad4d2
  store.dispatch(gotMessage(message))
})

socket.on('friendJoin', friendName => {
  store.dispatch(addFriend(friendName))
})

socket.on('friendLeave', friendName => {
  store.dispatch(removeFriend(friendName))
})

socket.on('gotAllFriends', onlineFriends => {
  store.dispatch(setOnlineFriendsOnStore(onlineFriends))
})

export default socket
