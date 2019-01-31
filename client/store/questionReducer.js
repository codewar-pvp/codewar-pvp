import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const FETCH_QUESTIONS = 'FETCH_QUESTIONS'
const GOT_QUESTIONS = 'GOT_QUESTIONS'
const SELECT_QUESTION = 'SELECT_QUESTION'

/**
 * INITIAL STATE
 */
const initialState = {questions: [], selectedQuestion: ''}

/**
 * ACTION CREATORS
 */

export const gotQuestions = questions => ({
  type: GOT_QUESTIONS,
  questions
})

export const selectedQuestion = question => ({
  type: SELECT_QUESTION,
  question
})

export const fetchAllQuestions = () => {
  return async dispatch => {
    try {
      const res = await axios.get('/api/questions')
      dispatch(gotQuestions(res.data))
      // dispatch(gotQuestions(data))
    } catch (error) {
      console.warn('No Question Available')
    }
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_QUESTIONS:
      console.log(action.questions)
      return {...state, questions: action.questions}
    case SELECT_QUESTION:
      return {...state, selectedQuestion: action.question}
    default:
      return state
  }
}
