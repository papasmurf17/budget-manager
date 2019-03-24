const express = require('express');
const debug = require('debug')('bm');

const apolloServerConfiguration = require('./graphql/schema');
const mongoose = require('./config/mongoose');

const graphQLServer = express();
mongoose();

apolloServerConfiguration.applyMiddleware({
  app: graphQLServer
});

const PORT = 4000 || process.env;

graphQLServer.listen(PORT, () => {
  debug(`🚀 The server has started on port: ${PORT}`);
  debug(`http://localhost:${PORT}/graphql`);
});

module.exports = graphQLServer;
