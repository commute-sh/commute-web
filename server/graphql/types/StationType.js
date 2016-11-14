/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

const graphql = require('graphql')

const ObjectType = graphql.GraphQLObjectType
const StringType = graphql.GraphQLString
const BooleanType = graphql.GraphQLBoolean
const IntType = graphql.GraphQLInt
const FloatType = graphql.GraphQLFloat
const NonNull = graphql.GraphQLNonNull
const EnumType = graphql.GraphQLEnumType


const StatusType = new EnumType({
  name: 'Status',
  values: {
    RED: { value: 'OPEN' },
    GREEN: { value: 'CLOSED' }
  }
});

const PositionType = new ObjectType({
  name: 'Position',
  fields: {
    lat: { type: new NonNull(FloatType) },
    lng: { type: new NonNull(FloatType) }
  },
});

const StationType = new ObjectType({
  name: 'Station',
  fields: {
    number: { type: new NonNull(IntType) },
    name: { type: new NonNull(StringType) },
    position: { type: new NonNull(PositionType) },
    address: { type: new NonNull(StringType) },
    banking: { type: new NonNull(BooleanType) },
    bonus: { type: new NonNull(BooleanType) },
    status: { type: new NonNull(StatusType) },
    contract_name: { type: new NonNull(StringType) },
    bike_stands: { type: new NonNull(IntType) },
    available_bike_stands: { type: new NonNull(IntType) },
    available_bikes: { type: new NonNull(IntType) },
    last_update: { type: new NonNull(StringType) },
    distance: { type: IntType }
  },
});

module.exports = StationType;
