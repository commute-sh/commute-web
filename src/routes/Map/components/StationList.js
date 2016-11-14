import React, { PropTypes } from 'react';

import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import {pinkA200, transparent} from 'material-ui/styles/colors';


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Class
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class StationList extends React.Component {

  static propTypes = {
    stations: PropTypes.arrayOf(PropTypes.shape({
      number: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      position: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired,
      }),
      banking: PropTypes.boolean,
      bonus: PropTypes.boolean,
      status: PropTypes.string,
      contract_name: PropTypes.string.isRequired,
      bike_stands: PropTypes.number.isRequired,
      available_bike_stands: PropTypes.number.isRequired,
      available_bikes: PropTypes.number.isRequired,
      last_update: PropTypes.object.isRequired,
      distance: PropTypes.number,

    })).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
    };
  }

  render() {
    return (
      <Paper style={{ position: 'absolute', left: 0, top: 72, bottom: 0, right: 0, overflowY: 'scroll' }} zDepth={0}>

        {this.renderFavorites()}
        <List key="station-list">
          {this.props.stations.map((station, index) => (
            <ListItem
              key={station.number}
              primaryText={station.name}
              insetChildren={true}
              rightAvatar={<Avatar src="http://www.material-ui.com/images/adhamdannaway-128.jpg" />}
            />
          ))}
        </List>

      </Paper>
    );
  }

  renderFavorites() {

    const favoriteStations = this.props.stations.filter(station => station.name.toUpperCase().indexOf('MONGOLFIER') >= 0);

    if (favoriteStations.length === 0) {
      return undefined;
    }

    return [
      <List key="favorite-station-list">
        {favoriteStations.map((stations, index) => (
          <ListItem
            key={stations.number}
            primaryText={stations.name}
            leftIcon={<ActionGrade color={pinkA200} />}
            rightAvatar={<Avatar src="http://www.material-ui.com/images/chexee-128.jpg" />}
          />
        ))}
      </List>,
      <Divider key="station-list-divider" inset={true} />
    ];
  }

}

export default StationList;
