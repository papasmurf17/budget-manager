import { createContext } from 'react';
import Keycloak from 'keycloak-js';
import gql from 'graphql-tag';
import apolloClient from './apollo';

const appBasename = process.env.PUBLIC_PATH || '';
const keycloakConfig = `${appBasename}/keycloak.json`;
const keycloakClient = Keycloak(keycloakConfig);

export const SessionContext = createContext();

export const checkAuthentication = () => keycloakClient.init({
  onLoad: 'check-sso',
  promiseType: 'native'
});

export const login = () => keycloakClient.login();

export const logout = () => keycloakClient.logout({ redirectUri: `${window.location.origin}/${appBasename}` });

export const refreshToken = (minValidity = 5) => (
  keycloakClient.updateToken(minValidity).then(() => keycloakClient.token)
);

export const loadUserProfile = () => keycloakClient.loadUserProfile().then(profile => {
  apolloClient.mutate({
    mutation: gql`
      mutation cacheUserProfile($profile: ProfileInput!) {
        cacheUserProfile(profile: $profile) @client { username }
      }
    `,
    variables: { profile }
  });
  return profile;
});

// this is ugly
export const onAuthExpired = cb => {
  keycloakClient.onAuthRefreshError = cb;
};

export default {
  SessionContext,
  checkAuthentication,
  login,
  logout,
  refreshToken,
  loadUserProfile
};
