const url = require('url');
const http = require('http');
const httpProxy = require('http-proxy');
const target = process.argv[2];
const parsed = url.parse(target);

const config = {
  target,
  changeOrigin: true,
  prependPath: true
};

const proxy = httpProxy.createProxyServer();

http.createServer((req, res) => {
  if (req.url.startsWith(parsed.pathname)) {
    req.url = req.url.substr(parsed.pathname.length) || '/';
  }
  proxy.web(req, res, config);
}).listen(8888);
