import React, { Component, PropTypes } from 'react';
import { IconButton } from 'material-ui'

import AccountCircleIcon from 'material-ui/svg-icons/action/account-circle';


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Class
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class LoginButton extends Component {

  static muiName = 'FlatButton';

  static propTypes = {
    onLoginButtonTap: PropTypes.func
  };

  render() {

    const { onLoginButtonTap } = this.props;

    return (
      <IconButton
        iconStyle={{fill: 'black', opacity: 0.8, width: 32, height: 32}}
        style={{width: 60, height: 60, margin: '2px 16px', padding: 0}}
        onTouchTap={onLoginButtonTap}
      >
        <AccountCircleIcon />
      </IconButton>
    );
  }

}

export default LoginButton;
