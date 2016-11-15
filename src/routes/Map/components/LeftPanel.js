import React, { PropTypes } from 'react';

import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import {Tabs, Tab} from 'material-ui/Tabs';

import ActionSearch from 'material-ui/svg-icons/action/search';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

import StationSearch from './StationSearch'


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Class
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class LeftPanel extends React.Component {

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
      <Paper zDepth={2} style={{ position: 'absolute', margin: 0, left: 0, top: 0, bottom: 0, width: 320, zIndex: 10000 }}>
        <div style={{ width: 320, height: 160, backgroundColor: 'white' }}>
        </div>
{/*
        <AppBar
          title="Station"
          showMenuIconButton={false}
          titleStyle={{ textAlign: "center", fontSize: 16, fontWeight: 400, fontStyle: 'italic' }}
          style={{ zIndex: 999, height: 32, boxShadow: 'none' }}
        />
*/}

        <Tabs>
          <Tab icon={<ActionFavoriteBorder />} />
          <Tab icon={<ActionSearch />} />
        </Tabs>

        <div style={{ position: 'relative', height: '100%', maxHeight: 'calc(100% - 48px - 160px)', overflowY: 'hidden' }}>
          <StationSearch stations={this.props.stations} />
        </div>

      </Paper>

    );

  }
}

export default LeftPanel;
