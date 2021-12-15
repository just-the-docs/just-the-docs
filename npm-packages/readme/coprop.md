# coprop
Copy property and descriptors.


### Note
>The following global dependencies should be installed to speed up development procedures.

1. `npm install flxc@latest --global`
2. `npm install rsetmod@latest --global`
3. `npm install njava@latest --global` (Non-Windows/Debian based)
4. `npm install jesy@latest --global`
5. `npm install selenium-standalone@latest --global && selenium-standalone install`

### Install
* Install `flxc` globally, run `npm install flxc@latest --global`

###### Windows
1. Run `flxc execute ./.install.sh`

###### Non-Windows
1. Run `./.install.sh`
	* If this does not run, use `bash ./.install.sh`
	* If this does not run, use `flxc execute ./.install.sh`

### Develop
* Install `rsetmod` globally, run `npm install rsetmod@latest --global`
* Run `npm run build`

### Test
* Run `npm run test`

###### WebDriverIO Test Flow
* (Non-Windows/Debian based) If you don't have JavaRE installed, run, `npm install njava@latest --global`


1. Install `jesy` globally, run `npm install jesy@latest --global`
2. Install `selenium-standalone` globally, run `npm install selenium-standalone@latest --global`
	* Run `selenium-standalone install`


### Deploy
* Run `npm run deploy`
