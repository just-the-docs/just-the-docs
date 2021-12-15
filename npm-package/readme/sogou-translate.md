# Sogou Translate

使用搜狗深智引擎翻译文本。
Translate with Sogou DeepI API.

## Install

```bash
npm i sogou-translate
```

## Example

使用前请先到搜狗深智引擎申请一个机器翻译的账户，获取到 PID 和 Key，申请地址：http://deepi.sogou.com/contact/fanyi

分别替换掉下面例子中的 `your_pid` 和 `your_key` 即可运行。

接口中的 `from` 和 `to` 字段可选值参考：http://deepi.sogou.com/docs/fanyiDoc#lan

```js
const SogouTranslate = require('sogou-tranlsate');
const sogouTranslate = new SogouTranslate('your_pid', 'your_key');

// 翻译“hello”，从英文翻译成中文
sogouTranslate.translate('hello', 'en', 'zh-CHS') 
.then(result => {
    console.log(result); // 你好
})
```