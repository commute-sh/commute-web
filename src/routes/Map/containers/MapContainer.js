import React from 'react'

import * as mapModule from '../modules/map'
import * as authModule from '../../../store/auth'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import MapView from '../components/MapView'


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Redux
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const mapStateToProps = (state) => Object.assign({}, {
  map: state.map,
  auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    Object.assign({},
      mapModule.actions,
      authModule.actions,
    ), dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(MapView)
