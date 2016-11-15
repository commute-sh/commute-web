import React, { PropTypes } from 'react';

import StationSearchField from './StationSearchField';
import StationList from './StationList';


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Class
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class StationSearch extends React.Component {

  static propTypes = {
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

export default StationSearch;
