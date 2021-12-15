# fanyi.youdao.com

## Getting Started

```ts
$ yarn add fanyi.youdao.com
```

## Usage

```ts
import { translate, setAuth } from 'fanyi.youdao.com'

const auth = { ID: ``, Sceret: `` }

setAuth(auth.ID, auth.Secret)

;(async () => {
    // auto detect original language to 'zh' and target language default to 'en'
    const translated = await translate('中国')
    console.log(translated) // [{ original: '中国', translated: 'China' }]
    // auto detect original language to 'en' and specify target language to 'zh'
    const translated = await translate('China', 'zh')
    console.log(translated) // [{ original: 'China', translated: '中国' }]
})()
```

## Api

```ts
declare namespace YOUDAO_TRANSLATE {
    interface Result {
        original: string,
        translated: string,
    }
}

setAuth(appID: string, appSecret: string): void

translate(keyworld: string | string[], to = 'en'): Promise<YOUDAO_TRANSLATE.Result[]>
```