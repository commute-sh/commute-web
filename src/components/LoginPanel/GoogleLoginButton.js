import React, { Component, PropTypes } from 'react';

import RaisedButton from 'material-ui/RaisedButton';

import Icon from './Icon';

class GoogleLoginButton extends Component {

  static propTypes = {
    url: PropTypes.string
  };

  static defaultProps = {
    url: '/auth/google'
  };

  render() {
    return (
      <RaisedButton
        href={this.props.url}
        label="Google"
        backgroundColor="#dd4b39"
        labelColor="white"
        fullWidth={true}
        style={Object.assign({ height: 44 }, this.props.style)}
        icon={<Icon name='google' />}
      />
    );
  }

}

export default GoogleLoginButton;
