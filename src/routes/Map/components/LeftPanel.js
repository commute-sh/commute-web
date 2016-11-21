import React, { PropTypes } from 'react';

import { commute500 } from '../../../themes/commuteColors';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import {Tabs, Tab} from 'material-ui/Tabs';

import ActionSearch from 'material-ui/svg-icons/action/search';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

import FavoriteStationPanel from './FavoriteStationPanel'
import StationSearchPanel from './StationSearchPanel'

import { StationType } from '../../../types';


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Class
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class LeftPanel extends React.Component {

  static propTypes = {
    stations: StationType.isRequired,
  };

  render() {

    return (
      <Paper zDepth={2} style={{ position: 'absolute', margin: 0, left: 0, top: 0, bottom: 0, width: 320, zIndex: 10000 }}>

        <AppBar
          title="Commute.sh"
          titleStyle={{ textAlign: "center", fontFamily: 'Lobster', fontSize: 20, lineHeight: '64px', fontWeight: 100, padding: 0, margin: 0 }}
          showMenuIconButton={false}
          style={{ width: 320,height: 64, backgroundColor: commute500, boxShadow: 'none' }}
        />

        <Tabs>
          <Tab icon={<ActionFavoriteBorder />}>
            <div style={{ position: 'relative', height: '100%', maxHeight: 'calc(100% - 48px - 160px)', overflowY: 'hidden' }}>
              <FavoriteStationPanel stations={this.props.stations} />
            </div>
          </Tab>
          <Tab icon={<ActionSearch />}>
            <div style={{ position: 'relative', height: '100%', maxHeight: 'calc(100% - 48px - 160px)', overflowY: 'hidden' }}>
              <StationSearchPanel stations={this.props.stations} />
            </div>
          </Tab>
        </Tabs>

      </Paper>

    );

  }
}

export default LeftPanel;
