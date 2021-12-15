[![Docker](https://github.com/rollem-discord/rollem-discord/actions/workflows/dockerpublish.yml/badge.svg)](https://github.com/rollem-discord/rollem-discord/actions/workflows/dockerpublish.yml)
[![CI Syntax](https://github.com/rollem-discord/rollem-discord/actions/workflows/ci-syntax.yml/badge.svg)](https://github.com/rollem-discord/rollem-discord/actions/workflows/ci-syntax.yml)

# Rollem for Discord

A feature-filled dicebot that allows you to just roll.

[Add this bot to your server.](https://discordapp.com/oauth2/authorize?client_id=240732567744151553&scope=bot&permissions=68608)

[View the change log.](CHANGELOG.md) (or type `@rollem changelog` in chat)

## Beta Channel (Rollem Next)

Changes will be vetted in the beta channel before being moved to the main bot.

You may have both Rollem Next and Rollem active in the same server, but they should not be allowed in the same channels.

[Add the beta bot to your server.]( https://discordapp.com/oauth2/authorize?client_id=840409146738475028&scope=bot&permissions=68608)

## Links

* [Patreon](https://patreon.com/david_does)
* [Rollem Support Server](https://discord.gg/VhYX9u7)
* [Issues Tracker](https://github.com/rollem-discord/rollem-discord/issues)

# How to use this bot

Just roll.

> **@you:** 4d6  
> **@rollem:** @you, 17 ⟵ [6, 5, 3, 3]4d6

> **@you:** 4d6 for glory  
> **@rollem:** @you, 'for glory', 17 ⟵ [6, 5, 3, 3]4d6

Inline rolls.

> **@you:** Rolling [4d6] for glory  
> **@rollem:** @you, 17 ⟵ [**6**, 5, 3, 3]4d6

> **@you:** Rolling [4d6 for glory]  
> **@rollem:** @you, 'for glory', 17 ⟵ [**6**, 5, 3, 3]4d6

Repeated rolls.

> **@you:** 3#d20  
> **@rollem:** @you,  
> 20 ⟵ [**20**]1d20  
> 13 ⟵ [13]1d20  
> 11 ⟵ [11]1d20

Stat generation.

> **@you:** 6#4d6d1  
> **@rollem:** @you,  
> 12 ⟵ [**6**, 3, 3, ~~2~~ ]4d6dl1  
> 6 ⟵ [2, 2, 2, ~~**1**~~ ]4d6dl1  
> 13 ⟵ [5, 5, 3, ~~2~~ ]4d6dl1  
> 10 ⟵ [5, 3, 2, ~~2~~ ]4d6dl1  
> 13 ⟵ [**6**, 5, 2, ~~**1**~~ ]4d6dl1  
> 15 ⟵ [**6**, **6**, 3, ~~3~~ ]4d6dl1

Math.

> **@you:** &50+50  
> **@rollem:** @you, 100 ⟵ 50 + 50

> **@you:** r50+50  
> **@rollem:** @you, 100 ⟵ 50 + 50

## Dice Syntax

X/Y/Z are integers. A and B are arbitrary Expressions.

| Syntax            |                                                                                                                                                          |
|-------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|
| `XdY`             | Rolls X dice of Y size. `4d6` rolls 4 six-sided dice.                                                                                                    |
| `dY`              | Rolls a single die of Y size.                                                                                                                            |
| `dY!` `XdY!`      | Exploding dice. Rolling Y on a Y-sided die grants an additional die roll.                                                                                |
| `dY!Z` `XdY!Z`    | Exploding dice. Rolling Z or above on a Y-sided die grants an additional die roll.                                                                       |
| `XdYns` `XdY!ns`  | Disable dice sorting.                                                                                                                                    |
| `A+B` `A-B`       | Arbitrary chains of addition and subtraction.                                                                                                            |
| `A*B` `A/B`       | Arbitrary chains of multiplication and division.                                                                                                         |
| `A++B` `A--B`     | Arbitrary chains of per-die addition and subtraction. Each value modifies each individual die roll. `4d6--2` rolls 4d6 with 2 subtracted from each.      |
| `(E)`             | Parenthetic expressions                                                                                                                                  |
| `A<<B`            | Counts the quantity of values in A that are lower than or equal to the value B. `10d6 << 3` counts the number of dice at 3 or below.                     |
| `A>>B`            | Counts the quantity of values in A that are greater than or equal to the value B. `10d6 >>4` counts the number of dice at 4 or above.                    |
| `A<B` `A>=B`      | Equality comparison on A and B. Must be the last operator (`(1 < 2) * 5` is invalid, `1 < (2 * 5)` is valid). Supported operators: `<` `<=` `>` `>=` `=` |
| `BX` `GX` `WX`    | Burning Wheel notation. Aliased to `Xd6 >> Y` where Y is determined by B/G/W. B=4, G=3, W=2.                                                             |
| `BX!` `GX!` `WX!` | Burning Wheel open roll notation. Aliased to `Xd6! >> Y` where Y is determined by B/G/W. B=4, G=3, W=2.                                                  |
| `dF` `XdF`        | Fate Dice notation. Rolls dice with values of -1, 0, 1. Represented by `-`, `0`, and `+`.                                                                |
| `XdYns`           | No Sort. Does not sort the result of `XdY` in the output.                                                                                                |
| `X#A`             | Evaluates the expression A X times. Use for stat generation: `6#4d6d1`                                                                                   |
| `dYdZ` `XdYdZ`    | Drop dice notation. Drops the *lowest* Z dice from the result of `XdY`. Alias for `XdYdlZ`. May be used with `ns` and `!`.                               |
| `dYdlZ` `XdYdlZ`  | Drop dice notation. Drops the *lowest* Z dice from the result of `XdY`. May be used with `ns` and `!`.                                                   |
| `dYdhZ` `XdYdhZ`  | Drop dice notation. Drops the *highest* Z dice from the result of `XdY`. May be used with `ns` and `!`.                                                  |
| `dYkZ` `XdYkZ`    | Keep dice notation. Keeps the *highest* Z dice from the result of `XdY`. Alias for `XdYkhZ`. May be used with `ns` and `!`.                              |
| `dYkZ` `XdYkZ`    | Keep dice notation. Keeps the *highest* Z dice from the result of `XdY`. May be used with `ns` and `!`.                                                  |
| `dYklZ` `XdYklZ`  | Keep dice notation. Keeps the *lowest* Z dice from the result of `XdY`. May be used with `ns` and `!`.                                                   |
| `dYcZ` `XdYcZ`    | Critrange notation. Bolds all rolls greater than or equal to Z. Cannot be used with keep or drop notations.                                              |
| `2dYdaro` `3dYtaro` `XdYaro` | Doubles/Triples/All-Same And Roll Over notation. "Explodes" when all dice match. Used for Tunnels and Trolls.                                 |

## Limitations
* Rollem will not roll more than 100 dice.
* Rollem will not roll "one-sided" dice.
* Rollem will not roll single numbers.
* Pure math must be prefixed with `&` or `r`.
* Rolls prefixed with `N#` will be rolled `N` times. N > 100 will be ignored.

## Prefixing
Give Rollem a role of `rollem:prefix:<your prefix here>` to disable no-prefix rolling.

With this role:
* Rollem will still roll lines prefixed with `&` or `r`
* Rollem will still roll lines addressed to him. `@Rollem 2d20`
* Rollem will still roll inline syntax `swing the sword [2d20 for justice]`
* Rollem with not aggressively parse lines `2d20 for justice`
* Rollem will aggressively parse lines prefixed with `<your prefix here>`

## Preview Syntaxes
Give Rollem one of the following roles to enable different versions of the syntax for an entire guild:
- `rollem:beta` - use the unstable preview syntax for v1
- `rollem:v2` - use the in-development v2 syntax

Give a user one of the following roles to enable different versions of the syntax for that specific user (this overrides the above):
- `rollem:v1` - use the stable v1 syntax
- `rollem:beta` - use the unstable preview syntax for v1
- `rollem:v2` - use the in-development v2 syntax

## Commands

All commands are performed by mentioning `@rollem` in server chat, and without prefix in private chat.

| Command                                      | Example                  | Purpose                                      |
|----------------------------------------------|--------------------------|----------------------------------------------|
| `stats`, `help`                              | `@rollem stats`          | Dump stats, uptime and credit.               |
| `storage dump`                               | `@rollem storage dump`   | View everything we know about you.           |
| `storage forget`                             | `@rollem storage forget` | Have us delete everything we know about you. |
| `changelog`, `changes`, `change log`, `diff` | `@rollem changelog`      | View the most recent changelog entries.      |

# Development
## First-time setup
1. Set up [yarn](https://yarnpkg.com/en/)
2. You will need an app bot user token from [discord's applications page](https://discordapp.com/developers/applications/me) 
3. Rename and update `./secrets/sample-vscode.env`
  * You will need to replace `YOUR_TOKEN_HERE` with an app bot user token from [discord's applications page](https://discordapp.com/developers/applications/me)
  * The Application Insights line may be deleted to switch to console-only logging.

### Run Bot From VSCode (with debugging)
1. Rename and update `./secrets/sample-vscode.env`
2. Link packages with `yarn bootstrap`
3. Build with one of:
  * `yarn build:bot`
  * `yarn watch:bot` and allow it to idle in the background
4. Press F5 while the project folder is open. Launch configuration is in `.vscode/launch.json`

### Run Single Shard
1. Rename and update `./secrets/sample-vscode.env`
2. Run `yarn bootstrap`
3. Build with one of:
  * `yarn build:bot`
  * `yarn watch:bot` and allow it to idle in the background
4. Run `yarn run start:bot`

## Running Single Shard in Docker
1. `yarn run package:bot` (The container will compile it)
2. `yarn run package:bot:start`

### Language Development
Current version of the language is in `packages/language/src/rollem-language-2`.
1. `cd` into `packages/language`
2. Run `yarn watch` in one terminal
3. Run `yarn watch:test` in another terminal
4. Modify any file under `packages/language`
5. Test output is for `src/rollem-language-2/rollem.pegjs`

## ~~Local Kubernetes Development~~
These are incomplete and are a massive pain on Windows anyway.

1. Setup Minkube
  * [Windows-specific instructions](https://docs.docker.com/docker-for-windows/#switch-between-windows-and-linux-containers))
  * [General instructions](https://kubernetes.io/docs/tasks/tools/install-minikube/)
2. `minikube start` (may need to restart VSCode or your terminal first for it to find the command)
3. `kubectl cluter-info` confirm it's working
4. `minikube dashboard` open the dashboard
5. `eval $(minikube docker-env)` to setup for local running
6. `docker-machine create --driver virtualbox default` to get docker going on virtualbox
7. `docker build -t rollem-discord .` to build the current docker image

## Deploying the Bot

* [rollem-discord on docker hub](https://hub.docker.com/r/lemtzas/rollem-discord/).
* Set the `DISCORD_BOT_USER_TOKEN` environment variable to your token from [discord's applications page](https://discordapp.com/developers/applications/me).
* The docker hub will automatically update with the latest commits on `master`.

## Publishing

Run one of the following; Follow [semver](http://semver.org/):
* `yarn publish:major`
* `yarn publish:minor`
* `yarn publish:patch`

## Some useful links

* [language-pegjs for atom](https://github.com/atom/language-pegjs)  
* [pegjs online](http://pegjs.org/online)
* [pegjs documentation](http://pegjs.org/documentation)
* [discord.js](https://github.com/hydrabolt/discord.js/)
* [discord.js docs](http://discord.js.org/#!/docs/tag/master)
* [discord API docs](https://discordapp.com/developers/docs/intro)

## Some useful commands

**Change image:**

```sh
curl --request PATCH --header "Authorization: Bot {TOKEN HERE}" -H "Content-Type: application/json" --data '{ "avatar": "{BASE-64 HTML EMBED HERE}" }' https://discordapp.com/api/users/@me
```

```sh
(echo -n '{ "avatar":"'; base64 -w 0 {FILENAME HERE}; echo '" }') | curl --request PATCH --header "Authorization: Bot {TOKEN HERE}" -H "Content-Type: application/json" -d @- https://discordapp.com/api/users/@me
```

# Credits

Avatar by Kagura on Charisma Bonus.

![](rollem-media/kagura1-512.png)

# License: MIT

Copyright (c) 2018 David Sharer

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
