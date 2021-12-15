# eurekapi-geolocation
A basic wrapper around eurekapi's ip geolocation api
### Version
2.0.1
### Installation
Because eurekapi-geolocation uses native ES6 Promises and classes you must be running Node v4.2.4 or above
```sh
$ npm i eurekapi-geolocation
```
### Usage
```javascript
const Geolocator = require('eurekapi-geolocation');
var geoip = new Geolocator({
	ip: '127.0.0.1', //Some ip address string
	format: 'JSON', //"XML" or "JSON" defaults to JSON,
	apikey: 'SOMERANDOMKEY', //Your eurekapi api key
	logger: undefined, //A logger function to use defaults to console.log
	timeout: 5000, //Time in milliseconds before timing out the geolocation operation defaults to 3000
});
geoip.getLocation(function (err, data) {
	if (err) {
		console.log('Error', err);
	}
	else {
		console.log('Success', data);
	}
});
```
### Todos
- Add testing and more logger options

License
----

MIT