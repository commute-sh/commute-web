import React, { Component, PropTypes } from 'react';

import { commute500 } from '../../../themes/commuteColors';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';

import Close from 'material-ui/svg-icons/navigation/close';
import ActionSearch from 'material-ui/svg-icons/action/search';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

import { StationsType } from '../../../types';
import NavigationController from 'react-navigation-controller';

import LeftPanelTabs from './LeftPanelTabs';


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Class
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class LeftPanel extends Component {

  static propTypes = {
    leftPanelOpen: PropTypes.bool.isRequired,
    onLeftPanelToggle: PropTypes.func.isRequired,
    stations: StationsType.isRequired,
    userLocation: PropTypes.object
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

          {this.renderNavigationController()}

        </Paper>

      </Paper>

    );

  }

  renderNavigationController() {
    const props = {
      // The views to place in the stack. The front-to-back order
      // of the views in this array represents the new bottom-to-top
      // order of the navigation stack. Thus, the last item added to
      // the array becomes the top item of the navigation stack.
      // NOTE: This can only be updated via `setViews()`
      views: [
        <LeftPanelTabs />
      ],

      // If set to true, the navigation will save the state of each view that
      // pushed onto the stack. When `popView()` is called, the navigationController
      // will rehydrate the state of the view before it is shown.
      // Defaults to false
      // NOTE: This can only be updated via `setViews()`
      preserveState: true,

      // The spring tension for transitions
      // http://facebook.github.io/rebound-js/docs/rebound.html
      // Defaults to 10
      transitionTension: 12,

      // The spring friction for transitions
      // Defaults to 6
      transitionFriction: 5
    };

    return (
      <NavigationController {...props} />
    );
  }

}

export default LeftPanel;
