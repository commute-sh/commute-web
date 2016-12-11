import React, { Component, PropTypes } from 'react'

import Paper from 'material-ui/Paper'
import SignUpVerificationCodeForm from './SignUpVerificationCodeForm'


class SignUpVerificationCodePanel extends Component {

  static propTypes = {
    signUpVerifyCode: PropTypes.shape({
      isFetching: PropTypes.bool,
      statusText: PropTypes.string
    }),
    handleSignUpVerifyCode: PropTypes.func
  };

  render() {

    return (
      <Paper zDepth={0} style={{ textAlign: 'center', padding: 6, flex: 1 }}>
        <SignUpVerificationCodeForm
          handleSignUpVerifyCode={this.props.handleSignUpVerifyCode}
          signUpVerifyCode={this.props.signUpVerifyCode}
        />
      </Paper>
    );

  }

}

export default SignUpVerificationCodePanel;
