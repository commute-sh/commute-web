////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Constants
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const LOCATION_CHANGE = 'LOCATION_CHANGE';


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Actions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function locationChange (location = '/') {
  return {
    type    : LOCATION_CHANGE,
    payload : location
  }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Action Creators
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const updateLocation = ({ dispatch }) => {
  return (nextLocation) => dispatch(locationChange(nextLocation))
}


export const actions = {
  updateLocation
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Reducer
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const initialState = {};

export default function locationReducer (state = initialState, action) {
  return action.type === LOCATION_CHANGE ? action.payload : state
}
