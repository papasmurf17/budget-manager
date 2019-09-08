const debug = require('debug')('bm');
const { ApolloError, AuthenticationError } = require('apollo-server');
const jwtDecode = require('jwt-decode');
const intersection = require('lodash/intersection');
const isEmpty = require('lodash/isEmpty');

const getUser = token => {
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

  return null;
};

const hasContextUserData = userData => {
  if (!userData || !userData.username) {
    debug(`User information should be provided by the JWT token, but instead got: ${userData}`);
    throw new AuthenticationError('No user information provided, JWT token in the'
      + ' request header is not present or does not contain the user data');
  }
};



const checkRoles = (userRoles, permitteRoles) => {
  if (isEmpty(intersection(permitteRoles, userRoles))) {
    throw new Error('User has not the right permission to change state');
  }
  return true;
};

module.exports = {
  getUser,
  checkRoles,
};
