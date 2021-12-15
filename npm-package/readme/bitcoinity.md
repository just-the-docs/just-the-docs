bitcoinity
==========

Basic node.js interface to and parser for data from data.bitcoinity.org


Installation
============

```
npm install bitcoinity
```

Usage
=====


```javascript

var bitcoinity = require("bitcoinity");

{ 
        data_type : 'volume', // Type of data
        timespan : '3d', // The lookback amount of time over which to pull in the data 
        r : 'minute' // The time basis overwhich to aggregate the data
    },

bitcoinity.getCSV({ // Get string parameters for request; see various tabs in data.bitcoinity.org to configure
    data_type : "volume",
    timespan : "10m",
    volume_unit : "btc",
    r : 'minute'
}, function(err, csvData) {
    if (err) {
        console.log("Encountered a download error. Exiting.");
        throw err;
    }
    wideData = bitcoinity.parseCSV(csvData); // Parses data into an array of objects
    console.log(wideData);
    tallData = bitcoinity.parseCSVTall(csvData, function(timestamp) { // Converts listing of exchanges from wide to tall
        return timestamp.replace(" UTC", "+00");
    });
    console.log(tallData);
});

```



