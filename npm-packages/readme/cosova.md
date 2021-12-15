# COSOVA

**Co**re **So**cialist **Va**lues Bubble Component for React.

## Examples ([website](https://hardo.github.io/cosova/))

![](images/normal.gif)

## Usage

### Get Start

- Install

```bash
yarn add cosova

# or:
# npm install cosova
```
- import 

```js
import {Cosova} from 'cosova';

function () {
  return <Cosova />
}
```

### Code examples

#### Normal
  
- Code

```jsx
<Cosova> 请使劲地点我吧 ~ </Cosova>
```

- Effect

![](images/normal.gif)

#### Custom styles

- Code

```jsx
<Cosova
  cosovas={['阔口阔啰', '哇蛤蛤', '卖洞', '茶几']}
  transitionStyle={{
    opacity: 0,
    transform: 'scale(2)',
  }}
  timing="cubic-bezier(0.19,-0.8, 1, 1)"
>
  再试试我呢, 我可和楼上不一样哦!
</Cosova>
```

- Effect

![](images/custom.gif)

#### More custom

- Code

```jsx
<Cosova
  cosovas={[
    '曾經很愛很愛伱..侞妗.o┈]我努力放棄多谢╰伱啲Οo絕.情讓我學会~死心',
    '「.我德存在织伪铕个顠亮的死法.﹖; !',
    '：／。涐 旳 脸 、出 现 在 谁 旳 世 ˉ界、﹖',
    '○.o.﹏如果難過請你忘叻⒌',
    'ˊ笑是開始的第一頁)﹡ ,結果是讓淚寫完結篇) ',
  ]}
  duration={() => getRandomItemFormArray([800, 2000, 5000, 10000])}
  initialStyle={() => ({
    color: getRandomItemFormArray(COLORS),
  })}
  transitionStyle={() => ({
    opacity: getRandomItemFormArray([0, 1, 0.5]),
    color: getRandomItemFormArray(COLORS),
    transform: getRandomItemFormArray([
      'scale(2)',
      'scale(2, 0)',
      'skew(30deg, 20deg)',
      'rotate(360deg)',
    ]),
  })}
>
  当非主流成为主流, 你应该为你现在瞧不起我们的行为而感到羞愧!
</Cosova>
```

- Effect

![](images/more-custom.gif)