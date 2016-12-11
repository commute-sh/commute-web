import React, { Component, PropTypes } from 'react';

import Dialog from 'material-ui/Dialog';
import Paper from 'material-ui/Paper'
import SignUpVerificationCodeForm from '../../../components/LoginPanel/SignUpVerificationCodeForm'


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Class
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class SignUpVerificationCodeDialog extends Component {

  static muiName = 'FlatButton';

  static propTypes = {
    title: PropTypes.string,
    onSubmit: PropTypes.func,
    onClose: PropTypes.func,
    open: PropTypes.bool,
    signUpVerifyCode: PropTypes.shape({
      isFetching: PropTypes.bool,
      statusText: PropTypes.string
    })
  };

  render() {

    const { title, open, onClose, onSubmit, signUpVerifyCode } = this.props;

    return (
      <Dialog
        title={title}
        modal={false}
        open={open}
        overlayStyle={{ zIndex: 4 }}
        actionsContainerStyle={{ padding: 20 }}
        onRequestClose={onClose}
      >
        <Paper zDepth={0} style={{ textAlign: 'center', padding: 6, flex: 1 }}>
          <SignUpVerificationCodeForm
            onSubmit={onSubmit}
            signUpVerifyCode={signUpVerifyCode}
          />
        </Paper>
      </Dialog>
    );

  }

}

export default SignUpVerificationCodeDialog;
