import React from 'react';
import Text from '@welld/react-components/lib/Text';
import WithUserProfile from '../WithUserProfile';
import UserDropdown from './UserDropdown';

const LoggedUser = () => (
  <WithUserProfile>
    {({ username, firstName, lastName }) => (
      <>
        <div className='pr-10 fs-14 font-heading'>
          <Text component='span' color='black'>{firstName}</Text>
          {' '}
          <Text component='span' weight='bold' color='black'>{lastName}</Text>
          {' '}
          <Text color='' component='span'>({username})</Text>
        </div>
        <UserDropdown />
      </>
    )}
  </WithUserProfile>
);

export default LoggedUser;
