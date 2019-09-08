const { ApolloServer } = require('apollo-server-express');
const cloneDeep = require('lodash/cloneDeep');
const debug = require('debug')('bm');

const { getUser } = require('../auth');

const mocks = require('./mocks');

const typeDefs = require('../schema');
const resolvers = require('../resolvers');

// GraphQL: Schema
const apolloServerConfiguration = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // get the user token from the headers
    const token = req.headers.authorization || '';
    
    // try to retrieve a user with the token
    const user = getUser(token);

    if (!user) throw new AuthenticationError('you must be logged in to query this schema');
    
    return { user };
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
