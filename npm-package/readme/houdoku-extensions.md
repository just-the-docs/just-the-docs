# houdoku-extensions

This repository contains extensions for
[Houdoku](https://github.com/xgi/houdoku), a manga reader for the
desktop. Houdoku users can install and load extensions at runtime separate
from the application itself.

Extensions are published as separate npm packages under the @houdoku scope:

- <https://www.npmjs.com/search?q=scope%3Ahoudoku>

## Development

### API

Definitions for functions that extensions should implement are in the
[houdoku-extension-lib repo](https://github.com/xgi/houdoku-extension-lib).

In particular, see the
[interface](https://github.com/xgi/houdoku-extension-lib/blob/master/src/interface.ts)
source, which has full method documentation.

### Building

Utility scripts are provided in `/scripts`:

```bash
# Clean build artifacts
./scripts/clean-all.sh

# Build all extensions (may take a while)
./scripts/build-all.sh

# Build a specific extension
./scripts/build-one.sh guya

# Manually install extensions into Houdoku for testing
#  - unbuilt extensions are automatically skipped
#  - INSTALL_DIR is Houdoku's userData directory,
#    e.g. C:/Users/user/AppData/Roaming/Electron
./scripts/manual-install-all.sh INSTALL_DIR
```

### Dependencies

Because of the way that extensions are loaded while Houdoku is running,
dependency management is rather complex. Each extension must include dependencies (not devDependencies) for any imports they do. In practice,
in order to reduce the size of each extension, we mostly only include type
definitions for packages, and have the actual functions be passed in from
the Houdoku client (like the fetch function from `node-fetch`).

Additions to dependencies are possible, but would require updates at every
layer of the application.

## Related Projects

- [houdoku](https://github.com/xgi/houdoku) - the application itself
- [houdoku-extension-lib](https://github.com/xgi/houdoku-extension-lib) -
  interface library for extensions, used by extensions and the client
- [aki-plugin-manager](https://github.com/xgi/aki-plugin-manager) - the
  utility used by Houdoku to find/install/load extensions, independent of
  Houdoku's functionality

## Extension List

This list is provided as a reference, but it is not updated automatically
and may be out-of-date; the only authoritative source is the
[@houdoku scope on the npm registry](https://www.npmjs.com/search?q=scope%3Ahoudoku).

| Name                  | URL                                   | Version | Language   |
| --------------------- | ------------------------------------- | ------- | ---------- |
| Anata no Motokare     | <https://motokare.xyz>                | 1.0.0   | ENGLISH    |
| Arang Scans           | <https://arangscans.com>              | 1.2.0   | ENGLISH    |
| CatManga              | <https://catmanga.org>                | 1.2.0   | ENGLISH    |
| Death Toll Scans      | <https://www.deathtollscans.net>      | 1.1.0   | ENGLISH    |
| Disaster Scans        | <https://disasterscans.com>           | 1.2.0   | ENGLISH    |
| Guya                  | <https://guya.moe>                    | 1.2.0   | ENGLISH    |
| HNI-SCANTRAD          | <http://hni-scantrad.com>             | 1.0.0   | FRENCH     |
| Hyakuro               | <https://hyakuro.com>                 | 1.0.0   | ENGLISH    |
| Immortal Updates      | <https://immortalupdates.com>         | 1.2.0   | ENGLISH    |
| IsekaiScan            | <https://isekaiscan.com>              | 1.2.0   | ENGLISH    |
| Kirei Cake            | <https://kireicake.com>               | 1.1.0   | ENGLISH    |
| Le Cercle du Scan     | <http://www.lecercleduscan.com>       | 1.0.0   | FRENCH     |
| LectorManga           | <https://lectormanga.com>             | 1.1.1   | SPANISH_ES |
| LetItGo Scans         | <http://letitgo-scans.blogspot.com>   | 1.0.0   | ENGLISH    |
| LeviatanScans         | <https://leviatanscans.com>           | 1.2.0   | ENGLISH    |
| Lilyreader            | <https://manga.smuglo.li>             | 1.1.0   | ENGLISH    |
| Lupi Team             | <https://lupiteam.net>                | 1.0.0   | ITALIAN    |
| Manga347              | <https://manga347.com>                | 1.2.0   | ENGLISH    |
| MangaDex              | <https://mangadex.org>                | 1.2.1   | MULTI      |
| MangaKik              | <https://mangakik.com>                | 1.2.0   | ENGLISH    |
| MangaLife             | <https://manga4life.com>              | 1.1.0   | ENGLISH    |
| Mangarave             | <https://mangarave.com>               | 1.2.0   | ENGLISH    |
| MangaSee              | <https://mangasee123.com>             | 1.1.0   | ENGLISH    |
| MangaTellers          | <https://mangatellers.gr>             | 1.1.0   | ENGLISH    |
| Menudo-Fansub         | <http://www.menudo-fansub.com>        | 1.0.0   | SPANISH_ES |
| NIF Team              | <https://nifteam.info>                | 1.0.0   | ITALIAN    |
| QuegnaTraductionTeam  | <https://qtt.forumcommunity.net>      | 1.0.0   | ITALIAN    |
| Sense-Scans           | <https://www.sensescans.com>          | 1.1.0   | ENGLISH    |
| Silent Sky            | <https://www.silentsky-scans.net>     | 1.1.0   | ENGLISH    |
| Sleeping Knight Scans | <https://skscans.com>                 | 1.2.0   | ENGLISH    |
| The Cat Scans         | <https://thecatscans.com>             | 1.0.0   | ENGLISH    |
| Toonily               | <https://toonily.com>                 | 1.2.0   | ENGLISH    |
| Tortuga Çeviri        | <http://tortugaceviri.com>            | 1.0.0   | TURKISH    |
| Tritinia Scans        | <https://tritinia.com>                | 1.2.0   | ENGLISH    |
| Tutto Anime Manga     | <https://www.tuttoanimemanga.it>      | 1.0.0   | ITALIAN    |
| Yuri-ism              | <https://yuri-ism.com>                | 1.0.0   | ENGLISH    |
| Zandy no Fansub       | <https://zandynofansub.aishiteru.org> | 1.0.0   | ENGLISH    |
