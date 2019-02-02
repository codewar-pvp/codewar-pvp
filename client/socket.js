import io from 'socket.io-client'
import {gotChallenge} from './store/warReducer'
import store from './store'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})

socket.on('challenge', user => {
  store.dispatch(gotChallenge(user))
})

export default socket
