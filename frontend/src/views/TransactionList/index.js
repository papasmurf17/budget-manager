import React from 'react';
import PropTypes from 'prop-types';

import LatestTransactionList from './LatestTransactionList';
import FilteredTransactionList from './FilteredTransactionList';

const TransactionListContainer = ({ searchTerm, ...props }) => {
  if (searchTerm) {
    return (<FilteredTransactionList searchTerm={searchTerm} {...props} />);
  }

  return (<LatestTransactionList {...props} />);
};

TransactionListContainer.propTypes = {
  searchTerm: PropTypes.string,
};

TransactionListContainer.defaultProps = {
  searchTerm: '',
};

export default TransactionListContainer;
