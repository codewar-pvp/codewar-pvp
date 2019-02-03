import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GOT_CHALLENGE = 'GOT_CHALLENGE'
const CHANGE_STATUS = 'CHANGE_STATUS'

/**
 * INITIAL STATE
 */
const initialState = {
  challenge: {},
  activeChallenge: false,
  battling: false
}

/**
 * ACTION CREATORS
 */

export const gotChallenge =(user, status) => ({
  type: GOT_CHALLENGE,
  user,
  status
})

export const changeStatus =(status) => ({
  type: CHANGE_STATUS,
  status
})

// export const postCode = text => {
//   return async dispatch => {
//     try {
//       const res = await axios.post('/api/code', {input: text})
//       const action = gotResult(res.data.output)
//       dispatch(action)
//     } catch (error) {
//       console.warn('not correct')
//     }
//   }
// }

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_CHALLENGE:
      return {...state, challenge: action.user, activeChallenge: action.status}
    case CHANGE_STATUS:
      return {...state, activeChallenge: action.status}
    default:
      return state
  }
}
