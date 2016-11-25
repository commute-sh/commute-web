import React, { PropTypes } from 'react';

import StationSearchField from './StationSearchField';
import StationList from './StationList';

import { StationType } from '../../../types';


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Class
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class StationSearchPanel extends React.Component {

  static propTypes = {
    stations: StationType.isRequired,
  };

  render() {

    return (
      <div style={{ height: '100%', maxHeight: '100%' }}>

        <StationSearchField />
        <div style={{ height: '100%', maxHeight: 'calc(100% - 70px)', overflowY: 'scroll' }}>
          <StationList stations={this.props.stations} />
        </div>

      </div>
    );

  }
}

export default StationSearchPanel;