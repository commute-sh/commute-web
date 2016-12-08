import { checkHttpStatus, parseJSONWithDates } from '../utils'
import 'whatwg-fetch'
import { push } from 'react-router-redux'
import CryptoJS from 'crypto-js'
import _ from 'lodash'

export function hash(data) {
  let dataUtf8Array = CryptoJS.enc.Utf8.parse(data);
  let dataBase64 = CryptoJS.enc.Base64.stringify(dataUtf8Array);
  let dataHash = CryptoJS.SHA256(dataBase64).toString(CryptoJS.enc.Hex);

  return dataHash;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Constants
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';

export const LOGOUT_USER_REQUEST = 'LOGOUT_USER_REQUEST';
export const LOGOUT_USER_FAILURE = 'LOGOUT_USER_FAILURE';
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';

export const FETCH_USER_INFOS_REQUEST = 'FETCH_USER_INFOS_REQUEST';
export const FETCH_USER_INFOS_SUCCESS = 'FETCH_USER_INFOS_SUCCESS';
export const FETCH_USER_INFOS_FAILURE = 'FETCH_USER_INFOS_FAILURE';

export const SIGN_UP_USER_REQUEST = 'SIGN_UP_USER_REQUEST';
export const SIGN_UP_USER_FAILURE = 'SIGN_UP_USER_FAILURE';
export const SIGN_UP_USER_SUCCESS = 'SIGN_UP_USER_SUCCESS';

export const SIGN_UP_USER_VERIFY_CODE_REQUEST = 'SIGN_UP_USER_VERIFY_CODE_REQUEST';
export const SIGN_UP_USER_VERIFY_CODE_FAILURE = 'SIGN_UP_USER_VERIFY_CODE_FAILURE';
export const SIGN_UP_USER_VERIFY_CODE_SUCCESS = 'SIGN_UP_USER_VERIFY_CODE_SUCCESS';


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

export function logoutUserSuccess () {
  return {
    type: LOGOUT_USER_SUCCESS
  }
}

export function logoutUserFailure (err) {
  return {
    type: LOGOUT_USER_FAILURE,
    payload: {
      status: err.response.status,
      statusText: err.response.statusText
    }
  }
}

export function logoutUserRequest () {
  console.log('LOGOUT_USER_REQUEST: ' + LOGOUT_USER_REQUEST)
  return {
    type: LOGOUT_USER_REQUEST
  }
}

export function fetchUserInfosSuccess (user) {
  return {
    type: FETCH_USER_INFOS_SUCCESS,
    payload: user
  }
}

export function fetchUserInfosFailure (err) {
  return {
    type: FETCH_USER_INFOS_FAILURE,
    payload: {
      status: err.response.status,
      statusText: err.response.statusText
    }
  }
}

export function fetchUserInfosRequest () {
  console.log('LOGOUT_USER_REQUEST: ' + FETCH_USER_INFOS_REQUEST)
  return {
    type: FETCH_USER_INFOS_REQUEST
  }
}

export function logoutAndRedirect (redirect = '/') {

  return function (dispatch) {
    dispatch(logoutUserRequest());

    return fetch('/auth/logout', {
      method: 'post',
      credentials: 'same-origin'
    })
      .then(checkHttpStatus)
      .then((response) => {
        try {
          dispatch(logoutUserSuccess(response));
          dispatch(push(redirect))
        } catch (e) {
          dispatch(logoutUserFailure({
            response: {
              status: 403,
              statusText: 'Invalid token'
            }
          }))
        }
      })
      .catch((err) => {
        dispatch(logoutUserFailure({
          response: {
            status: 500,
            statusText: err.message
          }
        }));
      });
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

export function fetchUserInfos (done) {
  return function (dispatch) {
    dispatch(fetchUserInfosRequest());

    return fetch('/me', {
      credentials: 'same-origin'
    })
      .then(checkHttpStatus)
      .then(parseJSONWithDates)
      .then((response) => {
        done && done();
        try {
          dispatch(fetchUserInfosSuccess(response))
        } catch (e) {
          dispatch(fetchUserInfosFailure({
            response: {
              status: 403,
              statusText: 'Invalid token'
            }
          }));
          dispatch(push('/'));
        }
      })
      .catch((error) => {
        done && done();
        dispatch(loginUserFailure(error));
        dispatch(push('/'));
      });
  }

}

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
  loginUser,
  logoutAndRedirect,
  fetchUserInfos,
  signUpUser,
  signUpUserVerifyCode
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Reducer
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const initialState =  {
  isLoggedIn: false,
  isLogging: false,
  statusText: null,
  displayName: null,
  firstName: null,
  lastName: null,
  email: null,
  roles: [],
  // Array accepted as first argument or using all parameters as array of roles
  hasAnyRole: function() { return _.intersection(this.roles, _.isArray(arguments[0]) ? arguments[0] : arguments).length > 0; }
};

const ACTION_HANDLERS = {
  [LOGIN_USER_REQUEST]: (state, payload) => {
    return Object.assign({}, state, {
      isLogging: true,
      statusText: null
    })
  },
  [LOGIN_USER_SUCCESS]: (state, event) => {

    const payload = event.payload;

    return Object.assign({}, state, {
      isLogging: false,
      isLoggedIn: true,
      statusText: 'Vous vous êtes connecté avec succès.',
      displayName: payload.displayName,
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      photo: payload.photo,
      roles: payload.roles
    })
  },
  [LOGIN_USER_FAILURE]: (state, payload) => {
    return Object.assign({}, state, {
      isLogging: false,
      isLoggedIn: false,
      statusText: `Authentication Error: ${payload.status} ${payload.statusText}`
    })
  },
  [LOGOUT_USER_REQUEST]: (state, payload) => {
    return Object.assign({}, state, {
      isLoggedIn: false,
      statusText: 'Vous vous êtes déconnecté.',
      firstName: null,
      lastName: null,
      email: null,
      photo: null,
      roles: []
    })
  },
  [LOGOUT_USER_FAILURE]: (state, payload) => {
    return Object.assign({}, state, {
      isLoggedIn: false,
      statusText: 'Vous vous êtes déconnecté.',
      firstName: null,
      lastName: null,
      email: null,
      photo: null,
      roles: []
    })
  },
  [LOGOUT_USER_SUCCESS]: (state, payload) => {
    return Object.assign({}, state, {
      isLoggedIn: false,
      statusText: 'Vous vous êtes déconnecté avec succès.',
      firstName: null,
      lastName: null,
      email: null,
      photo: null,
      roles: []
    })
  },
  [FETCH_USER_INFOS_SUCCESS]: (state, event) => {

    const payload = event.payload;

    return Object.assign({}, state, {
      isLoggedIn: true,
      statusText: null,
      displayName: payload.displayName,
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      photo: payload.photo,
      roles: payload.roles
    })
  },
  [SIGN_UP_USER_REQUEST]: (state, payload) => {
    return Object.assign({}, state, {
      statusText: null
    })
  },
  [SIGN_UP_USER_SUCCESS]: (state, event) => {

    const payload = event.payload;

    return Object.assign({}, state, {
      statusText: 'Vous avez créé votre compte avec succès.'
    })
  },
  [SIGN_UP_USER_FAILURE]: (state, payload) => {
    return Object.assign({}, state, {
      statusText: `Create Account Error: ${payload.status} ${payload.statusText}`
    })
  },
  [SIGN_UP_USER_VERIFY_CODE_REQUEST]: (state, payload) => {
    return Object.assign({}, state, {
      statusText: null
    })
  },
  [SIGN_UP_USER_VERIFY_CODE_SUCCESS]: (state, event) => {

    const payload = event.payload;

    return Object.assign({}, state, {
      statusText: 'Vous avez vérifié votre compte avec succès.'
    })
  },
  [SIGN_UP_USER_VERIFY_CODE_FAILURE]: (state, payload) => {
    return Object.assign({}, state, {
      statusText: `Verify Account Error: ${payload.status} ${payload.statusText}`
    })
  }
};

export default function mapReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}

