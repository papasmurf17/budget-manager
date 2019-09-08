const express = require('express');
const debug = require('debug')('bm');

const apolloServerConfiguration = require('./graphql/apolloServerConfiguration');
const mongoose = require('./config/mongoose');

mongoose();

const app = express();
apolloServerConfiguration.applyMiddleware({ app });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  debug(`🚀 The server has started on port: ${PORT}`);
  debug(`http://localhost:${PORT}/graphql`);
});

module.exports = app;
