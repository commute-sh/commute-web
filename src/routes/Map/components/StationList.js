import React, { PropTypes } from 'react';

import StationItem from './StationItem';

import { StationsType } from '../../../types';
import VirtualList from './VirtualList';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Class
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class StationList extends React.Component {

  static propTypes = {
    stations: StationsType.isRequired,
    style: PropTypes.object,
    onSelectStation: PropTypes.func
  };

  renderItem(station) {
    return (
      <StationItem
        key={station.number}
        station={station}
        style={{ height: 72 }}
        onSelectStation={this.props.onSelectStation}
      />
    );
  }

  render() {
    return (
      <div ref="station-list-container" style={{ height: this.props.style.height, overflow: 'scroll' }}>
        <VirtualList
          container={this.refs['station-list-container']}
          items={this.props.stations}
          renderItem={this.renderItem.bind(this)}
          itemHeight={72}
          itemBuffer={10}
        />
      </div>
    );
  }

}

export default StationList;
