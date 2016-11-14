import React from 'react';
import s from './MapView.css';
import AppBar from 'material-ui/AppBar';

import Map from './Map';
import StationSearch from './StationSearch';

import { commute500, commute700 } from '../../../themes/commuteColors';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Theme
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const commuteTheme = getMuiTheme({
  palette: {
    primary1Color: commute500,
    primary2Color: commute700,
  },
  appBar: {
    height: 64,
  },
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Class
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class MapView extends React.Component {

  componentDidMount() {
    this.props.actions.fetchStations()
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(commuteTheme)}>
        <div className={s.root}>
          <AppBar
            title="Commute.sh"
            showMenuIconButton={false}
            titleStyle={{ textAlign: "center", fontFamily: 'Lobster', fontSize: 32, fontWeight: 100 }}
            style={{ zIndex: 999, height: 64 }}
          />

          <StationSearch stations={this.props.map.stations} />

          <Map stations={this.props.map.stations} />
        </div>
      </MuiThemeProvider>
    );
  }

}

export default MapView;
