import React, { Component, PropTypes } from 'react'

import FacebookLoginButton from './FacebookLoginButton'
import GoogleLoginButton from './GoogleLoginButton'
import TwitterLoginButton from './TwitterLoginButton'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class LoginPanel extends Component {

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

          <div style={{ textAlign: 'center', margin: '20px', width: 1, backgroundColor: '#e0e0e0' }}>
          </div>

          <Paper zDepth={0} style={{ textAlign: 'center', padding: 6, flex: 1 }}>

            <TextField
              floatingLabelText="Email"
              fullWidth={true}
              floatingLabelFixed={true}
              inputStyle={{ marginLeft: 4, marginTop: 4, fontSize: '14px' }}
              floatingLabelStyle={{ top: 24, fontFamily: 'Lobster' }}
              floatingLabelFocusStyle={{ top: 24, fontFamily: 'Lobster' }}
              style={{ height: 58 }}
            />

            <TextField
              floatingLabelText="Mot de passe"
              floatingLabelFixed={true}
              fullWidth={true}
              type="password"
              inputStyle={{ marginLeft: 4, marginTop: 10, fontSize: '14px' }}
              floatingLabelStyle={{ top: 34, fontFamily: 'Lobster' }}
              floatingLabelFocusStyle={{ top: 34, fontFamily: 'Lobster' }}
            />

            <RaisedButton
              href="/auth/login"
              label="Se connecter"
              backgroundColor="#345d79"
              labelColor="white"
              fullWidth={true}
              labelStyle={{ fontFamily: 'Lobster', textTransform: 'none' }}
              style={{ marginTop: 10, height: 44 }}
            />

            <RaisedButton
              href="/auth/sign-up"
              label="Sign Up"
              backgroundColor="#f39c12"
              labelColor="#222"
              fullWidth={true}
              labelStyle={{ fontFamily: 'Lobster', textTransform: 'none' }}
              style={{ marginTop: 10, height: 44 }}
            />

          </Paper>

        </div>
      </div>

    );
  }

}

export default LoginPanel;
