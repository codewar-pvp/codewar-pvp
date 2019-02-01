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
const initialState = {code: '', result: null}

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
      console.log('I AM TEXT ', text)
      const res = await axios.post(`/api/code/${text.questionId}`, {
        input: text.code
      })
      const action = gotResult(res.data.output)
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
