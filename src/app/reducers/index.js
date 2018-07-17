import {
  NEW_USER,
  USER_INFO,
  NOTARIZATION_TX,
  GET_TRANSACTION,
  FAKE_AUTH,
  LOG_OUT,
  LOAD
} from '../actions/actionTypes'

const initialState = {
  email: '',
  password: '',
  username: '',
  token: '',
  data: '',
  address: '',
  hash: '',
  success: '',
  loading: false
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
        ...state,
        loading: false
      }
      break
    
    case GET_TRANSACTION:
      newState = {
        ...state,
        loading: true
      }
      break

    case FAKE_AUTH:
      newState = {
        ...state,
        token: action.info
      }
      break

    case LOG_OUT: 
      newState = {
        ...state,
        token: action.info.token
      }
      break

    case LOAD:
      newState = {
        ...state,
        loading: true
      }
      break

    default:
      newState = state
      break
  }

  return newState
}