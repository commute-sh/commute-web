import React, { PropTypes } from 'react';

import Paper from 'material-ui/Paper';
import StationSearchField from './StationSearchField';
import StationList from './StationList';
import {Tabs, Tab} from 'material-ui/Tabs';

import ActionSearch from 'material-ui/svg-icons/action/search';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';


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
      <Paper zDepth={2} style={{ position: 'absolute', margin: 0, left: 0, top: 64, bottom: 0, width: 320, zIndex: 10000 }}>

        <Tabs>
          <Tab icon={<ActionFavoriteBorder />} />
          <Tab icon={<ActionSearch />} />
        </Tabs>

        <div style={{ position: 'relative', height: '100%', maxHeight: 'calc(100% - 48px)', overflowY: 'hidden' }}>

          <StationSearchField />
          <div style={{ height: '100%', maxHeight: 'calc(100% - 70px)', overflowY: 'scroll' }}>
            <StationList stations={this.props.stations} />
          </div>

        </div>

      </Paper>

    );

  }
}

export default StationSearch;
