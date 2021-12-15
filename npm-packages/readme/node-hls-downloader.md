### [HLS Downloader](https://github.com/warren-bank/node-hls-downloader)

Command-line utility for downloading an offline copy of an HLS video stream.

#### Installation:

```bash
npm install --global @warren-bank/node-hls-downloader
```

#### Features:

* interactive command-line interface (CLI)
  * prompts for URL of the master manifest
    * when not given as a CLI option
  * prompts for video resolution
    * when multiple video streams are available in the master manifest
    * when not filtered by a CLI option
  * prompts for audio stream
    * when multiple are available in the group ID associated with the chosen video stream
    * when not filtered by a CLI option
  * prompts for subtitles stream
    * when multiple are available in the group ID associated with the chosen video stream
    * when not filtered by a CLI option
* resulting file structure:
  ```bash
    |- video/
    |  |- *.ts
    |- audio/
    |  |- {language}/
    |  |  |- *.ts
    |  |- {language}.m3u8
    |- subtitles/
    |  |- {language}/
    |  |  |- *.vtt
    |  |- {language}.m3u8
    |- video.m3u8
    |- master.m3u8
  ```

#### Limitations:

* only works with static (ie: _not_ live stream) playlists,<br>which include a complete list of all:
  * video segments
  * audio segments
  * subtitle segments
  * encryption keys

#### Usage:

```bash
hlsdl <options>

options:
========
"-h"
"--help"
    Print a help message describing all command-line options.

"-V"
"--version"
    Display the version.

"-u" <URL>
"--url" <URL>
    Specify the URL of master manifest.

"-ncc"
"--no-check-certificate"
    Do not check HTTPS TLS/SSL certificates.

"-nc"
"--no-clobber"
    Do not allow output to overwrite existing data.
    Run an initial check before any downloading occurs, and exit with a warning if a collision is detected.

"-c"
"--continue"
   Do not reinitialize output directories (ie: recursively delete).
   Rather, reuse the existing directories and leave file contents unaltered.
   Run a check before each download, and skip if the data file already exists in the output directory.

"-mc" <integer>
"--max-concurrency" <integer>
"--threads" <integer>
    Specify the maximum number of URLs to download in parallel.
    The default is 1, which processes the download queue sequentially.

"-P" <dirpath>
"--directory-prefix" <dirpath>
    Specifies the directory where the resulting file structure will be saved to.
    The default is "." (the current directory).

"-sv"
"--skip-video"
    Skip processing of the video manifest.
    Do not download video data segments, or save a local video manifest.

"-sa"
"--skip-audio"
    Skip processing of all matching audio manifests.
    Do not download audio data segments, or save local audio manifest(s).

"-ss"
"--skip-subtitles"
    Skip processing of all matching subtitles manifests.
    Do not download subtitles data segments, or save local subtitles manifest(s).

"-minb" <integer>
"--min-bandwidth" <integer>
    Exclude video streams having a bandwidth less than this value.

"-maxb" <integer>
"--max-bandwidth" <integer>
    Exclude video streams having a bandwidth greater than this value.

"-hq"
"--highest-quality"
    Download the highest quality video stream without any user interaction.
    Does not include video streams filtered by min/max bandwidth restrictions.

"-lq"
"--lowest-quality"
    Download the lowest quality video stream without any user interaction.
    Does not include video streams filtered by min/max bandwidth restrictions.

"-aa"
"--all-audio"
    Download all audio streams in the group ID associated with the chosen video stream.

"-as"
"--all-subtitles"
    Download all subtitle streams in the group ID associated with the chosen video stream.

"-fa" <regex>
"--filter-audio" <regex>
    Download all audio streams in the group ID associated with the chosen video stream,
    having a name that matches this case-insensitive regular expression pattern.

"-fs" <regex>
"--filter-subtitles" <regex>
    Download all subtitle streams in the group ID associated with the chosen video stream,
    having a name that matches this case-insensitive regular expression pattern.

"--mp4" <filepath>
    Indicates that "ffmpeg" should be used to bundle the downloaded video stream into an .mp4 file container.
    Specifies where the resulting .mp4 file will be saved.
    Does not modify audio/video encoding.
    Each subtitles stream is converted to an .srt file, and saved in the same directory as the .mp4 file.
```

#### Example:

* [this test script](https://github.com/warren-bank/node-hls-downloader/blob/master/tests/run.sh) is a good introduction

#### Requirements:

* Node version: v6.13.0 (and higher)
  * [ES6 support](http://node.green/)
    * v0.12.18+: Promise
    * v0.12.18+: Set
    * v4.08.03+: Object shorthand methods
    * v5.12.00+: spread operator
    * v6.04.00+: Proxy constructor
    * v6.04.00+: Proxy 'apply' handler
    * v6.04.00+: Reflect.apply
  * [URL](https://nodejs.org/api/url.html)
    * v6.13.00+: [Browser-compatible URL class](https://nodejs.org/api/url.html#url_class_url)
  * tested in:
    * v7.9.0
* FFmpeg
  * only required in `PATH` when using the `--mp4` CLI option
    * successfully tested with version: 4.1.3

#### Legal:

* copyright: [Warren Bank](https://github.com/warren-bank)
* license: [GPL-2.0](https://www.gnu.org/licenses/old-licenses/gpl-2.0.txt)
