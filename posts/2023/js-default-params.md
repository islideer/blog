---
title: 'JavaScript 的函数参数竟然能相互访问到？'
date: 2023-11-04
excerpt: '是的，别骂了，我很菜，我在大惊小怪 😩。'
---

是的，别骂了，我很菜，我在大惊小怪 😩。

```ts
const buildFn = (
  name = 'Viki',
  sayHi = () => {
    console.log(name)
  },
) => {
  return sayHi
}

buildFn()() // is OK, output Viki as expected
buildFn('hi')() // is OK, output hi as expected
```

```ts
const buildFn2 = (
  obj = { name: 'Viki' },
  sayHi = () => {
    console.log(obj.name)
    obj = { name: 'VIKI' }
  },
  sayHi2 = () => {
    console.log(obj.name)
  },
) => {
  return { sayHi, sayHi2 }
}

buildFn2().sayHi() // is OK, output Viki as expected
buildFn2({ name: 'hi' }).sayHi2() // is OK, output hi as expected
```

```ts
const buildFn3 = (
  sayHi = () => {
    console.log(name)
  },
  name = 'Viki',
) => {
  return sayHi
}

buildFn3()() // isOK, output Viki as well if name is after sayHi
buildFn3(() => console.log(name), 'hi')() // NOTICE: name cannot be accessed by passed sayHi function
```

```ts
const buildFn4 = (
  sayHi = () => {
    console.log(obj.name)
    obj = { name: 'VIKI' } // this will not affect obj in sayHi2
  },
  sayHi2 = () => {
    console.log(obj.name)
  },
  obj = { name: 'Viki' },
) => {
  return { sayHi, sayHi2 }
}

buildFn4().sayHi() // is OK, output Viki as expected
buildFn4().sayHi2() // NOTICE: still Viki, will not be affected by sayHi
```

不仅能相互访问，而且不受参数顺序影响 🙃，可以自己在控制台跑跑看。

记录一下，让自己加深印象。
