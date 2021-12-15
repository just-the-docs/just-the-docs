# ngx-yubinbango

[![Build Status](https://travis-ci.org/itigoore01/ngx-yubinbango.svg?branch=master)](https://travis-ci.org/itigoore01/ngx-yubinbango)
[![npm version](https://badge.fury.io/js/ngx-yubinbango.svg)](https://badge.fury.io/js/ngx-yubinbango)


ngx-yubinbangoはAngular用の郵便番号自動補完ライブラリです。

# Demo

https://itigoore01.github.io/ngx-yubinbango/

# Get Started

```
npm install ngx-yubinbango --save
```

```typescript
import { NgxYubinBangoModule } from 'ngx-yubinbango';

@NgModule({
  ...
  imports: [NgxYubinbangoModule, ...]
  ...
})
export class AppModule {
}
```

```html
<form class="example-form" ybAddress>

  <input placeholder="郵便番号" ybPostalCode>

  <input placeholder="都道府県" ybRegion>

  <input placeholder="市区町村" ybLocality>

  <input placeholder="町名" ybStreet>

  <input placeholder="その他" ybExtended>

</form>
```
