---
layout: post
title: 浅谈 HTML 中的字符实体（如 `&bnsp;`, `&lt;` 等）
date: 2022-12-18
excerpt: 本文将讨论 HTML 中诸如 `&bnsp;`, `&&#35;38;` 等实体符号的相关知识。
---

## 奇怪的空格

在入门学习 `HTML` 和 `CSS` 编写简单网页的时候，由于标签内容中的**多个空格会被自动将合并为一个空格**，你可能遇到过不知道如何显示多个空格的问题。我们来考察下面这段简单的 `HTML` 代码。

我们想在 `start` 和 `end` 中间保留三个空格的位置，于是加了三个空格，像这样。

```html
<p>start end</p>
```

可是最终浏览器渲染的 DOM 结果不符合我们的预期，只有一个空格，结果如下。

```html
<p>start end</p>
```

一顿搜索之后，你可能会找到以下解决方案，使用 `&nbsp;` 来充当空格。

```html
<p>start&nbsp;&nbsp;&nbsp;end</p>
```

除此之外，刚入门 `HTML` 时，为了实现某些布局而你对 CSS 的 `margin` 和 `padding` 等属性又不熟悉，不会用的时候，也可能歪打正着了解到 `&nbsp;` 这个东西。

确实，他可以解决多个空格合并问题，~~也可以用来调整页面布局~~。

那么这个东西，以及我们还可能经常看到的 `&lt;`, `&gt;` 等，这些长得差不多的东西到底是什么？

## Named Character References

## 工具

- https://mothereff.in/html-entities
- https://html.spec.whatwg.org/multipage/named-characters.html#named-character-references

## 参考

- [html 实体符号编码解析 - mingkr](https://blog.csdn.net/mingkr/article/details/38391061)，原文在[这里](http://mingkr.com/html-entity)（已失效）
- [XML 与 HTML 字符实体引用列表 - 维基百科](https://zh.wikipedia.org/zh-cn/XML%E4%B8%8EHTML%E5%AD%97%E7%AC%A6%E5%AE%9E%E4%BD%93%E5%BC%95%E7%94%A8%E5%88%97%E8%A1%A8)
