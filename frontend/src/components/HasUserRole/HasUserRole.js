import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export const USER_ROLES_QUERY = gql`
    query UserProfile {
        profile @client {
            roles
        }
    }
`;

const HasUserRole = (WrappedComponent, role) => props => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { loading, error, data: { profile: { roles } } } = useQuery(USER_ROLES_QUERY);

  if (loading || error) { return null }
  if (!roles.includes(role)) { return null }

  return (<WrappedComponent {...props} />);
};

export default HasUserRole;
