import React from 'react';
import s from './MapView.css';
import AppBar from 'material-ui/AppBar';

import Map from './Map';
import LeftPanel from './LeftPanel';

import { commute500, commute700 } from '../../../themes/commuteColors';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Login from './Login'
import LoggedIn from './LoggedIn'


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Theme
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const commuteTheme = getMuiTheme({
  palette: {
    primary1Color: commute500,
    primary2Color: commute700,
  },
  appBar: {
    height: 64
  }
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Class
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class MapView extends React.Component {

  state = {
    leftPanelOpen: true
  };

  onLeftPanelToggle() {
    console.log("Tapped on left panel right icon");
    this.setState({ leftPanelOpen: !this.state.leftPanelOpen });
  }

  componentDidMount() {
    this.props.actions.fetchUserInfos();
    this.props.actions.fetchStations()
  }

  render() {

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(commuteTheme)}>
        <div className={s.root}>
          <AppBar
            showMenuIconButton={false}
            style={{ zIndex: 999, height: 64, backgroundColor: 'transparent', boxShadow: 'none', margin: 0, padding: 0 }}
            iconElementRight={this.props.auth.isLoggedIn ?
              <LoggedIn displayName={this.props.auth.displayName} photo={this.props.auth.photo} style={{ marginRight: 10 }} /> :
              <Login />
            }
            iconStyleRight={{ margin: 0, padding: 0 }}
          />

          <LeftPanel
            stations={this.props.map.stations}
            leftPanelOpen={this.state.leftPanelOpen}
            onLeftPanelToggle={this.onLeftPanelToggle.bind(this)}
          />

          <Map
            stations={this.props.map.stations}
            leftPanelOpen={this.state.leftPanelOpen}
          />
        </div>
      </MuiThemeProvider>
    );
  }

}

export default MapView;
