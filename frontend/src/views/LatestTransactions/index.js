import React from 'react';
import Text from '@welld/react-components/lib/Text';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Transactions from './LatestTransactions';

export const FETCH_TRANSACTIONS = gql`
  query LastTransactions {
    Transactions(limit: 20) {
    _id,
    pricePaid {
        value,
        currency
    },
    priceConverted {
        value,
        currency
    },
    description,
    invoiceDate,
    user,
    reporter,
    expenseType
  }
}
`;

const LatestTransactionsContainer = props => (
  <Query
    query={FETCH_TRANSACTIONS}
  >
    {({ loading, error, data }) => {
      if (loading) { return <Text>Loading...</Text> }
      if (error) { return <Text>Error!</Text> }

      return <Transactions transactions={data.Transactions} {...props} />;
    }}
  </Query>
);

export default LatestTransactionsContainer;
