import {
  NEW_USER,
  USER_INFO,
  NOTARIZATION_TX,
  GET_TRANSACTION
} from './actionTypes'

/**
 * ACTIONS
 * Acá defino las acciones.
 * Las acciones son lo único que mandan información
 * desde tu aplicación hasta el store
 */
const _newUser = (data) => ({
  type: NEW_USER,
  info: data
})

const _userInfo = (data) => ({
  type: USER_INFO,
  info: data
})

const _notarization = (data) => ({
  type: NOTARIZATION_TX,
  info: data
})

const _getTransaction = (data) => ({
  type: GET_TRANSACTION,
  info: data
})

/**
 * ACTION CREATORS
 * Acá defino las creaciones de acciones.
 * Son funciones que usan las actions definidas arriba
 */

/*
export const fetchTicker = () => (dispatch) => {
  dispatch(_startRequest())
  axios
    .get(API_URL)
    .then((response) => {
      console.log('response: ', response)
      if (!response.data.success) {
        dispatch(_fetchFailure(response.data.error.message))
      } else {
        dispatch(_fetchSuccess(response.data.data))
      }
    })
    .catch((err) => dispatch(_fetchFailure('Error Interno')))
}

export const datoAdmin = (props) => (dispatch) => {
  dispatch(_fetchFree(props))
}
*/

export const newUser = (props) => (dispatch) => {
  dispatch(_newUser(props))
}

export const userInfo = (props) => (dispatch) => {
  dispatch(_userInfo(props))
}

export const notarization = (props) => (dispatch) => {
  dispatch(_notarization(props))
}

export const getTransaction = (props) => (dispatch) => {
  dispatch(_getTransaction(props))
}
