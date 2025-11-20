---
layout: 'post'
title: '让 TS 类型 "cat" | string 支持补全提示'
date: 2023-10-19
excerpt: '在使用 TypeScript 时，让 TS 类型 "cat" | string 支持补全提示，可以通过定义一个联合类型来实现。'
---


## 问题描述

考察以下 TS 类型。

```ts
type Animal = "cat" | "dog" | string;
```

正常情况下，我们可能会按上面的方式来写，但是这在 vscode 上得不到良好的补全提示。

```ts
const animal: Animal = ''; // 输入引号后没有补全提示
```

## 解决方案

为了解决这个问题可以采取以下两种方式来实现。

```ts
// 方案一 使用 `string & {}` 替代 `stirng`
type Animal = "cat" | "dog" | (string & {});

// 方案二 使用 Omit 手动从 `string` 中排除类型
type Animal = "cat" | "dog" | Omit<string, "cat" | "dog">

const animal: Animal = ''; // 输入引号后可以看到正确的补全提示
```

## 结果#

### 之前（没有补全提示）

![no-completion](https://s2.loli.net/2025/11/19/Uebrph2gZRfJVdE.png)

### 之后（完善的补全提示）

![with-completion-1](https://s2.loli.net/2025/11/19/XeviQjFsHDbRhmn.png)

![with-completion-2](https://s2.loli.net/2025/11/19/wivfsRGpydTxOSj.png)

Cheers! 🍻
