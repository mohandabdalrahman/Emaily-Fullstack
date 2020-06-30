import axios from 'axios'
import { FETCH_USER } from './types'
const API = 'http://localhost:5000'

export const fetchUser = () => async dispatch => {
  try {
    const user = await axios.get(`${API}/api/current_user`)
    dispatch({
      type: FETCH_USER,
      payload: user.data
    })

  } catch (error) {
    console.log('error on fetching user', error)
  }
}

export const handleStripeToken = token => async dispatch => {
  try {
    const res = await axios.post(`${API}/api/stripe`, token)
    dispatch({
      type: FETCH_USER,
      payload: res.data
    })
  } catch (error) {
    console.error('error on handling stripe token', error);
  }
}