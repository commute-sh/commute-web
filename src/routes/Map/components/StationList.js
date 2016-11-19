import React, { PropTypes } from 'react';

import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

import _ from 'lodash'

import { StationType } from '../../../types';


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Class
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class StationList extends React.Component {

  static propTypes = {
    stations: StationType.isRequired,
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
        {_.sampleSize(this.props.stations, 10).map((station, index) => (
          <ListItem
            key={station.number}
            primaryText={station.name}
            insetChildren={true}
            rightAvatar={<Avatar src="http://www.material-ui.com/images/adhamdannaway-128.jpg" />}
          />
        ))}
      </List>
    );
  }

}

export default StationList;
