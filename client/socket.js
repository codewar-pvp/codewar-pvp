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
  store.dispatch(changeStatus(false, true, false))
})

socket.on('readyToPlay', user => {
  store.dispatch(gotChallenge(user, false))
  history.push(`/challenges/${user.challenger.question}`)
})

socket.on('newMessage', message => {
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
