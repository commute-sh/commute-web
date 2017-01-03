import React from 'react'

import * as mapModule from '../modules/map'
import * as loginModule from '../../../store/login'
import * as logoutModule from '../../../store/logout'
import * as signUpModule from '../../../store/signUp'
import * as signUpVerifyCodeModule from '../../../store/signUpVerifyCode'
import * as userInfosModule from '../../../store/userInfos'
import * as userLocationModule from '../../../store/userLocation'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import MapView from '../components/MapView'


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Redux
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const mapStateToProps = (state) => Object.assign({}, {
  map: state.map,
  login: state.login,
  logout: state.logout,
  signUp: state.signUp,
  userLocationModule: state.userLocation,
  signUpVerifyCode: state.signUpVerifyCode,
  userInfos: state.userInfos,
  userLocation: state.userLocation
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    Object.assign({},
      mapModule.actions,
      loginModule.actions,
      logoutModule.actions,
      signUpModule.actions,
      signUpVerifyCodeModule.actions,
      userInfosModule.actions,
      userLocationModule.actions
    ), dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(MapView)
