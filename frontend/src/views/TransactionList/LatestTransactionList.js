import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import TransactionList from './TransactionList';
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

const LatestTransactionList = props => {
  const { loading, error, data } = useQuery(FETCH_TRANSACTIONS);

  if (loading) { return <Loading /> }
  if (error) { return <Error /> }

  return (
    <TransactionList transactions={data.Transactions} {...props} />
  );
};

export default LatestTransactionList;
