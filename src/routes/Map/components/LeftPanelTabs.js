import React, { Component, PropTypes } from 'react';

import {Tabs, Tab} from 'material-ui/Tabs';

import ActionSearch from 'material-ui/svg-icons/action/search';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

import FavoriteStationPanel from './FavoriteStationPanel'
import StationSearchPanel from './StationSearchPanel'

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Class
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class LeftPanelTab extends Component {

  onSelectStation() {
    this.props.navigationController.pushView(<div>Station</div>, {});
  }

  render() {
    return (
      <View style={{ height: '100%', backgroundColor: 'red' }}>
        <Tabs contentContainerStyle={{ position: 'absolute', left: 0, top: 48, bottom: 0, width: 320 }} tabTemplateStyle={{ height: '100%' }}>
          <Tab icon={<ActionFavoriteBorder />} style={{ position: 'relative', height: '100%', maxHeight: '100%', overflowY: 'hidden' }}>
            <FavoriteStationPanel onSelectStation={this.onSelectStation.bind(this)} />
          </Tab>
          <Tab icon={<ActionSearch />} style={{ position: 'relative', height: '100%', maxHeight: '100%', overflowY: 'hidden' }}>
            <StationSearchPanel onSelectStation={this.onSelectStation.bind(this)} />
          </Tab>
        </Tabs>
      </View>
    );
  }

}

class View extends Component {

  render() {
    return (
      <div style={{ height: '100%' }}>{this.props.children}</div>
    );
  }

}

export default LeftPanelTab;
