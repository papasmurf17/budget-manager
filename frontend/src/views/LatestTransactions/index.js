import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Transactions from './LatestTransactions';
import Error from '../../components/Error';
import Loading from '../../components/Loading';

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
    pollInterval={10000}
  >
    {({ loading, error, data }) => {
      if (loading) { return <Loading /> }
      if (error) { return <Error /> }

      return <Transactions transactions={data.Transactions} {...props} />;
    }}
  </Query>
);

export default LatestTransactionsContainer;
