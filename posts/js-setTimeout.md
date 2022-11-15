---
layout: post
title: setTimeout初探
date: 2020-04-02
top_image: https://i.loli.net/2020/11/21/QLTeHUhrAOBCzER.jpg
excerpt: 关于setTimeout函数的一些思考
---

## 写出下列三个循环的输出值，并解释原因

```js
for (var i = 0; i < 10; i++) {
  setTimeout(() => {
    console.log(i);
  });
}

for (var i = 0; i < 10; i++) {
  (function (i) {
    setTimeout(() => {
      console.log(i);
    });
  })(i);
}

for (let i = 0; i < 10; i++) {
  setTimeout(() => {
    console.log(i);
  });
}
```

## 回答

### 在浏览器环境中

1. 输出 39 和十个 10
2. 输出`undefined`和 0 到 9
3. 输出 13 和 0 到 9

### 在`node`环境中:

1. 输出十个 10
2. 输出 0 到 9
3. 输出 0 到 9

## 解释

### 在 node 下的解释

1. 多次执行`setTimeout()`，会把传入的回调函数依次派发到`setTimeout`所属的宏任务队列中，等到队列任务派发结束（也就是最后一次`setTimeout`结束）后，开始依次执行队列的任务，因为 i 在循环结束后已经累加为 10，故结果就是输出十个 10。
2. 第二个循环使用了`IIFE`（立即执行函数表达式），因为他将循环 1 的内容包装在了一个函数中，并且将该函数用`IIFE`再次封装，把每次`setTimeou`t 创建的队列独立出来，这样使得每个队列依次执行完才进行下一个的执行，所以依次输出 0 到 9。这也是解决循环 1 达不到预期目的的一种解决方案。
3. for 循环头部的 let 声明有一个特殊的行为，即变量在循环过程中不止被声明一次。所以随后的每次循环都会使用上一个循环结束时的值来初始化这个变量，使得`setTimeout`达到预期目的，输出 0 到 9。

### 关于浏览器与 node 环境中差异的解释

因为在浏览器的`Console`控制台执行代码的效果等同于对代码整体调用了`eval()`函数，所以会解析并额外输出 js 代码的最终值，即本题中的`39`, `undefined`, 和`13`。

## 参考文章： [彻底理解 setTimeout() - 简书](https://www.jianshu.com/p/3e482748369d)
