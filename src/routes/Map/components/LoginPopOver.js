import React, { Component, PropTypes } from 'react';
import Popover from 'material-ui/Popover';
import LoginPanel from '../../../components/LoginPanel';


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Class
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class LoginPopOver extends Component {

  static muiName = 'FlatButton';

  static propTypes = {
    login: PropTypes.shape({
      isFetching: PropTypes.bool,
      statusText: PropTypes.string
    }),
    userInfos: PropTypes.shape({
      isFetching: PropTypes.bool,
      isLoggedIn: PropTypes.bool,
      statusText: PropTypes.string
    }),
    open: PropTypes.bool,
    anchorEl: PropTypes.object,
    onClose: PropTypes.func,
    onLoginSubmit: PropTypes.func,
    onSignUpButtonTap: PropTypes.func
  };

  render() {

    const { login, userInfos, open, anchorEl, onClose, onLoginSubmit, onSignUpButtonTap } = this.props;

    return (
      <Popover
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
        onRequestClose={onClose}
        style={{ zIndex: 3 }}>
        <LoginPanel
          login={login}
          userInfos={userInfos}
          onLoginSubmit={onLoginSubmit}
          onSignUpButtonTap={onSignUpButtonTap}
        />
      </Popover>
    );
  }

}

export default LoginPopOver;
