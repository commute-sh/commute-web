import React, { PropTypes } from 'react';
import { withGoogleMap, GoogleMap, Marker, Circle } from "react-google-maps";
import MarkerClusterer from "react-google-maps/lib/addons/MarkerClusterer";
import InfoBox from "react-google-maps/lib/addons/InfoBox";
import _ from 'lodash';
import UserLocationImage from '../assets/user-location-64.png';

import { StationsType } from '../../../types';


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Class
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Map extends React.Component {

  static propTypes = {
    leftPanelOpen: PropTypes.bool.isRequired,
    stations: StationsType.isRequired,
    userLocation: PropTypes.object
  };

  render() {

    const { userLocation: { geoLocation } } = this.props;

    console.log('geoLocation:', geoLocation);

    const parisCenter = { lat: 48.8534100, lng: 2.3488000 };

//    const center = coords ? { lat: coords.latitude, lng: coords.longitude } : { lat: 48.8145818, lng: 2.4585065 };
    const center = geoLocation ? { lat: geoLocation.latitude(), lng: geoLocation.longitude() } : parisCenter;

    console.log("Center:", center);

    const WithGoogleMap = withGoogleMap(props => (
      <GoogleMap
        ref={props.onMapLoad}
        defaultZoom={15}
        defaultCenter={center}
        onClick={props.onMapClick}
        options={{
          streetViewControl: false,
          mapTypeControlOptions: {
            position: google.maps.ControlPosition.LEFT_BOTTOM,
            style: google.maps.MapTypeControlStyle.DEFAULT
          }
        }}
      >
        {center && (
          <InfoBox
            defaultPosition={new google.maps.LatLng(center.lat, center.lng)}
            options={{ closeBoxURL: ``, enableEventPropagation: true }}
          >
              <img
                alt='User Location'
                className='user-location-img'
                src={UserLocationImage}
                style={{ width: 32, height: 32 }} />
          </InfoBox>
        )}

        <MarkerClusterer
          averageCenter
          enableRetinaIcons
          gridSize={60}
        >
          {props.markers.map((marker, index) => (
            <Marker
              {...marker}
              onRightClick={() => props.onMarkerRightClick(index)}
            />
          ))}
        </MarkerClusterer>
      </GoogleMap>
    ));

    const markers = this.props.stations.map(station => {
      return {
        position: station.position,
        key: station.number,
        defaultAnimation: 2
      }
    });

    return (
        <WithGoogleMap
          containerElement={
            <div style={{ zIndex: 0, position: 'absolute', top: 0, bottom: 0, left: this.props.leftPanelOpen ? 320 : 48, right: 0 }} />
          }
          mapElement={
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }} />
          }
          onMapLoad={_.noop}
          onMapClick={_.noop}
          markers={markers}
          onMarkerRightClick={_.noop}
        />
    );

  }

}

export default Map;
