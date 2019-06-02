import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import LatestTransactions from '../LatestTransactions';

const Transactions = ({ match }) => (
  <Switch>
    <Route component={LatestTransactions} path={`${match.path}/`} />
    {/* <Route component={TransactionDetail} path={`${match.path}/:transactionId`} /> */}
  </Switch>
);


Transactions.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired
  }).isRequired
};

export default Transactions;
