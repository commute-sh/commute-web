import React, { PropTypes } from 'react';

import StationSearchField from './StationSearchField';
import StationList from './StationList';

import Loader from '../../../components/LoginPanel/Loader'

import { removeDiacritics } from '../../../utils';
import GeoPoint from 'geopoint';

import * as mapModule from '../modules/map'
import * as userLocationModule from '../../../store/userLocation'


import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Class
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class StationSearchPanel extends React.Component {

  static propTypes = {
    onSelectStation: PropTypes.func
  };

  state = {
    stations: []
  };

  componentWillReceiveProps(nextProps, nextState) {
    let allStations = nextProps.map.stations.map(station => {

      station.cleanedName = removeDiacritics(station.name.toUpperCase());

      if (!station.geoLocation) {
        station.geoLocation = new GeoPoint(station.position.lat, station.position.lng);
      }

      if (nextProps.userLocation.geoLocation) {
        station.distance = Number((nextProps.userLocation.geoLocation.distanceTo(station.geoLocation, true) * 1000).toFixed(3));
      }

      return station;

    });

    allStations = _.sortBy(allStations, nextProps.userLocation.geoLocation ? ['distance'] : ['name']);

    this.setState({ allStations: allStations, stations: allStations });
  }

  onChange(event) {
    const value = removeDiacritics(event.target.value.toUpperCase());

    console.log("Station name:", value);

    const stations = this.state.allStations.filter(station => {
      return station.cleanedName.indexOf(value) >= 0;
    });

    console.log("Stations count:", stations.length);

    this.setState({ stations });
  }

  render() {

    const { map: { isFetching, errMessage } } = this.props;

    const { stations } = this.state;

    return (
      <div style={{ height: '100%', maxHeight: '100%' }}>

        { isFetching &&
          <Loader style={{
            zIndex: 5,
            position: 'absolute', top: 0, bottom: 0, left: 0, right: 0
          }} />
        }

        { errMessage &&
          <div style={{ color: 'red', fontSize: 12, padding: 5, paddingBottom: 10 }}>
            {errMessage}
          </div>
        }

        <StationSearchField onChange={this.onChange.bind(this)} />
        <StationList
          style={{ height: 'calc(100% - 71px)' }}
          stations={stations}
          onSelectStation={this.props.onSelectStation.bind(this)}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => Object.assign({}, {
  map: state.map,
  userLocation: state.userLocation
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    Object.assign({},
      mapModule.actions,
      userLocationModule.actions
    ), dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(StationSearchPanel)
