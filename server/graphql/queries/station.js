const graphql = require('graphql')
const List = graphql.GraphQLList

const StationType = require('../types/StationType')
require('whatwg-fetch')

const PUBLIC_API_BASE_URL = process.env['PUBLIC_API_BASE_URL'];

module.exports = {
  type: new List(StationType),
  resolve() {
    return fetch(`${PUBLIC_API_BASE_URL}/stations?contract-name=Paris`)
      .then(response => response.json())
  }
};
