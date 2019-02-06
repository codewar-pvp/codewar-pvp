import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GOT_CHALLENGE = 'GOT_CHALLENGE'
const CHANGE_STATUS = 'CHANGE_STATUS'
const CLEAR_CHALLENGE = 'CLEAR_CHALLENGE'

/**
 * INITIAL STATE
 */
const initialState = {
  challenge: {},
  challengeStatus: false,
  fightStatus: false,
  gameStatus: false
}

/**
 * ACTION CREATORS
 */

export const gotChallenge = (challenger, status) => ({
  type: GOT_CHALLENGE,
  challenger,
  status
})

export const changeStatus = (challengeStatus, fightStatus, gameStatus) => ({
  type: CHANGE_STATUS,
  challengeStatus,
  fightStatus,
  gameStatus
})

export const clearChallenge = () => ({
  type: CLEAR_CHALLENGE
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
      return {
        ...state,
        challenge: action.challenger,
        challengeStatus: action.status
      }
    case CHANGE_STATUS:
      return {
        ...state,
        challengeStatus: action.challengeStatus,
        fightStatus: action.fightStatus,
        gameStatus: action.gameStatus
      }
    case CLEAR_CHALLENGE:
      return {...state, challengeStatus: false, challenge: {}}
    default:
      return state
  }
}
