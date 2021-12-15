# Express IP

This is an express module for getting IP information using geoip-lite. It can also be used as express middleware. Basically its an express middleware. So with this, you can get info about an IP.

# Installation

```
npm install express-ip
```

# Usage

## short
```
const express = require('express');
const app = express();
const expressip = require('express-ip');
app.use(expressip().getIpInfoMiddleware);

app.get('/', function (req, res) {
    res.send(req.ipInfo);
});

```
## full
```
const express = require('express');
const app = express();
const expressip = require('express-ip');
const PORT = process.env.PORT || 7000;
const path = require('path');

app.use(expressip().getIpInfoMiddleware);


app.set("PORT", PORT);

app.get('/', function (req, res) {
    res.send(req.ipInfo);
});

app.listen(app.get('PORT'), function () {
    console.log('Express started on http://localhost:' +
        app.get('PORT') + '; press Ctrl-C to terminate.');
});

```

# Author
Oyetoke Toby <oyetoketoby80@gmail.com> (http://patreon.com/oyetoketoby)