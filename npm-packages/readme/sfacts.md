[![Build Status](https://travis-ci.org/superscriptjs/sfacts.svg?branch=master)](https://travis-ci.org/superscriptjs/sfacts)
[![Coverage Status](https://coveralls.io/repos/github/superscriptjs/sfacts/badge.svg?branch=master)](https://coveralls.io/github/superscriptjs/sfacts?branch=master)
[![Code Climate](https://codeclimate.com/github/superscriptjs/sfacts/badges/gpa.svg)](https://codeclimate.com/github/superscriptjs/sfacts)

# sfacts - Scripted Facts

This library reads in table and topic data into tuples for use in SuperScript. It uses the [LevelUp](https://github.com/Level/levelup) interface alongside [MongoDown](https://github.com/watson/mongodown) as a backing store.

sfacts supports ChatScript tables and topics.

Note: Before v1.0.0, sfacts used to write to the filesystem using LevelDB. It now writes to MongoDB, to facilitate scaling of SuperScript.

## API

* `clean(dbName, callback)`
* `create(dbName, clean, callback)`
* `load(dbName, files, clean, callback)`

The boolean parameter `clean` in the `create` and `load` methods wipes the existing database if it exists, before creating a new one.

Note: The methods pre-v1.0.0 `db` and `expand` are no longer available. The function signatures `create` and `load` have changed, and now are required to be called asynchronously (i.e. has a callback parameter).

The return value of `create` and `load` is an object:

* `conceptToList(term, [depth,] callback)`
* `createUserDB(dbName)`
* `createUserDBWithData(dbName, files, callback)`
* `db`
* `findParentConcepts(term, callback)`
* `level`
* `loadFiles(files, callback)`

Note: The method pre-v1.0.0 `loadFile` is now named `loadFiles`. Its behavior is exactly the same.
