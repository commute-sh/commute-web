import { checkHttpStatus, parseJSONWithDates } from '../utils'
import 'whatwg-fetch'
import { push } from 'react-router-redux'


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Constants
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const CLEAN_USER_INFOS_REQUEST = 'CLEAN_USER_INFOS_REQUEST';
export const FETCH_USER_INFOS_REQUEST = 'FETCH_USER_INFOS_REQUEST';
export const FETCH_USER_INFOS_SUCCESS = 'FETCH_USER_INFOS_SUCCESS';
export const FETCH_USER_INFOS_FAILURE = 'FETCH_USER_INFOS_FAILURE';


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Actions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function fetchUserInfosSuccess (user) {
  return {
    type: FETCH_USER_INFOS_SUCCESS,
    payload: { user }
  }
}

export function fetchUserInfosFailure (err) {
  return {
    type: FETCH_USER_INFOS_FAILURE,
    payload: { err }
  }
}

export function fetchUserInfosRequest () {
  return {
    type: FETCH_USER_INFOS_REQUEST
  }
}

export function cleanUserInfosRequest () {
  return {
    type: CLEAN_USER_INFOS_REQUEST
  }
}

export function cleanUserInfos (done) {
  return function (dispatch) {
    dispatch(cleanUserInfosRequest());
  }
}

export function fetchUserInfos (redirect = '/') {
  return function (dispatch) {
    dispatch(fetchUserInfosRequest());

    return fetch('/me', {
      credentials: 'same-origin'
    })
      .then(checkHttpStatus)
      .then(parseJSONWithDates)
      .then((response) => {
          dispatch(fetchUserInfosSuccess(response))
      })
      .catch((err) => {
        err.response.json().then(payload => {
          err.body = payload;
          dispatch(fetchUserInfosFailure(err));
          dispatch(push(redirect))
        }).catch(err => {
          dispatch(fetchUserInfosFailure(err));
          dispatch(push(redirect));
        });
      });
  }
}

export const actions = {
  fetchUserInfos,
  cleanUserInfos
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Reducer
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const initialState =  {
  isFetching: false,
  failed: false,
  errMessage: null,
  isLoggedIn: false,
  displayName: null,
  firstName: null,
  lastName: null,
  email: null,
  roles: [],
  // Array accepted as first argument or using all parameters as array of roles
  hasAnyRole: function() { return _.intersection(this.roles, _.isArray(arguments[0]) ? arguments[0] : arguments).length > 0; }
};

const ACTION_HANDLERS = {
  [CLEAN_USER_INFOS_REQUEST]: (state, event) => {
    return Object.assign({}, initialState);
  },
  [FETCH_USER_INFOS_REQUEST]: (state, event) => {
    return Object.assign({}, state, {
      isFetching: true,
      failed: false,
      errMessage: null
    });
  },
  [FETCH_USER_INFOS_SUCCESS]: (state, { payload: { user } } = event) => {
    return Object.assign({}, state, {
      isFetching: true,
      isLoggedIn: true,
      displayName: user.displayName,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      photo: user.photo,
      roles: user.roles
    });
  },
  [FETCH_USER_INFOS_FAILURE]: (state, { payload: { err: { response, message, body } } } = event) => {
    return Object.assign({}, state, {
      isFetching: false,
      failed: true,
      errMessage:
        body && body.message ?
          body.message :
          response ?
            `UserInfos Error: ${response.status} - ${response.statusText}` :
            message,
      isLoggedIn: false
    });
  }
};

export default function mapReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}

