const express = require('express');
const proxy = require('http-proxy-middleware');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// write to a new file named 2pac.txt
fs.writeFile('build/keycloak.json', process.env.KEYCLOAK, err => {
  // throws an error, you could also catch it here
  if (err) { throw err }

  // success case, the file was saved
  console.log('Keycloak configuration is written!');
});

// Proxy api request
app
  .use(
    '/graphql',
    proxy({
      target: process.env.REACT_APP_API_ENDPOINT,
      changeOrigin: true,
      ws: true,
      pathRewrite: {
        '^/graphql': '',
      },
    })
  )
  .use(express.static(path.join(__dirname, 'build')))
  .get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  })
  .listen(PORT, () => console.log(`🎧 Listening on :${PORT} 🚀`));
