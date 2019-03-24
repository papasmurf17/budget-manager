const { ApolloServer } = require('apollo-server-express');
const { importSchema } = require('graphql-import');

const resolvers = require('./resolvers/transaction');

const mocks = require('./mocks');

const typeDefs = importSchema('./src/graphql/schema.graphql');

// GraphQL: Schema
const apolloServerConfiguration = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    endpoint: 'http://localhost:4000/graphql',
    settings: {
      'editor.theme': 'dark'
    }
  }
});

// GraphQL: Server
module.exports = (process.env.NODE_ENV === 'mock')
  ? new ApolloServer(Object.assign({}, apolloServerConfiguration, { mocks }))
  : new ApolloServer(apolloServerConfiguration);
