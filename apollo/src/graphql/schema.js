const { ApolloServer } = require('apollo-server-express');
const { importSchema } = require('graphql-import');
const cloneDeep = require('lodash/cloneDeep');
const jwtDecode = require('jwt-decode');
const debug = require('debug')('bm');

const resolvers = require('./resolvers/transaction');

const mocks = require('./mocks');

const typeDefs = importSchema('./src/graphql/schema.graphql');

// GraphQL: Schema
const apolloServerConfiguration = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization;
    if (token) {
      const payload = jwtDecode(token);
      const userData = {
        username: payload.preferred_username,
        firstName: payload.given_name,
        lastName: payload.family_name,
        email: payload.email
      };
      debug(`user: ${userData.username}`);
      return { userData };
    }
    debug('No JWT token found in the request header');
    return { userData: null };
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
