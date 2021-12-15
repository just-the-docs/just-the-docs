# [DiscordDJ](http://guichaguri.github.io/DiscordDJ/)
Discord DJ Bot. Let you play music in your server. Inspired by PlugDJ

**NEWS** DiscordDJ is being totally recoded! Check [here](https://github.com/Guichaguri/DiscordDJ/projects/1) for the progress

## Features
*   Play a video or playlist from YouTube
*   Play a track or set from Soundcloud
*   Play a track or playlist from Spotify
*   Play a stream from Icecast/Shoutcast/Radionomy
*   Play audio and video files
*   Play a playlist file
*   Full control over the behavior with **Components**
*   Built on its own API wrapper for a faster experience
*   Open Source
*   Developer API (Soon, you will be able to implement your own components, playables, playlists, encoders and decoders)

## Optional Modules
Most of the modules below require node-gyp, which is known for causing problems mainly on Windows, that's why they're optional
* `musicmetadata`: For reading file metadata
* `lame`: For native mp3 decoding (no FFmpeg/avconv needed)
* `node-chiptune`: For decoding tracker music
* `node-opus`: For faster Opus encoding
* `sodium`: For faster audio encryption
* `bufferutil`: For faster WebSockets
* `utf-8-validate`: For faster WebSockets
