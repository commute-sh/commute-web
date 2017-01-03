import { checkHttpStatus, parseJSONWithDates } from '../../../utils'
import 'whatwg-fetch'


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Constants
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const FETCH_STATIONS_REQUEST = 'FETCH_STATIONS_REQUEST';
export const FETCH_STATIONS_FAILED = 'FETCH_STATIONS_FAILED';
export const FETCH_STATIONS_SUCCEED = 'FETCH_STATIONS_SUCCEED';


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Actions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function fetchStationsSucceed(data) {
  return (dispatch, state) => {
    dispatch({
      type: FETCH_STATIONS_SUCCEED,
      payload: data
    })
  }
}

export function fetchStationsRequest() {
  return {
    type: FETCH_STATIONS_REQUEST
  }
}

export function fetchStationsFailed(err) {
  return {
    type: FETCH_STATIONS_FAILED,
    payload: { err }
  }
}

export function fetchStations() {
  return (dispatch, state) => {

    dispatch(fetchStationsRequest());

      return fetch('/graphql', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: ` 
          {
            station {
              number
              name
              address
              position {
                lat
                lng
              }
              banking
              bonus
              status
              contract_name
              bike_stands
              available_bike_stands
              available_bikes
              last_update
              distance
              images {
                uid
                width
                quality
              }
            }
          }
        `,
        }),
        credentials: 'include',
      })
      .then(checkHttpStatus)
      .then(parseJSONWithDates)
      .then((response) => {
        dispatch(fetchStationsSucceed(response.data.station))
      })
      .catch((err) => {
          dispatch(fetchStationsFailed(err));
      });

  }

}

export const actions = {
  fetchStations
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Reducer
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const initialState =  {
  isFetching: false,
  stations: []
};

const ACTION_HANDLERS = {
  [FETCH_STATIONS_REQUEST]: (state, event) => {
    return Object.assign({}, state, {
      stations: [],
      isFetching: true,
      err: undefined
    })
  },
  [FETCH_STATIONS_SUCCEED]: (state, event) => {
    return Object.assign({}, state, {
      stations: event.payload,
      isFetching: false,
      err: undefined
    })
  },
  [FETCH_STATIONS_FAILED]: (state, event) => {
    return Object.assign({}, state, {
      isFetching: true,
      err: event.err
    })
  }
};

export default function mapReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}

