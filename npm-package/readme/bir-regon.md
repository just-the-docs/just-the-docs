# BIR Regon query API

Check publicly available data regarding legally registered companies in Poland.

To use this package in production you need to get a private API key. See [Further reading](#further-reading) for more information.

# Example usage
``` javascript
const BirAPI = require('bir-regon');

let testURL = 'https://wyszukiwarkaregontest.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc';
let testApiKey = 'abcde12345abcde12345';
let testNIP = '7740001454';

let connectionAPI = new BirAPI(testURL);

console.log('Beginning login');
connectionAPI.login(testApiKey)
  .then(sessionID => {
    console.log('Logged in, session id', sessionID);
    return connectionAPI.query(testNIP);
  })
  .then(queryResults => {
    console.log('Got results');
    console.log(queryResults);
  })
  .catch(error => {
    console.error('Request error', error);
  });
```


# Further reading

More information is available on [the Polish BIP pages](http://bip.stat.gov.pl/dzialalnosc-statystyki-publicznej/rejestr-regon/interfejsyapi/jak-skorzystac-informacja-dla-podmiotow-komercyjnych/).


# Author

The author of this package is [Grzegorz Rozdzialik](voreny.gelio@gmail.com).
edit by Mateusz Sych
