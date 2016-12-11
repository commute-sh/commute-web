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

export function loginUserSuccess (user) {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: user
  }
}

export function loginUserFailure (err) {
  return {
    type: LOGIN_USER_FAILURE,
    payload: {
      status: err.response.status,
      statusText: err.response.statusText
    }
  }
}

export function loginUserRequest () {
  console.log('LOGIN_USER_REQUEST: ' + LOGIN_USER_REQUEST);
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
        try {
          dispatch(loginUserSuccess(response));
          dispatch(push(redirect));
          dispatch(fetchUserInfos());
        } catch (e) {
          dispatch(loginUserFailure({
            response: {
              status: 403,
              statusText: 'Invalid token'
            }
          }));
        }
      })
      .catch((error) => {
        dispatch(loginUserFailure(error))
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
  statusText: null
};

const ACTION_HANDLERS = {
  [LOGIN_USER_REQUEST]: (state, event) => {
    return Object.assign({}, state, {
      isFetching: true,
      statusText: null
    })
  },
  [LOGIN_USER_SUCCESS]: (state, event) => {
    return Object.assign({}, state, {
      isFetching: false,
      statusText: 'Vous vous êtes connecté avec succès.'
    })
  },
  [LOGIN_USER_FAILURE]: (state, event) => {

    const payload = event.payload;

    console.log('payload:', payload);
    return Object.assign({}, state, {
      isFetching: false,
      statusText: `Authentication Error: ${payload.status} - ${payload.statusText}`
    })
  }
};

export default function mapReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}

