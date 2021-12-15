# vue-back-top

![](https://img.shields.io/github/license/molvqingtai/vue-back-top.svg) ![](https://img.shields.io/github/size/molvqingtai/vue-back-top/dist/back-top.umd.min.js.svg) ![](https://img.shields.io/npm/dt/@mlqt/vue-back-top.svg) ![](https://img.shields.io/npm/v/@mlqt/vue-back-top.svg)

A back top component for vue.js.

**[View demo](https://molvqingtai.github.io/vue-back-top/demo.html)**



## Install

**NPM**

```shell
npm install @mlqt/vue-back-top
```

**CDN**

```html
<script src="https://unpkg.com/@mlqt/vue-back-top"></script>
```



## Usage

Use **`<back-top/>`** to enable the scroll to the top, and use **props** to define its options.

When the scroll bar height is greater than 100vh, **back-top** is display, otherwise hidden.

```html
<back-top color="#409EFF" :size="1.1" :slow="10"> </back-top>

<!-- Replace the default icon with slot -->
<back-top>
    <div>Icon</div>
</back-top>
```

```javascript
import Vue from 'vue'
import BackTop from '@mlqt/vue-back-top'

Vue.use(BackTop)

new Vue().$mount('#app')
```



## Options

| Props  | Description                                                  | **Required** | Type   | Default |
| ------ | ------------------------------------------------------------ | ------------ | ------ | ------- |
| right  | Back-top distance to the right                               | false        | String | 3%      |
| bottom | Back-top distance to the bottom                              | false        | String | 20%     |
| color  | Back-top color                                               | false        | String | #409EFF |
| size   | Back-top size                                                | false        | Number | 1       |
| slow   | Back-top The speed of scrolling, the larger the value, the slower the scrolling | false        | Number | 10      |




## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/molvqingtai/vue-back-top/blob/master/LICENSE) file for details



## Acknowledgments

[张鑫旭](https://www.zhangxinxu.com/wordpress/2017/01/share-a-animation-algorithm-js/)
