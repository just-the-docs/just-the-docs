# roblox-js

[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square)](https://github.com/Flet/semistandard)
[![ROBLOX API Discord](https://img.shields.io/badge/discord-roblox%20api%20chat-blue.svg?style=flat-square)](https://discord.gg/EDXNdAT)

[![NPM](https://nodei.co/npm/roblox-js.png)](http://npmjs.com/package/roblox-js)

*Execute ROBLOX website actions in node.js*

## About

Roblox-js is a node module that provides an interface for [ROBLOX](http://www.roblox.com) site actions, mostly for use with their HttpService feature.

Most functions are related to group service but there are other general functions as well. The list of main functions is in the contents section, they all have detailed documentation.

To use this with HttpService simply set up API's on your node server for accessing the functions, you can use the example server outlined in the below example server section as a base. Note that this does not use the latest version of the module and it is recommended you learn how to use the library directly.

There are also a few example scripts with version 3 support in the [examples](https://github.com/sentanos/roblox-js/tree/master/examples) folder.

## Prerequisites

- [**node.js**](https://nodejs.org/en/download/current/)

## Installation

With node.js installed simply run: `npm install roblox-js`. That's it!

## Documentation

You can find the roblox-js wiki with all API documentation [here](https://github.com/sentanos/roblox-js/wiki).

## Example Server

A usable express server utilizing this module is available [here](https://github.com/sentanos/roblox-js-server) and includes a detailed tutorial for setup on a free host as well as Lua scripts for sending requests to the server from in-game.
