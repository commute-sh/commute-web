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
          dispatch(push(redirect));
          dispatch(cleanUserInfos());
        } catch (e) {
          dispatch(logoutUserFailure({
            response: {
              status: 403,
              statusText: 'Invalid token'
            }
          }));
          dispatch(cleanUserInfos());
        }
      })
      .catch((err) => {
        dispatch(logoutUserFailure({
          response: {
            status: 500,
            statusText: err.message
          }
        }));
        dispatch(push(redirect));
        dispatch(cleanUserInfos());
      });
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
  statusText: null
};

const ACTION_HANDLERS = {
  [LOGOUT_USER_REQUEST]: (state, event) => {
    return Object.assign({}, state, {
      isFetching: true,
      statusText: null
    })
  },
  [LOGOUT_USER_FAILURE]: (state, event) => {
    return Object.assign({}, state, {
      isFetching: false,
      statusText: 'La déconnexion a échoué.'
    })
  },
  [LOGOUT_USER_SUCCESS]: (state, event) => {
    return Object.assign({}, state, {
      isFetching: false,
      statusText: 'Vous vous êtes déconnecté avec succès.'
    })
  }
};

export default function mapReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}

