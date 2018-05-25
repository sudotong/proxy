# &#120491; Now Proxy

Deploy a reverse proxy as a [now](https://now.sh) instance.

Why? Sometimes you have a server running on a remote machine that is running
over HTTP. Reverse proxying through `now` gives us the SSL, HTTP/2.0, domain
aliasing, etc. benefits that come with now by default.

Backed by [`node-http-proxy`](https://github.com/nodejitsu/node-http-proxy).


## Usage

Simply invoke `now now-examples/proxy` and specify the base URL you would
like to proxy to:

```bash
$ now now-examples/proxy --docker -e PROXY_URL=http://my-apartment.example.com:8888/foo
```


## Configuration

Any of the `node-http-proxy` configuration options may be specified via
environment variables prefixed with `PROXY_`. For example, the `xfwd` option
may be specified with the `PROXY_XFWD=1` env var, and the `autoRewrite` option
would look like `PROXY_AUTO_REWRITE=1`.

See the [full list of
options](https://github.com/nodejitsu/node-http-proxy#options).
