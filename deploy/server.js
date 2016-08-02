const httpProxy = require('http-proxy');
const config = require('./config');
httpProxy.createProxyServer(config).listen(8888);
