import express from 'express';

import SERVER from './graphql/schema';
import mongoose from './config/mongoose';

const graphQLServer = express();
const db = mongoose();

SERVER.applyMiddleware({
  app: graphQLServer
});

const PORT = 4000 || process.env;

graphQLServer.listen(PORT, () => {
  console.log(`🚀 The server has started on port: ${PORT}`);
  console.log(`http://localhost:${PORT}/graphql`);
});

export default graphQLServer;
