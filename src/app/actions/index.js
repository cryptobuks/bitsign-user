import axios from 'axios'

import {
  NEW_USER,
  USER_INFO,
  NOTARIZATION_TX,
  GET_TRANSACTION
} from './actionTypes'

/*
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

/*
 * ACTION CREATORS
 * Acá defino las creaciones de acciones.
 * Son funciones que usan las actions definidas arriba
*/

export const newUser = (props) => (dispatch) => {
  axios.post('https://api.bitsign.io/api/v2/user', {
    email: props.email,
    password: props.password,
    username: props.userName
  })
  .then(res => {
    alert('A user was created: ' + props.userName + props.email + props.password);
    console.log(res);
    console.log(res.data);
    localStorage.setItem('ethereumAddress', JSON.stringify(res.data.data.etherAddress));
    localStorage.setItem('token', JSON.stringify(res.data.data.token));
    dispatch(_newUser(res.data.data))
  })
}

export const userInfo = (props) => (dispatch) => {
  axios.get('https://api.bitsign.io/api/v2/user?email='+props.email+'&password='+props.password, {
    email: props.email,
    password: props.password
  })
  .then(res => {
    alert('User info: ' + props.email + props.password);
    console.log(res);
    console.log(res.data.data);
    localStorage.setItem('ethereumAddress', JSON.stringify(res.data.data.ethereum.address));
    localStorage.setItem('token', JSON.stringify(res.data.data.token));
    dispatch(_userInfo(res.data.data))
  })
}

export const notarization = (props) => (dispatch) => {
  axios.post('https://api.bitsign.io/eth/notarizetx', {
      token: props.token,
      data: props.data,
      address: props.address,
      password: props.password
     })
      .then(res => {
        alert('Data: ' + props.data);
        console.log(res);
        console.log(res.data);
        dispatch(_notarization(res.data))
    })
}

export const getTransaction = (props) => (dispatch) => {
  axios.get('https://api.bitsign.io/api/v2/transactions?token='+props.token+'&hash='+props.hash, {
      token: props.token,
      hash: props.hash
     })
      .then(res => {
        alert('Token and hash: ' + props.token + props.hash);
        console.log(res);
        console.log(res.data);
        dispatch(_getTransaction(res.data))
    })
}
