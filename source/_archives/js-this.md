---
layout: post
title: 浅析JavaScript中this的指向问题
date: 2020-11-21
top_image: https://i.loli.net/2020/11/21/fDXpUSTL6BciRtO.png
excerpt: JavaScript 之 this 指向判断
---

## 说在前面

平时自己写代码或者在参加前端职位的面试的过程中, js 里 this 的指向一直是个热点问题

这篇文章旨在帮助读者深入了解 js 里各种情况 this 的指向

在笔者自己彻底理解的同时, 也可以作为后来人的参考

> 本文主要探讨浏览器环境下的 `this` 指向问题 node 环境会有所不同 如: 浏览器全局对象是 `window` 而 node 环境全局对象是 `global`

## this 指向详析

### 1. 全局环境中

`this` 指向 `window`

```html
<!-- 标准模式 -->
<script>
  console.log(this) // window
</script>
```

```html
<!-- 严格模式 -->
<script>
  'use strict'
  console.log(this) // window
</script>
```

```html
<!-- index.html -->
<script src="./main.js"></script>
```

```js
// main.js  标准模式的全局环境下
console.log(this) // window
```

```js
// main.js  严格模式的全局环境下
'use strict'
console.log(this) // window
```

### 2. function 定义的函数中

根据**调用对象**与 **js 执行模式**决定

- 普通函数调用:

  - 标准模式下: `this` 指向 `window`
  - 严格模式下: `this` 指向 `undefined`

- 函数由对象调用: `this` 指向 `该对象`

- 通过 `new` 操作符调用: `this` 指向 `新创建的对象`

- 通过 `call/apply` 调用: `this` 指向 `参数指定的对象`

- 通过 `bind` 可以修改 `this` 指向: 返回一个新函数, 这个函数的 `this` 被绑定为指定对象

> 普通函数调用可以看作是 window 对象调用函数, 此时 this 就指向调用它的对象 即 window 对象

```js
// 标准模式下 普通函数调用
function foo() {
  console.log(this)
}

// 等同于 window.foo()
foo() // window
```

```js
// 严格模式下 函数普通调用
'use strict'
function foo() {
  console.log(this)
}

foo() // undefined
```

```js
// 通过对象调用函数
var obj = {
  foo: function () {
    console.log(this)
  }
}

obj.foo() // obj
```

```js
// 通过 new 操作符调用
function foo(bar) {
  this.bar = bar
  console.log(this.value)
}

var bar = new foo(2) // undefined
console.log(bar) // foo {bar: 2}
```

```js
// 通过 call/apply 调用
var obj = {
  foo: 1
}

function bar() {
  console.log(this.foo)
}

bar() //undefined
bar.call(obj) // 1
bar.apply(obj) // 1
bar.call(null) // undefined
```

```js
var obj = {
  foo: 1
}

function bar() {
  console.log(this.foo)
}

bar() // undefined
var bark = bar.bind(obj) // 无输出
bark() // 1

obj.foo = 2
bark() // 2
```

```js
// 异步函数中this指向 window
var bar = 100

var obj = {
  bar: 0
}

function bark() {
  console.log(this.bar)
  setTimeout(function () {
    console.log(this.bar)
  }, 1000)
}

bark.call(obj) // 0 (等待一秒) 100
```

### 3. ES6 箭头函数中

- 箭头函数没有自己的 `this`

- 箭头函数的 `this` 继承自当前作用域链上最近的 `this`

- 当无法找到时, 指向 `window`

```js
var count = 100

var obj = {
  count: 0
}

function foo() {
  var bar = () => console.log(this)
  bar.call(obj)
  console.log(this.count)
}

foo() // window 100
foo.call(obj) // {count: 0} 0
```

> 当上述代码中的 `var` 换为了 `let` 之后结果又是什么? 不妨自己试试.

### 其他情况

#### html 中调用函数

`this` 依旧指向 `window`

```html
<!-- 直接调用函数 -->
<div onclick="msg()">Viki</div>
<script>
  function msg() {
    alert(this) // this指向window 获取不到元素
  }
</script>
```

```html
<!-- 传入元素参数 -->
<div onclick="foo(event.target)">Viki</div>
<script>
  function foo(element) {
    alert(element) // this还是指向window 不过现在可以操作元素
  }
</script>
```

#### 通过 js 绑定事件来调用函数

`this` 默认指向 `元素本身`

注意: 在 ie 中使用 `attachEvent` 时 `this` 指向 `window`

```js
// 给事件定义函数
var box = document.getElementById('box')
box.onclick = function () {
  alert(this.id) // "box"
}
```

```js
// 添加事件监听
var box = document.getElementById('box')
box.addEventListener('click', function () {
  alert(this.id) // "box"
})
```

```js
// 在ie中使用attachEvent() this指向window
var box = document.getElementById('box')
box.attachEvent('onclick', function () {
  alert(this) // window
})
```

#### Ajax 中 原生 XHR 对象的 this 指向问题

由于 `onreadystatechange` 事件的作用域问题, 使用 `this` 对象，函数可能会在一些浏览器执行失败，或者发生错误. 所以一般使用 xhr 实例对象更加靠谱.

```js
var xhr = new XMLHttpRequest()
xhr.open('get', 'https://example.org', true)
xhr.onreadystatechange = function () {
  // 这里一般使用xhr实例对象而不用this
  if (xhr.readyState == 4) {
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
      alert(xhr.responseText)
    } else {
      alert('Request Failed: ' + xhr.status)
    }
  }
}
xhr.send(null)
```

## 参考

[你不知道的 this - Feminer](https://www.cnblogs.com/star91/p/5657269.html)

[js 语法基础 - lenconda](#)
