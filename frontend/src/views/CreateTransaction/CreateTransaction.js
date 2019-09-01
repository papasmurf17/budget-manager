import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import TransactionModal from '../../components/TransactionModal';
import { FETCH_TRANSACTIONS } from '../LatestTransactions';

const CREATE_TRANSACTION = gql`
  mutation CreateTransaction($transaction: TransactionInput!) {
    addTransaction(transaction: $transaction) {
      _id
      amount
      currencyCode
      pricePaid {
          value,
          currency
      }
      priceConverted {
          value
          currency
      }
      description
      expenseType
      invoiceDate
      user
      reporter
    }
  }
`;

const CreateTransaction = ({ history }) => (
  <Mutation
    mutation={CREATE_TRANSACTION}
    update={(cache, { data: { addTransaction } }) => {
      const { Transactions } = cache.readQuery({ query: FETCH_TRANSACTIONS });
      cache.writeQuery({
        query: FETCH_TRANSACTIONS,
        data: { Transactions: Transactions.concat([addTransaction]) }
      });
    }}
  >
    {createTransaction => (
      <TransactionModal
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
