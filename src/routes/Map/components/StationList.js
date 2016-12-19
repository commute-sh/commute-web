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
    style: PropTypes.object
  };

  renderItem(station) {
    return (
      <StationItem key={station.number} station={station} style={{ height: 72 }} />
    );
  }

  render() {
    return (
      <div ref="container" style={{ height: this.props.style.height, overflow: 'scroll' }}>
        <VirtualList
          container={this.refs.container}
          items={this.props.stations}
          renderItem={this.renderItem}
          itemHeight={72}
          itemBuffer={10}
        />
      </div>
    );
  }

}

export default StationList;
