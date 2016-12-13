import React, { Component, PropTypes } from 'react';

import Dialog from 'material-ui/Dialog';
import Paper from 'material-ui/Paper'
import SignUpForm from '../../../components/LoginPanel/SignUpForm'

import FontIcon from 'material-ui/FontIcon';


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
        titleStyle={{ fontFamily: 'Lobster' }}
        overlayStyle={{ zIndex: 4 }}
        actionsContainerStyle={{ padding: 20 }}
        onRequestClose={onClose}
      >
        <Paper zDepth={0} style={{
          textAlign: 'center', padding: 6, flex: 1,
          zIndex: 3, display: 'flex', flexDirection: 'row'
        }}>
          <SignUpForm
            submitTitle="Créer votre compte"
            onSubmit={onSubmit}
            signUp={signUp}
            style={{ flex: '0 0 50%' }}
          />
          <div style={{ flex: '0 0 50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FontIcon className="material-icons" style={{ fontSize: 288, opacity: 0.5, marginLeft: 24 }}>verified_user</FontIcon>
          </div>
        </Paper>
      </Dialog>
    );

  }

}

export default SignUpDialog;
