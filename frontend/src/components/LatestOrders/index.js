import React from 'react';
import Text from '@welld/react-components/lib/Text';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Transactions from './LatestTransactions';

export const fetchTransactions = gql`
  query LastTransactions {
    Transactions(limit: 20) {
    _id,
    amount,
    description,
    invoiceDate,
    user,
    reporter
  }
}
`;

const LatestTransactionsContainer = () => (
  <Query
    query={fetchTransactions}
  >
    {({ loading, error, data }) => {
      if (loading) { return <Text>Loading...</Text> }
      if (error) { return <Text>Error!</Text> }

      return <Transactions transactions={data.Transactions} />;
    }}
  </Query>
);

export default LatestTransactionsContainer;
