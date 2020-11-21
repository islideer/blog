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

> 本文主要探讨浏览器环境下的 this 指向问题 node 环境会有所不同

## 小测试

在阅读本文前你可以先做做下面这个关于 `this` 指向的小测试

### 题目

### 答案

如果你发现自己不能答对九道或以上 那么对你来说就很有必要继续往下看看了

## this 指向详析

### 1. 全局环境中

`this` 指向 `window`

```html
<!-- 标准模式 -->
<script>
  console.log(this); // window
</script>
```

```html
<!-- 严格模式 -->
<script>
  "use strict";
  console.log(this); // window
</script>
```

```html
<!-- index.html -->
<script src="./main.js"></script>
```

```js
// main.js  标准模式的全局环境下
console.log(this); // window
```

```js
// main.js  严格模式的全局环境下
"use strict";
console.log(this); // window
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
  console.log(this);
}

// 等同于 window.foo()
foo(); // window
```

```js
// 严格模式下 函数普通调用
"use strict";
function foo() {
  console.log(this);
}

foo(); // undefined
```

```js
// 通过对象调用函数
var obj = {
  foo: function () {
    console.log(this);
  },
};

obj.foo(); // obj
```

```js
// 通过 new 操作符调用
function foo(bar) {
  this.bar = bar;
  console.log(this.value);
}

var bar = new foo(2); // undefined
console.log(bar); // foo {bar: 2}
```

```js
// 通过 call/apply 调用
var obj = {
  foo: 1,
};

function bar() {
  console.log(this.foo);
}

bar(); //undefined
bar.call(obj); // 1
bar.apply(obj); // 1
bar.call(null); // undefined
```

```js
var obj = {
  foo: 1,
};

function bar() {
  console.log(this.foo);
}

bar(); // undefined
var bark = bar.bind(obj); // 无输出
bark(); // 1

obj.foo = 2;
bark(); // 2
```
