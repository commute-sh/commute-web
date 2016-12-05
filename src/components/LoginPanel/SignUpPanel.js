import React, { Component, PropTypes } from 'react'

import Paper from 'material-ui/Paper'
import SignUpForm from './SignUpForm'


class SignUpPanel extends Component {

  static propTypes = {
    handleSignUp: PropTypes.func
  };

  render() {

    return (
      <Paper zDepth={0} style={{ textAlign: 'center', padding: 6, flex: 1 }}>
        <SignUpForm handleSignUp={this.props.handleSignUp} />
      </Paper>
    );

  }

}

export default SignUpPanel;
