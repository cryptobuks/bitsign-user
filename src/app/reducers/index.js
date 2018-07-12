import {
  NEW_USER,
  USER_INFO,
  NOTARIZATION_TX,
  GET_TRANSACTION
} from '../actions/actionTypes'

const initialState = {
  email: '',
  password: '',
  username: '',
  token: '',
  data: '',
  address: '',
  hash: '',
  success: ''
}

export default (state = initialState, action) => {
  let newState

  switch (action.type) {
    case NEW_USER:
      newState = {
        ...state,
        token: action.info.token,
        address: action.info.etherAddress
      }
      break

    case USER_INFO:
      newState = {
        ...state,
        token: action.info.token,
        address: action.info.address
      }
      break

    case NOTARIZATION_TX:
      newState = {
      }
      break
    
    case GET_TRANSACTION:
      newState = {
      }
      break

    default:
      newState = state
      break
  }

  return newState
}