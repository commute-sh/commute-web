import { checkHttpStatus } from '../utils'
import 'whatwg-fetch'
import { push } from 'react-router-redux'
import { fetchUserInfos } from './userInfos';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Constants
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Actions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function loginUserSuccess () {
  return {
    type: LOGIN_USER_SUCCESS
  }
}

export function loginUserFailure (err) {
  return {
    type: LOGIN_USER_FAILURE,
    payload: { err }
  }
}

export function loginUserRequest () {
  return {
    type: LOGIN_USER_REQUEST
  }
}

export function loginUser (username, password, redirect = '/') {
  return function (dispatch) {
    dispatch(loginUserRequest());

    return fetch('/auth/login', {
      method: 'post',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: username, password: password })
    })
      .then(checkHttpStatus)
      .then((response) => {
          dispatch(loginUserSuccess(response));
          dispatch(fetchUserInfos());
        dispatch(push(redirect));
      })
      .catch((err) => {
        err.response.json().then(payload => {
          err.body = payload;
          dispatch(loginUserFailure(err));
          dispatch(push(redirect));
        }).catch(err => {
          dispatch(loginUserFailure(err));
          dispatch(push(redirect));
        });
      })
  }
}

export const actions = {
  loginUser
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Reducer
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const initialState =  {
  isFetching: false,
  failed: false,
  errMessage: null
};

const ACTION_HANDLERS = {
  [LOGIN_USER_REQUEST]: (state, event) => {
    return Object.assign({}, state, {
      isFetching: true,
      failed: false,
      errMessage: null
    })
  },
  [LOGIN_USER_SUCCESS]: (state, event) => {
    return Object.assign({}, state, {
      isFetching: false
    })
  },
  [LOGIN_USER_FAILURE]: (state, { payload: { err: { response, message, body } } } = event) => {
    return Object.assign({}, state, {
      isFetching: false,
      failed: true,
      errMessage:
        body && body.message ?
          body.message :
          response ?
            `Login Error: ${response.status} - ${response.statusText}` :
            message
    })
  }
};

export default function mapReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}

