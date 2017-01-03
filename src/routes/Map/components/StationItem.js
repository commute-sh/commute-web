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
    style: PropTypes.object,
    onSelectStation: PropTypes.func
  };

  onSelectStation(station) {
    this.props.onSelectStation(station);
  }

  render() {
    const { station } = this.props;
    const images = (station.images || []).filter(image => image.width === 128);

    const avatarUrl = images.length > 0 ?
      `https://s3-eu-west-1.amazonaws.com/image-commute-sh/contracts/${station.contract_name}/${station.contract_name}-${station.number}-${images[0].uid}-${images[0].width}-${images[0].quality}.jpg` :
      `https://s3-eu-west-1.amazonaws.com/image-commute-sh/contracts/${station.contract_name}/${station.contract_name}-${1}-${128}-${100}.jpg`;

    const stationProps = {};
    if (station.distance) {
      stationProps.rightAvatar = <span style={{ color: '#666', fontSize: '0.8em' }}>{station.distance >= 1000 ? (station.distance / 1000).toFixed(1) + ' km' : station.distance.toFixed(0) + ' m' }</span>;
    }

    return (
      <ListItem
        key={station.number}
        primaryText={station.name}
        secondaryText={station.address}
        secondaryTextLines={2}
        insetChildren={true}
        leftAvatar={<Avatar src={avatarUrl} />}
        style={this.props.style}
        onTouchTap={this.onSelectStation.bind(this, station)}
        {...stationProps}
      />
    );
  }

}

export default StationItem;
