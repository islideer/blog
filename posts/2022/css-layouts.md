---
layout: 'post'
title: 'CSS 元素居中与常用布局方式'
date: 2022-02-22
top_image: 'https://s2.loli.net/2022/02/22/2CnjXk5wm4tSKIL.png'
excerpt: 'CSS 元素居中与常用布局方式'
draft: true
---

## CSS 元素居中

<style>
  #box {
    width: 300px;
    height: 300px;
    background-color: #fe9;
    /* 设置父元素为 flex 布局并将子元素水平居中和垂直居中 */
    display: flex;
    align-items: center;
    justify-content: center;
  }
  #app {
    width: 100px;
    height: 100px;
    background-color: #3af;
  }
</style>

<div id="box">
  <div id="app"></div>
</div>

目前使 `CSS` 元素**水平、垂直**居中的方式大致有以下几种：

- 使用 `Flex` 搭配**居中属性**实现
- 使用 `Grid` 搭配**居中属性**实现
- 使用 `position` + `maigin` 实现
- 使用 `position` + `transform` 实现
- 使用 `table-cell` + `maigin` 实现

### 一、Flex 实现元素居中

```html
<style>
  #box {
    width: 300px;
    height: 300px;
    background-color: #fe9;
    /* 设置父元素为 flex 布局并将子元素水平居中和垂直居中 */
    display: flex;
    align-items: center;
    justify-content: center;
  }
  #app {
    width: 100px;
    height: 100px;
    background-color: #3af;
  }
</style>

<div id="box">
  <div id="app"></div>
</div>
```

### 二、Grid 实现元素居中

```css
.container {
  display: grid;
  place-items: center;
}
```

### 三、position + margin 实现元素居中

方式一实现代码：

```html
<style>
  #box {
    width: 300px;
    height: 300px;
    background-color: #fe9;
    /* 父元素设置 position 为 relative */
    position: relative;
  }
  #app {
    width: 100px;
    height: 100px;
    background-color: #3af;
    /* 子元素设置 position 为 absolute */
    position: absolute;
    /* 子元素顶边与左边距分别为父元素高度和宽度的一半 */
    top: 50%;
    left: 50%;
    /* 设置 margin 的顶边和左边的值为：子元素的高度和宽度一半的负值 */
    margin: -50px 0 0 -50px;
  }
</style>

<div id="box">
  <div id="app"></div>
</div>
```

方式二实现代码：

```html
<style>
  #box {
    width: 300px;
    height: 300px;
    background-color: #fe9;
    /* 父元素设置 position 为 relative */
    position: relative;
  }
  #app {
    /* 如果子元素不设置 width 和 height，子元素将占满父元素 */
    width: 100px;
    height: 100px;
    background-color: #3af;
    /* 子元素设置 position 为 absolute */
    position: absolute;
    /* 将子元素的四个定位属性值全置为 0 */
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    /* 设置 margin 为 0 */
    margin: auto;
  }
</style>

<div id="box">
  <div id="app"></div>
</div>
```

### 四、position + transform 实现元素居中

与**二**的方法一类似，只是更换了最后移动子元素的方式，不过当**子元素的尺寸未知**时，此方法也生效。

实现代码：

```html
<style>
  #box {
    width: 300px;
    height: 300px;
    background-color: #fe9;
    /* 父元素设置 position 为 relative */
    position: relative;
  }
  #app {
    width: 100px;
    height: 100px;
    background-color: #3af;
    /* 子元素设置 position 为 absolute */
    position: absolute;
    /* 子元素顶边与左边距分别为父元素高度和宽度的一半 */
    top: 50%;
    left: 50%;
    /* 平移子元素的高度和宽度一半的负值 */
    transform: translate(-50%, -50%);
  }
</style>

<div id="box">
  <div id="app"></div>
</div>
```

### 五、table-cell + margin 实现元素居中

实现代码：

```html
<style>
  #box {
    width: 300px;
    height: 300px;
    background-color: #fe9;
    /* 父元素设置 display 为 table-cell */
    display: table-cell;
    /* 父元素设置 vertical-align 为 middle 实现子元素垂直居中 */
    vertical-align: middle;
  }
  #app {
    width: 100px;
    height: 100px;
    background-color: #3af;
    /* 子元素设置 margin 为 0 auto 实现子元素水平居中 */
    margin: 0 auto;
  }
</style>

<div id="box">
  <div id="app"></div>
</div>
```

### CSS 元素居中最佳实践

1. 一般而言，各种居中需求，包括**同时**要求**水平和垂直**居中，都可以使用 `Flex` 布局来解决

```css
#box {
  display: flex;
  /* flex 默认主轴为水平方向（row），可通过 flex-dirction 修改 */
  flex-dirction: row;
  /* 设置垂直于主轴的对齐方式，默认情况下将子元素垂直居中 */
  align-items: center;
  /* 设置在主轴上的对齐方式，默认情况下将子元素水平居中 */
  justify-content: center;
}
```

> 仅**单独要求**垂直或者水平居中时，`flex` 依旧是一个最佳选择。

1. **仅**要求元素**水平居中**，可以考虑使用 `margin: 0 auto;`

```css
#box {
  /* 子元素设置 margin 为 0 auto */
  margin: 0 auto;
}
```

3. **仅**要求元素**垂直居中**，可以考虑使用 `display: table-cell;`

```css
#box {
  /* 父元素设置 display 为 table-cell */
  display: table-cell;
  /* 父元素设置 vertical-align 为 middle 实现子元素垂直居中 */
  vertical-align: middle;
}
```

4. 要求**文字**元素**水平居中**，可以设置 `line-height` 等于父元素高度

```css
p {
  /* 设置 line-height 等于父元素高度 */
  line-height: 120px;
}
```

## CSS 浮动

目前布局使用的最多的是 `Flex`、`Grid` 和 `浮动`。

关于 CSS 浮动的详情可以参考 [float - MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/float)。

### 清除浮动

解决因元素浮动而导致的高度坍塌的措施：

- 使用伪元素清除浮动

```css
.clearfix::after {
  content: '';
  display: block;
  /* clear: both; 意味着块级元素的左边和右边都不能有浮动元素 */
  clear: both;
}
```

- 使用 `BFC`，父元素设置如下属性之一即可。

```css
.container {
  display: flex;
  display: table;
  display: table-cell;
  /* 等等... */
  overflow: hidden;
}
```

## Flex 布局

`Flex` 是 `Flexible Box` 的缩写，意为**弹性布局**，用来为盒状模型提供最大的灵活性。

![image.png](https://s2.loli.net/2022/02/22/cOazUb4YiTEo9fl.png)

教程参考：

- [Flex 布局教程：语法篇 - 阮一峰](https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
- [Flex 布局教程：实例篇 - 阮一峰](https://www.ruanyifeng.com/blog/2015/07/flex-examples.html)

## Grid 布局

网格布局（`Grid`）是**最强大**的 `CSS` 布局方案。

它将网页划分成一个个网格，可以任意组合不同的网格，做出各种各样的布局。以前，只能通过复杂的 `CSS` 框架达到的效果，现在浏览器内置了。

![image.png](https://s2.loli.net/2022/02/22/2CnjXk5wm4tSKIL.png)

`Grid` 布局与 `Flex` 布局有一定的相似性，都可以指定容器内部多个项目的位置。但是，它们也存在重大区别。

`Flex` 布局是轴线布局，只能指定"项目"针对轴线的位置，可以看作是**一维布局**。`Grid` 布局则是将容器划分成"行"和"列"，产生单元格，然后指定"项目所在"的单元格，可以看作是**二维布局**。`Grid` 布局远比 `Flex` 布局强大。

教程参考：[CSS Grid 网格布局教程 - 阮一峰](https://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)
