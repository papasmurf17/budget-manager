import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import AddTransaction from '../../components/AddTransaction';

const CREATE_TRANSACTION = gql`
  mutation CreateTransaction($transaction: Transactioninput!) {
    addTransaction(transaction: $transaction) {
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

const CreateTransaction = ({ history }) => (
  <Mutation mutation={CREATE_TRANSACTION}>
    {createTransaction => (
      <AddTransaction
        onSubmit={({ user, description, expenseType, amount, currencyCode, invoiceDate }) => (
          createTransaction({
            variables: {
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
      />
    )}
  </Mutation>
);

CreateTransaction.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired
};

export default CreateTransaction;
