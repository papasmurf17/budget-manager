import { ApolloServer } from 'apollo-server-express';
import { gql } from 'apollo-server-express';

// Imports: GraphQL TypeDefs & Resolvers
// import TYPEDEFS from './types.js';
// import RESOLVERS from './resolvers.js';

// import mocks from './mocks';

const TYPEDEFS = gql`
type Query {
  testString: String
}
`;

// GraphQL: Schema
const SERVER = new ApolloServer({
  typeDefs: TYPEDEFS,
  // resolvers: RESOLVERS,
  playground: {
    endpoint: `http://localhost:4000/graphql`,
    settings: {
      'editor.theme': 'light'
    }
  }
});

export default SERVER;
