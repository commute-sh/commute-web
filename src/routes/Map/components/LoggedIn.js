import React, { Component, PropTypes } from 'react';
import { RaisedButton, MenuItem, Popover } from 'material-ui'
import AccountCircleIcon from 'material-ui/svg-icons/action/account-circle';
import Divider from 'material-ui/Divider';


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Class
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class LoggedIn extends Component {

  static muiName = 'FlatButton';

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

    console.log("this.props:", this.props);

    return (
      <div>
        <RaisedButton
          style={this.props.style}
          label={this.props.displayName}
          icon={<AccountCircleIcon style={{ fill: 'black', opacity: 0.8 }} />}
          backgroundColor="white"
          labelPosition='before'
          onTouchTap={this.handleTouchTap.bind(this)}
          labelStyle={{ textTransform: 'inherited', fontWeight: 400, color: 'black' }}
        />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          onRequestClose={this.handleRequestClose.bind(this)}
        >
          <MenuItem primaryText="Help" />
          <Divider />
          <MenuItem primaryText="Sign out" />
        </Popover>
      </div>

    );
  }

}

export default LoggedIn;
