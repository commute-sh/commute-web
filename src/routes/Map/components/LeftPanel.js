import React, { PropTypes } from 'react';

import { commute500 } from '../../../themes/commuteColors';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import {Tabs, Tab} from 'material-ui/Tabs';

import Close from 'material-ui/svg-icons/navigation/close';
import ActionSearch from 'material-ui/svg-icons/action/search';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

import FavoriteStationPanel from './FavoriteStationPanel'
import StationSearchPanel from './StationSearchPanel'

import { StationsType } from '../../../types';


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Class
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class LeftPanel extends React.Component {

  static propTypes = {
    leftPanelOpen: PropTypes.bool.isRequired,
    onLeftPanelToggle: PropTypes.func.isRequired,
    stations: StationsType.isRequired,
  };

  onOpenFavoriteStationPanel() {
    this.props.onLeftPanelToggle();
  }

  onOpenStationSearchPanel() {
    this.props.onLeftPanelToggle();
  }

  render() {

    return (
      <Paper zDepth={2} style={{ position: 'absolute', margin: 0, left: this.props.leftPanelOpen ? 0 : -320, top: 0, bottom: 0, width: this.props.leftPanelOpen ? 320 : 368, zIndex: 2, overflow: 'hidden' }}>

        <Paper zDepth={2} style={{ position: 'absolute', margin: 0, left: 320, top: 0, bottom: 0, width: 48, backgroundColor: commute500 }}>

          <div style={{ position: 'absolute', top: 0, bottom: 0, width: 48, right: 0 }}>
            <IconButton
              iconStyle={{ fill: 'white', width: 24, height: 24 }}
              style={{ width: 48, height: 48, margin: '0px', padding: 0 }}
              onTouchTap={this.onOpenFavoriteStationPanel.bind(this)}>
              <ActionFavoriteBorder />
            </IconButton>
            <IconButton
              iconStyle={{ fill: 'white', width: 24, height: 24 }}
              style={{ width: 48, height: 48, margin: '0px', padding: 0 }}
              onTouchTap={this.onOpenStationSearchPanel.bind(this)}>
              <ActionSearch />
            </IconButton>
          </div>

        </Paper>

        <Paper zDepth={2} style={{ position: 'absolute', margin: 0, left: this.props.leftPanelOpen ? 0 : -320, top: 0, bottom: 0, width: 320, overflow: 'none' }}>

          <AppBar
            title="Commute.sh"
            titleStyle={{ textAlign: "center", fontFamily: 'Lobster', fontSize: 20, lineHeight: '64px', fontWeight: 100, padding: 0, margin: 0 }}
            showMenuIconButton={false}
            style={{
              width: '100%',
              height: 64,
              backgroundColor: commute500,
              boxShadow: 'none'
            }}
            iconElementRight={
              <IconButton
                iconStyle={{ fill: 'white', width: 24, height: 24 }}
                style={{ width: 40, height: 40, margin: '1px 8px', padding: 0 }}
                onTouchTap={this.props.onLeftPanelToggle}>
                <Close />
              </IconButton>
            }
          />

          <Tabs contentContainerStyle={{ position: 'absolute', left: 0, top: 112, bottom: 0, width: 320 }} tabTemplateStyle={{ height: '100%' }}>
            <Tab icon={<ActionFavoriteBorder />}>
              <div style={{ position: 'relative', height: '100%', maxHeight: '100%', overflowY: 'hidden' }}>
                <FavoriteStationPanel stations={this.props.stations} />
              </div>
            </Tab>
            <Tab icon={<ActionSearch />}>
              <div style={{ position: 'relative', height: '100%', maxHeight: '100%', overflowY: 'hidden' }}>
                <StationSearchPanel stations={this.props.stations} />
              </div>
            </Tab>
          </Tabs>

        </Paper>

      </Paper>

    );

  }
}

export default LeftPanel;
