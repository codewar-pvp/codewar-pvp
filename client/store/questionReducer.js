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

export const selectedLevel = level => ({
  type: SELECT_QUESTION,
  level
})

export const fetchAllQuestions = () => {
  return async dispatch => {
    try {
      const res = await axios.get('/api/questions')
      dispatch(gotQuestions(res.data))
    } catch (error) {
      console.warn('No Question Available')
    }
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_QUESTIONS:
      return {...state, questions: action.questions}
    case SELECT_QUESTION:
      const questionsLeveled = state.questions.filter(
        q => q.level == action.level
      )
      return {...state, questions: questionsLeveled}
    default:
      return state
  }
}
