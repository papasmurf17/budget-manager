import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';

import TransactionList from './TransactionList';
import Error from '../../components/Error';
import Loading from '../../components/Loading';

export const FETCH_FILTERED_TRANSACTIONS = gql`
    query SearchTransactions($searchTerm: String) {
        SearchTransactions(limit: 20, searchTerm: $searchTerm) {
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

const FilteredTransactionList = ({ searchTerm, ...props }) => {
  const { loading, error, data } = useQuery(FETCH_FILTERED_TRANSACTIONS, { variables: { searchTerm } });

  if (loading) { return <Loading /> }
  if (error) { return <Error /> }

  return (
    <TransactionList transactions={data.SearchTransactions} {...props} />
  );
};

FilteredTransactionList.propTypes = {
  searchTerm: PropTypes.string,
};

FilteredTransactionList.defaultProps = {
  searchTerm: '',
};

export default FilteredTransactionList;
