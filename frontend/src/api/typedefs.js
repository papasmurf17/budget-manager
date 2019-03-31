import gql from 'graphql-tag';

const typeDefs = gql`
  type Profile {
    username: String!,
    firstName: String,
    lastName: String,
    email: String!
  }

  input ProfileInput {
    username: String!,
    firstName: String,
    lastName: String,
    email: String!
  }

  extend type Mutation {
    cacheUserProfile(profile: ProfileInput!): Profile
  }

  extend type Query {
    profile: Profile
  }
`;

export default typeDefs;
