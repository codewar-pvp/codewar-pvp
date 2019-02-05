import axios from 'axios'
import history from '../history'
import socket from '../socket'

/**
 * ACTION TYPES
 */
const GOT_MESSAGE = 'GOT_MESSAGE'

/**
 * INITIAL STATE
 */
const initialState = {
  chatMessages: []
}

/**
 * ACTION CREATORS
 */

export const gotMessage = (message) => ({
  type: GOT_MESSAGE,
  message
})

// export const submitMessage = message => {

//   // socket.emit('newMessage', message)
// }

// SEND MESSAGE
export const submitMessage = message => async (dispatch, getState) => {
  // const { data } = await axios.post('/api/messages', message)
  // console.log('reducer message', message)
  dispatch(gotMessage(message))

  socket.emit('newMessage', message)
}



export default function(state = initialState, action) {
  console.log('action', action)
  switch (action.type) {
    case GOT_MESSAGE:
      return {...state, chatMessages: [...state.chatMessages, action.message]}
    default:
      return state
  }
}
