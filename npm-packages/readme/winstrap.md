# Winstrap
##### The official Bootstrap theme for Windows
﻿
http://winstrap.azurewebsites.net/

## Development

### Install Node.js

http://nodejs.org/download/

Make sure Node.js is available in your path.

### Install Grunt and Bower

```
npm install -g grunt-cli
npm install -g bower
```

### Clone the repo

```
git clone https://github.com/winjs/winstrap.git
```

You should have a `winstrap` folder.

### Installing npm packages

To install the required `npm` packages:

```
cd winstrap
npm install
```

## Building Winstrap

Just run:

```
grunt
```

This will compile the generated files into the `dist` folder.

### Launching a local server

Just run this task to display the demo pages in your browser:

```
grunt server
```

Launch this URL in your brower: http://localhost:9001/

The changes you make to the Sass files `*.scss` or source documentation files `*.hbs` will be automatically recompiled. Just refresh your browser window.

- - -

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.