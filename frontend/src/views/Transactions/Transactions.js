import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import Button from '@welld/react-components/lib/Button';
import Icon from '@welld/react-components/lib/Icon';

import TransactionList from '../TransactionList';
import TransactionsSearchBar from '../../components/TransactionsSearchBar';
import CreateTransaction from '../CreateTransaction';
import UpdateTransaction from '../UpdateTransaction';

const Transactions = ({ history }) => {
  const [term, setTerm] = useState('');

  return (
    <>
      <div className='flex items-end mt-8'>
        <TransactionsSearchBar
          className='flex-grow m-r-5'
          onChange={value => setTerm(value)}
        />
        <Button
          color='success'
          size='small'
          className='flex-none'
          onClick={() => history.push({ pathname: '/transactions/new', search: history.location.search })}
        >
          <Icon name='plus' size='small' />
        </Button>
        <Route
          path='/transactions/new'
          render={
            props => (
              <CreateTransaction
                {...props}
              />
            )
          }
        />
        <Route
          path='/transactions/edit/:transactionId'
          render={
            props => (
              <UpdateTransaction
                {...props}
              />
            )
          }
        />
      </div>
      <hr />
      <TransactionList searchTerm={term} history={history} />
    </>
  );
};

Transactions.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired })
};

Transactions.defaultProps = {
  history: null
};

const RouteTransactions = ({ match }) => (
  <Switch>
    <Route component={Transactions} path={`${match.path}/`} />
    {/* <Route component={TransactionDetail} path={`${match.path}/:transactionId`} /> */}
  </Switch>
);

RouteTransactions.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired
  }).isRequired
};

export default RouteTransactions;
