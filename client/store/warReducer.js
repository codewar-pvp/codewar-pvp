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

export const clearChallenge = () => ({
  type: CLEAR_CHALLENGE
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
        lose: action.lose,
        win: action.win
      }
    case CLEAR_CHALLENGE:
      return {...state, challengeStatus: false, challenge: {}}
    default:
      return state
  }
}
