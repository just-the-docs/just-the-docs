# xext

喧喧扩展开发辅助模块，包含 TypeScript 定义。

## 使用方法

### 1. 安装模块

```shell
npm install xext --save
```

### 2. 导入 `xext` 模块

```ts
import xext, {
  DEBUG,
  lang,
  nodeModules,
  views,
  components,
  utils,
  platform,
  app
} from 'xext';
```

### 3. 使用示例

编写应用扩展 React 组件模块 `app.ts`：

```ts
import {React, ReactDOM} from 'xext';

export default (props: any) => {
    const {app} = props;
    return <div className="red box">Hello: {app.name}</div>
};
```

编写扩展模块：

```ts
import xext, {DEBUG} from 'xext';
import AppView from './app';

const extension: ExtensionModule = {
    onAttach(ext: Xuanxuan.Extension) {
        if (DEBUG) {
            console.log(`Extension '${ext.displayName}' loaded from ${ext.mainFile}.`);
        }
    },
    MainView: AppView
};

export default extension;
```
