const { ApolloServer } = require('apollo-server-express');
const { AuthenticationError } = require('apollo-server');
const cloneDeep = require('lodash/cloneDeep');

const { getUser } = require('../auth');

const mocks = require('./mocks');

const typeDefs = require('../schema');
const resolvers = require('../resolvers');
const models = require('../models');

// GraphQL: Schema
const apolloServerConfiguration = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: error => {
    // remove the internal sequelize error message
    // leave only the important validation error
    const message = error.message
      .replace('SequelizeValidationError: ', '')
      .replace('Validation error: ', '');

    return {
      ...error,
      message,
    };
  },
  context: ({ req }) => {
    // get the user token from the headers
    const token = req.headers.authorization || '';

    // try to retrieve a user with the token
    const me = getUser(token);

    if (!me) { throw new AuthenticationError('you must be logged in to query this schema') }

    return {
      models,
      me
    };
  },
  playground: {
    endpoint: 'http://localhost:4000/graphql',
    settings: {
      'editor.theme': 'dark'
    }
  }
});

const apolloServerConfigurationMock = cloneDeep(apolloServerConfiguration);
apolloServerConfigurationMock.mocks = mocks;
// GraphQL: Server
module.exports = (process.env.NODE_ENV === 'mock')
  ? new ApolloServer(apolloServerConfigurationMock)
  : new ApolloServer(apolloServerConfiguration);
