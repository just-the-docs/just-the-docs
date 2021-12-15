# passport-bearer-strategy


HTTP Bearer authentication strategy for [Passport](http://passportjs.org/).

This module lets you authenticate HTTP requests using bearer tokens, as
specified by [RFC 6750](http://tools.ietf.org/html/rfc6750), in your Node.js applications.
Bearer tokens are typically used to protect API endpoints, and are often issued using OAuth 2.0.

By plugging into Passport, bearer token support can be easily and unobtrusively integrated into any application
or framework that supports [Connect](http://www.senchalabs.org/connect/)-style middleware,
including [Express](http://expressjs.com/).

## Install

    $ npm install passport-bearer-strategy

## Usage

#### Configure Strategy

The HTTP Bearer authentication strategy authenticates users using a bearer token.
The strategy requires a `verify` callback, which accepts that credential and calls `done` providing a user.
Optional `info` can be passed, typically including associated scope,
which will be set by Passport at `req.authInfo` to be used by later middleware for authorization and access control.

    var options = { // not required
        passReqToCallback: true // default false
    };

    passport.use(new BearerStrategy(options, function(req, token, done) {
        User.findOne({ token: token }, function (err, user) {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false);
            }

            return done(null, user, { scope: 'all' });
        });
    }));

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'bearer'` strategy, to authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/) application:

    // default settings
    app.get('/profile', passport.authenticate('bearer'), function(req, res) {
        res.json(req.user);
    });


    // custom callback
    var options = { // not required
        session: true, // default false - typically no need to change.
        badHeaderMessage: 'custom message', // Message displayed when Authorization header format is incorrect.
        missingTokenMessage: 'custom message' // Message displayed when token is not present.
    };

    function customCallback(req, res, next) {
        passport.authenticate('bearer', options, function (error, user, info) {
            if (error) {
                return next(error);
            }

            if (!user) {
                // info containing default error messages or your defined ones.

                next(info);
            } else {
                // do something with `info`

                next();
            }
        })(req, res, next);
    }

    app.get('/profile', customCallback, function(req, res) {
        res.json(req.user);
    });

#### Issuing Tokens

Bearer tokens are typically issued using OAuth 2.0.
[OAuth2orize](https://github.com/jaredhanson/oauth2orize) is a toolkit for implementing OAuth 2.0 servers and issuing bearer tokens.
Once issued, this module can be used to authenticate tokens as described above.

## Related Modules

- [OAuth2orize](https://github.com/jaredhanson/oauth2orize) — OAuth 2.0 authorization server toolkit

## Tests

    $ npm install
    $ npm test

## License

[The MIT License](http://opensource.org/licenses/MIT)
