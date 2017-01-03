import React, { PropTypes } from 'react';

import FavoriteStationList from './FavoriteStationList';

import Loader from '../../../components/LoginPanel/Loader'

import * as mapModule from '../modules/map'
import * as userLocationModule from '../../../store/userLocation'


import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Class
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class FavoriteStationPanel extends React.Component {

  static propTypes = {
    onSelectStation: PropTypes.func
  };

  render() {

    const { map: { isFetching, stations, errMessage } } = this.props;

    console.log('------------------- props:', this.props);
    console.log('------------------- isFetching:', isFetching);

    return (
      <div style={{ height: '100%', overflowY: 'scroll' }}>

        { isFetching &&
        <Loader style={{
          zIndex: 5,
          position: 'absolute', top: 0, bottom: 0, left: 0, right: 0
          , backgroundColor: 'red'
        }} />
        }

        { errMessage &&
        <div style={{ color: 'red', fontSize: 12, padding: 5, paddingBottom: 10 }}>
          {errMessage}
        </div>
        }

        <FavoriteStationList
          style={{ height: 'calc(100% - 72px)' }}
          stations={stations}
          onSelectStation={this.props.onSelectStation.bind(this)}
        />
      </div>
    );

  }
}

const mapStateToProps = (state) => Object.assign({}, {
  map: state.map,
  userLocation: state.userLocation
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    Object.assign({},
      mapModule.actions,
      userLocationModule.actions
    ), dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteStationPanel)
