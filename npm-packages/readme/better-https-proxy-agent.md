better-https-proxy-agent
========================

An agent for HTTPS through an HTTP(S) proxy server using the CONNECT method.

This is similar to [https-proxy-agent](https://github.com/TooTallNate/node-https-proxy-agent)
but it leverages functionality available in the NodeJS [http.Agent](https://nodejs.org/api/http.html#http_class_http_agent),
[https.Agent](https://nodejs.org/api/https.html#https_class_https_agent), [http.request](https://nodejs.org/api/http.html#http_http_request_options_callback)
and/or [https.request](https://nodejs.org/api/https.html#https_https_request_options_callback)
to provide:

* connection pooling
* timeout
* TLS session resumption
* authentication (basic or client certificate)
* TLS options
* potentially anything else the NodeJS modules support

All of the above apply both to connections _to_ the proxy, as well as
connections _through_ the proxy.

It was partly inspired by this
[blog post](https://www.vanamco.com/2014/06/24/proxy-requests-in-node-js/)
and [related gist](https://gist.github.com/matthias-christen/6beb3b4dda26bd6a221d).

Basic usage
-----------

```
npm install better-https-proxy-agent
```

```javascript
const { Agent } = require('better-https-proxy-agent');
const fs = require('fs');
const https = require('https');

/*
 * Options suitable for `https.Agent`. These are applied to the HTTPS agent which
 * manages the proxied connections between the client and the final endpoint.
 */
const httpsAgentOptions = {
    keepAlive: true,
    timeout: 55000,
    maxSockets: 20,
    maxFreeSockets: 5,
    maxCachedSessions: 500
};

/*
 * Options suitable for `http(s).request`. These are used to make the request to
 * the proxy server.
 *
 * You should provide `host` here (unless you want the default `localhost`).
 *
 * `protocol` will default to `http:`. If you need to connect to the proxy over
 * HTTPS, set `protocol` to `https:`. `http.request` or `https.request` will be
 * used accordingly.
 *
 * You may include an `agent` here; if you do not, a default agent will be
 * constructed which will be reused for connections to the proxy. If you wish
 * to use the global agent, explicitly provide `http(s).globalAgent`.
 *
 * Using an agent for connection pooling will not work, because connections use
 * the HTTP CONNECT method; such connection cannot be reused, and furthermore
 * are removed from any agent as soon as a response is received. However, an
 * additional `maxSockets` option is provided directly in this options object
 * for the purpose of limiting the number of concurrent connections to a proxy.
 */
const proxyRequestOptions = {
    protocol: "https:", 
    host: "proxy.example.com",
    port: 3128,
    timeout: 123000,
    maxSockets: 100,
    cert: fs.readFileSync("proxy_auth_cert.pem"),
    key: fs.readFileSync("proxy_auth_key.pem"),
    passphrase: "secret"
};

const agent = new Agent(httpsAgentOptions, proxyRequestOptions);

https.request("https://api.example.com", {
    agent,
    cert: fs.readFileSync("api_auth_cert.pem"),
    key: fs.readFileSync("api_auth_key.pem"),
    passphrase: "secret"
});
```

Caveats
-------

You can get yourself into a bit of trouble if you use `maxSockets` to limit the
connections _to_ the proxy, and also pool connections _through_ the proxy. You
can tie up all your proxy connections with connections through to a particular
host, or few hosts (say `api.example.com`): the connections _through_ the proxy
will be pooled and remain open, holding the corresponding connections _to_ the
proxy open also. When you go to make a new connection to a different host (say
to `www.example.com`) no connection _through_ the proxy can be reused, and no
new connection _to_ the proxy can be opened either. This module isn't smart
enough to close pooled connections _through_ the proxy so that you can open a
new connection _to_ the proxy.

The `timeout` that is set on an HTTPS request that uses the proxy agent will be
used to set the 'request timeout' (for requests _through_ the proxy), including
how long to wait for the proxy to connect to the target server, after the
connection to the proxy has already been made. The `timeout` in the
`proxyRequestOptions` (or `agent` provided in the `proxyRequestOptions`)
controls how long to wait for a connection to be made to the proxy itself.
Since it is a two-step process to connect _to_ the proxy and then connect
_through_ the proxy, these two timeouts are cumulative, which may not be what
the caller of `https.request` expects.

Furthermore, the `timeout` in the `proxyRequestOptions` (or `agent` provided in
`proxyRequestOptions`) applies to inactivity on the proxy connection. This can
occur during requests _through_ the proxy, or between them if `keepAlive` is
`true` in the `httpsAgentOptions`. More directly, the timeout for in-flight
requests _through_ the proxy is governed by any `timeout` option set on them,
and the timeout for kept-alive connections is governed by `timeout` in the
`httpsAgentOptions`. Consequently, `timeout` in `proxyRequestOptions` should be
set higher than both of these other timeouts or it will gazump them, cutting
them short.

Licence
-------

MIT.

