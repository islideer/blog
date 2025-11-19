---
layout: post
title: NCUHOME 研发组前端培训之 DOM 操作 & AJAX
date: 2020-10-30
top_image: https://i.loli.net/2020/10/24/erY2Oj4Z3TuIKBn.png
excerpt: NCUHOME 研发组前端培训之 DOM 操作 & AJAX
---

> 主讲人: 19 级前端 Viki，时间:2020/10/30

这篇文章是给 NCUHOME 研发组新生有关 `DOM` 操作和 `AJAX` 的培训文档，参考了 MDN 文档、《JavaScript 高级程序设计（第四版）》以及一些博客文章的相关内容。


## 预习部分

- [DOM 概述 - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model/Introduction)
- [JSON 格式 - MDN](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/JSON)
- [AJAX 基础 - MDN](https://developer.mozilla.org/zh-CN/docs/Web/Guide/AJAX/Getting_Started)
- [XMLHttpRequest - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest)

> 学有余力还可以进一步学习: [Fetch API - MDN](https://wiki.developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch) / [Axios - Github](https://github.com/axios/axios#axios-api)

## 从浏览器讲起

### 主流浏览器

![主流浏览器](https://i.loli.net/2020/10/24/erY2Oj4Z3TuIKBn.png)

### 浏览器的高层结构

![浏览器的高层结构](https://i.loli.net/2020/10/24/6JRTvKeBXtIVlf1.png)

### 浏览器解析过程

![浏览器解析过程](https://i.loli.net/2020/10/24/NC3J5efFZK6zL4A.png)

## DOM

### 什么是 DOM

JavaScript 包含以下三个组成部分。

- ECMAScript: 由 ECMA-262 定义， js 语言的核心功能。
- 文档对象模型（DOM）: 提供了与网页内容交互的方法和接口。
- 浏览器对象模型（BOM）: 提供了与浏览器交互的方法和接口。

![JavaScript三部分](https://i.loli.net/2020/10/24/KWgnQoNPLfY47wD.png)

DOM（Document Object Model）中文名叫文档对象模型，它是 HTML（超文本标记语言）和 XML（可扩展标记语言）文档的**应用编程接口**（也叫 API，Application Programming Interface）。

DOM 表示由多层节点构成的文档，通过它可以**对页面的各个部分进行添加、删除和修改等操作**。

### DOM 相关概念

#### 元素

即 document 文档里所有的 HTML 标签元素 如下图的 `Element Node`

#### 节点

- **节点包括元素节点、文本节点、注释节点等**

- 最常用的节点是**元素节点**和**文本节点**

![DOM树](https://i.loli.net/2020/10/24/aN8nQcjfqGEmBRh.png)

### 操作 DOM 节点

#### 获取 HTML 元素

获取到一个元素有很多种方式，比如: 通过 id、标签名、CSS 类等

![获取 HTML 元素](https://i.loli.net/2020/10/25/LTDoxI4blaQgsiB.png)

```javascript
// 创建一个元素
var awesomeDiv = document.createElement('div')
// 获取元素
var element = document.getElementById('box')
var element = document.getElementsByClassName('red blue')
var element = document.getElementsByName('card')
var element = document.getElementsByTagName('number')
var element = document.querySelector('div > #card')
var element = document.querySelectorAll('.btn')
```

> [MDN 对 HTMLCollection 的解释](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCollection)

### 操作 HTML 元素

![操作HTML元素](https://i.loli.net/2020/10/25/TujseZtBrmz7Jqw.png)

#### 改变 HTML 元素样式

```javascript
// 首先获取到要改变样式的元素
let awesomeDiv = document.getElementById('app')
awesomeDiv.classList
awesomeDiv.classList.add('round')
awesomeDiv.classList.remove('blue')
awesomeDiv.className
awesomeDiv.style
awesomeDiv.style.backgroundColor = '#ffd9ce'
awesomeDiv.style.border = '1px solid #3af'
```

> JavaScript 的标识符不允许使用 `-`，所以 JavaScript 里的 CSS 样式名都是小驼峰的命名形式。例如：CSS => `font-size` / JavaScript => `fontSize`

#### 添加、改变 HTML 元素

```javascript
document.body.innerText = '这是body的innerText'
document.body.innerHTML = '<h1>这是body的<b>innerText</b></h1>'
document.body.outerHTML
document.body.children[0].outerHTML = '<h2>NCUHOME</h2>'
document.body.outerText = 'NCUHOME'
```

#### 给 HTML 元素添加监听事件

```javascript
// let msg = () => alert("hello! ncuhomer!");
function showMsg() {
  alert('hello! ncuhomer!')
}
document.getElementById('app').onclick = showMsg
document.getElementById('btn').addEventListener('click', showMsg)
document.getElementById('btn').removeEventListener('click')
```

## AJAX

### 何为 AJAX

AJAX 是异步的 JavaScript 和 XML（Asynchronous JavaScript And XML）。简单点说，即使用 `XMLHttpRequest` 对象与服务器通信。 使用 AJAX 可以**在不重新刷新页面的情况下与服务器通信，交换数据，或更新页面**。

![AJAX](https://i.loli.net/2020/10/25/qwxPorAWZMXa6cV.png)

### 为什么要有 AJAX

#### 没有 AJAX 的时代

除了`img`标签加载图片之外，一切数据请求，包括获取新信息、访问新页面等，页面都要进行**重新加载**。

#### 有 AJAX 的时代

使用 JavaScript 通过`XMLHttpRequest` 对象向服务器发起请求，获取到返回数据。**不用刷新页面就可以异步更新页面内容**，极大的提高了用户体验和效率。典型的代表: Gmail 和 Google Map

### JSON 格式

JSON (JavaScript Object Notation) 是目前最常用的**数据交换格式**，虽然它是基于 JavaScript 语法，但它独立于 JavaScript。

#### 例子

```json
{
  "name": "Bob",
  "age": 19,
  "friends": ["Amy", "Lucy"]
}
```

#### 处理 JSON 数据（与 js 对象的相互转换）

```javascript
let str1 = '{"name":"ncuhomer"}'
let obj = JSON.parse(str1)
let str2 = JSON.stringify(obj)
```

### 原生 XMLHttpRequest 的基本使用

#### HTTP 的请求方法

`GET`: 获取资源

`POST`: 主要用于修改服务器资源

> 除此之外还有: `PUT`、`HEAD`、`DELETE`、`OPTIONS`、`CONNECT` 等

![XMLHttpRequest 的基本使用](https://i.loli.net/2020/10/25/EHpbyO2Q5nq6Y8j.png)

#### 1. 创建一个实例对象

```javascript
var xhr = new XMLHttpRequest()
```

#### 2. 设置请求参数

```javascript
xhr.open('GET', 'url')
```

#### 3. 监听请求后的变化

```javascript
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    console.log(xhr.responseText)
  }
}
```

#### 4. 发送请求

```javascript
xhr.send()
```

> 深入了解参考：[XMLHttpRequest - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest)

### Fetch 与 Axios

Fetch 基于 `XMLHttpRequest` 做了一层封装，通过 Fetch 可以更以简单的方式来间接使用 `XMLHttpRequest` 获取数据。Fetch 现在已经被除 IE 外的大多数浏览器内置支持。

Axios 是一个基于 `promise` 的 HTTP 库。它来自开源社区，底层实现也是`XMLHttpRequest` 对象，在实际开发生产中的使用的比较广泛。

### 使用 ES6

![JavaScript三部分](https://i.loli.net/2020/10/24/KWgnQoNPLfY47wD.png)

#### ES

ES 指的是 ECMAScript，是 js 语言的核心部分。

ES6 中的 6 是 ES 的版本标识，是 ES5 的下一个版本，在 2015 年发布，又叫 ECMAScript 2015，ES6 引入了很多新特性，丰富了 js 的语法生态。ES6 引入的新特性和规范等对 JavaScript 使用者更加友好。

#### ES5 的缺陷

- var 定义变量存在变量提升问题，允许重复声明
- 变量的作用域为函数作用域
- 对字符的处理有限。
- 异步编程相对繁琐，只能通过回调函数、事件监听或者自行编写 Promise 来实现。
- 缺少语法糖，对编程人员不够友好。

> 关于语法糖： 指计算机语言中添加的某种语法，这种语法对语言的功能并没有影响，但是更方便程序员使用。通常来说使用语法糖能够增加程序的可读性，从而减少程序代码出错的机会。

#### ES6 的亮点

![ES6](https://i.loli.net/2020/10/25/vJ7ScsbECOi1R5d.png)

- 原生支持 Promise，简化了异步编程。
- 新增 let、const 关键字

  用 let const 定义的变量作用域为块作用域，不存在变量提升，不允许重复声明，使语言使用更加严谨

- 引入箭头函数，让 this 绑定定义时所在的作用域，而不是指向运行时所在的作用域，同时也使得表达更加简洁。
- 引入 class 关键字，增强了对类的支持
- 新增语法糖
  - 模板字符串
  - 解构操作
  - 展开运算符
  - ...
- ...

## 课后学习、阅读资料:

- 学习 JavaScript

  - [现代 JavaScript 教程](https://zh.javascript.info/)
  - 红宝书（《JavaScript 高级程序设计（第四版）》）

    > 大部分书籍的电子版可以在研发 QQ 群文件找到

- 推荐学习

  - [Fetch - MDN](https://wiki.developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch)
  - [Axios - Github](https://www.npmjs.com/package/axios)
  - [Promise - MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)

- 推荐阅读

  - [浏览器的工作原理：新式网络浏览器幕后揭秘](https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/#Introduction)
  - [JavaScript 语言的历史 - 阮一峰](https://javascript.ruanyifeng.com/introduction/history.html)

## 任务

### 学习任务

本周任务主要是学习 HTTP、DOM 操作和 AJAX，同时多了解 ES6 的新特性。

**学习:**

- [学习 XMLHttpRequest](https://zh.javascript.info/xmlhttprequest)
- [HTTP 基础 - 菜鸟教程](https://www.runoob.com/http/http-tutoriahtml)
- [学习 Fetch](https://zh.javascript.info/fetch)
- [ES6 基础教程](https://www.runoob.com/w3cnote/es6-tutorial.html)
- [现代 JavaScript 教程](https://zh.javascript.info/)

**建议深入了解:**

- [var、let、const 声明变量的区别](https://zh.javascript.info/variables)
- [箭头函数基础](https://zh.javascript.info/arrow-functions-basics) /[深入理解箭头函数](https://zh.javascript.info/arrow-functions)
- [学习 Promise](https://zh.javascript.info/promise-basics)
- [Axios - Github](https://github.com/axios/axios#axios)
- [async / await](https://zh.javascript.info/async-await)

**推荐阅读**

- [浏览器的工作原理：新式网络浏览器幕后揭秘](https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/#Introduction)
- [JavaScript 语言的历史 - 阮一峰](https://javascript.ruanyifeng.com/introduction/history.html)

### 本周作业

#### 主要内容

使用原生 `XMLHttpRequest` 编写一个网页，网页主体内容包括两个按钮和一行文字。要求实现: 点击第一个按钮后，通过原生 `XMLHttpRequest` 向 `https://v1.hitokoto.cn/?encode=text` 发起 `GET` 请求并使用 `DOM` 操作将内容显示在页面上；点击第二个按钮后，文字的样式被改变。

在完成主要特征的前提下可自由发挥。（如：调整布局、美化页面、添加文本信息等）

#### 最终效果参考:

![最终效果参考](https://i.loli.net/2020/10/24/hvmPr8eSEa4Di6V.gif)

#### 提交方式

将源代码通过 `git` 推送到 `Homework-Y20M11W1` 仓库的新分支上，并提交 PR（pull request）。

#### 截止时间

2020 年 11 月 4 日晚十点
