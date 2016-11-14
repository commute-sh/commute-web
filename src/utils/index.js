import momentJsonParser from 'moment-json-parser'
import _ from 'lodash'

export function createReducer (initialState, reducerMap) {

  return (state = initialState, action) => {

    const reducer = reducerMap[action.type];

    return reducer
      ? reducer(_.isFunction(state) ? state() : state, action.payload)
      : (_.isFunction(state) ? state() : state);
  }
}

export function checkHttpStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

export function parseJSON (response) {
  return response.json()
}

export function parseJSONWithDates (response) {
  return response.text().then(text => momentJsonParser(text))
}
