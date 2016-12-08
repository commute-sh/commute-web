import React, { Component, PropTypes } from 'react';
import { IconButton } from 'material-ui'
import Popover from 'material-ui/Popover';
import LoginPanel from '../../../components/LoginPanel';
import SignUpPanel from '../../../components/LoginPanel/SignUpPanel';
import SignUpVerificationCodePanel from '../../../components/LoginPanel/SignUpVerificationCodePanel';

import AccountCircleIcon from 'material-ui/svg-icons/action/account-circle';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Class
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Login extends Component {

  static muiName = 'FlatButton';

  static propTypes = {
    displayName: PropTypes.string,
    loginUser: PropTypes.func,
    signUpUser: PropTypes.func,
    verifyUserSignUp: PropTypes.func
  };


  state = {
    open: false,
    signUpOpen: false,
    signUpVerificationCodeOpen: false,
    signUpConfirmOpen: false,
    signUpUser: undefined
  };

  handleSignUpOpen() {
    this.setState({ open: false, signUpOpen: true });
  };

  handleLogin({ username, password } = values) {
    console.log("username:", username);

    this.setState({ open: false });
    this.props.loginUser(username, password);
  };

  handleSignUp({ username, email, password, givenName, familyName } = values) {
    const user = { username, email, givenName, familyName};
    this.props.signUpUser(username, email, password, givenName, familyName);
    this.setState({ signUpVerificationCodeOpen: true, signUpOpen: false, signUpUser: user });
  };

  handleSignUpVerifyCode({ verificationCode } = values) {

    console.log("verificationCode:", verificationCode);

    this.props.signUpUserVerifyCode(this.state.signUpUser.username, verificationCode);
    this.setState({ signUpVerificationCodeOpen: false, signUpConfirmOpen: true });
  };

  handleSignUpClose(buttonClicked) {
    this.setState({ signUpOpen: false, signUpVerificationCodeOpen: buttonClicked });
  };

  handleSignUpVerifyCodeClose(buttonClicked) {
    this.setState({ signUpOpen: false, signUpConfirmOpen: buttonClicked });
  };

  handleSignUpConfirmClose() {
    this.setState({ signUpConfirmOpen: false, open: false });
  };

  handleTouchTap(event) {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  }

  handleRequestClose() {
    this.setState({
      open: false
    });
  }

  render() {

    return (
      <div>

        <IconButton
          iconStyle={{ fill: 'black', opacity: 0.8, width: 32, height: 32 }}
          style={{ width: 60, height: 60, margin: '2px 16px', padding: 0 }}
          onTouchTap={this.handleTouchTap.bind(this)}
        >
          <AccountCircleIcon />
        </IconButton>

        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose.bind(this)}
          style={{ zIndex: 3 }}>
          <LoginPanel
            handleLogin={this.handleLogin.bind(this)}
            handleSignUpOpen={this.handleSignUpOpen.bind(this)}
          />
        </Popover>

        {this.renderSignUpDialog()}
        {this.renderSignUpVerifyCodeDialog()}
        {this.renderSignUpConfirmDialog()}

      </div>
    );

  }

  renderSignUpDialog() {

    return (
      <Dialog
        title="Créer un compte"
        modal={false}
        open={this.state.signUpOpen}
        overlayStyle={{ zIndex: 4 }}
        actionsContainerStyle={{ padding: 20 }}
        onRequestClose={this.handleSignUpClose.bind(this)}
      >
        <SignUpPanel handleSignUp={this.handleSignUp.bind(this)} />
      </Dialog>
    );

  }

  renderSignUpVerifyCodeDialog() {

    return (
      <Dialog
        title="Saisir le code de vérification"
        modal={false}
        open={this.state.signUpVerificationCodeOpen}
        overlayStyle={{ zIndex: 4 }}
        actionsContainerStyle={{ padding: 20 }}
        onRequestClose={this.handleSignUpVerifyCodeClose.bind(this)}
      >
        <SignUpVerificationCodePanel handleSignUpVerifyCode={this.handleSignUpVerifyCode.bind(this)} />
      </Dialog>
    );

  }

  renderSignUpConfirmDialog() {

    const actions = [
      <FlatButton
        label="Ok"
        primary={true}
        onTouchTap={this.handleSignUpConfirmClose.bind(this)}
      />
    ];

    return (
      <Dialog
        title="Confirmation de création de compte"
        actions={actions}
        modal={false}
        open={this.state.signUpConfirmOpen}
        overlayStyle={{ zIndex: 4 }}
        onRequestClose={this.handleSignUpConfirmClose.bind(this)}
      >
        Votre compte a été créé, vous pouvez maintenant vous connecter !
      </Dialog>
    );

  }

}

export default Login;
