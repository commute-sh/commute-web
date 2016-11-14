const graphql = require('graphql');
const Schema = graphql.GraphQLSchema
const ObjectType = graphql.GraphQLObjectType

const station = require('./queries/station')

const schema = new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: {
      station
    },
  }),
});

module.exports = schema;
