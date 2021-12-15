# Eureka Dongle (AKA chromecast)

A stupid simple app launcher for your chromecast

## install

`npm install eureka-dongle`

## use

You'll want to pull in `node-ssdp` for your project and use it when creating a new dongle instance.

see `test/find-devices.js` for an example.

### commands

`start`(`app`, `resource`, `callback`) - starts an application

example: `dongle.start('YouTube', 'OoabVM4DokQ', console.log)`

`stop`(`app`) - stops an application

example: `dongle.start('YouTube')`



## Apps

This thing just houses a browser on some form of linux. Many of the applications are available in your desktop browser as well

### YouTube

```javascript

start('youtube', 'OoabVM4DokQ', /* ... */)

```

opens https://www.youtube.com/tv?v=OoabVM4DokQ

### Netflix

TODO

### GoogleMusic

TODO

### PlayMovies

TODO

### TicTacToe

```javascript

start('tictactoe' /* ... */)

```

opens http://www.gstatic.com/eureka/sample/tictactoe/tictactoe.html
