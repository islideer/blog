---
layout: 'post'
title: '了解 SVG 格式'
date: 2020-02-16
top_image: 'https://i.loli.net/2020/11/21/8SGjpezdYDC4PE1.gif'
excerpt: '寒假学习之 SVG 介绍'
---

## SVG 介绍

### 什么是 SVG？

**一种图像文件格式**，英文全称 Scalable Vector Graphics，意为**可缩放的矢量图形**。

它是基于 XML（Extensible Markup Language），由 World Wide Web Consortium（W3C）联盟进行开发的。严格来说应该是一种开放标准的矢量图形语言，可让你设计激动人心的、高分辨率的 Web 图形页面。用户可以直接**用代码来描绘图像**，可以用**任何文字处理工具打开 SVG 图像**，通过改变部分代码来使图像具有交互功能，并可以随时插入到 HTML 中通过浏览器来观看。

主流浏览器均支持 SVG。**加载慢**是 SVG 的一个缺点。但是 SVG 也有自身的优点，比如它**实现了 DOM 接口**（比 Canvas 方便），**不需要安装第三方插件**就可以在浏览器中使用（比 Flash 方便）。

### 为什么要用 SVG ？

相比于其他图像格式，SVG 格式的优势在于：

- SVG 可被非常多的工具读取和修改（比如记事本）
- SVG 与 JPEG 和 GIF 图像比起来，**尺寸更小**，且可压缩性更强。
- SVG 是可伸缩的
- SVG 图像可在任何的分辨率下被高质量地打印
- SVG 可在图像质量不下降的情况下被放大
- SVG 图像中的**文本**是**可选**的，同时也是**可搜索**的（**很适合制作地图**）
- SVG 可以**与 JavaScript 技术一起运行**
- SVG 是开放的标准
- SVG 文件是纯粹的 XML

#### SVG 与 Flash

与 Flash 相比，SVG 最大的优势是与其他标准（比如 XSL 和 DOM）相兼容。而 Flash 则是未开源的私有技术。

### 基础

#### 一个简单的例子

```html
<svg
  version="1.1"
  baseProfile="full"
  width="300"
  height="200"
  mlns="http://www.w3.org/2000/svg"
>
  <rect width="100%" height="100%" fill="red" />
  <circle cx="150" cy="100" r="80" fill="green" />
  <text x="150" y="125" font-size="60" text-anchor="middle" fill="white">
    SVG
  </text>
</svg>
```

最后样子是这样的 👉 [链接 🔗](https://media.prod.mdn.mozit.cloud/attachments/2012/07/09/3075/89b1e0a26e8421e19f907e0522b188bd/svgdemo1.xml)

该图绘制流程包括以下几步：

1. 从 SVG 根元素开始：
  - 应舍弃来自 (X)HTML 的 doctype 声明，因为基于 SVG 的 DTD 验证导致的问题比它能解决的问题更多。
  - `version`和`baseProfile`属性是必不可少的，供其它类型的验证方式确定 SVG 版本。
  - 作为 XML 的一种方言，SVG 必须正确的绑定命名空间 （在 xmlns 属性中绑定）。
2. 绘制一个完全覆盖图像区域的矩形 ，把背景颜色设为红色。
3. 一个半径 80px 的绿色圆圈绘制在红色矩形的正中央 （向右偏移 150px，向下偏移 100px）。
4. 绘制文字“SVG”。文字被填充为白色， 通过设置居中的锚点把文字定位到期望的位置：在这种情况下，中心点应该对应于绿色圆圈的中点。还可以精细调整字体大小和垂直位置，确保最后的样式是美观的。

> 想了解更多？请参考文末详细教程

### 现实中的使用

#### 直接嵌入 SVG 代码在网页中使用：

```html
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <circle
  cx="100"
  cy="50"
  r="40"
  stroke="black"
  stroke-width="2"
  fill="red"
  />
</svg>
  ```

可以像上述这样，直接将 svg 标签嵌入到 html 当中引入 svg 图片

> 其他用 embed iframe object 标签引的入方法此处不作介绍，有兴趣自行搜索相关用法。

#### 用 a 标签链接到 SVG 文件

```html
<a href="circle1.svg">Click here to view SVG file</a>
```

#### SVG 也可以作为本地的一种图片格式文件

如，新建一个 `demo.svg` 文件，然后写入以下内容

```xml
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <circle cx="100" cy="50" r="40" stroke="black"
  stroke-width="2" fill="red" />
</svg>
```

他在资源管理器中默认的显示图标像一个链接，双击这个文件即可调用浏览器来打开并渲染出该图。

#### SVG 在网页中还可充当**图标**来使用

SVG 在网页设计中的一种重要的用途就是充当图标

可以作为图片用 css 直接引入并使用，如下示例

```css
#email {
  background: url(./img/email.svg) 12px 7px no-repeat;
  background-size: 20px 20px;
  // 在这设置图标大小，不设置就是svg默认的宽高
}
```

#### 制作高质量的图片

另外，由于其可无限缩放而保持原有质量的特点，SVG 图还常常用作网页的图片素材，以确保在网站被异常缩放后图片仍能保持高质量。

### 更多

SVG 是一个庞大的规范，想了解更多的绘画方法请访问 👉 [SVG 教程- MDN](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial)

### 参考文章

- [SVG 教程- MDN](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial)
- [svg 格式 - 百度百科](<[https://baike.baidu.com/item/SVG%E6%A0%BC%E5%BC%8F/3463453?fr=aladdin](https://baike.baidu.com/item/SVG格式/3463453?fr=aladdin)>)
