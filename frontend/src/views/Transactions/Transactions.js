import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import LatestOrders from '../../components/LatestOrders';

const Transactions = ({ match }) => (
  <Switch>
    <Route component={LatestOrders} path={`${match.path}/`} />
    {/* <Route component={TransactionDetail} path={`${match.path}/:transactionId`} /> */}
  </Switch>
);


Transactions.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired
  }).isRequired
};

export default Transactions;
