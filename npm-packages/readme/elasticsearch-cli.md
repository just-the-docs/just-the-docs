# elasticsearch-cli

[![build status](https://secure.travis-ci.org/confuser/elasticsearch-cli.png)](http://travis-ci.org/confuser/elasticsearch-cli)
[![Coverage Status](https://coveralls.io/repos/confuser/elasticsearch-cli/badge.png?branch=master)](https://coveralls.io/r/confuser/elasticsearch-cli?branch=master)


Utility CLI to help manage Elasticsearch, supports AWS IAM user

## Installation

```
npm install -g elasticsearch-cli
```

## Usage
```
elasticsearch --help

Usage: elasticsearch [options] [command]


  Commands:

    template|t <operation> [template] [file/data]  Template operations
    index|i <operation> [name] [file/data]         Index operations

  Options:

    -h, --help                     output usage information
    -V, --version                  output the version number
    --host <url>                   Host
    --log <level>                  Set the log level
    --ar, --aws-region <region>    AWS Region
    --aak, --aws-access-key <key>  AWS Access Key
    --ask, --aws-secret-key <key>  AWS Secret Key
    --api                          Elasticsearch API version
    --no-update-notifier           Do not check for updates for the CLI
```

## Supported operations
* Index/indices, create, get, delete
* Index Template, create, get, update, delete

Found something not here, open an issue!

## Examples

Retrieve a template
```
elasticsearch --host http://localhost:9200 template users_1
elasticsearch --host https://your-search-domain.es.amazonaws.com --ar us-east-1 --aak aws-access-key --ask aws-secret-key template users_1
```

Update an existing template
```
elasticsearch --host http://localhost:9200 template update users_1 ../users_1.json
elasticsearch --host http://localhost:9200 template update users_1 '{ "template": "users*", "mappings": { } }'
```
