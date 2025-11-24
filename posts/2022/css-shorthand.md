---
title: 'CSS 简写属性速览'
date: 2022-02-22
top_image: 'https://s2.loli.net/2022/02/22/ZHKrAXWt8Mn7agf.png'
excerpt: '总结了常用的 CSS 简写属性，便于日后翻阅。'
draft: true
---

## 说在前面

> **简写属性**一词来源于 [CSS 的简写属性 - MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Shorthand_properties)

**简写属性**是可以让你同时设置好几个 `CSS` 属性值的 `CSS` 属性。使用简写属性，Web 开发人员可以编写**更简洁、更具可读性**的样式表，节省时间和精力。

`CSS` 规范定义简写属性的目的在于将那些关于**同一主题**的**常见属性**的定义**集中**在一起。比如 `CSS` 的 `background` 属性就是一个简写属性，它可以定义 `background-color`、`background-image`、`background-repeat` 和 `background-position` 的值。类似地，最常见的字体相关的属性可以使用 `font` 的简写，盒子模型各方向的外边距（`margin`） 可以使用 `margin` 这个简写。

> 所有 `CSS` 属性参考：[CSS 参考 - MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference)

## 常用简写属性：

- `margin`、`padding`

```css
.box {
  margin-top: 0;
  margin-right: auto;
  margin-bottom: 0;
  margin-left: auto;

  /* 简写形式，padding 类似 */
  /* 只有一个值时，同时表示上下左右 */
  margin: 10px;
  /* 只有两个值时，第一个值表示上和下、第二个值表示左和右 */
  margin: 0 auto;
  /* 有四个值时，按顺时针依次表示：上、右、下、左 */
  margin: 1px 2px 3px 4px;
}
```

- `border`

```css
.box {
  border-width: 1px;
  /* 常用 dotted、dashed、solid、double */
  border-style: solid;
  border-color: #3af;

  /* 简写形式 */
  border: 1px solid #3aa;
  /* border-[direction] 与之类似，比如 border-top */
}
```

- `border-width`、`border-style`、`border-radius`

```css
.box {
  /* 顺序规则与 margin 规则类似 */
  border-width: 1px 2px;

  /* 顺序规则与 margin 规则类似 */
  border-style: dashed solid double dotted;

  border-top-left-radius: 1px;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 4px;

  /* 上述四条规则的简写形式，顺序规则与 margin 类似 */
  border-radius: 1px 2px 3px 4px;
}
```

- `background`

```css
.box {
  /*  背景图片或颜色是否延伸到边框、内边距盒子、内容盒子 */
  background-clip: border-box;
  /* 背景颜色 */
  background-color: transparent;
  /* 背景图片 */
  background-image: url('./img.png');
  /* 背景图片原点位置的背景相对区域 */
  background-origin: padding-box;
  /* 类比 margin 的顺序规则 */
  background-position: 0% 0%;
  /* 背景图像的重复方式 */
  background-repeat: repeat;
  /* 背景图尺寸，可选 contain、cover、具体宽高、auto */
  background-size: auto auto;
  /* 决定背景位置是固定还是滚动，可选 fixe、local、scroll */
  background-attachment: scroll;

  /* size 只能紧接着 position 出现，以 "/" 分割，如："center/80%" */
  /* 其他属性 无 硬性的顺序要求 */

  background-color: #000;
  background-image: url(images/bg.gif);
  background-repeat: no-repeat;
  background-position: top right;

  /* 简写形式等价于以上普通属性再加上 attachment 以及 CSS3 的附加属性 */
  background: #000 url(images/bg.gif) no-repeat top right;
}
```

- `font`

```css
.box {
  /* 必须包含 font-size 和 font-family，其他可选 */
  /* font-style, font-variant 和 font-weight 必须在 font-size 之前 */
  /* line-height 必须跟在 font-size 后面，由 "/" 分隔，例如 "16px/3" */
  /* font-family 必须 最后 指定 */

  font-style: italic;
  font-weight: bold;
  font-size: 0.8em;
  line-height: 1.2;
  font-family: Arial, sans-serif;

  /* 简写形式示例 */
  font:
    italic bold 0.8em/1.2 Arial,
    sans-serif;
}
```

- `box-shadow`（透明元素可以使用 `drop-shadow` 实现立体阴影）

```css
.box {
  /* x偏移量、y偏移量、阴影颜色 */
  box-shadow: 60px -16px teal;
  /* x偏移量、y偏移量、阴影模糊半径、阴影颜色 */
  box-shadow: 10px 5px 5px black;
  /* x偏移量、y偏移量、阴影模糊半径、阴影扩散半径、阴影颜色 */
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
}
```

- `animation`

```css
.box {
  /* 持续时间、动画名称 */
  animation: 3s slidein;
  /* 持续时间、过渡函数、延迟、动画名称 */
  animation: 3s linear 1s slidein;
  /* 持续时间、过渡函数、延迟、次数、方向、填充模式、播放状态、动画名称 */
  animation: 3s ease-in 1s 2 reverse both paused slidein;
}
```

- `transform`

```css
.box {
  /* 一个或多个变换函数 */
  transform: translateX(10px) rotate(10deg) translateY(5px);
}
```

- `transition`

```css
.box {
  /* 属性名 | 持续时间 */
  transition: margin-right 4s;
  /* 属性名 | 持续时间 | 延迟 */
  transition: margin-right 4s 1s;
  /* 属性名 | 持续时间 | 过渡函数 */
  transition: margin-right 4s ease-in-out;
  /* 属性名 | 持续时间 | 过渡函数 | 延迟 */
  transition: margin-right 4s ease-in-out 1s;

  /* 一般情况下，使用 all ，应用到所有变换 */
  transition: all 0.5s ease-out;
}
```

## 其他简写属性

选取了部分如下，更多详情参考：[CSS 参考 - MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference)

`border-style`、`text-decoration`、`border-image`、`outline`、`list-style`、`column-rule`、`columns`、`mask`、`flex`、`flex-flow`、`grid`、`gap`、`grid-area`、`grid-column`、`grid-gap`。

注意，虽然它们使用起来非常方便，但在使用时，仍需牢记一些边界情况：

1. 简写属性里没有指定的值，会被重置为它的初始值。也就意味着它会覆盖之前已经设置的值。

```css
div {
  background-color: red;
  /* 下列简写属性没有设置 color，它将被重置为默认的 transparent */
  background: url(images/bg.gif) no-repeat top right;
}
```

2. 关键词 `inherit` 只可以应用于单独属性。这意味着，如果**只想让某条子属性使用继承值，而不是所有的子属性**，则**不能使用简写属性，必须使用普通属性**。
