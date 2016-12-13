import { checkHttpStatus, parseJSONWithDates } from '../utils'
import 'whatwg-fetch'
import { push } from 'react-router-redux'


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Constants
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const SIGN_UP_USER_REQUEST = 'SIGN_UP_USER_REQUEST';
export const SIGN_UP_USER_FAILURE = 'SIGN_UP_USER_FAILURE';
export const SIGN_UP_USER_SUCCESS = 'SIGN_UP_USER_SUCCESS';


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Actions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function signUpUser (username, email, password, givenName, familyName, redirect = '/') {
  return function (dispatch) {
    dispatch(signUpUserRequest());

    return fetch('/auth/sign-up', {
      method: 'post',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: username, email: email, password: password, givenName: givenName, familyName: familyName })
    })
      .then(checkHttpStatus)
      .then(parseJSONWithDates)
      .then(response => {
        dispatch(signUpUserSuccess(response));
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

export function signUpUserSuccess () {
  return {
    type: SIGN_UP_USER_SUCCESS
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
  signUpUser
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Reducer
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const initialState =  {
  isFetching: false,
  failed: false,
  errMessage: undefined
};

const ACTION_HANDLERS = {
  [SIGN_UP_USER_REQUEST]: (state, event) => {
    return Object.assign({}, state, {
      isFetching: true,
      failed: false,
      errMessage: undefined
    })
  },
  [SIGN_UP_USER_SUCCESS]: (state, event) => {
    return Object.assign({}, state, {
      isFetching: false
    })
  },
  [SIGN_UP_USER_FAILURE]: (state, { payload: { err: { response, message, body } } } = event) => {
    return Object.assign({}, state, {
      isFetching: false,
      failed: true,
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
