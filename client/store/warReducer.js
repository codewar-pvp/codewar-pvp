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
  challengeStatus: false,
  fightStatus: false,
  lose: null,
  win: null
}

/**
 * ACTION CREATORS
 */

export const gotChallenge = (challenger, status) => ({
  type: GOT_CHALLENGE,
  challenger,
  status
})

export const changeStatus = (challengeStatus, fightStatus, lose, win) => ({
  type: CHANGE_STATUS,
  challengeStatus,
  fightStatus,
  lose,
  win
})

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
<<<<<<< HEAD
        lose: action.lose,
        win: action.win
=======
        gameStatus: action.gameStatus
>>>>>>> 9b92be3af84f7331494473ee86527ffb58cad4d2
      }
    default:
      return state
  }
}

