import React, { Component, PropTypes } from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Class
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class ConfirmDialog extends Component {

  static muiName = 'FlatButton';

  static propTypes = {
    title: PropTypes.string,
    message: PropTypes.string,
    okLabel: PropTypes.string,
    open: PropTypes.bool,
    onClose: PropTypes.func
  };

  render() {

    const { okLabel, onClose, title, open, message } = this.props;

    const actions = [
      <FlatButton
        label={okLabel}
        primary={true}
        onTouchTap={onClose}
      />
    ];

    return (
      <Dialog
        title={title}
        actions={actions}
        modal={false}
        open={open}
        overlayStyle={{ zIndex: 4 }}
        onRequestClose={onClose}
      >
        {message}
      </Dialog>
    );

  }

}

export default ConfirmDialog;
