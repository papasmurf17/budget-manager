import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/react-hooks';
import remove from 'lodash/remove';

import ConfirmationModal from '../../components/ConfirmationModal';
import { FETCH_TRANSACTIONS } from '../TransactionList/LatestTransactionList';
import { FETCH_TRANSACTION } from '../UpdateTransaction/UpdateTransaction';

const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($id: ID!) {
    removeTransaction(id: $id) {
      _id
    }
  }
`;

const DeleteTransaction = ({ history, match }) => {
  const [removeTransaction] = useMutation(
    DELETE_TRANSACTION,
    {
      update(cache, { data: { removeTransaction: deletedTransaction } }) {
        const { Transactions } = cache.readQuery({ query: FETCH_TRANSACTIONS });
        cache.writeQuery({
          query: FETCH_TRANSACTIONS,
          data : {
            // eslint-disable-next-line no-underscore-dangle
            Transactions: remove(Transactions, transaction => transaction._id !== deletedTransaction._id)
          }
        });
      }
    }
  );

  const { loading, error, data } = useQuery(FETCH_TRANSACTION, {
    variables: { id: match.params.transactionId }
  });

  if (loading) { return null }
  if (error) { return null }

  const { Transaction: transaction } = data;

  return (
    <ConfirmationModal
      title='Delete transaction'
      message={`Do you wanna delete [${transaction.description}] transaction ?`}
      onConfirm={() => removeTransaction({ variables: { id: match.params.transactionId } })
        .then(() => {
          history.push({ pathname: '/transactions', search: history.location.search });
        })
      }
      history={history}
    />
  );
};

DeleteTransaction.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      orderId: PropTypes.string.isRequired
    })
  }).isRequired
};

export default DeleteTransaction;
