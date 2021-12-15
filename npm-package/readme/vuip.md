# vuip
## 参考vue实现一个自己的前端框架
一直不明白vue的单文件组件为什么要以.vue结尾，做成.js 或 .html 不行吗？ 基于这个疑问，我决定我的单文件组件就要.html结尾,对刚入门同学来说是不是更友好点，一个.html文件就是一个组件，而且在.html里面下写html标签也显得跟加合理

## 安装
``` bash
npm install vuip --save
```
## 使用说明
需配合vuip-html-loader 使用，来编译.html组件
``` bash
npm install vuip-html-loader --save
```
在你的项目的webpack的rules配置中引入vui-html-loader
```
rules:[
  {
    // 引入vui-html-loader
    test: /\.html$/,
    loader: 'vui-html-loader',
    exclude: /node_modules/,
    // 指定那些目录下的.html文件进行loader编译
    include: [
        path.resolve(__dirname, "../src/page"),
        path.resolve(__dirname, "../src/components"),
    ]
  }
]
```
开始开发你的项目
```
import Vuip from 'vuip';
import Home from '@/page/home.html';

new Vuip({
    id: '#app',
    render: h => h(Home)
});
```
page/home.html
```
<template>
  <div style="text-align: center;">
    <v-for data="list">
        <div>{item.id + '_' +item.title}</div>
    </v-for>
  </div>
</template>
<script>
  export default {
    name: 'Todo',
    data() {
      return {
        list: [
					{id: 1, title: 'todo1'}
				]
      }
    },
    methods: {

    },
    mounted() {

    }
  }
</script>
```

## 实现功能
* { name + 1 + 2 + (sex === 1 ? '男' : '女') } 字符串模板表达式
* v-for 列表渲染
* v-if 条件判断
* v-html html直接渲染
* v-model 双向绑定
* slot 插槽
* component 组件定制复用
* 基础生命周期

## 扩展功能
* 引入vuip-router 路由可实现SPA
* 引入vuipx 可实现全局状态管理


## 推荐使用 vuip-cli 脚手架初始化项目结构

安装vuip-cli脚手架，通过vuip命令来初初始化基础项目目录

### 使用说明
安装vuip-cli
``` bash
npm install -g vuip-cli
```
安装完成后即可以使用vuip命令

### 检测安装是否成功
``` bash
vuip -V
```
输入版本号说明安装成功

### 通过vuip迁出工程模板
``` bash
vuip init
```
选择工程模板，目前只有一个base模板，输入
``` bash
base
```
输入你的工程名
``` bash
<project-name>
```
等待迁出

### 依赖包下载
推荐使用yarn来管理依赖包
``` bash
yarn
```
### 项目启动
``` bash
yarn start
```

### 项目打包
``` bash
yarn build
```

### 目录结构
```
├── dist                     # 构建后生成文件目录
├── mock                     # 本地模拟数据
├── public
│   └── favicon.png          # Favicon
├── src
│   ├── assets               # 本地静态资源
│   ├── components           # 业务通用组件
│   ├── layouts              # 通用布局
│   ├── models               # 全局 dva model
│   ├── pages                # 业务页面入口和常用模板
│   ├── router               # 路由配置
│   ├── store                # 全局状态管理
│   ├── utils                # 工具库
│   ├── locales              # 国际化资源
│   ├── main.less            # 全局样式
│   └── app.js               # 主入口 JS
├── README.md
└── package.json
```

### 版本更新说明
+ 1.0.5
```html
新增v-elseif、v-else 标签，示例
<v-if test="list.length < 5">
    <div>list.length < 5</div>
</v-if>
<v-elseif test="list.length < 6">
    <div>list.length < 6</div>
</v-elseif>
<v-else>
    <div>list.length = {list.length}</div>
</v-else>
```
+ 1.0.6
```
完善生命周期函数
```
+ 1.0.7
```
打包配置修改
```
+ 1.0.9
```
1. 部分bug修复；
2. js转ts语法
```
+ 1.0.10
```
1. bug修复；
```
+ 1.0.11
```
1. 优化打包配置
```
+ 1.0.12
```
1. 生命周期执行触发时机调整
```

+ 1.1.0
```
1. 实现哨兵、数据代理、依赖收集
2. 优化全局状态使用
```

+ 1.1.1
```
1. 优化哨兵、数据代理、依赖收集关系
2. 支持v-model双向绑定功能
3. setData性能优化
```

+ 1.1.2
```
1. checkbox、radio实现v-model支持
2. 组件v-model实现
3. 优化事件绑定机制、解决绑定重复事件时后者覆盖前者问题
```

+ 1.1.3
```
1. bug修复
```