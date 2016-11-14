import React, { PropTypes } from 'react';

import Paper from 'material-ui/Paper';
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
      <Paper style={{ position: 'absolute', margin: 30, padding: '0 0 20px 0', left: 0, top: 64, bottom: 0, width: 320, zIndex: 10000 }} zDepth={2}>

        <StationSearchField />
        <StationList stations={this.props.stations} />

      </Paper>
    );

  }
}

export default StationSearch;
