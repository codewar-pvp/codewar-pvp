import axios from 'axios'
import history from '../history'
import socket from '../socket'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const CLEAR_ERROR = 'CLEAR_ERROR'
const ADD_FRIEND = 'ADD_FRIEND'
const REMOVE_FRIEND = 'REMOVE_FRIEND'
const SET_ONLINE_FRIENDS_ON_STORE = 'SET_ONLINE_FRIENDS_ON_STORE'

/**
 * INITIAL STATE
 */
const defaultUser = {
  user: {},
  onlineFriends: []
}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
export const addFriend = friendName => ({
  type: ADD_FRIEND,
  friendName
})
export const removeFriend = friendName => ({
  type: REMOVE_FRIEND,
  friendName
})
export const setOnlineFriendsOnStore = onlineFriends => ({
  type: SET_ONLINE_FRIENDS_ON_STORE,
  onlineFriends
})
export const clearError = () => ({type: CLEAR_ERROR})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    res.data.user.friends = res.data.friends
    dispatch(getUser(res.data.user || defaultUser))
    socket.emit('login', res.data.user)
  } catch (err) {
    console.error(err)
  }
}

export const login = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    socket.emit('login', res.data)
    history.push('/questions')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const signup = (userName, email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {name: userName, email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    socket.emit('login', res.data)
    history.push('/questions')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    socket.emit('logout')
    dispatch(removeUser())
    history.push('/questions')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return {...state, user: action.user}
    case REMOVE_USER:
      return defaultUser
    case ADD_FRIEND:
      let onlineNameList = state.onlineFriends.map(friendObj => friendObj.name)
      let allFriendNameList = state.user.friends.map(
        friendObj => friendObj.name
      )
      if (allFriendNameList.includes(action.friendName)) {
        onlineNameList = [...onlineNameList, action.friendName]
      }
      onlineNameList = Array.from(new Set(onlineNameList)).map(name => ({
        name
      }))
      return {
        ...state,
        onlineFriends: onlineNameList
      }
    case REMOVE_FRIEND:
      return {
        ...state,
        onlineFriends: state.onlineFriends.filter(
          friendObj => friendObj.name !== action.friendName
        )
      }
    case SET_ONLINE_FRIENDS_ON_STORE:
      return {
        ...state,
        onlineFriends: [
          ...action.onlineFriends.map(name => ({
            name
          }))
        ]
      }
    case CLEAR_ERROR:
      return {...state, error: null}
    default:
      return state
  }
}
