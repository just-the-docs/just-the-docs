# h1z1-server [![npm version](http://img.shields.io/npm/v/h1z1-server.svg?style=flat)](https://npmjs.org/package/h1z1-server "View this project on npm") [![GitHub license](https://img.shields.io/github/license/quentingruber/h1z1-server.svg)](https://github.com/quentingruber/h1z1-server/blob/master/LICENSE)

[![Discord](https://img.shields.io/discord/707525351357677610.svg?label=&logo=discord&logoColor=ffffff&color=7389D8&labelColor=6A7EC2)](https://discord.gg/RM6jNkj)
  [![Open in Visual Studio Code](https://open.vscode.dev/badges/open-in-vscode.svg)](https://open.vscode.dev/quentinrgruber/h1z1-server)



## Description

Based on the work of @jseidelin on [soe-network](https://github.com/psemu/soe-network),
h1z1-server is a library that emulates an H1Z1: Just Survive server.

## Motivation

A redditor said : "It's just matter of effort and to have enough people of with interest towards having such private servers to the respected game.
I highly doubt that H1Z1 (Just Survive) is one of those."

So we will see :)


## Thanks list

- Thanks to UTIL_TRACELINE for his involvement in the project, the project would not be in this state today without him.

- Thanks to Hax max for his determination and hacking skills :stuck_out_tongue:.

- Thanks to LcplReaper for his interest in the project and the management of the community around the project.

- Thanks to Meme for being an OG/active contributor :smile:.

- Thanks to Avcio for his dedication on gameplay improvement.

- Thanks to Rhett for his interest in the project and his research on the Forgelight engine in general.

- Thanks to Chriis who provided the basis for this project by being the first (as far as I know) to try to emulate servers for h1z1 and who inspired me.

- Thanks to Jacob Seidelin without whom none of this would have been possible.

- Thanks to all those who sent messages of help and support and perpetuated the hope of playing h1z1 again.

## Setup H1Z1

### How to download it

#### Using our custom implementation of DepotDownloader

[Download the latest version of H1DepotDownloader](https://github.com/H1emu/H1DepotDownloader/releases)

#### Using DepotDownloader

Use [DepotDownloader](https://github.com/SteamRE/DepotDownloader) ( only work if you've bought h1z1 )

AppID : 295110 DepotID : 295111 ManifestID : 1930886153446950288

How to use DepotDownloader : https://youtu.be/44HBxzC_RTg

cmd : `.\DepotDownloader.exe -app 295110 -depot 295111 -manifest 1930886153446950288 -username username -password 1234`

### H1Z1 Dependencies

Like all games H1Z1 has C/C++ & DirectX dependencies.

You may already have them but just in case

- VC 2010 Redist

- VC 2015 Redist

- DirectX Jun 2010 Redist

You can download them all [here](https://mega.nz/file/RtwDWJ7b#QYlxpXz_t0_kp7_S8a7whnWsctJ3Fr5B2sQdnuTR9LQ)

### Setup ClientConfig.ini

On the H1Z1 game folder there is a file name "ClientConfig.ini".

Add `sessionid=0` at the beginning of this file.

And change the _Server_ value to the address of your server , probably `localhost:PORT`

### Launch the game

If you have followed the step just above this one, this step is no longer necessary, and you can start the game by double clicking on H1Z1.exe.

Execute this command in CMD/Powershell ( you have to be in your h1z1 game folder ) :

`.\H1Z1.exe sessionid=0 server=localhost:1115`

### Enable Debug log

Since v0.2.3 of h1z1-server the npm package [debug](https://www.npmjs.com/package/debug) is used to make debug logs.

##### examples :

* `set DEBUG=* & node loginserver.js`
* `set DEBUG=ZoneServer & node zoneserver.js`
## Documentations

* https://quentingruber.github.io/h1z1-server/


## Demo

* https://github.com/H1emu/h1emu-launcher/releases/latest

* [h1z1-server-QuickStart](https://github.com/H1emu/h1z1-server-QuickStart) and follow the instructions written in its README

* `npx -p h1z1-server h1z1-server-demo` to try the 2015 server via npx.

* `npx -p h1z1-server h1z1-server-demo-2016` to try the 2016 server via npx.
