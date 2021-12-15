## memop

Memory Operations

## Install

```bash
npm install memop
```

## Usage

**Pool**

```javascript
let pool = new Pool(function () {
  return vmath.vec3.new(1,1,1);
}, 256);

let a = pool.alloc();
let b = pool.alloc();

// do stuff...

pool.free(a);
pool.free(b);
```

**RecyclePool**

```javascript
let pool = new RecyclePool(function () {
  return {
    age: 0,
    velocity: [1,1,1]
  };
}, 256);

pool.add();
pool.add();

for (let i = 0; i < pool.length; ++i) {
  let p = pool.data[i];

  // do stuff...

  if (p.age > 10) {
    pool.remove(i);
    --i;
  }
}
```

**FixedArray**

```javascript
let array = new FixedArray(100);

array.push(0);
array.push(1);
array.push(3);
array.push(4);

// do stuff...

array.fastRemove(2);
```

**TypedArrayPool**

```javascript
let array1 = TypedArrayPool.alloc_float32(100);
let array2 = TypedArrayPool.alloc_int16(32);

// do stuff...

TypedArrayPool.free(array1);
TypedArrayPool.free(array2);
```

**LinkedArray**

```javascript
let arr = new LinkedArray(100, () => {
  return {
    name: '',
    next: null,
    prev: null,
  };
});

let node = arr.add();
node.name = 'foobar';

arr.forEach(item => {
  // do stuff...
});
```

## License

MIT © 2017 Johnny Wu