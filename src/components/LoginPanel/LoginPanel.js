import React, { Component, PropTypes } from 'react'

import FacebookLoginButton from './FacebookLoginButton'
import GoogleLoginButton from './GoogleLoginButton'
import TwitterLoginButton from './TwitterLoginButton'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import LoginForm from './LoginForm'


class LoginPanel extends Component {

  static propTypes = {
    isLogging: PropTypes.bool,
    statusText: PropTypes.string,
    signUpDialogRef: PropTypes.element,
    handleLogin: PropTypes.func,
    handleSignUpOpen: PropTypes.func
  };

  render() {
    return (

      <div>

        <div style={{ fontFamily: 'Lobster', color: '#ccc', textAlign: 'center', padding: 20, fontSize: 20 }}>Se connecter</div>

        <div style={{ backgroundColor: 'white', display: 'flex', flex: '1', flexDirection: 'row', width: 640, padding: 12 }}>

          <div style={{ flex: 1 }}>
            <div style={{ width: '100%', padding: 6 }}>
              <FacebookLoginButton />
            </div>
            <div style={{ width: '100%', padding: 6 }}>
              <GoogleLoginButton />
            </div>
            <div style={{ width: '100%', padding: 6 }}>
              <TwitterLoginButton />
            </div>
          </div>

          <div style={{ textAlign: 'center', margin: '20px', width: 1, backgroundColor: '#e0e0e0' }} />

          <Paper zDepth={0} style={{ textAlign: 'center', padding: 6, flex: 1 }}>

            <LoginForm handleLogin={this.props.handleLogin} isLogging={this.props.isLogging} statusText={this.props.statusText} />

            <RaisedButton
              label="Créer un compte"
              backgroundColor="#f39c12"
              labelColor="#222"
              fullWidth={true}
              labelStyle={{ fontFamily: 'Lobster', textTransform: 'none' }}
              style={{ marginTop: 10, height: 44 }}
              onTouchTap={this.props.handleSignUpOpen}
            />

          </Paper>

        </div>

      </div>

    );
  }

}

export default LoginPanel;
