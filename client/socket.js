import io from 'socket.io-client'
import {gotChallenge} from './store/warReducer'
import store from './store'
import history from './history';


const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})

socket.on('challenge', user => {
  store.dispatch(gotChallenge(user))
})

socket.on('acceptChallenge', user => {
  store.dispatch(gotChallenge(user))
})

socket.on('readyToPlay', user => {
  store.dispatch(gotChallenge(user))
  history.push(`/challenges/${user.challenger.question.id}`)
})

export default socket
