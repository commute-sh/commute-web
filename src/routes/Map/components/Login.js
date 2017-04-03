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
    loginUser: PropTypes.func,
    login: PropTypes.shape({
      isFetching: PropTypes.bool,
      errMessage: PropTypes.string
    }),
    userInfos: PropTypes.shape({
      isFetching: PropTypes.bool,
      isLoggedIn: PropTypes.bool,
      errMessage: PropTypes.string
    }),
    signUp: PropTypes.shape({
      isFetching: PropTypes.bool,
      errMessage: PropTypes.string
    }),
    signUpVerifyCode: PropTypes.shape({
      isFetching: PropTypes.bool,
      errMessage: PropTypes.string
    }),
    signUpUser: PropTypes.func,
    clearSignUpUser: PropTypes.func,
    clearSignUpUserVerifyCode: PropTypes.func
  };

  state = {
    loginPopOverOpen: false,
    signUpDialogOpen: false,
    signUpVerificationCodeDialogOpen: false,
    signUpConfirmDialogOpen: false,
    signUpUser: undefined
  };

  onSignUpButtonTap() {
    this.props.clearSignUpUser();
    this.setState({ loginPopOverOpen: false, signUpDialogOpen: true });
  };

  componentWillReceiveProps(nextProps) {
    if (
      this.props.login.isFetching && !nextProps.login.isFetching &&
      !this.props.userInfos.isLoggedIn && nextProps.userInfos.isLoggedIn
    ) {
      this.setState({ loginPopOverOpen: false });
    }

    if (
      this.props.signUp.isFetching && !nextProps.signUp.isFetching &&
      nextProps.signUp.done && !nextProps.signUp.failed
    ) {
      this.onSignUpDialogClose(true);
    }

    if (
      this.props.signUpVerifyCode.isFetching && !nextProps.signUpVerifyCode.isFetching &&
      nextProps.signUpVerifyCode.done && !nextProps.signUpVerifyCode.failed
    ) {
      this.onSignUpVerifyCodeDialogClose(true);
    }
  }

  onLoginSubmit({ username, password } = values) {
    console.log("username:", username);

    this.props.loginUser(username, password);
  };

  onSignUpSubmit({ username, email, password, givenName, familyName } = values) {
    this.props.signUpUser(username, email, password, givenName, familyName);
  };

  onSignUpVerificationCodeSubmit({ verificationCode } = values) {

    const { signUp: { user: { username } } } = this.props;

    console.log("verificationCode:", verificationCode);
    console.log("username:", username);

    this.props.signUpUserVerifyCode(username, verificationCode);
  };

  onSignUpDialogClose(buttonClicked) {
    this.props.clearSignUpUserVerifyCode();
    this.setState({ signUpDialogOpen: false, signUpVerificationCodeDialogOpen: buttonClicked });
  };

  onSignUpVerifyCodeDialogClose(buttonClicked) {
    this.setState({ signUpVerificationCodeDialogOpen: false, signUpConfirmDialogOpen: buttonClicked });
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

    const { signUpConfirmDialogOpen } = this.state;

    return (
      <ConfirmDialog
        okLabel="Ok"
        title="Confirmation de création de compte"
        message="Votre compte a été créé, vous pouvez maintenant vous connecter !"
        open={signUpConfirmDialogOpen}
        onClose={this.onSignUpConfirmDialogClose.bind(this)}
      />
    );

  }

}

export default Login;
