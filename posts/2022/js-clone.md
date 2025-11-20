---
layout: 'post'
title: '简单实现一下 JavaScript 中的深拷贝与浅拷贝'
date: 2022-03-06
top_image: 'https://s2.loli.net/2022/03/06/ed7FfCKA1ipN24r.png'
excerpt: '分析深拷贝与浅拷贝的异同，并使用 JavaScript 进行代码实现。'
---


## JS 的数据类型

我们知道，在 `JavaScript` 语言中，有**基本数据类型**和**引用数据类型**之分。

基本数据类型的**变量名和值**都是储存在**栈内存**当中的，每次声明一个基本数据类型的变量时，都会在栈内存里重新开辟一块空间进行变量名和值的存储，彼此之间不会产生任何影响。

但是引用类型就不一样了，引用类型的变量名与值是储存在**栈内存**当中的，这点没错，但是这个值储存的是对应**堆内存**的**地址**，真正的值是被放在了堆内存当中，栈内存只是存放了变量名与堆内存的地址信息。

上述引用数据类型的值分配方式看着貌似没啥问题，但是在实际使用中会有奇怪的情况：

```js
const obj = { a: 123, b: 456 }
const obj2 = obj
obj.a = 789
console.log(obj2.a)
```

猜猜打印出的是什么？

在没了解相关的知识前，你可能下意识的以为是 `123`，但其实真正的答案是 `789`，你没看错，是 `789`，不信可以自己按 `F12` 到控制台试试。

但是为什么是 `789` 呢？为什么不是 `123` ？

## 浅拷贝 与 深拷贝

原因在于，在我们通过赋值运算符 `=` 对引用数据类型的变量进行赋值的时候，由于 `JavaScript` 语言的特性，实际赋值的是 `obj` 这个变量的地址。（即 `{ a: 123, b: 456}` 这个对象存放在堆内存中的地址）

可以理解为：当你使用 `=` 的时候，其实只是拷贝了这个对象的一个 “引用”，`obj` 与 `obj2` 共用同一个堆内存的地址（存放的地址指向同一块堆内存），只简单拷贝了引用地址，而实际仍指向同一块内存，我们把这种方式叫做**赋值**。

为了解决上述问题，我们需要将对象进行**拷贝**，根据拷贝的程度不同，分为**浅拷贝**和**深拷贝**两种方式。

**浅拷贝**，创建一个新的对象，如果属性是基本类型，拷贝的就是基本类型的值；如果属性是内存地址（引用类型），拷贝的就是内存地址，对深层（超过一层）的引用类型依然仅仅拷贝了内存地址。

相对的，我们把能够使源对象与拷贝对象**互相独立**，其中任何一个对象的改动都**不会**对另外一个对象**造成影响**的拷贝方式叫做**深拷贝**。

### 浅拷贝

以下情况属于浅拷贝（未彻底拷贝完全，新旧对象相互影响）

1. 对引用数据类型的变量直接使用赋值运算符 `=` 进行赋值
2. 使用数组原生的 `slice`、`concat` 等方法处理二维及以上数组
3. 使用 `Object.assign` 方法拷贝对象，且对象的属性值包含引用类型
4. 使用扩展运算符 `...` 拷贝两层及以上引用类型的数据（对象或数组）

### 深拷贝

以下情况属于深拷贝（彻底拷贝完全，新旧对象互不影响）

1. 创建新的对象，并使用递归对每一层的基本数据类型重新拷贝
2. `JSON.parse(JSON.stringify(obj))`（不推荐）
3. `jquery`、`lodash` 等自带的深拷贝函数

使用 `JSON.parse(JSON.stringify(obj))` 有很多弊端：

1. 值为 `undefined`、**函数**、`Symbol` 的属性会被忽略
2. 值为 `NaN`、`Infinity`、`-Infinity` 的属性会被置为 `null`
3. `Error`、`RegExp`、`Set`、`Map` 等内置对象将会转为空对象
4. `Date` 对象会被强制转换为字符串
5. 原型链上的属性也会被拷贝

## 实现一个 深拷贝 函数

为了解决上述的奇怪的表现，我们需要一个函数 `deepClone`，来实现以下效果：

```js
const obj = { a: 123, b: 456 }
const obj2 = deepClone(obj)
obj.a = 789
console.log(obj2.a) // 输出 123 而不是 789
```

第一版代码：

```js
function deepClone(obj, useJSON = false) {
  // 过滤基本数据类型
  if (typeof obj !== 'object' || obj === null) return obj
  // JSON 方式的深拷贝实现
  if (useJSON) return JSON.parse(JSON.stringify(obj))

  let _obj = Array.isArray(obj) ? [] : {}
  for (const key in obj) {
    // 原型链上的属性不拷贝
    if (!obj.hasOwnProperty(key)) return
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      // 如果属性值为引用类型，递归调用 deepClone 函数进行深拷贝处理
      _obj[key] = deepClone(obj[key])
    } else {
      // 基本数据类型直接使用赋值运算符进行拷贝
      _obj[key] = obj[key]
    }
  }
  return _obj
}
```

测试一下：

```js
const obj = { a: 123, b: { c: 456 } }
const obj2 = deepClone(obj)
obj.b.c = 789
console.log(obj2.b.c) // 输出 456，测试通过
```

上述 `deepClone` 的实现确实能搞定一般情况的深拷贝，但是对于一些属性值为内置的 `JavaScript` 对象的对象，情况可能就不这么乐观了，看下面的例子：

```js
const obj = {
  a: new Date(),
  b: { c: new Set([1]), d: new Map([['a', 1]]) },
  e: { f: new Error('msg'), g: new RegExp('^obj$') },
  h: e => console.log(e)
}

// 这里我们采用上述的 deepClone 函数
const obj2 = deepClone(obj)
obj.b.c = e => console.log(e)
console.log(obj2)

// 输出结果如下：
// {
//   a: {},
//   b: {
//     c: {},
//     d: {},
//   },
//   e: { f: {}, g: {} },
//   h: [Function: h],
// };
```

可以直观的看到，对于 `Set`、`Map`、`Error`、`ExpReg`、`Date` 等内置的 `JavaScript` 对象而言，这个函数并没有按照我们预期的方式进行工作，它会将这些内置的 `JavaScript` 对象当作普通对象来处理，我们再来改进一下这个函数，使他还原 `JavaScript` 内置对象。

第二版代码（也是最终版）：

```js
function deepClone(obj) {
  // 定义获取类型的函数，Object.prototype.toString 会返回详细类型描述
  function getType(value) {
    return Object.prototype.toString.call(value).slice(8, -1)
  }
  // 过滤基本数据类型和内置对象（Error、RegExp、Date 等）
  if (getType(obj) !== 'Object' && getType(obj) !== 'Array') return obj

  let _obj = Array.isArray(obj) ? [] : {}
  for (const key in obj) {
    // 原型链上的属性不拷贝
    if (!obj.hasOwnProperty(key)) continue
    if (getType(obj) === 'Object' || getType(obj) === 'Array') {
      // 如果属性值为数组或对象，则递归调用 deepClone 函数进行深拷贝处理
      _obj[key] = deepClone(obj[key])
    } else {
      // 基本数据类型与内置的 JavaScript 对象直接使用赋值运算符进行拷贝
      _obj[key] = obj[key]
    }
  }
  return _obj
}
```

我们再来测试一下：

```js
const obj = {
  a: new Date(),
  b: { c: new Set([1]), d: new Map([['a', 1]]) },
  e: { f: new Error('msg'), g: new RegExp('^obj$') },
  h: e => console.log(e)
}

const obj2 = deepClone(obj)
obj.b.c = e => console.log(e)
console.log(obj2)

// 输出结果如下：
// {
//   a: 2022-03-06T05:11:33.838Z,
//   b: { c: Set(1) { 1 }, d: Map(1) { 'a' => 1 } },
//   e: {
//     f: Error: msg,
//     g: /^obj$/
//   },
//   h: [Function: h]
// }
```

可以看到，第二版代码的处理更加科学和准确，它采用 `Object.prototype.toString` 来判断类型，并对内置的 `JavaScript` 对象进行了还原，使它能更加精准的拷贝对象的属性。

但是这版也只是实现了普通对象的拷贝，针对复杂类型的对象（如 Map、Set 等），还是请使用社区的解决方案，如 [lodash](https://lodash.com/)、[clone](https://github.com/pvorb/clone) 等。

### 2023/3/24 更新

实际生产环境下建议使用 [rfdc](https://github.com/davidmarkclements/rfdc)，这是社区的一个纯粹的、专门处理深拷贝的、优化性能可观的 npm 包。
