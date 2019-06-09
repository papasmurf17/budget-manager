const express = require('express');
const proxy = require('http-proxy-middleware');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

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
