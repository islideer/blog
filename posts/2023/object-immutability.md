---
layout: 'post'
title: 'Object 方法：`freeze` vs `seal` vs `preventExtensions`'
date: 2023-11-07
excerpt: '当我们涉足 JavaScript 的世界时，我们会遇到 freeze、seal和preventExtensions这三个神秘的伙伴。它们就像保护我们的对象免受外界伤害的护身符，但它们之间可是各有不同！'
draft: true
---

当我们涉足 JavaScript 的世界时，我们会遇到 `Object.freeze`、`Object.seal` 和 `Object.preventExtensions` 这三个神秘的伙伴。它们就像保护我们的对象免受外界伤害的护身符，但它们之间可是各有不同！

## Object.freeze()

这位大爷可是彻头彻尾的冰霜法师！一旦你使用了 `Object.freeze()`，你的对象就会像被冰封一样，无法再添加新的属性或修改已有属性的可写性、可配置性，更别提删除属性了！它就像是让你的对象进入了冰河时代一般，永远静止不动。

可以用 `Object.isFrozen()` 来判断是否被 freeze 了。

```ts
const icyObj = { chill: 'frosty' }
Object.freeze(icyObj)
```

## Object.seal()

`Object.seal()` 比起冻结，更像是给你的对象套上了防弹衣。你仍然可以改变已有属性的值，但是你无法添加新属性，或者删除已有属性。这就像是给你的对象穿上了一件紧身衣，保护它免受外界的伤害。

可以用 `Object.isSealed()` 来判断是否被 `seal` 了。

```ts
const bulletproofObj = { strong: true }
Object.seal(bulletproofObj)
```

## Object.preventExtensions()

哎呀，`Object.preventExtensions()` 这位大哥有点宽容，他只是阻止了你往对象里加新属性，但是你依然可以修改和删除已有属性。他就像是给你的对象画了个边界线，告诉你 “哥们，不能再往外扩张了哦！”

可以用 `Object.isExtensible()` 来判断是否被 `preventExtensions` 了。

```ts
const extendableObj = { flexible: true }
Object.preventExtensions(extendableObj)
```

这些方法虽然冷门，但却能保护你的宝贝对象免受外界的破坏，请记住它们，就像是在寒冷的世界中给你的对象穿上了厚厚的保护衣！

> 文章由 ChatGPT 润色生成。
