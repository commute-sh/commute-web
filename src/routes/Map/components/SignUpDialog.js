import React, { Component, PropTypes } from 'react';

import Dialog from 'material-ui/Dialog';
import Paper from 'material-ui/Paper'
import SignUpForm from '../../../components/LoginPanel/SignUpForm'


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Class
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class SignUpDialog extends Component {

  static muiName = 'FlatButton';

  static propTypes = {
    title: PropTypes.string,
    onSubmit: PropTypes.func,
    onClose: PropTypes.func,
    open: PropTypes.bool,
    signUp: PropTypes.shape({
      isFetching: PropTypes.bool,
      statusText: PropTypes.string
    })
  };

  render() {

    const { title, open, onClose, onSubmit, signUp } = this.props;

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
          <SignUpForm
            handleSignUp={onSubmit}
            signUp={signUp}
          />
        </Paper>
      </Dialog>
    );

  }

}

export default SignUpDialog;
