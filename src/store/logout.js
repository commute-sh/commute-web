import { checkHttpStatus } from '../utils'
import 'whatwg-fetch'
import { push } from 'react-router-redux'
import { cleanUserInfos } from './userInfos'

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Constants
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const LOGOUT_USER_REQUEST = 'LOGOUT_USER_REQUEST';
export const LOGOUT_USER_FAILURE = 'LOGOUT_USER_FAILURE';
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Actions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function logoutUserSuccess () {
  return {
    type: LOGOUT_USER_SUCCESS
  }
}

export function logoutUserFailure (err) {
  return {
    type: LOGOUT_USER_FAILURE,
    payload: { err }
  }
}

export function logoutUserRequest () {
  return {
    type: LOGOUT_USER_REQUEST
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
        dispatch(logoutUserSuccess(response));
        dispatch(cleanUserInfos());
        dispatch(push(redirect));
      })
      .catch((err) => {
        err.response.json().then(payload => {
          err.body = payload;
          dispatch(logoutUserFailure(err));
          dispatch(cleanUserInfos());
          dispatch(push(redirect));
        }).catch(err => {
          dispatch(logoutUserFailure(err));
          dispatch(cleanUserInfos());
          dispatch(push(redirect));
        });
      })
  }
}

export const actions = {
  logoutAndRedirect
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
  [LOGOUT_USER_REQUEST]: (state, event) => {
    return Object.assign({}, state, {
      isFetching: true,
      failed: false,
      errMessage: null
    })
  },
  [LOGOUT_USER_SUCCESS]: (state, event) => {
    return Object.assign({}, state, {
      isFetching: false
    })
  },
  [LOGOUT_USER_FAILURE]: (state, { payload: { err: { response, message, body } } } = event) => {
    return Object.assign({}, state, {
      isFetching: false,
      failed: true,
      errMessage:
        body && body.message ?
          body.message :
          response ?
            `Logout Error: ${response.status} - ${response.statusText}` :
            message
    })
  }
};

export default function mapReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}

