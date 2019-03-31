import React from 'react';
import PropTypes from 'prop-types';
import Text from '@welld/react-components/lib/Text';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

export const USER_PROFILE_QUERY = gql`
  query UserProfile {
    profile @client {
      username,
      email,
      firstName,
      lastName
    }
  }
`;

const WithUserProfile = ({ children }) => (
  <Query
    query={USER_PROFILE_QUERY}
  >
    {({ loading, error, data }) => {
      // these should never happen as the query is client side
      if (loading) { return <Text>Loading...</Text> }
      if (error) { return <Text>Error!</Text> }

      const { profile } = data;
      return children({ ...profile });
    }}
  </Query>
);

WithUserProfile.propTypes = {
  children: PropTypes.elementType
};

WithUserProfile.defaultProps = {
  children: () => null
};

export default WithUserProfile;
