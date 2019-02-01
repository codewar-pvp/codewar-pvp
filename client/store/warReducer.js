import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GOT_CHALLENGE = 'GOT_CHALLENGE'

/**
 * INITIAL STATE
 */
const initialState = {
  challenge: {},
  battling: false
}

/**
 * ACTION CREATORS
 */

export const gotChallenge = user => ({
  type: GOT_CHALLENGE,
  user
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
    console.log('reducer', action.user)
      return {...state, challenge: action.user}
    default:
      return state
  }
}
