const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/banque',
    createProxyMiddleware({
      target: process.env.REACT_APP_DEV_PROXY || 'http://localhost:8083',
      changeOrigin: true,
      secure: false,
      logLevel: 'warn'
    })
  );
};


