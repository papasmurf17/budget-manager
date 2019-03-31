import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Text from '@welld/react-components/lib/Text';

const LatestTransactions = ({ transactions }) => (
  <ul>
    {
      transactions.length
        ? (
          transactions.map(({ id, invoiceDate, description, user }) => (
            <li key={id}>
              <Text>{ `${description}, insert by ${user} at ${invoiceDate}` }</Text>
              <Link to={`/transactions/${id}`}>View transaction detail</Link>
            </li>
          ))
        )
        : 'There are no existing transactions'
    }
  </ul>
);

LatestTransactions.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      creator: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired
      }).isRequired
    })
  )
};

LatestTransactions.defaultProps = {
  transactions: []
};

export default LatestTransactions;
