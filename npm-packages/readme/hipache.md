Hipache: a Distributed HTTP and WebSocket Proxy
===============================================

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]
[![Dependency Status][depstat-image]][depstat-url] [![Coverage
Status][coveralls-image]][coveralls-url] [![Code
Climate][codeclimate-image]][codeclimate-url] [![Stories in
Ready][waffle-image]][waffle-url]

DEPRECATED
----------

This project is officially deprecated due to upstream inactivity (last updated Feb 2015, 2d36766; last release Apr 2014, 0.3.1).

The following is a list of other HTTP proxies which might be suitable replacements depending on your needs:

[traefik](https://github.com/containous/traefik)
[vulcand](https://github.com/vulcand/vulcand)
nginx
haproxy
httpd


WARNING
-------

This is the documentation for `master`. If you are installing Hipache from **NPM**,
you should look at the documentation on the [`0.3.x` branch](https://github.com/hipache/hipache/tree/0.3.1).


What Is It?
-----------

Hipache (pronounce `hɪ'pætʃɪ`) is a [fully-featured](#features) distributed
proxy designed to route high volumes of HTTP and WebSocket traffic to unusually
large numbers of virtual hosts, in a highly dynamic topology where backends are
added and removed several times per second.  It is particularly well-suited for
PaaS (Platform-as-a-Service) and other environments that are both
business-critical and multi-tenant.

Hipache was originally developed at [dotCloud](http://www.dotcloud.com), a
popular platform-as-a-service, to replace its first-generation routing layer
based on a heavily instrumented nginx deployment. It currently serves production
traffic for tens of thousands of applications hosted on dotCloud.  Hipache is
based on the [node-http-proxy](https://github.com/nodejitsu/node-http-proxy)
library.


Run It!
-------

### 1. Installation

From the shell:

    $ npm install hipache -g

_The '-g' option will make the 'hipache' bin-script available system-wide
(usually linked from '/usr/local/bin')._


### 2. Configuration File

Basic Hipache configuration is described in a `config.json` file. For example,
this is the configuration file for the `master` version of Hipache (i.e. under
development, you should rather look at the documentation of the latest stable
version you installed):

    {
        "server": {
            "debug": false,
            "workers": 10,
            "maxSockets": 100,
            "tcpTimeout": 30,
            "deadBackendTTL": 30,
            "retryOnError": 3,
            "accessLog": "/var/log/hipache/access.log",
            "httpKeepAlive": false,
            "deadBackendOn500": true,
            "staticDir": null
        },
        "http": {
            "port": 80,
            "bind": ["127.0.0.1"]
        },
        "https": {
            "bind": [],
            "port": 443,
            "ca": [],
            "secureProtocol": "SSLv23_method",
            "secureOptions": 50331648,
            "key": "/etc/ssl/ssl.key",
            "cert": "/etc/ssl/ssl.crt",
            "passphrase": undefined,
            "ciphers": "DH+ECDSA+AESGCM EECDH+aRSA+AESGCM EECDH+ECDSA+SHA384 EECDH+ECDSA+SHA256 EECDH+a RSA+SHA384 EECDH+aRSA+SHA256 EECDH+aRSA+RC4 EECDH EDH+aRSA RC4 !aNULL !eNULL !LOW !3DES !MD5 !EXP !PSK !SRP !DSS !RC4",
            "honorCipherOrder": true
        },
        "driver": "redis:",
        "user": "www-data",
        "group": "www-data"
    }

 * __server__: generic server settings, like accesslog location, or number of
   workers
    * __server.debug__: debug mode.
    * __server.workers__: number of workers to be spawned. You need to request
      to have at least 1 worker, as the master process does not serve any
      request. Defaults to `10` if not specified.
    * __server.maxSockets__: the maximum number of sockets which can be opened
      on each backend (per worker). Defaults to `100` if not specified.
    * __server.tcpTimeout__: the number of seconds of inactivity on the socket
      to wait before timeout-ing it. If sets to `0`, then the existing idle
      timeout is disabled. Defaults to `30` seconds.
    * __server.deadBackendTTL__: the number of seconds a backend is flagged as
      'dead' before retrying to proxy another request to it (doesn't apply if
      you are using a third-party health checker). Defaults to `30` seconds.
    * __server.retryOnError__: retries limit. Defaults to `3`.
    * __server.accessLog__: location of the Access logs, the format is the same
      as nginx. Defaults to `/var/log/hipache/access.log` if not specified.
    * __server.httpKeepAlive__: enable/disable keep-alive functionality.
      Defaults to `false` (disabled).
    * __server.deadBackendOn500__: consider `500` HTTP status code as critical
      error if sets to `true`. Defaults to `true`.
    * __server.staticDir__: the absolute path of the directory containing your
      custom static error pages. Default value `null` means it uses Hipache's
      pages. Defaults to Hipache's `static/` directory.
 * __http__: specifies on which ips/ports Hipache will listen for http traffic.
   By default, Hipache listens only on 127.0.0.1:80
    * __http.port__: port to listen to for http. Defaults to `80`.
    * __http.bind__: IPv4 (or IPv6) address, or addresses to listen to. You can
      specify a single ip, an array of ips, or an array of objects `{address:
      IP, port: PORT}` if you want to use a specific port on a specific ip.
      Defaults to `127.0.0.1`.
 * __https__: specifies on which ips/ports Hipache will listen for https
   traffic. By default, Hipache doesn't listens for https traffic.
    * __https.port__: port to listen to for https. Defaults to `443`.
    * __https.key__: path to key file to use. No default.
    * __https.passphrase__: optional passphrase for the key file. No default.
    * __https.cert__: path to certificate file to use. No default.
    * __https.ca__: optional path to additional CA file to serve. Might be a
      string, or an array.
    * __https.bind__: similarly to http.bind, you can specific a single IP, an
      array of IP, or an array of objects to override the port, key/cert/ca
      files on a per-IP basis.
    * __https.secureProtocol__: SSL/TLS protocol to use. Defaults to
      `SSLv23_method` (auto-negotiation).
    * __https.secureOptions__: extra options to pass to the SSL/TLS layer. Raw
      values must be provided. For instance, defaults is `50331648`, and stands
      for `SSL_OP_NO_SSLv3 | SSL_OP_NO_SSLv2` (constants).
    * __https.ciphers__: cipher suites. See the default value above.
    * __https.honorCipherOrder__: when choosing a cipher, use the server's
      preferences instead of the client preferences. Defaults to `true`.
 * __driver__: driver URL to connect to for dynamic VHOST configurations. See
   [drivers section](#drivers) for more information. Defaults to `redis:`.
 * __user__: if starting as `root` (which you might do if you want to use a
   privileged port), will drop root privileges as soon as it's bound. Defaults
   to `www-data`. Note that you MUST specify a user if you start Hipache as
   root. You can specify `user: 'root'` if you don't mind (strongly
   discouraged!). You can use either user names or identifiers.
 * __group__: if starting as `root`, will downgrade group to this. If left
   empty, will try to downgrade to a group named after the specified `user`.
   Defaults to `www-data`.


### 3. Spawning

From the shell (defaults to using the `config/config.json` file):

    $ hipache

If you use a privileged port (e.g.: `80`):

    $ sudo hipache

If you want to use a specific configuration file:

    $ hipache --config path/to/someConfig.json

If you want to just test a specific configuration file:

    $ hipache --dry --config path/to/someConfig.json

__Managing multiple configuration files:__

The default configuration file is `config/config.json`. It's possible to have
different configuration files named `config_<suffix>.json`, where the suffix is
the value of an environment variable named `SETTINGS_FLAVOR`.

For instance, here is how to spawn the server with the `config_test.json`
configuration file in order to run the tests.

    $ SETTINGS_FLAVOR=test hipache


### 4. VHOST Configuration

All VHOST configuration is managed through a configuration backend (cf.
[drivers](#drivers)). This makes it possible to update the configuration
dynamically and gracefully while the server is running, and have that state
shared across workers and even across Hipache instances.

The recommended backend to use is **Redis**. It also makes it simple to write
configuration adapters. It would be trivial to load a plain text configuration
file into Redis (and update it at runtime).

Different configuration adapters will follow, but for the moment you have to
provision the Redis manually.

Let's take an example to proxify requests to 2 backends for the hostname
`www.dotcloud.com`. The 2 backends IP are `192.168.0.42` and `192.168.0.43` and
they serve the HTTP traffic on the port `80`.

`redis-cli` is the standard client tool to talk to Redis from the terminal.

Follow these steps:

1. __Create__ the frontend and associate an identifier:

        $ redis-cli rpush frontend:www.dotcloud.com mywebsite
        (integer) 1

The frontend identifer is `mywebsite`, it could be anything.

2. __Associate__ the 2 backends:

        $ redis-cli rpush frontend:www.dotcloud.com http://192.168.0.42:80
        (integer) 2
        $ redis-cli rpush frontend:www.dotcloud.com http://192.168.0.43:80
        (integer) 3

3. __Review__ the configuration:

        $ redis-cli lrange frontend:www.dotcloud.com 0 -1
        1) "mywebsite"
        2) "http://192.168.0.42:80"
        3) "http://192.168.0.43:80"

While the server is running, any of these steps can be re-run without messing up
with the traffic.

### 5. OS Integration

__Upstart__

Copy `upstart.conf` to __/etc/init/hipache.conf__. Then you can use:

```
start hipache
stop hipache
restart hipache
```

The configuration file used is `/etc/hipache.json`.


Drivers
-------

Hipache supports several drivers for dynamic VHOST configurations.

### Redis

This is the default backend.

If you want a master/slave Redis, specify a second url for the master, e.g.:
`driver: ["redis://slave:port", "redis://master:port"]`. More generally, the
driver syntax is: `redis://:password@host:port/database#prefix` - all parameter
are optional, hence just `redis:` is a valid driver URI.  You can omit this
entirely to use the local redis on the default port, which is the default.

### Memcached

See the [drivers
documentation](https://github.com/dotcloud/hipache/tree/master/lib/drivers/README.md).

### etcd

See the [drivers
documentation](https://github.com/dotcloud/hipache/tree/master/lib/drivers/README.md).

### Zookeeper

See the [drivers
documentation](https://github.com/dotcloud/hipache/tree/master/lib/drivers/README.md).


Features
--------

### Load-Balancing Across Multiple Backends

As seen in the example above, multiple backends can be attached to a frontend.

All requests coming to the frontend are load-balanced across all healthy
backends.

The backend to use for a specific request is determined randomly. Subsequent
requests coming from the same client won't necessarily be routed to the same
backend (since backend selection is purely random).

### Dead Backend Detection

If a backend stops responding, it will be flagged as dead for a configurable
amount of time. The dead backend will be temporarily removed from the
load-balancing rotation.

### Multi-Process Architecture

To optimize response times and make use of all your available cores, Hipache
uses the cluster module (included in NodeJS), and spreads the load across
multiple NodeJS processes. A master process is in charge of spawning workers and
monitoring them. When a worker dies, the master spawns a new one.

### Memory Monitoring

The memory footprint of Hipache tends to grow slowly over time, indicating a
probable memory leak. A close examination did not turn up any memory leak in
Hipache's code itself; but it doesn't prove that there is none. Also, we did not
investigate (yet) thoroughly the code of Hipache's external dependencies, so the
leaks could be creeping there.

While we profile Hipache's memory to further reduce its footprint, we
implemented a memory monitoring system to make sure that memory use doesn't go
out of bounds. Each worker monitors its memory usage. If it crosses a given
threshold, the worker stops accepting new connections, it lets the current
requests complete cleanly, and it stops itself; it is then replaced by a new
copy by the master process.

### Dynamic Configuration

You can alter the configuration stored in Redis at any time. There is no need to
restart Hipache, or to signal it that the configuration has changed: Hipache
will re-query Redis at each request. Worried about performance?  We were, too!
And we found out that accessing a local Redis is helluva fast.  So fast, that it
didn't increase measurably the HTTP request latency!

### WebSocket

Hipache supports the WebSocket protocol. It doesn't do any fancy handling
on its own and relies entirely on NodeJS and node-http-proxy.

### SSL

Hipache supports SSL for "regular" requests as well as WebSocket upgrades.
Hipache's default configuration matches latest recommandations for a secure and
well-configured SSL/TLS layer.

### Custom HTML Error Pages

When something wrong happens (e.g., a backend times out), or when a request for
an undefined virtual host comes in, Hipache will display an error page. Those
error pages can be customized, and a configuration parameter (`server.staticDir`)
is available to specify where these custom pages are located.

### Wildcard Domains Support

When adding virtual hosts in Hipache configuration, you can specify wildcards.
E.g., instead (or in addition to) `www.example.tld`, you can insert
`*.example.tld`. Hipache will look for an exact match first, and then for a
wildcard one up to 5 subdomains deep, e.g. `foo.bar.baz.qux.quux` will attempt
to match itself first, then `*.bar.baz.qux.quux`, then `*.baz.qux.quux`, etc.

### Active Health-Check

Even though Hipache support passive health checks, it's also possible to run
active health checks. This mechanism requires to run an external program (see
third-party softwares below).


Contributing
------------

See [CONTRIBUTING.md](CONTRIBUTING.md)


Third-Party Softwares of Interest
---------------------------------

Health-checkers:

 * [hipache-hchecker (golang)](https://github.com/samalba/hipache-hchecker)
 * [hipcheck (node.js)](https://github.com/runnable/hipcheck).

A web interface to manage VHOSTs:

 * [airfield](https://github.com/emblica/airfield)

PaaS

  * [tsuru (golang)](http://tsuru.io)

[npm-url]: https://npmjs.org/package/hipache
[npm-image]: https://badge.fury.io/js/hipache.png

[travis-url]: http://travis-ci.org/hipache/hipache
[travis-image]: https://secure.travis-ci.org/hipache/hipache.png?branch=master

[coveralls-url]: https://coveralls.io/r/dotcloud/hipache
[coveralls-image]: https://coveralls.io/repos/dotcloud/hipache/badge.png?branch=master

[depstat-url]: https://david-dm.org/hipache/hipache
[depstat-image]: https://david-dm.org/hipache/hipache.png

[codeclimate-url]: https://codeclimate.com/github/dotcloud/hipache
[codeclimate-image]: https://codeclimate.com/github/dotcloud/hipache.png

[waffle-url]: https://waffle.io/hipache/hipache
[waffle-image]: https://badge.waffle.io/hipache/hipache.png?label=in%20progress&title=Ready
