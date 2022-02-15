---
layout: post
title: cannot find module fs/promises
date: 2022-2-15
excerpt: 运行 node 项目时出现 cannot find module fs/promises 报错
---

### 原因

很有可能是 node 版本太低导致的。

node 13 及以下版本的 `fs promises` 引用方式：

```js
const fs = require("fs").promises;
```

node 14 及以上版本的 `fs promises` 引用方式：

```js
const fs = require("fs/promises");
```

## 解决方案

### 1. 升级 node 版本至 14 及以上。

> 注意：Win7 及以下版本不支持 node 14 及以上版本，所以此方法在 Win7 及以下系统版本不适用。

### 2. 修改引用方式

将所有 `fs promises` 的引用方式修改为 13 版本的方式。

```js
// node 13 及 以下
const fs = require("fs").promises;
// node 14 及 以上支持
const fs = require("fs/promises");
```
