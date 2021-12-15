CONPA
=====
[![NPM version](https://badge.fury.io/js/conpa.svg)](http://badge.fury.io/js/conpa)
![](https://github.com/albertosantini/node-conpa/workflows/CI/badge.svg)


ConPA is a complete stack for an asset allocation application.

ConPA is a single page app with the following components: the asset search,
the list of assets, the basket info, the assets stats and the dashboard of
portfolios.

To fill the basket, the user needs to add an asset, using the autocomplete
search: typing the name or the symbol of an asset, the autocomplete component
suggests a few assets. When the user selects an asset, it is added to the
basket, displaying the symbol.

In the meantime for the last asset added to the basket, the app provides the key
statistics.

When the basket contains at least three assets, the basket is optimized,
displaying the optimal weights of the assets.

There is also a dashboard of portfolios. It contains the stats of all portfolios
created by the users: last created portfolios, best/worst performing portfolios,
high/low risk profile portfolios and high/low return profile portfolios.

Installation
============

After cloning the project, install the dependencies and execute sql in `db`
folder on Supabase instance.

- `npm run dev` to locally run the web server

Notes
=====

- Sometimes the weights of the optimal portfolio (To Date or Year To Date) are zeroes:
this is due to a problem retrieving the historical prices.

- Setting a Supabase instance, you need to use the environment variables:
`SUPABASE_URL` and `SUPABASE_KEY`.

- Optionally, you may add a Rserve configuration (local or remote). If Rserve is
not configured, ConPA uses a javascript implementation for the optimization.

- ConPA [Sequence Diagram](http://www.websequencediagrams.com/cgi-bin/cdraw?lz=Q29uUEEtPk5vZGVKUzogbmF2aWdhdGlvbgphbHQgABkFIGJhY2tlbmQgd2l0aCBqcyBjYWxjCiAgICBub3RlIG92ZXIgADoGABAFABMGZGUtY29ucGEgAAYOZmluYW5jZQAbDnF1YWRwcm9nAE8FZW5kAFMFCmVsc2UAbRRSIGNsb3VkAF4jcmlvIChSc2VydmUgYWRhcHRlcikAVg4gICAAgTQHLT4AUQVudW1iZXJzLmNvbTogZ2V0IG9wdGltYWwgcG9ydGZvbGlvABEjcGVyZm9ybWFuY2VzAEAjaW1wbGllZCB2b2xhdGlsaXR5AIJODwCBChAAgl4JAIFWBgCCbQl0c2VyaQBsBwAaBUpTT05JTwCBYRIAgVsQLQCDdgsAgXwFIGNydW5jaGluZyByZXNwb25zZQplbmQKAIIlBy0-AIQyBToAEwoKCgoKCgo&s=napkin).

History
=======

- ConPA rel. 0 (2008 - 2011): Jaxer + YUI.
- ConPA rel. 1 (2011 - 2012): Node.js + YUI + Cloudant.
- ConPA rel. 2 (2012 - 2015): Node.js + jQuery MVC + Cloudant.
- ConPA rel. 3 (2015 - 2016): Node.js + AngularJS + Cloudant.
- ConPA rel. 4 (2016 - 2018): Node.js + AngularJS + PouchDB / Cloudant.
- ConPA rel. 5 (2018 - 2020): Node.js + hyperHTML / workway + PouchDB / Cloudant.
- ConPA rel. 6 (2020 - 2021): Zeit Now + hyperHTML + PouchDB / Cloudant.
- ConPA rel. 7 (2021 - present): Netlify (functions) + hyperHTML + Supabase.

There are two old videos about ConPA 0:
[welcome](http://www.youtube.com/watch?v=ia_UVHtuBTM) and
[tutorial](http://www.youtube.com/watch?v=xIwbc6lQzNk).

Disclaimer
==========

NOT INVESTMENT ADVICE AND WILL LOSE LOTS OF MONEY SO PROCEED WITH CAUTION.
