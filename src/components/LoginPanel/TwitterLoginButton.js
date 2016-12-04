import React, { Component, PropTypes } from 'react';

import RaisedButton from 'material-ui/RaisedButton';

import Icon from './Icon';

class TwitterLoginButton extends Component {

  static propTypes = {
    url: PropTypes.string
  };

  static defaultProps = {
    url: '/auth/twitter'
  };

  render() {
    return (
      <RaisedButton
        href={this.props.url}
        label="Twitter"
        backgroundColor="#55acee"
        labelColor="white"
        fullWidth={true}
        style={Object.assign({ height: 44 }, this.props.style)}
        icon={<Icon name='twitter' />}
      />
    );
  }

}

export default TwitterLoginButton;
