/* eslint-disable no-param-reassign */
const { GraphQLScalarType } = require('graphql');
// const { Kind } = require('graphql/language');

module.exports = {
  Date: new GraphQLScalarType({
    name: 'Date',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
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
  Transaction: transaction => {
    transaction.amount = transaction.pricePaid.value;
    transaction.currencyCode = transaction.pricePaid.currency;
    return transaction;
  }
};
