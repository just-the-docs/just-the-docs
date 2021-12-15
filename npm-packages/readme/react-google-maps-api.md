<div>

![logo](https://raw.githubusercontent.com/JustFly1984/react-google-maps-api/master/logo.png)

# @react-google-maps organization root

[![npm package](https://img.shields.io/npm/v/@react-google-maps/api)](https://www.npmjs.com/package/@react-google-maps/api)
[![npm downloads](https://img.shields.io/npm/dt/@react-google-maps/api)](https://www.npmjs.com/package/@react-google-maps/api)
[![npm bundle size](https://img.shields.io/bundlephobia/min/@react-google-maps/api)](https://www.npmjs.com/package/@react-google-maps/api)
[![Join the community on Spectrum](https://withspectrum.github.io/badge/badge.svg)](https://spectrum.chat/react-google-maps)

</div>

## README

For API README please navigate to [https://github.com/JustFly1984/react-google-maps-api/tree/master/packages/react-google-maps-api](https://github.com/JustFly1984/react-google-maps-api/tree/master/packages/react-google-maps-api)

or [https://react-google-maps-api-docs.netlify.app](https://react-google-maps-api-docs.netlify.app)

## For Maintainers

Join our [Slack channel](https://join.slack.com/t/react-google-maps-api/shared_invite/enQtODc5ODU1NTY5MzQ4LTBiNTYzZmY1YmVjYzJhZThkMGU0YzUwZjJkNGJmYjk4YjQyYjZhMDk2YThlZGEzNDc0M2RhNjBmMWE4ZTJiMjQ)

## For Developers and Contributors

### Requirements

- basic git, JavaScript, React knowlwedge
- Google Maps API Key from [Google CLoud Conosle](https://console.cloud.google.com)
- git
- node
- yarn


### To develop localy

Fork original repo at https://github.com/JustFly1984/react-google-maps-api. Clone your fork to local directory of your choice, install dependencies, set up your API Key, and start storybook server. Following commands should do the job:

- `git clone https://github.com/YOUR_USER_NAME/react-google-maps-api.git` - clone your fork
`
- `cd react-google-maps-api` - move to newly created folder
- `cp .storybook/example.maps.config.ts .storybook/maps.config.ts` - create file with API Key
- `yarn install` - install dependencies
- `yarn storybook` - run storybook server

Eny changes you make to src folders of contained packages, should reflect in sotybook server.

### To contribute

Create a feature/fix branch on your own fork and make pull request towards develop branch of the original repo.
