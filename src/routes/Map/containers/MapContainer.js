import React from 'react'

import * as mapModule from '../modules/map'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import MapView from '../components/MapView'


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Redux
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const mapStateToProps = (state) => Object.assign({}, {
  map: state.map
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    Object.assign({},
      mapModule.actions
    ), dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(MapView)
