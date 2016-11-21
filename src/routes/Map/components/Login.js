import React, { Component, PropTypes } from 'react';
import { IconButton } from 'material-ui'
import Popover from 'material-ui/Popover';
import LoginPanel from '../../../components/LoginPanel';

import AccountCircleIcon from 'material-ui/svg-icons/action/account-circle';


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Class
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Login extends Component {

  static muiName = 'FlatButton';

  static propTypes = {
    displayName: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  handleTouchTap(event) {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  render() {

    return (
      <div>

        <IconButton
          iconStyle={{ color: 'black', opacity: 0.8, width: 32, height: 32 }}
          style={{ width: 60, height: 60, margin: '2px 16px', padding: 0 }}
          onTouchTap={this.handleTouchTap.bind(this)}
        >
          <AccountCircleIcon />
        </IconButton>

        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose.bind(this)}>
          <LoginPanel />
        </Popover>

      </div>
    );

  }

}

export default Login;
