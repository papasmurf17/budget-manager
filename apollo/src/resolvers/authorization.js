const { ForbiddenError } = require('apollo-server');
const { combineResolvers, skip } = require('graphql-resolvers');
const debug = require('debug')('bm');

const isAuthenticated = (parent, args, { me }) => (me ? skip : new ForbiddenError('Not authenticated as user.'));

const can = roleName => combineResolvers(
  isAuthenticated,
  (parent, args, { me: { roles } }) => debug(roles) || (roles.includes(roleName)
    ? skip
    : new ForbiddenError('Not authorized.'))
);

const canEdit = can('edit');
const canDelete = can('delete');

module.exports = {
  isAuthenticated,
  canEdit,
  canDelete
};
