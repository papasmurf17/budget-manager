const { ForbiddenError } = require('apollo-server');
const { combineResolvers, skip } = require('graphql-resolvers');
const debug = require('debug')('bm');

const isAuthenticated = (parent, args, { me }) => (me ? skip : new ForbiddenError('Not authenticated as user.'));

const canEdit = combineResolvers(
  isAuthenticated,
  (parent, args, { me: { roles } }) => debug(roles) || (roles.includes('edit')
    ? skip
    : new ForbiddenError('Not authorized as budget editor.'))
);

module.exports = {
  isAuthenticated,
  canEdit
};
