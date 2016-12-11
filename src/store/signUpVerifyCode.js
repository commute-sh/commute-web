import { checkHttpStatus, parseJSONWithDates } from '../utils'
import 'whatwg-fetch'
import { push } from 'react-router-redux'


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Constants
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const SIGN_UP_USER_VERIFY_CODE_REQUEST = 'SIGN_UP_USER_VERIFY_CODE_REQUEST';
export const SIGN_UP_USER_VERIFY_CODE_FAILURE = 'SIGN_UP_USER_VERIFY_CODE_FAILURE';
export const SIGN_UP_USER_VERIFY_CODE_SUCCESS = 'SIGN_UP_USER_VERIFY_CODE_SUCCESS';


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Actions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function signUpUserVerifyCode (username, verificationCode, redirect = '/') {

  console.log("username:", username);
  console.log("verificationCode:", verificationCode);

  return function (dispatch) {
    dispatch(signUpUserVerifyCodeRequest());

    return fetch('/auth/sign-up/verify-code', {
      method: 'post',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: username, verificationCode: verificationCode })
    })
      .then(checkHttpStatus)
      .then(parseJSONWithDates)
      .then((response) => {
        try {
          dispatch(signUpUserVerifyCodeSuccess(response));
          dispatch(push(redirect))
        } catch (e) {
          dispatch(signUpUserVerifyCodeFailure({
            response: {
              status: 403,
              statusText: 'Invalid token'
            }
          }));
        }
      })
      .catch((error) => {
        dispatch(signUpUserVerifyCodeFailure(error))
      })
  }
}

export function signUpUserVerifyCodeSuccess (user) {
  return {
    type: SIGN_UP_USER_VERIFY_CODE_SUCCESS,
    payload: user
  }
}

export function signUpUserVerifyCodeFailure (err) {
  return {
    type: SIGN_UP_USER_VERIFY_CODE_FAILURE,
    payload: {
      status: err.response.status,
      statusText: err.response.statusText
    }
  }
}

export function signUpUserVerifyCodeRequest () {
  console.log('SIGN_UP_USER_VERIFY_CODE_REQUEST: ' + SIGN_UP_USER_VERIFY_CODE_REQUEST)
  return {
    type: SIGN_UP_USER_VERIFY_CODE_REQUEST
  }
}


export const actions = {
  signUpUserVerifyCode
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Reducer
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const initialState =  {
  isFetching: false,
  statusText: null
};

const ACTION_HANDLERS = {
  [SIGN_UP_USER_VERIFY_CODE_REQUEST]: (state, event) => {
    return Object.assign({}, state, {
      statusText: null,
      isFetching: true
    })
  },
  [SIGN_UP_USER_VERIFY_CODE_SUCCESS]: (state, event) => {
    return Object.assign({}, state, {
      statusText: 'Vous avez vérifié votre compte avec succès.',
      isFetching: false
    })
  },
  [SIGN_UP_USER_VERIFY_CODE_FAILURE]: (state, event) => {

    const payload = event.payload;

    return Object.assign({}, state, {
      statusText: `Verify Account Error: ${payload.status} ${payload.statusText}`,
      isFetching: false
    })
  }
};

export default function mapReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
