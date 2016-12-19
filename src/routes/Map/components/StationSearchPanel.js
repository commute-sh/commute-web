import React, { PropTypes } from 'react';

import StationSearchField from './StationSearchField';
import StationList from './StationList';

import { StationsType } from '../../../types';


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Class
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class StationSearchPanel extends React.Component {

  static propTypes = {
    stations: StationsType.isRequired,
  };

  render() {
    return (
      <div style={{ height: '100%', maxHeight: '100%' }}>
        <StationSearchField />
        <StationList style={{ height: 'calc(100% - 72px)' }} stations={this.props.stations} />
      </div>
    );
  }
}

export default StationSearchPanel;
