import React, { PropTypes } from 'react';

import StationItem from './StationItem';

import { StationsType } from '../../../types';

import VirtualList from './VirtualList';


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Class
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class FavoriteStationList extends React.Component {

  static propTypes = {
    stations: StationsType.isRequired,
    style: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      dataSource: []
    };
  }

  renderItem(station) {
    return (
      <StationItem key={station.number} station={station} style={{ height: 72 }} />
    );
  }

  render() {

    const favoriteStations = this.props.stations.filter(station => station.name.toUpperCase().indexOf('MONGOLFIER') >= 0);

    if (favoriteStations.length === 0) {
      return null;
    }

    return (
      <div ref="favorite-station-list-container" style={{ height: this.props.style.height, overflow: 'scroll' }}>
        <VirtualList
          container={this.refs['favorite-station-list-container']}
          items={favoriteStations}
          renderItem={this.renderItem}
          itemHeight={72}
          itemBuffer={10}
        />
      </div>
    );
  }


}

export default FavoriteStationList;
