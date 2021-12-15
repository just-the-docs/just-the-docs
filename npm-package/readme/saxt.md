# saxt

SAX T(emplate)

A server-side template engine based on sax-js

## Install

```bash
npm i saxt
```


## Usage

saxt has a very simple syntax. 

All `tagName` is html tag. The `attr` can be static value or wrapped with `{}`, then it will bind view props, and one special attr is `children`. If attr is `children`, the attrValue will be passed to the children element.

**Important**: If the bind value is not a string type, it will be stringify by `JSON.stringify` and encoded by `encodeURIComponent`

The `saxt()` will return a readable stream, like: 

```jsx
const saxt = require('saxt')
const view = { foo: "bar" }
const stream = saxt(`<div children={foo}></div>`, view, { /* some options */ })

let result = ''
stream.on('data', (data) => {
  result += data
  // or do stuff like `res.write(data)`
})

stream.on('end', () => {
  assert(result === `<div>bar</div>`)
  // or do stuff like `res.end()`
})
```


## Example

```jsx
const saxt = require('saxt')
const view = {
  post: `<div>
          <p>hello world</p>
        </div>`,

  charset: 'utf8'
}

// 1. children example
saxt(`
  <div id="post" children={post} />
`, view)

// result >>>
<div id="post">
<div>
  <p>hello world</p>
</div>
</div>



// 2. attr example
saxt(`
  <meta charset={charset} />
`, view)

// result >>>>
<meta charset="utf8"></meta>

```

## License 

MIT License