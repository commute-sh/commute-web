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


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Actions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function loginUserSuccess (user) {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: user
  }
}

export function loginUserFailure (err, hideErrorMessage) {
  return {
    type: LOGIN_USER_FAILURE,
    payload: {
      status: err.response.status,
      statusText: err.response.statusText,
      hideErrorMessage: hideErrorMessage
    }
  }
}

export function loginUserRequest () {
  console.log('LOGIN_USER_REQUEST: ' + LOGIN_USER_REQUEST)
  return {
    type: LOGIN_USER_REQUEST
  }
}

export function logoutUserSuccess (user) {
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

export function logoutAndRedirect (redirect = '/login') {

  return function (dispatch) {
    dispatch(logoutUserRequest());

    return fetch('/auth/logout', {
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

export function loginUser (email, password, redirect = '/') {
  return function (dispatch) {
    dispatch(loginUserRequest());

    const passwordHash = hash(password);

    return fetch('/auth/login', {
      method: 'post',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email, password: passwordHash })
    })
      .then(checkHttpStatus)
      .then(parseJSONWithDates)
      .then((response) => {
        try {
          dispatch(loginUserSuccess(response));
          dispatch(push(redirect))
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

export function fetchUserInfos (done, hideErrorMessage = false) {
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
          dispatch(push('/login'));
        }
      })
      .catch((error) => {
        done && done();
        dispatch(loginUserFailure(error, hideErrorMessage));
        dispatch(push('/login'));
      });
  }
}

export const actions = {
  loginUser,
  logoutAndRedirect,
  fetchUserInfos
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Reducer
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const initialState =  {
  isLoggedIn: false,
  isLogging: false,
  hideErrorMessage: false,
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
      hideErrorMessage: payload.hideErrorMessage,
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
  }
};

export default function mapReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}

