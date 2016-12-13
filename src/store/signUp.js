import { checkHttpStatus, parseJSONWithDates } from '../utils'
import 'whatwg-fetch'
import { push } from 'react-router-redux'


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Constants
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const SIGN_UP_USER_CLEAR = 'SIGN_UP_USER_CLEAR';
export const SIGN_UP_USER_REQUEST = 'SIGN_UP_USER_REQUEST';
export const SIGN_UP_USER_FAILURE = 'SIGN_UP_USER_FAILURE';
export const SIGN_UP_USER_SUCCESS = 'SIGN_UP_USER_SUCCESS';


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Actions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function signUpUser (username, email, password, givenName, familyName, redirect = '/') {
  return function (dispatch) {
    dispatch(signUpUserRequest());

    const user = { username, email, password, givenName, familyName };

    return fetch('/auth/sign-up', {
      method: 'post',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(checkHttpStatus)
      .then(parseJSONWithDates)
      .then(response => {
        dispatch(signUpUserSuccess(response, user));
        dispatch(push(redirect))
      })
      .catch(err => {
        err.response.json().then(payload => {
          err.body = payload;
          dispatch(signUpUserFailure(err));
          dispatch(push(redirect))
        }).catch(err => {
          dispatch(signUpUserFailure(err));
          dispatch(push(redirect))
        });
      })
  }
}

export function clearSignUpUser () {
  return {
    type: SIGN_UP_USER_CLEAR
  }
}

export function signUpUserSuccess (response, user) {
  return {
    type: SIGN_UP_USER_SUCCESS,
    payload: { user }
  }
}

export function signUpUserFailure (err) {
  return {
    type: SIGN_UP_USER_FAILURE,
    payload: { err }
  }
}

export function signUpUserRequest () {
  return {
    type: SIGN_UP_USER_REQUEST
  }
}

export const actions = {
  signUpUser,
  clearSignUpUser
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Reducer
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const initialState =  {
  isFetching: false,
  failed: false,
  done: false,
  errMessage: undefined,
  user: undefined
};

const ACTION_HANDLERS = {
  [SIGN_UP_USER_CLEAR]: (state, event) => {
    return Object.assign({}, initialState)
  },
  [SIGN_UP_USER_REQUEST]: (state, event) => {
    return Object.assign({}, state, {
      isFetching: true,
      failed: false,
      done: false,
      errMessage: undefined,
      user: undefined
    })
  },
  [SIGN_UP_USER_SUCCESS]: (state, { payload: { user } } = event) => {
    return Object.assign({}, state, {
      isFetching: false,
      done: true,
      user
    })
  },
  [SIGN_UP_USER_FAILURE]: (state, { payload: { err: { response, message, body } } } = event) => {
    return Object.assign({}, state, {
      isFetching: false,
      failed: true,
      done: true,
      errMessage:
        body && body.message ?
          body.message :
          response ?
            `SignUp Error: ${response.status} - ${response.statusText}` :
            message
    })
  }
};

export default function mapReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
