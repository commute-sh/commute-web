import React, { Component, PropTypes } from 'react';

import { StationType } from '../../../types';

import PageControl from 'react-slick';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Class
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class StationDetailsPanel extends Component {

  static PropTypes = {
    station: StationType
  };

  render() {
    return (
      <div>
        {this.renderHeader()}
        {this.renderContent()}
        {this.renderHistory()}
      </div>
    );
  }


  renderHeader() {

    const station = this.props.station;
    console.log("screen:", screen);

    return (
      <div>
        <div>
          <PageControl
            dots={true}
            slidesToShow={1}
            slidesToScroll={1}
          >
            {this.renderPhotoHeader()}
            {this.renderMapHeader()}
          </PageControl>
        </div>
        <div style={{ padding: 5, paddingLeft: 12, backgroundColor: 'rgba(0, 0, 0, 0.6)', position: 'absolute', left: 0, right: 0, bottom: 0 }}>
          <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: 17, fontWeight: '500', color: 'white' }}>{station.number || ' '} - {station.name || ' '}</span>
          <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: 12, color: 'white', paddingTop: 5, paddingBottom: 5 }}>{station.address || ' '}</span>
        </div>
      </div>
    );

  }

  renderPhotoHeader() {
    const station = this.props.station || { name: ' ', address: ' ' };

    const backgroundSourceUri = `https://s3-eu-west-1.amazonaws.com/image-commute-sh/contracts/${station.contract_name}/${station.contract_name}-${station.number}-1-${640}-${60}.jpg`;
    const contractBackgroundSourceUri = `https://s3-eu-west-1.amazonaws.com/image-commute-sh/contracts/${station.contract_name}/${station.contract_name}-1-${640}-${60}.jpg`;

    console.log("Photo URL:", backgroundSourceUri);

    return (
      <div style={{ width: '320px', height: '240px' }}>
        <img src={backgroundSourceUri} style={{ width: '320px', height: '240px', border: 0 }} />
      </div>
    );
  }

  renderMapHeader() {
    const station = this.props.station || { name: ' ', address: ' ' };

    const imageSize = { w: 640, h: 400 };
    const zoom = 17;

    const backgroundSourceUri = `https://maps.googleapis.com/maps/api/staticmap?center=${station.position.lat},${station.position.lng}&zoom=${zoom}&size=${imageSize.w}x${imageSize.h}&path=weight:3%7Ccolor:blue%7Cenc:{coaHnetiVjM??_SkM??~R`;

    console.log("Map URL:", backgroundSourceUri);

    return (
      <div style={{ width: '320px', height: '240px' }}>
        <img src={backgroundSourceUri} style={{ width: '320px', height: '240px', border: 0 }} />
      </div>
    );
  }

  renderContent() {
    return (
      <div style={{ backgroundColor: 'red' }}>Content</div>
    );
  }

  renderHistory() {
    return (
      <div style={{ backgroundColor: 'yellow' }}>History</div>
    );
  }

}

export default StationDetailsPanel;
