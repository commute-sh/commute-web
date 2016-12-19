import React, { Component, PropTypes } from 'react'
import CircularProgress from 'material-ui/CircularProgress';

import { deepOrange500 } from 'material-ui/styles/colors';

class Loader extends Component {

  static propTypes = {
    style: PropTypes.object,
    size: PropTypes.number,
    color: PropTypes.string
  };

  static defaultProps = {
    style: {
      background: '#fff',
      opacity: 0.8
    },
    size: 40,
    color: deepOrange500
  };

  render() {

    const { style, size, color } = this.props;

    return (
      <div style={[{ position: 'relative' }, style]}>
        <div style={{
          zIndex: 5,
          background: '#fff', opacity: 0.8,
          position: 'absolute', top: 0, bottom: 0, left: 0, right: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <CircularProgress size={size} color={color} />
        </div>
      </div>
    )
  }

}

export default Loader;
