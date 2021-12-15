# lvue

## 安装

```
npm install lvue

or

yarn add lvue
```

## 完整引入

在 main.js 中写入以下内容：

### vue2.x

```
import Vue from "vue";

import lvue from "lvue";
import 'lvue/lib/lvue.css';

Vue.use(lvue);

new Vue({
  el: '#app',
  render: h => h(App)
});
```

### vue3.0

```
import { createApp } from "vue";
import App from "./App.vue";

import lvue from "lvue";
import 'lvue/lib/lvue.css';

createApp(App).use(lvue, {locale: 'zh'}).mount("#app");
```

## LICENSE

[MIT](https://github.com/longshao5520/lvue/blob/main/LICENSE)
