import React, { PropTypes } from 'react';

import { List, ListItem } from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Avatar from 'material-ui/Avatar';
import { pinkA200 } from 'material-ui/styles/colors';

import { StationsType } from '../../../types';


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Class
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class FavoriteStationList extends React.Component {

  static propTypes = {
    stations: StationsType.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      dataSource: []
    };
  }

  render() {

    const favoriteStations = this.props.stations.filter(station => station.name.toUpperCase().indexOf('MONGOLFIER') >= 0);

    if (favoriteStations.length === 0) {
      return null;
    }

    return (
      <List key="favorite-station-list">
        {favoriteStations.map((stations, index) => (
          <ListItem
            key={stations.number}
            primaryText={stations.name}
            leftIcon={<ActionGrade color={pinkA200} />}
            rightAvatar={<Avatar src="http://www.material-ui.com/images/chexee-128.jpg" />}
          />
        ))}
      </List>
    );
  }

}

export default FavoriteStationList;
