import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import startOfYear from 'date-fns/start_of_year';
import Heading from '@welld/react-components/lib/Heading';
import Text from '@welld/react-components/lib/Text';

const FETCH_TOTAL = gql`
  query Total($startFrom: Date) {
    Total(startFrom: $startFrom)
  }
`;

const Footer = () => (
  <div className='px-10 py-4 border-t border-grey-light fixed bottom-0 w-full z-50 shadow'>
    <div className='flex items-center h-12'>
      <Heading size='h3' className='flex-1 text-3xl'>
        <Text weight='bold' component='span'>Available</Text>
        Budget
      </Heading>
      <Query
        query={FETCH_TOTAL}
        variables={{ startFrom: startOfYear(new Date()) }}
      >
        {({ loading, error, data }) => {
          if (error) { return 'Error!' }
          if (loading) { return 'Loading...' }

          const { Total } = data;

          return (
            <Heading size='h3' className='text-3xl bold' color={Total < 0 ? 'danger' : 'success'}>
              { new Intl.NumberFormat('de-DE', {
                style: 'currency', currency: 'CHF'
              }).format(Total)}
            </Heading>
          );
        }}
      </Query>
    </div>
  </div>
);

export default Footer;
