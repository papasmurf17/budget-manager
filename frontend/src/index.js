import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import AppBootstrap from './components/AppBootstrap';
import * as serviceWorker from './serviceWorker';
import apolloClient from './api/apollo';

import '@welld/react-components/lib/stylesheets/main.css';
import './tailwind.css';
import './index.css';

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <AppBootstrap />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
