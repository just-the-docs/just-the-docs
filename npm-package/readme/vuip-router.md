# vuip-router
## 描述
实现vuip SPA应用简易路由实现，目前只支持history形式路由

## 安装
``` bash
npm install vuip-router --save
```
## 使用说明
在vuip项目中使用
``` javascript
import vuip from 'vuip';
import VuipRouter from '@/router/vuip-router';
import index from '@/page/index.html';

const routerConfig = {
    '/': index,
}

vuip.use(VuipRouter);

const router = new VuipRouter(routerConfig);

// 在创建 vuip 实例时传入 router实例
new Vuip({
    id: '#app',
    render: h => h(App),
    router
});
```

## 实现功能
* <RouterView /> 组件，渲染路由所映射的页面
* <RouterLink /> 组件，路由跳转
```html
<RouterLink class="nav-item" href="/">首页</RouterLink>
<RouterLink class="nav-item" href="https://www.npmjs.com/package/vuip-cli" target="_blank">外连接</RouterLink>
```
* 在vuip的.html组件通过this.$router 可以获取到路由实例
* 已有方法
```javascript
this.$router.back(n: number | default -1);
this.$router.to(path: string, params:Object);
```

### 版本更新说明
+ 1.0.0
```
基础
```

+ 1.0.1
```
组件更新修改，通过哨兵来触发视图更新
```

+ 1.0.3
```
页面组件对应组件key生成规则修改
```