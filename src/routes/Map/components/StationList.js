import React, { PropTypes } from 'react';

import { List } from 'material-ui/List';
import StationItem from './StationItem';

import _ from 'lodash'

import { StationsType } from '../../../types';


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Class
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class StationList extends React.Component {

  static propTypes = {
    stations: StationsType.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
    };
  }

  render() {
    return (
      <List key="station-list">
        {this.props.stations.map((station, index) => (
          <StationItem key={index} index={index} station={station} />
        ))}
      </List>
    );
  }

}

export default StationList;
