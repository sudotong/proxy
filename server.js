const httpProxy = require('http-proxy');
const config = {
  target: process.env.PROXY_URL
};
httpProxy.createProxyServer(config).listen(8888);
