import io from 'socket.io-client'
import {
  addFriend,
  removeFriend,
  setOnlineFriendsOnStore,
  gotChallenge
} from './store'
import store from './store'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})

socket.on('challenge', user => {
  store.dispatch(gotChallenge(user))
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
