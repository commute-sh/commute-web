import React, { PropTypes } from 'react';

import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

import { StationType } from '../../../types';


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Class
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class StationItem extends React.Component {

  static propTypes = {
    station: StationType.isRequired,
    style: PropTypes.object
  };

  render() {
    const { station } = this.props;
    const { images } = station;

    const avatarUrl = images && images.length > 0 ?
      `https://s3-eu-west-1.amazonaws.com/image-commute-sh/contracts/${station.contract_name}/${station.contract_name}-${station.number}-${images[0].uid}-${images[0].width}-${images[0].quality}.jpg` :
      `https://s3-eu-west-1.amazonaws.com/image-commute-sh/contracts/${station.contract_name}/${station.contract_name}-${1}-${640}-${60}.jpg`;

    return (
      <ListItem
        key={station.number}
        primaryText={station.name}
        insetChildren={true}
        leftAvatar={<Avatar src={avatarUrl} />}
        style={this.props.style}
      />
    );
  }

}

export default StationItem;
