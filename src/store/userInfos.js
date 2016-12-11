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
  console.log('FETCH_USER_INFOS_REQUEST: ' + FETCH_USER_INFOS_REQUEST);
  return {
    type: FETCH_USER_INFOS_REQUEST
  }
}

export function cleanUserInfosRequest () {
  console.log('CLEAN_USER_INFOS_REQUEST: ' + CLEAN_USER_INFOS_REQUEST);
  return {
    type: CLEAN_USER_INFOS_REQUEST
  }
}

export function cleanUserInfos (done) {
  return function (dispatch) {
    dispatch(cleanUserInfosRequest());
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
        dispatch(fetchUserInfosFailure(error));
        dispatch(push('/'));
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
  statusText: null,
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
      statusText: null
    });
  },
  [FETCH_USER_INFOS_SUCCESS]: (state, event) => {

    const payload = event.payload;

    return Object.assign({}, state, {
      isFetching: true,
      statusText: null,
      isLoggedIn: true,
      displayName: payload.displayName,
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      photo: payload.photo,
      roles: payload.roles
    });
  },
  [FETCH_USER_INFOS_FAILURE]: (state, event) => {

    const payload = event.payload;

    console.log('payload:', payload);

    return Object.assign({}, state, {
      isFetching: false,
      statusText: `Authentication Error: ${payload.status} - ${payload.statusText}`,
      isLoggedIn: false
    });
  }
};

export default function mapReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}

