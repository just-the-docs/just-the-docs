# revIP
Get as much information as possible from an IP address.

## Usage

    var getIP = require('revip');

    getIP('XXX.XXX.XXX.XXX', function (err, data) {
        if (err) {
            return;
        }

        console.log(data);
    });

## Response JSON
The following keys are return where available.

* IP
* countyCode
* country
* regionCode
* regionName
* city
* postcode
* latitude
* longitude
* ISP
* org

## Installation

    npm install revip