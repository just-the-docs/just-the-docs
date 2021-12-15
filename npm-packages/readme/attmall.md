# attmall

[![ver-image]][ver-url]

测试模块

## Installation
这是一个可以通过 [npm registry](https://www.npmjs.com/) 使用的 [Node.js](https://nodejs.org/en/) 模块。
安装是使用[`npm install` 命令](https://docs.npmjs.com/getting-started/installing-npm-packages-locally): 

```sh
$ npm install attmall
```

## API

```js
var attmall = require('attmall')
```


### attmall.say(string)

返回欢迎信息


```js
// 返回“开发者您好，欢迎光临”
attmall.say('开发者')
```

## Examples

### 显示“用户您好，欢迎光临”

```js
var attmall=require('attmall');

console.log(attmall.say('用户'));
```

## License

[MIT](http://opensource.org/licenses/MIT)

[ver-image]: https://badgen.net/badge/version/v1.0.14/blue
[ver-url]: https://npmjs.org/package/attmall
