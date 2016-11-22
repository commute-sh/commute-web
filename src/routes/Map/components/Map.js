import React, { PropTypes } from 'react';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import MarkerClusterer from "react-google-maps/lib/addons/MarkerClusterer";
import _ from 'lodash';


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Class
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Map extends React.Component {

  static propTypes = {
    leftPanelOpen: PropTypes.bool.isRequired,
    stations: PropTypes.arrayOf(PropTypes.shape({
      number: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      position: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired,
      }),
      banking: PropTypes.boolean,
      bonus: PropTypes.boolean,
      status: PropTypes.string,
      contract_name: PropTypes.string.isRequired,
      bike_stands: PropTypes.number.isRequired,
      available_bike_stands: PropTypes.number.isRequired,
      available_bikes: PropTypes.number.isRequired,
      last_update: PropTypes.object.isRequired,
      distance: PropTypes.number,

    })).isRequired,
  };

  render() {

    const WithGoogleMap = withGoogleMap(props => (
      <GoogleMap
        ref={props.onMapLoad}
        defaultZoom={15}
        defaultCenter={{ lat: 48.8145818, lng: 2.4585065 }}
        onClick={props.onMapClick}
        options={{
          streetViewControl: false,
          mapTypeControlOptions: {
            position: google.maps.ControlPosition.LEFT_BOTTOM,
            style: google.maps.MapTypeControlStyle.DEFAULT
          }
        }}
      >
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
