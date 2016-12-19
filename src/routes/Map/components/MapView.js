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
    this.props.actions.fetchStations();
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(commuteTheme)}>
        <div className={s.root}>
          <AppBar
            showMenuIconButton={false}
            style={{ zIndex: 1, height: 64, backgroundColor: 'transparent', boxShadow: 'none', margin: 0, padding: 0 }}
            iconElementRight={this.props.userInfos.isLoggedIn ?
              <LoggedIn
                displayName={this.props.userInfos.displayName}
                photo={this.props.userInfos.photo}
                logoutAndRedirect={this.props.actions.logoutAndRedirect.bind(this)}
                style={{ marginRight: 10 }} /> :
              <Login
                login={this.props.login}
                userInfos={this.props.userInfos}
                signUp={this.props.signUp}
                signUpVerifyCode={this.props.signUpVerifyCode}
                loginUser={this.props.actions.loginUser.bind(this)}
                signUpUser={this.props.actions.signUpUser.bind(this)}
                signUpUserVerifyCode={this.props.actions.signUpUserVerifyCode.bind(this)}
                clearSignUpUser={this.props.actions.clearSignUpUser.bind(this)}
                clearSignUpUserVerifyCode={this.props.actions.clearSignUpUserVerifyCode.bind(this)}
              />
            }
            iconStyleRight={{ margin: 0, padding: 0 }}
          />

          <LeftPanel
            map={this.props.map}
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
