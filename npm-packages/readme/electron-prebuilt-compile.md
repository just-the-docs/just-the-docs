# electron-prebuilt-compile

electron-prebuilt-compile is a drop-in replacement for [electron-prebuilt](https://github.com/mafintosh/electron-prebuilt) that natively understands ES6 + React + LESS + some other languages, powered by [electron-compile](https://github.com/electronjs/electron-compile).

## Installation

Download and install the latest build of electron for your OS and add it to your projects `package.json` as a `devDependency`:

```
npm install electron-prebuilt-compile --save-dev
```

Now you can just run `electron` to run electron:

```
electron
```

Electron will now understand ES6/ES7 and React components out-of-the-box, even in inline HTML:

```html
<head>
  <link rel="stylesheet" type="text/less" href="main.less" />
</head>

<body id="host">
  <script type="application/javascript">
  import React from 'react';
  import ReactDOM from 'react-dom';
  import TodoApp from './components/TodoApp';
  
  ReactDOM.render(React.createComponent(TodoApp), document.getElementById('host'));
  </script>
</body>
</html>
```
