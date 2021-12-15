安装
npm install --save-dev rzzc-tool

在package.json添加要打包的路径
```
"customParams": {
    "scanRoot": "b/components",  // 打包组件根路径
    "typeRoot": "b/typings"  // 定义typescript模块路径
  }
```
在scripts里配置
执行命令
rzzc-tool run compile
```
如
"scripts": {
    "c": "rzzc-tool run compile",
    "start": "cross-env NODE_ENV=development webpack-dev-server --open --colors --config config/webpack/webpack.config.dev.js",
    "build": "cross-env NODE_ENV=production webpack --progress --colors --config config/webpack/webpack.config.prod.js"
  }
```
执行npm run c
根据 scanRoot与typeRoot 把组件打包到es与lib

使用ts-import-plugin按需加载
如:
```
const tsImportPluginFactory = require("ts-import-plugin");

const ts_antd_options=[
    {
        libraryName: 'rzzc-tool',
        libraryDirectory: 'es',
        style: true
    }
]

module.exports=()=>({    
    before:[
        tsImportPluginFactory(ts_antd_options)
    ]
})
```


