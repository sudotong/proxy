const yn = require('yn');
const url = require('url');
const http = require('http');
const httpProxy = require('http-proxy');
const camelCase = require('camel-case');

const target = process.argv[2] || process.env.PROXY_URL;
if (!target) {
  console.error('`target` URL is missing');
  process.exit(1);
}

const { pathname } = url.parse(target);

const config = Object.assign(
  {
    target,
    changeOrigin: true,
    prependPath: true
  },
  Object.keys(process.env)
    .filter(key => key.startsWith('PROXY_') && key !== 'PROXY_URL')
    .reduce((o, key) => {
      let v = process.env[key];
      const bool = yn(v);
      if (typeof bool === 'boolean') {
        v = bool;
      }
      o[camelCase(key.substr(6))] = v;
      return o;
    }, {})
);

console.log('Proxy configuration:', config);

const proxy = httpProxy.createProxyServer();

const server = http.createServer((req, res) => {
  if (req.url.startsWith(pathname)) {
    req.url = '/' + req.url.substr(pathname.length);
  }
  proxy.web(req, res, config);
});

server.listen(8888);
