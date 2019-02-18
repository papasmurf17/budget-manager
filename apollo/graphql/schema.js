import { ApolloServer, gql } from 'apollo-server-express';
import {  MockList } from 'apollo-server';
import casual from 'casual';

import resolvers from './resolvers.js';

// Imports: GraphQL TypeDefs & Resolvers
// import TYPEDEFS from './types.js';

// import mocks from './mocks';

const typeDefs = gql`
type Transaction {
  _id: ID!,
  amount: Float,
  currencyCode: String,
  description: String,
  expenseType: String,
  invoiceDate: String,
  user: String
}

type Query {
  getTransactions: [Transaction]
  getTransaction: Transaction
}
`;

const mocks = {
  Query: () => ({
    person: () => ({
      name: casual.name,
      age: () => casual.integer(0, 120),
    }),
    people: () => new MockList([0, 12]),
  })
};

// GraphQL: Schema
const SERVER = new ApolloServer({
  typeDefs,
  //mocks,
  resolvers,
  playground: {
    endpoint: `http://localhost:4000/graphql`,
    settings: {
      'editor.theme': 'dark'
    }
  }
});

export default SERVER;
