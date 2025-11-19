---
layout: post
title: 来试试 node 内置的 "delay" 函数
date: 2023-10-26
excerpt: 在实际开发中，经常遇到需要在异步操作里进行 “延时” 操作的情况，通常会编写类似于以下的 util 函数来进行处理。
---

## 前言

在实际开发中，经常遇到需要在异步操作里进行 “延时” 操作的情况，通常会编写类似于以下的 util 函数来进行处理。

```ts
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
```

这很好，很简洁，也完美的贴合了我们的需求。但是，如果你的代码跑在纯 node 环境下，有一个新的替代方案可以考虑。

## 使用 node Timers Promises API

不如试试 node 从 v15.0.0 开始内置支持的 Timers Promises API 提供的 setTimeout 函数，它返回一个 Promise，与我们刚提到的延时函数表现基本一致，同时支持更多用法。

```ts
import { setTimeout } from 'node:timers/promises'

const sayHi = async () => {
  console.log('Hi!')
}

const doSomethingAsync = async () => {
  console.log('yolo!')
  
  await setTimeout(1000)

  await sayHi()

  const res = await setTimeout(1000, 'result');

  console.log("res is: ", res)
}

doSomethingAsync()
```

上述代码输出结果如下。

```bash
yolo! # 立刻输出
Hi! # 一秒后输出
res is:  result # 再一秒后输出
```

更多详情请参考 [Node.js 官方文档](https://nodejs.org/api/timers.html#timerspromisessettimeoutdelay-value-options)。
