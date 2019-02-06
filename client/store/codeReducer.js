import axios from 'axios'
import history from '../history'
import {changeStatus} from './warReducer'
import store from './index'
import socket from '../socket'


/**
 * ACTION TYPES
 */
// const POST_CODE = 'GET_USER'
const GOT_RESULT = 'GOT_RESULT'
const CLEAR_RESULT = 'CLEAR_RESULT'
const START_RUNNING = 'START_RUNNING'
const FINISH_RUNNING = 'FINISH_RUNNING'

/**
 * INITIAL STATE
 */
const initialState = {code: '', result: null, isRunning: false}

/**
 * ACTION CREATORS
 */

export const gotResult = result => ({
  type: GOT_RESULT,
  result
})
export const startRunning = () => ({type: START_RUNNING})
export const finishRunning = () => ({type: FINISH_RUNNING})

export const clearResult = () => ({
  type: CLEAR_RESULT
})

export const postCode = text => {
  return async (dispatch, getState) => {
    try {
      dispatch(startRunning())
      const res = await axios.post(`/api/code/${text.questionId}`, {
        input: text.code
      })
      dispatch(finishRunning())
      const action = gotResult(res.data.output)
      dispatch(action)


      if (action.result.passedAllTests) {

        store.dispatch(changeStatus(false, false, false, true))
        const user = getState().userReducer.user

        socket.emit('game status', {status: {challengeStatus: false,
          fightStatus: false,
          lose: true,
          win: false},
          user
        })
      }


    } catch (error) {
      console.warn('not correct')
    }
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_RESULT:
      return {...state, result: action.result}
    case CLEAR_RESULT:
      return {...state, result: null}
    case FINISH_RUNNING:
      return {...state, isRunning: false}
    case START_RUNNING:
      return {...state, isRunning: true}
    default:
      return state
  }
}
