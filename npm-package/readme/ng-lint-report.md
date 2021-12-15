# ng-lint-report
Generates HTML report for angular lint JSON output

# Install

```sh
npm install --save-dev ng-lint-report
```

# Setup

In ``package.json`` add following scripts

```json
{
    "scripts": {
        "lint": "ng lint --format json --silent > jsonOutput.json",
        "report": "ng-lint-report --jsonfile jsonOutput.json",
        "ng-lint": "npm run lint && npm run report"
    }
}
```

In command line run following script command:

```sh
npm run ng-lint
```

# Options

```
--jsonfile : JSON file path in current root directory
--output   : Output folder name or path [defaults to "ng-lint-report"]
--filename : Output file name [defaults to "report.html"]
```
