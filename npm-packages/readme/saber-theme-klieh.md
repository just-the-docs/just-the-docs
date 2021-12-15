# Saber Theme Klieh

![Screenshot](screenshot.png)

Mimicks a terminal. Access routes via shell-style commands. Currently mostly a technical demo, with more features coming in the future. [Demo](https://saber-theme-klieh.netlify.com), see the `website/` folder for the code.

## Installation

Firstly, [create a new Saber project](https://saber.land/docs/installation.html#creating-a-new-project-from-scratch). Afterwards, install the theme using your preferred package manager.

```bash
npm i saber-theme-klieh
# or using yarn
yarn add saber-theme-klieh
```

Then, in your Saber config file, set the [`theme` option](https://saber.land/docs/saber-config.html#theme) to `klieh`.

## Development

```bash
# Fork this repo, then clone it:
git clone https://github.com/$USER/saber-theme-klieh.git
cd saber-theme-klieh
# create a new branch, commit and open a PR

# to test your changes:
npm link # or yarn link
# navigate back to your Saber project
npm link saber-theme-klieh # or yarn link saber-theme-klieh
# run the dev server, which will now use your local version
saber
```

## Why?

Because it's cool.

## Why the name?

As Mr Moritz erstwhile booted up his mobile computing device at GPN19 in Karlsruhe and was desiring discussion about the most recent developments in command-line interface applications, there was only one option to enunciate this word briefly and without the use of Anglo-Saxon: Klieh - and so, the utmost German expression of CLI, was born. Since then, the usage of Klieh has spread widely and is a beloved and integral part of anyone's day-to-day vocabulary. In 1953 already, it was introduced to the German dictionary Duden, only to be elected as the Youth Slang Word Of the Century one year later. Long live the Klieh!

It's pronounced [`/​cli:/`](https://itinerarium.github.io/phoneme-synthesis/?w=/​cli:/).

**TL;DR**: It's a dumb German pronunciation joke.
