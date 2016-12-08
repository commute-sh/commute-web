import React, { PropTypes } from 'react';

import FavoriteStationList from './FavoriteStationList';

import { StationsType } from '../../../types';


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Class
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class FavoriteStationPanel extends React.Component {

  static propTypes = {
    stations: StationsType.isRequired,
  };

  render() {

    return (
      <div style={{ height: '100%', maxHeight: '100%' }}>
        <div style={{ height: '100%', maxHeight: 'calc(100% - 70px)', overflowY: 'scroll' }}>
          <FavoriteStationList stations={this.props.stations} />
        </div>
      </div>
    );

  }
}

export default FavoriteStationPanel;
