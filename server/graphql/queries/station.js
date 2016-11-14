const graphql = require('graphql')
const List = graphql.GraphQLList

const StationType = require('../types/StationType')
require('whatwg-fetch')

// React.js News Feed (RSS)
const url = 'http://api.commute.sh/stations?contract-name=Paris';

let items = [];
let lastFetchTask;
let lastFetchTime = new Date(1970, 0, 1);

const stations = {
  type: new List(StationType),
  resolve() {
    if (lastFetchTask) {
      return lastFetchTask;
    }

    if ((new Date() - lastFetchTime) > 1000 * 60 * 10 /* 10 mins */) {
      lastFetchTime = new Date();
      lastFetchTask = fetch(url)
        .then(response => response.json())
        .then(data => {

          items = data;

          return items;
        })
        .finally(() => {
          lastFetchTask = null;
        });

      if (items.length) {
        return items;
      }

      return lastFetchTask;
    }

    return items;
  },
};

module.exports = stations;
