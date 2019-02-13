import { ApolloServer, gql } from 'apollo-server-express';
import {  MockList } from 'apollo-server';
import casual from 'casual';

// Imports: GraphQL TypeDefs & Resolvers
// import TYPEDEFS from './types.js';
// import RESOLVERS from './resolvers.js';

// import mocks from './mocks';

const typeDefs = gql`
type Person {
  name: String,
  age: Int,
}

type Query {
  person: Person,
  people: [Person]
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
  mocks,
  // resolvers: RESOLVERS,
  playground: {
    endpoint: `http://localhost:4000/graphql`,
    settings: {
      'editor.theme': 'dark'
    }
  }
});

export default SERVER;
