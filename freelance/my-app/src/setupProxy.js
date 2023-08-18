const { createProxyMiddleware } = require('http-proxy-middleware');
 
module.exports = function (app) {
  app.use(
    createProxyMiddleware('/cgi-bin/uniqueid/mrzp', {
      target: 'http://www.highprogrammer.com', // API endpoint 1
      changeOrigin: true,
      pathRewrite: {
        "^/cgi-bin/uniqueid/mrzp": "",
      },
      headers: {
        Connection: "keep-alive"
      }
    })
  );
  app.use(
    createProxyMiddleware('/verifyAadhaar', {
      target: 'https://myaadhaar.uidai.gov.in', // API endpoint 2
      changeOrigin: true,
      pathRewrite: {
        "^/verifyAadhaar": "",
      },
      headers: {
        Connection: "keep-alive"
      }
    })
  );
  app.use(
    createProxyMiddleware('/products/single-address', {
      target: 'https://www.smarty.com', // API endpoint 2
      changeOrigin: true,
      pathRewrite: {
        "^/products/single-address": "",
      },
      headers: {
        Connection: "keep-alive"
      }
    })
  );


}
