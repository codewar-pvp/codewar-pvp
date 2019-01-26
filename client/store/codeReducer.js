import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const POST_CODE = 'GET_USER'
const GOT_RESULT = 'GOT_RESULT'

/**
 * INITIAL STATE
 */
const initialState = {code: '', result: ''}

/**
 * ACTION CREATORS
 */

export const gotResult = result => ({
  type: GOT_RESULT,
  result
})

export const postCode = text => {
  return async dispatch => {
    try {
      // const res = await axios.post('/api/test', text)
      const action = gotResult('done')
      // const action = gotResult(res.data)
      dispatch(action)
    } catch (error) {
      console.warn('not correct')
    }
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_RESULT:
      return {...state, result: action.result}
    default:
      return state
  }
}
