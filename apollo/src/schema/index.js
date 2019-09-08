const { gql } = require('apollo-server-express');

const transactionSchema = require('./transaction');

const linkSchema = gql`
  scalar Date
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
  type Subscription {
    _: Boolean
  }
`;

module.exports = [linkSchema, transactionSchema];
