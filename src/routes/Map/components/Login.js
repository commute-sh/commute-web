import React, { Component, PropTypes } from 'react';

import LoginButton from './LoginButton';

import LoginPopOver from '../../../routes/Map/components/LoginPopOver';

import SignUpDialog from '../../../routes/Map/components/SignUpDialog';
import SignUpVerificationCodeDialog from '../../../routes/Map/components/SignUpVerificationCodeDialog';

import ConfirmDialog from './ConfirmDialog';


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Class
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Login extends Component {

  static muiName = 'FlatButton';

  static propTypes = {
    displayName: PropTypes.string,
    loginUser: PropTypes.func,
    login: PropTypes.shape({
      isFetching: PropTypes.bool,
      statusText: PropTypes.string
    }),
    userInfos: PropTypes.shape({
      isFetching: PropTypes.bool,
      isLoggedIn: PropTypes.bool,
      statusText: PropTypes.string
    }),
    signUp: PropTypes.shape({
      isFetching: PropTypes.bool,
      statusText: PropTypes.string
    }),
    signUpVerifyCode: PropTypes.shape({
      isFetching: PropTypes.bool,
      statusText: PropTypes.string
    }),
    signUpUser: PropTypes.func,
    verifyUserSignUp: PropTypes.func
  };

  state = {
    loginPopOverOpen: false,
    signUpDialogOpen: false,
    signUpVerificationCodeDialogOpen: false,
    signUpConfirmDialogOpen: false,
    signUpUser: undefined
  };

  onSignUpButtonTap() {
    this.setState({ loginPopOverOpen: false, signUpDialogOpen: true });
  };

  componentWillReceiveProps(nextProps) {
    if (
      this.props.login.isFetching && !nextProps.login.isFetching &&
      !this.props.userInfos.isLoggedIn && nextProps.userInfos.isLoggedIn
    ) {
      this.setState({ loginPopOverOpen: false });
    }
  }

  onLoginSubmit({ username, password } = values) {
    console.log("username:", username);

    this.props.loginUser(username, password);
  };

  onSignUpSubmit({ username, email, password, givenName, familyName } = values) {
    const user = { username, email, givenName, familyName };
    this.props.signUpUser(username, email, password, givenName, familyName);
    this.setState({ signUpVerificationCodeDialogOpen: true, signUpDialogOpen: false, signUpUser: user });
  };

  onSignUpVerificationCodeSubmit({ verificationCode } = values) {

    console.log("verificationCode:", verificationCode);

    this.props.signUpUserVerifyCode(this.state.signUpUser.username, verificationCode);
    this.setState({ signUpVerificationCodeDialogOpen: false, signUpConfirmDialogOpen: true });
  };

  onSignUpDialogClose(buttonClicked) {
    this.setState({ signUpDialogOpen: false, signUpVerificationCodeDialogOpen: buttonClicked });
  };

  onSignUpVerifyCodeDialogClose(buttonClicked) {
    this.setState({ signUpDialogOpen: false, signUpConfirmDialogOpen: buttonClicked });
  };

  onSignUpConfirmDialogClose() {
    this.setState({ signUpConfirmDialogOpen: false, loginPopOverOpen: false });
  };

  onLoginButtonTap(event) {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      loginPopOverOpen: true,
      anchorEl: event.currentTarget,
    });
  }

  onLoginPopOverClose() {
    this.setState({
      loginPopOverOpen: false
    });
  }

  render() {

    return (
      <div>

        <LoginButton onLoginButtonTap={this.onLoginButtonTap.bind(this)} />

        {this.renderLoginPopOver()}

        {this.renderSignUpDialog()}
        {this.renderSignUpVerifyCodeDialog()}
        {this.renderSignUpConfirmDialog()}

      </div>
    );

  }

  renderLoginPopOver() {

    const { loginPopOverOpen, anchorEl } = this.state;
    const { login, userInfos } = this.props;

    return (
      <LoginPopOver
        open={loginPopOverOpen}
        anchorEl={anchorEl}
        style={{ zIndex: 3 }}
        login={login}
        userInfos={userInfos}
        onClose={this.onLoginPopOverClose.bind(this)}
        onLoginSubmit={this.onLoginSubmit.bind(this)}
        onSignUpButtonTap={this.onSignUpButtonTap.bind(this)}
      />
    );
  }

  renderSignUpDialog() {

    const { signUpDialogOpen } = this.state;
    const { signUp } = this.props;

    return (
      <SignUpDialog
        title="Créer un compte"
        open={signUpDialogOpen}
        signUp={signUp}
        onSubmit={this.onSignUpSubmit.bind(this)}
        onClose={this.onSignUpDialogClose.bind(this)}
      />
    );
  }

  renderSignUpVerifyCodeDialog() {

    const { signUpVerificationCodeDialogOpen } = this.state;
    const { signUpVerifyCode } = this.props;

    return (
      <SignUpVerificationCodeDialog
        title="Saisir le code de vérification"
        open={signUpVerificationCodeDialogOpen}
        signUpVerifyCode={signUpVerifyCode}
        onSubmit={this.onSignUpVerificationCodeSubmit.bind(this)}
        onClose={this.onSignUpVerifyCodeDialogClose.bind(this)}
      />
    );
  }

  renderSignUpConfirmDialog() {

    const { signUpConfirmOpen } = this.state;

    return (
      <ConfirmDialog
        title="Confirmation de création de compte"
        message="Votre compte a été créé, vous pouvez maintenant vous connecter !"
        open={signUpConfirmOpen}
        onClose={this.onSignUpConfirmDialogClose.bind(this)}
      />
    );

  }

}

export default Login;
