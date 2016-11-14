const graphql = require('graphql')
const List = graphql.GraphQLList

const StationType = require('../types/StationType')
require('whatwg-fetch')

module.exports = {
  type: new List(StationType),
  resolve() {
    return fetch('http://api.commute.sh/stations?contract-name=Paris')
      .then(response => response.json())
  }
};
