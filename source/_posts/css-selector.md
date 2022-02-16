---
layout: post
title: CSS 选择器
date: 2022-2-16
top_image: https://s2.loli.net/2022/02/16/lY6SWmJujVFOeqz.png
excerpt: 选择器是 CSS 规则的一部分，位于 CSS 声明块前。
---

选择器是 CSS 规则的一部分，位于 CSS 声明块前。它是元素和其他部分组合起来告诉浏览器哪个 HTML 元素应当是被选为应用规则中的 CSS 属性值的方式。

![image.png](https://s2.loli.net/2022/02/16/grAe6BM4mC2Tzdh.png)

### 类型（标签）、类和 ID 选择器

```css
a {
  text-decoration: none;
}
.box {
  border: 1px solid #3af;
}
#name {
  border-radius: 4px;
}
```

### 标签属性选择器

```css
a[title] {
  color: #3af;
}
/* 地址包含 viki 的链接，不区分大小写 */
a[href$='viki' i] {
  color: red;
}
```

### 伪类、伪元素选择器

**伪类**选择器：指定要选择的元素的**特殊状态**。

```css
a:hover {
  color: #3af;
}
```

常见伪类：

```css
/*
常用于 a 链接的几个伪类，使用顺序不能乱
记为 LVHA（love -> hate，由爱生恨）
*/
a:link
a:visited
a:hover
a:active

/* 选中一个 div 类型的元素，并且要求该元素的状态为：在兄弟元素里是第一个元素，last 类似 */
div:first-child
/* 选中一个 div 类型的元素，并且要求该元素的状态为：在兄弟元素里是第一个 div 类型的元素，last 类似 */
div:first-of-type
/* 选中一个 div 类型的元素，并且要求该元素的状态为：在兄弟元素里是唯一的元素 */
div:only-child
/* 选中一个 div 类型的元素，并且要求该元素的状态为：在兄弟元素里是唯一的 div 类型的元素 */
div:only-of-type


/* 选中一个 div 类型的元素，并且要求该元素的状态为：不包含 .not 类 */
div:not(.not)
/* 选中一个 div 类型的元素，并且要求该元素的状态为：在兄弟元素里是第二个元素 */
div:nth-child(2)
/* 选中多个 div 类型的元素，并且要求该元素的状态为：在兄弟元素里是第1、3、5... 个元素，其他规律的类似，奇数 odd，偶数 even */
div:nth-child(2n+1)
div:nth-child(even)

/*
:nth-of-type(an+b) 与 nth-child 类似，只不过 type 要求类型
:nth-last-child(an+b) 与 nth-child 类似，只不过从后开始计数
*/

/* 选中带有 lang 属性，且值为 python 的元素 */
span:lang(python)
/* 选中元素所在文档的根元素 */
div:root
/* 选中没有子元素的元素 */
div:empty
/* 选中被选中的单选框或复选框 */
input:checked
/* 选中启用的单选框或复选框 */
input:enabled
/* 选中禁用的单选框或复选框 */
input:disabled
/* 选中指定了 max 与 min 值的编辑框的值在范围内的元素 */
input:in-range
/* 选中指定了 max 与 min 值的编辑框的值在范围外的元素 */
input:out-of-range
/* 选中表单元素中无效值的元素 */
input:invalid
/* 选中表单元素中有效值的元素 */
input:valid
/* 选中获得焦点的元素 */
input:focus
```

> 所有伪类参考：[标准伪类索引 - MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-classes#%E6%A0%87%E5%87%86%E4%BC%AA%E7%B1%BB%E7%B4%A2%E5%BC%95)

**伪元素**选择器：允许对被选择元素的**特定部分**修改样式，不能匹配任何真实存在的 html 元素，选中的都是**虚拟元素**。

```css
h2::before {
  content: '#';
  color: #3af;
}
```

常见伪元素：

```css
/*
创建一个伪元素，作为已选中元素的第一个子元素，after 是最后一个。
通常配合 content 属性来添加装饰内容，这个虚拟元素默认是行内元素。
*/
div::before
div::after

/* 选中块级元素第一行第一个字母，所处行前无其他内容（图片表格等） */
div::first-letter
/* 选中块级元素的第一行，取决于元素宽度，文档宽度和文字大小等 */
div::first-line
/* 选中文档中被用户高亮的部分 */
div::selection
/* 实验性功能，选中表单元素的占位文本 */
div::placeholder
```

> 所有伪元素参考：[标准伪元素索引 - MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-elements#%E6%A0%87%E5%87%86%E4%BC%AA%E5%85%83%E7%B4%A0%E7%B4%A2%E5%BC%95)

### 后代、子代选择器

后代选择器：选中所有后代元素（直接与间接）

```css
li {
  /* 一级列表采用实心圆风格 */
  list-style-type: disc;
}
/* 后代选择器 */
li li {
  /* 所有二级及更多层的列表将会换为空心圆风格 */
  list-style-type: circle;
}
```

子代选择器：选中所有直接后代元素

```html
<style>
  span {
    background-color: white;
  }
  div > span {
    background-color: orange;
  }
</style>
<div>
  <span>我是橙色背景 <span>我是白色背景</span> </span><span>我是橙色背景</span>
</div>
<span>我也是白色背景</span>
```

### 相邻、通用兄弟选择器

相邻兄弟选择器：同一层级紧挨着的元素被选中

```css
/* 图片后面紧跟着的段落将被选中 */
img + p {
  font-style: bold;
}
```

通用兄弟选择器：同一层级后面的所有元素都会被选中

```css
/* p 之后，同一层级的所有 span 标签都会被选中 */
p ~ span {
  color: red;
}
```

### 通配选择器

```css
/* 选择所有元素 */
* {
  margin: 0;
  padding: 0;
}
```

![image.png](https://s2.loli.net/2022/02/16/v9MONfgh8RVJxu1.png)
