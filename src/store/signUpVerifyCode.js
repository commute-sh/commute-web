import { checkHttpStatus, parseJSONWithDates } from '../utils'
import 'whatwg-fetch'
import { push } from 'react-router-redux'


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Constants
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const SIGN_UP_USER_VERIFY_CODE_CLEAR = 'SIGN_UP_USER_VERIFY_CODE_CLEAR';
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
      body: JSON.stringify({ username, verificationCode })
    })
      .then(checkHttpStatus)
      .then((response) => {
        dispatch(signUpUserVerifyCodeSuccess(response));
        dispatch(push(redirect));
      })
      .catch((err) => {
        err.response.json().then(payload => {
          err.body = payload;
          dispatch(signUpUserVerifyCodeFailure(err));
          dispatch(push(redirect))
        }).catch(err => {
          dispatch(signUpUserVerifyCodeFailure(err));
          dispatch(push(redirect));
        });
      })
  }
}

export function clearSignUpUserVerifyCode () {
  return {
    type: SIGN_UP_USER_VERIFY_CODE_CLEAR
  }
}

export function signUpUserVerifyCodeSuccess () {
  return {
    type: SIGN_UP_USER_VERIFY_CODE_SUCCESS
  }
}

export function signUpUserVerifyCodeFailure (err) {
  return {
    type: SIGN_UP_USER_VERIFY_CODE_FAILURE,
    payload: { err }
  }
}

export function signUpUserVerifyCodeRequest () {
  return {
    type: SIGN_UP_USER_VERIFY_CODE_REQUEST
  }
}


export const actions = {
  clearSignUpUserVerifyCode,
  signUpUserVerifyCode
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Reducer
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const initialState =  {
  isFetching: false,
  failed: false,
  done: false,
  errMessage: null
};

const ACTION_HANDLERS = {
  [SIGN_UP_USER_VERIFY_CODE_CLEAR]: (state, event) => {
    return Object.assign({}, initialState)
  },
  [SIGN_UP_USER_VERIFY_CODE_REQUEST]: (state, event) => {
    return Object.assign({}, state, {
      isFetching: true,
      failed: false,
      done: false,
      errMessage: null
    })
  },
  [SIGN_UP_USER_VERIFY_CODE_SUCCESS]: (state, event) => {
    return Object.assign({}, state, {
      isFetching: false,
      done: true
    })
  },
  [SIGN_UP_USER_VERIFY_CODE_FAILURE]: (state, { payload: { err: { response, message, body } } } = event) => {
    return Object.assign({}, state, {
      isFetching: false,
      done: true,
      failed: true,
      errMessage:
        body && body.message ?
          body.message :
          response ?
            `SignUpVerifyCode Error: ${response.status} - ${response.statusText}` :
            message
    })
  }
};

export default function mapReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
