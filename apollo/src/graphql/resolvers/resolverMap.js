const { GraphQLScalarType } = require('graphql');
// const { Kind } = require('graphql/language');
const debug = require('debug')('bm');

module.exports = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      debug('Date::parseValue', value);
      return new Date(value); // value from the client
    },
    serialize(value) {
      debug('Date::serialize', value);
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      // debug('Date::parseLiteral', ast);
      // if (ast.kind === Kind.INT) {
      //   return new Date(ast.value); // ast value is always in string format
      // }
      return new Date(ast.value);
    },
  }),
};
