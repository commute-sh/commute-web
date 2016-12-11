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
      .then((response) => {
        try {
          dispatch(signUpUserSuccess(response));
          dispatch(push(redirect))
        } catch (e) {
          dispatch(signUpUserFailure({
            response: {
              status: 403,
              statusText: 'Invalid token'
            }
          }));
        }
      })
      .catch((error) => {
        dispatch(signUpUserFailure(error))
      })
  }
}

export function signUpUserSuccess (user) {
  return {
    type: SIGN_UP_USER_SUCCESS,
    payload: user
  }
}

export function signUpUserFailure (err) {
  return {
    type: SIGN_UP_USER_FAILURE,
    payload: {
      status: err.response.status,
      statusText: err.response.statusText
    }
  }
}

export function signUpUserRequest () {
  console.log('SIGN_UP_USER_REQUEST: ' + SIGN_UP_USER_REQUEST);
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
  statusText: null
};

const ACTION_HANDLERS = {
  [SIGN_UP_USER_REQUEST]: (state, event) => {
    return Object.assign({}, state, {
      isFetching: true,
      statusText: null
    })
  },
  [SIGN_UP_USER_SUCCESS]: (state, event) => {
    return Object.assign({}, state, {
      isFetching: false,
      statusText: 'Vous avez créé votre compte avec succès.'
    })
  },
  [SIGN_UP_USER_FAILURE]: (state, event) => {

    const payload = event.payload;

    return Object.assign({}, state, {
      isFetching: false,
      statusText: `Create Account Error: ${payload.status} ${payload.statusText}`
    })
  }
};

export default function mapReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
