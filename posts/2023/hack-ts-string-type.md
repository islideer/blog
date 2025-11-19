---
layout: post
title: 让 TS 类型 "cat" | string 支持补全提示
date: 2023-10-19
excerpt: 在使用 TypeScript 时，让 TS 类型 "cat" | string 支持补全提示，可以通过定义一个联合类型来实现。
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

![no-completion](https://shp.qpic.cn/collector//de353f48-752a-4148-befe-0fef444b20a2/0)

### 之后（完善的补全提示）

![with-completion-1](https://shp.qpic.cn/collector//34238071-dc0d-4cc6-b5f6-087c243494e8/0)

![with-completion-2](https://shp.qpic.cn/collector//022dad01-ee82-4ffc-8c7d-9f2518e6f40c/0)

Cheers! 🍻
