import React, { PropTypes } from 'react';

import FavoriteStationList from './FavoriteStationList';

import { StationsType } from '../../../types';

import Loader from '../../../components/LoginPanel/Loader'


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Class
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class FavoriteStationPanel extends React.Component {

  static propTypes = {
    stations: StationsType.isRequired,
    map: PropTypes.shape({
      isFetching: PropTypes.bool,
      statusText: PropTypes.string
    })
  };

  render() {

    const { stations, map: { isFetching, errMessage } } = this.props;

    return (
      <div style={{ height: 'calc(100% - 72px)', overflowY: 'scroll' }}>

        { isFetching &&
        <Loader style={{
          zIndex: 5,
          position: 'absolute', top: 0, bottom: 0, left: 0, right: 0
        }} />
        }

        { errMessage &&
        <div style={{ color: 'red', fontSize: 12, padding: 5, paddingBottom: 10 }}>
          {errMessage}
        </div>
        }

        <FavoriteStationList style={{ height: 'calc(100% - 72px)' }} stations={stations} />
      </div>
    );

  }
}

export default FavoriteStationPanel;
