import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';

import TransactionModal from '../../components/TransactionModal';

const UPDATE_TRANSACTION = gql`
  mutation UpdateTransaction($id: ID!, $transaction: UpdateTransactionInput!) {
    updateTransaction(id: $id, transaction: $transaction) {
      _id
      pricePaid {
          value,
          currency
      }
      priceConverted {
          value
          currency
      }
      amount
      currencyCode
      description
      expenseType
      invoiceDate
      user
      reporter
    }
  }
`;

export const FETCH_TRANSACTION = gql`
  query GetTransaction($id: ID!) {
    Transaction(id: $id) {
      _id
      amount,
      currencyCode
      description
      expenseType
      invoiceDate
      user
      reporter
    }
  }
`;

const UpdateTransaction = ({ history, match }) => (
  <Query
    query={FETCH_TRANSACTION}
    variables={{ id: match.params.transactionId }}
  >
    {({ loading, error, data }) => {
      if (error) { return 'Error!' }
      if (loading) { return 'Loading...' }

      const { Transaction } = data;
      return (
        <Mutation
          mutation={UPDATE_TRANSACTION}
          key={match.params.transactionId}
        >
          {updateTransaction => (
            <TransactionModal
              onSubmit={({ user, description, expenseType, amount, currencyCode, invoiceDate }) => (
                updateTransaction({
                  variables: {
                    id: match.params.transactionId,
                    transaction: {
                      user,
                      description,
                      expenseType,
                      amount,
                      currencyCode,
                      invoiceDate
                    }
                  }
                }).then(() => {
                  history.push({ pathname: '/transactions', search: history.location.search });
                }).catch(() => {
                  // TODO fire error notification.
                })
              )}
              history={history}
              transaction={Transaction}
            />
          )}
        </Mutation>
      );
    }}
  </Query>
);

UpdateTransaction.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      orderId: PropTypes.string.isRequired
    })
  }).isRequired
};

export default UpdateTransaction;
