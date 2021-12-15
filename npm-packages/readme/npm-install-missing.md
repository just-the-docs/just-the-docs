npm-install-missing
===================

An NPM module to reinstall missing dependencies.

[![Build Status](https://travis-ci.org/AlexCline/npm-install-missing.png?branch=master)](https://travis-ci.org/AlexCline/npm-install-missing)

I created this module after working on a project where deployments were failing due to missing module dependencies.  An `npm install` would fail to install the required dependencies for an unknown reason and without error.  Since `npm install` succeeds without error, there wasn't a way to tell if the dependency installation failed.

When running `npm install` for a second time on a project, npm will check the first level of modules to ensure they're installed, but not traverse the dependency tree to ensure all sub-module dependencies are installed.  You can run `npm outdated` to check if modules are missing but npm won't install them for you.

This module combines `npm outdated` and `npm install` to install all missing dependencies within the dependency tree.


Installation
------------
To be able to use this tool system-wide to install missing dependencies for all your node projects, install it globally.

    npm install -g npm-install-missing


Usage
-----
Within your project directory:

    npm-install-missing
    
The script will check the current project directory for missing dependencies and install them automatically.


Dependencies
------------
This module depends on the following modules:

* async
* npm


Testing
-------
To install the devDependencies and run the test framework:

    cd npm-install-missing
    npm install
    npm test


Support
-------
Please file tickets and issues using [GitHub Issues](https://github.com/AlexCline/npm-install-missing/issues)


License
-------
Copyright 2013 Alex Cline alex.cline@gmail.com

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
