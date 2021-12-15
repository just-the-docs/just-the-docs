# tsc-init

A tool to initialize TypeScript and Webpack in your project.

When starting a TypeScript project, we often repeat the following steps:
* Run _npm init_ to create the package.json file
* Run _tsc --init_ to create a tsconfig.json file
* Add webpack, ts-loader and TypeScript as dev dependencies
* Add Karma, jasmine, Karma-webpack as dev dependencies
* Create a webpack.config.js file to include ts-loader
* Create a karma.conf.js file
* Create a .gitignore file
* Run _git init_
* Add npm scripts for building and bundling

This tool does all of the above in one command, _tsc-init_.

## Installation

Install tsc-init from npm globally
```
npm install tsc-init -g
```

## Usage

Run following command inside your project folder
```
tsc-init
```

It creates or updates the package.json, tsconfig.json webpack.config.js.
It installs webpack, ts-loader and TyprScript packages as dev dependencies.
It also adds two npm scripts that can use to build for dev:
```
npm run dev
```
To start unit tests:
```
npm run test
```
To build for production:
```
npm run build
```


## Contributing

Fork it!

## License

MIT
