import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import Transactions from './Transactions';

const Views = () => (
  <Switch>
    <Route path='/' exact>
      <Redirect to='/transactions' />
    </Route>
    <Route component={Transactions} path='/transactions' />
    <Redirect to='/transactions' />
  </Switch>
);

export default Views;
