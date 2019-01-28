import axios from 'axios'
import history from '../history'

const data = [
  {
    id: 1,
    title: 'Two Sum',
    description: 'asdhjfkashdjkfhjkansjdkfnkjanskd',
    level: 'Hard',
    rating: 3,
    author: 'Scott',
    category: 'ARRAY, CONTROL FLOW'
  },
  {
    id: 2,
    title: 'Binary Watch',
    description:
      'A binary watch has 4 LEDs on the top which represent the hours (0-11)...',
    level: 'Medium',
    rating: 1,
    author: 'Jason',
    category: 'ARRAY, FUNDAMENTALS'
  },
  {
    id: 3,
    title: 'Poor Pigs',
    description: 'asdhjfkashdjkfhjkansjdkfnkjanskd',
    level: 'Medium',
    rating: 5,
    author: 'Stuart',
    category: 'ARRAY, NUMBERS'
  },
  {
    id: 4,
    title: 'Binary Search',
    description: 'asdhjfkashdjkfhjkansjdkfnkjanskd',
    level: 'Easy',
    rating: 4,
    author: 'Scott',
    category: 'ARRAY,DATA STRUCTURE'
  },
  {
    id: 5,
    title: 'Happy Number',
    description: 'asdhjfkashdjkfhjkansjdkfnkjanskd',
    level: 'Easy',
    rating: 2,
    author: 'Shan',
    category: 'ARRAY, ALGORITHMS'
  }
]

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
      return {...state, questions: action.questions}
    case SELECT_QUESTION:
      return {...state, selectedQuestion: action.question}
    default:
      return state
  }
}
