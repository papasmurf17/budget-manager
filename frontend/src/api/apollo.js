import { setContext } from 'apollo-link-context';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { refreshToken } from './auth';
import typeDefs from './typedefs';

/**
 * Mutation to store the user profile data in Apollo cache
 *
 * @param _
 * @param profile
 * @param cache
 * @returns {null}
 */
const cacheUserProfile = (_, { profile }, { cache }) => {
  const { username, firstName, lastName, email, roles } = profile;
  cache.writeData({
    data: {
      profile: {
        username,
        firstName,
        lastName,
        email,
        roles,
        id: username,
        __typename: 'Profile'
      }
    }
  });
  return null;
};

const apolloCache = new InMemoryCache();

const authLink = setContext(async (_, { headers }) => {
  const token = await refreshToken();
  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    }
  };
});

/* eslint-disable no-console */
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
    });
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

/* eslint-enable no-console */
const httpLink = new HttpLink({
  uri: `${process.env.REACT_APP_API_ENDPOINT}/graphql`,
  credentials: 'same-origin'
});

const client = new ApolloClient({
  link: ApolloLink.from([
    errorLink,
    authLink,
    httpLink
  ]),
  cache: apolloCache,
  resolvers: {
    Mutation: {
      cacheUserProfile
    }
  },
  typeDefs,
  connectToDevTools: true
});

export default client;
