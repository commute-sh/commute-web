import React, { Component, PropTypes } from 'react';

import RaisedButton from 'material-ui/RaisedButton';

import Icon from './Icon';

class FacebookLoginButton extends Component {

  static propTypes = {
    url: PropTypes.string
  };

  static defaultProps = {
    url: '/auth/facebook'
  };

  render() {
    return (
      <RaisedButton
        href={this.props.url}
        label="Facebook"
        backgroundColor="#3b5998"
        labelColor="white"
        fullWidth={true}
        style={Object.assign({ height: 44 }, this.props.style)}
        icon={<Icon name='facebook' />}
      />
    );
  }

}

export default FacebookLoginButton;
