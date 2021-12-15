# ytdl-core-discord

[![Build Status](https://travis-ci.org/amishshah/ytdl-core-discord.svg?branch=master)](https://travis-ci.org/amishshah/ytdl-core-discord)
[![dependencies](https://david-dm.org/amishshah/ytdl-core-discord/status.svg)](https://david-dm.org/amishshah/ytdl-core-discord)
[![npm](https://img.shields.io/npm/dt/ytdl-core-discord.svg)](https://www.npmjs.com/package/ytdl-core-discord)
[![Patreon](https://img.shields.io/badge/donate-patreon-F96854.svg)](https://www.patreon.com/discordjs)

A [ytdl-core](https://github.com/fent/node-ytdl-core/) wrapper focused on efficiency for use in Discord music bots.

You can pass the exact same arguments as you would with the ytdl-core module, with the exception that
you must `await` the function call.  

## What does it do?

For compatible videos, this module uses [prism-media](https://github.com/amishshah/prism-media)
to extract Opus audio from a stream without having to pipe it through FFmpeg first. This greatly
reduces the processing power required, making playback smoother and allowing you to play over
more connections simultaneously.

For videos where the required codec (webm + opus) isn't available, the module will fallback to
using FFmpeg to encode the stream in Opus. Many new videos on YouTube are available in this codec
so hopefully this isn't frequent.

Put simply, this module finds the most efficient way to extract a stream of Opus audio from a
YouTube video. Even in the worst case, it should still give better performance than `ytdl-core`.

## Usage in Discord.js 12.x

```js
const ytdl = require('ytdl-core-discord');

async function play(connection, url) {
  connection.play(await ytdl(url), { type: 'opus' });
}
```

## Usage in Discord.js 11.4.x

```js
const ytdl = require('ytdl-core-discord');

async function play(connection, url) {
  connection.playOpusStream(await ytdl(url));
}
```

[![Patreon](https://c5.patreon.com/external/logo/become_a_patron_button.png)](https://www.patreon.com/discordjs)