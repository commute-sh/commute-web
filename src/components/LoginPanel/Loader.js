import React, { Component, PropTypes } from 'react'
import CircularProgress from 'material-ui/CircularProgress';

class Loader extends Component {

  static propTypes = {
    style: PropTypes.object
  };

  static defaultProps = {
    style: {
      background: '#fff',
      opacity: 0.8
    }
  };

  render() {
    return (
      <div style={[{ position: 'relative' }, this.props.style]}>
        <div style={{
          zIndex: 5,
          background: '#fff', opacity: 0.8,
          position: 'absolute', top: 0, bottom: 0, left: 0, right: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <CircularProgress />
        </div>
      </div>
    )
  }

}

export default Loader;
