import { injectReducer } from '../../store/reducers'

export default (store) => ({
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const Map = require('../Map/containers/MapContainer').default
      const reducer = require('../Map/modules/map').default

      /*  Add the reducer to the store on key 'map'  */
      injectReducer(store, { key: 'map', reducer })

      /*  Return getComponent   */
      cb(null, Map)

      /* Webpack named bundle   */
    }, 'map')
  }
})
