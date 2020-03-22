---
layout: default
title: Authentication
nav_order: 5
permalink: /docs/authentication
---

## Authentication

To perform actions on behalf of another user, you'll need to obtain their access tokens. Access tokens specify the Twitter account the request is made on behalf of, so for you to obtain these they will need to first grant you access. These tokens do not expire but can be revoked by the user at any time

Twitter allows you to obtain user access tokens through the 3-legged OAuth flow, which allows your application to obtain an access token and access token secret by redirecting a user to Twitter and having them authorize your application.

### Overview of the process

At a high level, the 3-Legged OAuth process will:

1. Create a request for a consumer application to obtain a request token.
2. Have the user authenticate, and send the consumer application a request token.
3. Convert the request token into a usable user access token

### Walkthrough Steps

**Step 1: Post oauth/request_token** 

Create a request to twitter to obtain request token.

* Request Url

```
POST https://api.twitter.com/oauth/request_token
```
* Request header includes:

```
oauth_callback="https%3A%2F%2Fglacial-wildwood-37970.herokuapp.com/returned"

oauth_consumer_key="cChZNFj6T5R0TigYB9yd1w" 
```
 The body of the response will contain the `oauth_token`, `oauth_token_secret`, and `oauth_callback_confirmed` parameters. Your app should verify that oauth_callback_confirmed is true and store the other two values for the next steps.

* Response include:

```
oauth_token=NPcudxy0yU5T3tBzho7iCotZ3cnetKwcTIRlX0iwRl0

oauth_token_secret=veNRnAWe6inFuo8o2u8SLLZLjolYDmDP7SzL0YfYI

oauth_callback_confirmed=true
```

**Step 2: GET oauth/authorize**

To authenticate our user, we have to send a twitter api a request token.

* Example URL to redirect user to twitter authentication window

```
https://api.twitter.com/oauth/authorize?oauth_token=NPcudxy0yU5T3tBzho7iCotZ3cnetKwcTIRlX0iwRl0
```
Upon successful authentication, your `callback_url` would receive a request containing the `oauth_token` and `oauth_verifier` parameters. Your application should verify that the token matches the request token received in step 1.

* Request from Client Redirect

```
https://glacial-wildwood-37970.herokuapp.com/returned?oauth_token=NPcudxy0yU5T3tBzho7iCotZ3cnetKwcTIRlX0iwRl0&oauth_verifier=uw7NjWHT6OJ1MpJOXsHfNxoAhPKpgI8BlYDhxEjIBY
```

**Step 3:POST oauth/access_token**

Convert the request token into a usable access token.

To render the request token into a usable access token, your application must make a request to the POST oauth/access_token endpoint, containing the `oauth_verifier` value obtained in step 2. The request token is also passed in the `oauth_token` portion of the header, but this will have been added by the signing process.

* Request includes:

```
POST /oauth/access_token

oauth_consumer_key=cChZNFj6T5R0TigYB9yd1w

oauth_token=NPcudxy0yU5T3tBzho7iCotZ3cnetKwcTIRlX0iwRl0

oauth_verifier=uw7NjWHT6OJ1MpJOXsHfNxoAhPKpgI8BlYDhxEjIBY
```

A successful response contains the `oauth_token`, `oauth_token_secret` parameters. The token and token secret should be stored and used for future authenticated requests to the Twitter API

* Response include:

```
oauth_token=7588892-kagSNqWge8gB1WwE3plnFsJHAZVfxWD7Vb57p0b4

oauth_token_secret=PbKfYqSryyeKDWz4ebtY3o5ogNLG11WJuZBc9fQrQo
```