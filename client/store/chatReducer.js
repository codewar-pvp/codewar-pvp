import axios from 'axios'
import history from '../history'
import socket from '../socket'

/**
 * ACTION TYPES
 */
const GOT_MESSAGE = 'GOT_MESSAGE'
const CLEAR_MESSAGE = 'CLEAR_MESSAGE'
/**
 * INITIAL STATE
 */
const initialState = {
  chatMessages: []
}

/**
 * ACTION CREATORS
 */

export const gotMessage = message => ({
  type: GOT_MESSAGE,
  message
})

export const clearMessage = () => ({
  type: CLEAR_MESSAGE
})
// export const submitMessage = message => {

//   // socket.emit('newMessage', message)
// }

// SEND MESSAGE
export const submitMessage = message => async (dispatch, getState) => {
  // const { data } = await axios.post('/api/messages', message)
  dispatch(gotMessage(message))
  socket.emit('newMessage', message)
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_MESSAGE:
      return {...state, chatMessages: [...state.chatMessages, action.message]}
    case CLEAR_MESSAGE:
      return {...state, chatMessages: []}
    default:
      return state
  }
}
