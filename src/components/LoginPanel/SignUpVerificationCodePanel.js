import React, { Component, PropTypes } from 'react'

import Paper from 'material-ui/Paper'
import SignUpVerificationCodeForm from './SignUpVerificationCodeForm'


class SignUpVerificationCodePanel extends Component {

  static propTypes = {
    handleSignUpVerifyCode: PropTypes.func
  };

  render() {

    return (
      <Paper zDepth={0} style={{ textAlign: 'center', padding: 6, flex: 1 }}>
        <SignUpVerificationCodeForm handleSignUpVerifyCode={this.props.handleSignUpVerifyCode} />
      </Paper>
    );

  }

}

export default SignUpVerificationCodePanel;
