# &#120491; now-proxy

Deploy a reverse proxy as a [now](https://now.sh) instance.

Why? Sometimes you have a server running on a remote machine that is running
over HTTP. Reverse proxying through `now` gives us the SSL, HTTP/2.0, domain
aliasing, etc. benefits that come with now by default.

Backed by [`node-http-proxy`](https://github.com/nodejitsu/node-http-proxy).

## Usage

Simply invoke `now-proxy` with the base URL you would like to proxy to:

```bash
$ now-proxy http://my-apartment.example.com:8888
> https://now-proxy-dmudqyamnj.now.sh
```

## Installing

```bash
$ npm install -g now-proxy
```
