import React, { PropTypes } from 'react';

import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

import { StationType } from '../../../types';


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Class
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class StationItem extends React.Component {

  static propTypes = {
    index: PropTypes.number,
    station: StationType.isRequired,
  };

  render() {

    const { station } = this.props;

    return (
      <ListItem
        key={station.number}
        primaryText={station.name}
        insetChildren={true}
        leftAvatar={<Avatar src="http://www.material-ui.com/images/adhamdannaway-128.jpg" />}
      />
    );
  }

}

export default StationItem;
