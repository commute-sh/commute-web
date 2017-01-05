import React, { Component, PropTypes } from 'react';

import { StationType } from '../../../types';

import PageControl from 'react-slick';

import IoCard from 'react-icons/lib/io/card';
import IoIosThumbsUpOutline from 'react-icons/lib/io/thumbsup';

import { stationPinColor } from '../../../utils/Stations';

import StationMarkerView from './StationMarkerView';


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Class
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class StationDetailsPanel extends Component {

  static PropTypes = {
    station: StationType
  };

  state = {};

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
      <div style={{ position: 'relative' }}>
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
          <div style={{ fontFamily: 'Roboto, sans-serif', fontSize: 17, fontWeight: '500', color: 'white' }}>{station.number || ' '} - {station.name || ' '}</div>
          <div style={{ fontFamily: 'Roboto, sans-serif', fontSize: 12, color: 'white', paddingTop: 5, paddingBottom: 5 }}>{station.address || ' '}</div>
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
      <div style={{ width: '320px', height: '240px', position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <img src={backgroundSourceUri} style={{ position: 'absolute', width: '320px', height: '240px', border: 0 }} />
        <StationMarkerView
          number={station.number}
          value={station.available_bike_stands}
          station={station}
          pinSize={32}
          strokeColor={stationPinColor(station, 'STANDS')}
          bgColor="white"
          lineWidth={3}
          fontSize={14}
          fontWeight='900'
          opacity={1}
          style={{ width: 32, height: 32, zIndex: 2 }}
        />
      </div>
    );
  }

  renderContent() {

    const station = this.props.station;

    return (
      <div style={{
        paddingLeft: 16,
        paddingTop: 5,
        paddingBottom: 5
      }}>
        { station.status === 'CLOSED' && (
          <div style={{
            padding: 20,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: '#E4E4E4'
          }}>
            <div style={{ fontFamily: 'Roboto, sans-serif', fontSize: 12, color: '#e74c3c' }}>Station fermée</div>
          </div>
        )}

        { station.status !== 'CLOSED' && (
          <div style={{ display: 'flex', paddingTop: 10, paddingBottom: 10, flexDirection: 'row',
            borderBottomWidth: 1,
            borderBottomColor: '#E4E4E4'
          }}>
            <div style={{ flex: 0.6, flexDirection: 'column' }}>
              <div style={{ fontFamily: 'Roboto, sans-serif', fontSize: 12, color: '#4A4A4A', whiteSpace: 'nowrap' }}>Vélos Dispos.</div>
              <div style={{ fontFamily: 'Roboto, sans-serif', fontSize: 48, fontWeight: '100', color: stationPinColor(station, 'BIKES') }}>{station.available_bikes !== undefined ? station.available_bikes : '-'}</div>
            </div>
            <div style={{ flex: 0.6, flexDirection: 'column', paddingLeft: 20 }}>
              <div style={{ fontFamily: 'Roboto, sans-serif', fontSize: 12, color: '#4A4A4A', whiteSpace: 'nowrap' }}>Places Dispos.</div>
              <div style={{ fontFamily: 'Roboto, sans-serif', fontSize: 48, fontWeight: '100', color: stationPinColor(station, 'STANDS') }}>{station.available_bike_stands !== undefined ? station.available_bike_stands : '-'}</div>
            </div>
            <div style={{ flex: 0.6, flexDirection: 'column', paddingLeft: 20 }}>
              <div style={{ fontFamily: 'Roboto, sans-serif', fontSize: 12, color: '#4A4A4A', whiteSpace: 'nowrap' }}>Distance</div>

              <div style={{ fontFamily: 'Roboto, sans-serif', fontSize: 48, fontWeight: '100', color: '#000' }}>
                {this.state.distance !== undefined ? (this.state.distance >= 1000 ? (this.state.distance / 1000).toFixed(1) : this.state.distance) : '-'}
                <div style={{ fontSize: 20 }}>{this.state.distance !== undefined ? (this.state.distance >= 1000 ? ' km' : ' m') : ''}</div>
              </div>
            </div>
            <div style={{ paddingRight: 16, width: 48, flexDirection: 'column', alignItems: "flex-end" }}>
              { station.banking && (<IoCard size={24} color='#7ED321' />) }
              { station.bonus && (<IoIosThumbsUpOutline size={24} color='#50E3C2' />) }
            </div>
          </div>
        )}
      </div>
    );
  }

  renderHistory() {
    return (
      <div style={{ backgroundColor: 'yellow' }}>History</div>
    );
  }

}

export default StationDetailsPanel;
