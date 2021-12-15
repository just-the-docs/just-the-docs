# NPM Force Resolutions

This packages modifies package-lock.json to force the installation of specific version of a transitive dependency (dependency of dependency), similar to yarn's [selective dependency resolutions](https://yarnpkg.com/lang/en/docs/selective-version-resolutions/), but without having to migrate to yarn.

## WARNING before you start

The use case for this is when there is a security vulnerability and you MUST update a nested dependency otherwise your project would be vulnerable. But this should only be used as a last resource, you should first update your top-level dependencies and file an issue for them to update the vulnerable sub-dependencies (`npm ls <vulnerable dependency>` can help you with that).

# How to use

First add a field `resolutions` with the dependency version you want to fix to your `package.json`, for example:

```json
"resolutions": {
  "hoek": "4.2.1"
}
```

Then add npm-force-resolutions to the preinstall script so that it patches the `package-lock` file before every `npm install` you run:

```json
"scripts": {
  "preinstall": "npx npm-force-resolutions"
}
```

Now just run `npm install` as you would normally do:

```
npm install
```

To confirm that the right version was installed, use:

```
npm ls hoek
```

If your package-lock changes, you may need to run the steps above again.

# Contributing

To build the project from source you'll need to install [clojure](https://clojure.org/guides/getting_started). Then you can run:

```
npm install
npm run build
```
