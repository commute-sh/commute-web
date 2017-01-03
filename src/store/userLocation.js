import GeoPoint from 'geopoint';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Constants
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const USER_LOCATION_CHANGED = 'USER_LOCATION_CHANGED';


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Actions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export function locationChanged(position) {
  console.log(`[USER_LOCATION_CHANGED] ------------------------------------- position: ${JSON.stringify(position)}`);
  return {
    type: USER_LOCATION_CHANGED,
    payload: { position }
  };
}

export function initGeoLocation() {
  return (dispatch, state) => {
    console.log('$$$ Initializing GeoLocation ...');
    navigator.geolocation.getCurrentPosition((position) => {
        console.log('$$$ navigator.geolocation.getCurrentPosition - position:', position);
        dispatch(locationChanged(position));
      }, (error) => {
        console.debug(`[Location][getCurrentPosition] Failed to get current position: ${error.message}`);
      }, { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );

    console.log('$$$ Watching Geolocation ...');
    return navigator.geolocation.watchPosition((position) => {
      console.log('[watchPosition][locationChanged] position:', position);
      dispatch(locationChanged(position));
    });
  };
}

export function disposeGeoLocation(watchID) {
    if (watchID) {
        navigator.geolocation.clearWatch(watchID);
    }
}


export const actions = {
  initGeoLocation,
  disposeGeoLocation
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Reducer
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const initialState = {
  position: undefined,
  geoLocation: undefined
};

const ACTION_HANDLERS = {

  [USER_LOCATION_CHANGED]: (state, { payload: { position } } = event) => {

    console.log(`[REDUCER][USER_LOCATION_CHANGED] ------------------------------------- position: ${position}`);
    console.log(`[REDUCER][USER_LOCATION_CHANGED] ------------------------------------- position.coords: ${position.coords}`);
    console.log(`[REDUCER][USER_LOCATION_CHANGED] ------------------------------------- latitude: ${position.coords.latitude}`);
    console.log(`[REDUCER][USER_LOCATION_CHANGED] ------------------------------------- longitude: ${position.coords.longitude}`);

    return Object.assign({}, state, {
      position,
      geoLocation: new GeoPoint(position.coords.latitude, position.coords.longitude)
    });

  }

};

export default function mapReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}



