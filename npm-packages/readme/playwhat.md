# playwhat

Ask MPD what is playing.

## Install
npm install -g playwhat

## Usage

### Basic usage
```bash
$ playwhat -h 192.168.1.2

{"file":"spotify:track:3TqvGInqPf6G696Ivi8Hqb","Time":"90","Artist":"The Dead Trees","Title":"Slow Faze Fast","Album":"Whatwave","Date":"2011","Track":"2","Pos":"117","Id":"1095","AlbumArtist":"The Dead Trees"}
```

### Format output
```bash
$ playwhat -f "%a - %t (%d)"

Bajka, Bonobo - Days To Come (2006)
```

| argument | description |
| -------- | ----------- |
| %a | Artist |
| %l | Album |
| %t | Title |
| %n | Track number |
| %T | Time |
| %d | Date |

