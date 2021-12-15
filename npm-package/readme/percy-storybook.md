# @percy/storybook
[![Version](https://img.shields.io/npm/v/@percy/storybook.svg)](https://npmjs.org/package/@percy/storybook)
![Test](https://github.com/percy/percy-storybook/workflows/Test/badge.svg)

[Percy](https://percy.io) visual testing for [Storybook](https://storybook.js.org).

## Installation

``` session
$ npm install --save-dev @percy/cli @percy/storybook
```

## Usage

<details>
  <summary>
    Before running the following commands, make sure your project's <code>PERCY_TOKEN</code>
    is properly configured.
  </summary>

  ``` sh
  # Unix
  $ export PERCY_TOKEN="<your-project-token>"

  # Windows
  $ set PERCY_TOKEN="<your-project-token>"

  # Powershell
  $ $Env:PERCY_TOKEN="<your-project-token>"
  ```
</details>

With a static Storybook build:

``` sh
$ percy storybook ./storybook-build
```

With a local or live Storybook URL:

``` sh
$ percy storybook http://localhost:9009
$ percy storybook https://storybook.foobar.com
```

Automatically run `start-storybook`:

``` sh
$ percy storybook:start --port=9009 --static-dir=./public
```

#### CLI options:

``` sh
-c, --config=config                              percy configuration file path
-d, --dry-run                                    prints a list of stories to snapshot without snapshotting
-i, --include=include                            pattern matching story names to only include for snapshotting
-e, --exclude=exclude                            pattern matching story names to always exclude from snapshotting
-h, --allowed-hostname=allowed-hostname          asset discovery allowed hostnames
-t, --network-idle-timeout=network-idle-timeout  asset discovery idle timeout
--disable-cache                                  disable asset discovery caches
-q, --quiet                                      log errors only
-v, --verbose                                    log everything
--silent                                         log nothing
```

## Configuration

[Storybook parameters](https://storybook.js.org/docs/react/writing-stories/parameters) are a set of static,
named metadata about a story, used to control the behavior of Storybook features and addons. The `percy`
parameter can be provided to add per-snapshot configuration options to a story or set of stories.
  
``` javascript
// individual stories
MyStory.parameters = {
  percy: { ... }
};
```
``` javascript
// .storybook/preview.js
export const parameters = {
  percy: { ... }
};
```
  
The following `percy` Storybook parameters are accepted in addition to [common per-snapshot 
options](https://docs.percy.io/docs/cli-configuration#per-snapshot-configuration):

- **skip** - Boolean indicating whether or not to skip this story.
- **name** - Snapshot name. (default: `${story.kind}: ${story.name}`)
- **args** - [Story args](https://storybook.js.org/docs/react/writing-stories/args) to use when snapshotting.
- **queryParams** - Query parameters to use when snapshotting.
- **waitForTimeout** - Wait for a timeout before taking the snapshot.
- **waitForSelector** - Wait for a selector to exist before taking the snapshot.
- **include** - An array of regex patterns matching story names to only include for snapshotting.
- **exclude** - An array of regex patterns matching story names to always exclude from snapshotting.
- **additionalSnapshots** - An array of additional snapshots to take of this story.
  - **prefix** - A prefix added to this additional snapshot's name.
  - **suffix** - A suffix added to this additional snapshot's name.
  - **name** - Snapshot name. Replaces the inherited name.
  - **args** - Additional story args for this additional snapshot.
  - **queryParams** - Additional query parameters for this additional snapshot.
  - **include** - Only apply the additional snapshot to matching stories.
  - **exclude** - Do not apply the additional snapshot to matching stories.

<details>
  <summary>Click to see an example story configuration</summary><br>

  ``` javascript
  MyStory.parameters = {
    percy: {
      name: 'My snapshot',
      additionalSnapshots: [
        { prefix: '[Dark mode] ', args: { colorScheme: 'dark' } },
        { suffix: ' with a search', queryParams: { search: 'foobar' } }
      ]
    }
  };
  ```

  With this example, 3 snapshots will be taken of this story with args and query params appended
  to the URL of each snapshot:

  ``` sh
  # --dry-run will log snapshots without creating a new build
  # --verbose will show debug logs, including the snapshot url
  $ percy storybook --dry-run --verbose ./example-storybook
  # ...
  [percy] Snapshot found: My snapshot
  [percy] -> url: [...]?id=component--my-story
  [percy] Snapshot found: [Dark mode] My snapshot
  [percy] -> url: [...]?id=component--my-story&args=colorScheme:dark
  [percy] Snapshot found: My snapshot with a search
  [percy] -> url: [...]?id=component--my-story&search=foobar
  ```
</details>

## Percy config file options

In addition to [common Percy config file options](https://docs.percy.io/docs/cli-configuration),
this SDK also adds the following Storybook specific options:

``` yaml
# .percy.yml
version: 2
storybook:
  args: {}
  queryParams: {}
  waitForTimeout: 0
  waitForSelector: ''
  additionalSnapshots: []
  include: []
  exclude: []
```

See the [configuration options above](#configuration) for details about each accepted config file
option (**note**: the `skip` and `name` parameters are _not_ accepted as Percy config file options).

## Upgrading

Prior versions of the Storybook SDK were drastically different than the current version. The
command, it's arguments, and how the SDK works internally have changed completely. Using the old
command with new versions will now result in an error message. The new command is now integrated into
[`@percy/cli`](https://github.com/percy/cli) as a plugin.

To use new versions of this SDK, you will have to also install the CLI with the SDK:

``` sh
$ npm install --save-dev @percy/cli @percy/storybook
```

Since both the command and arguments have changed, you'll need to replace your existing usage with
the [new usage described above](#usage). For some projects, this may require setting additional 
[configuration options](#configuration). See the list of breaking changes below for details.

### Breaking changes

Most importantly, the command itself has changed and all previous arguments are no longer accepted.
  
- The `percy-storybook` command has been replaced with a [`percy` CLI](https://github.com/percy/cli) 
  subcommand, `percy storybook`.

- The previous `--build_dir` flag is now a command argument and there is no default build directory. If
  you relied on the default, it must now be explicitly provided.

  ``` sh
  # before
  $ percy-storybook
  # after
  $ percy storybook ./storybook-static

  # before
  $ percy-storybook --build_dir ./build
  # after
  $ percy storybook ./build
  ```

- The `--widths` flag is no longer accepted. Widths can be set using the respective `widths`
  [Percy config file `snapshot` option](https://docs.percy.io/docs/cli-configuration#snapshot) or 
  `percy` Storybook parameter.

- The `--minimum_height` flag is no longer accepted and therefore no longer defaults to
  800px. The default minimum height shared by all SDKs is 1024px. The minimum height can be 
  set using the respective `min-height` [Percy config file `snapshot`
  option](https://docs.percy.io/docs/cli-configuration#snapshot) or `percy` Storybook parameter.

- The `--debug` flag is now `--verbose`, inherited from the CLI.

- The `--output-format` flag is no longer accepted and has no alternative. If you relied on this
  flag, please open an issue.

- The `--rtl` and `--rtl_regex` flags are no longer accepted. The `--rtl` flag duplicated stories
  and set the `direction=rtl` query parameter for the duplicate's URL. The `--rtl_regex` flag was
  used to determine when to create this RTL duplicate story.

  <details>
    <summary>Click here to see how to replicate the old behaviour with new configuration
    options</summary><br>

    ``` js
    // .storybook/preview.js

    export const parameters = {
      percy: {
        // tell percy to take an additional RTL snapshot for matching stories
        additionalSnapshots: [{
          suffix: ' [RTL]',
          queryParams: { direction: 'rtl' },
          include: ['^FormElement: .*']
        }]
      }
    };
    ```
  </details>

#### Performance

The old SDK did not take DOM snapshots or perform asset discovery, as all other modern Percy SDKs
do. This sometimes resulted in flakey snapshots or snapshots with missing assets. However, DOM
snapshots and asset discovery add an overhead cost of performance. Where the old SDK was very quick
to simply upload the local build directory, the new SDK can be a little slower while it is capturing
the real DOM and relevant assets of each story.

#### Unexpected diffs

Because the old SDK did not take DOM snapshots, JavaScript had to be enabled in our rendering
environment for Storybook to properly load. This is in contrast to all of our other SDKs, where
JavaScript is disabled by default to prevent flakey diffs caused by animations or other JavaScript
running on the page. With the new SDK and real DOM snapshots, JS is disabled by default. If you
upgrade and experience diffs due to the lack of JavaScript, it can be re-enabled using the matching
Percy config file or per-snapshot option, [`enableJavaScript`](https://docs.percy.io/docs/cli-configuration#snapshot).
