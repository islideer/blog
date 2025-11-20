---
layout: 'post'
title: 'CSS 样式隔离与性能优化'
date: 2022-02-21
top_image: 'https://s2.loli.net/2022/02/21/N6ljREPqY9n4wes.png'
excerpt: '简单介绍了 CSS 的发展历史、样式隔离方案与常见的性能优化手段。'
---


CSS 的发展历程：

- 手写原生 CSS 规则，代表：[`BEM` 命名法](http://getbem.com/introduction/)
- 预处理器 [`Sass`](https://sass-lang.com/)、[`Less`](https://lesscss.org/) 和 [`Stylus`](https://stylus-lang.com/) 等
- 后处理器 [`PostCSS`](https://postcss.org/)，插件式，如 [`autoprefix`](https://github.com/postcss/autoprefixer)
- `CSS Modules`，需要搭配 [`webpack`](https://webpack.js.org/)、[`Gulp`](https://gulpjs.com/) 或 [`Parcel`](https://parceljs.org/) 等构建工具
- `CSS in JS`，代表：基于 `React` 的 [`styled-component`](https://github.com/styled-components/styled-components)

原生的 CSS 规则是全局生效的。为了避免样式冲突，出现了很多种解决方案。

### BEM 命名法

为了从开发层面上避免命名冲突问题，同时让类名更有意义，获得更多的描述和更加清晰的结构，从其名字可以知道某个标记的含义，让 CSS 更具可读性，出现了 `BEM` （即：`Block`、`Element`、`Modifier`，由 Yandex 团队提出）前端 CSS 命名规范：

- `-` 中划线：仅作连字符使用，表示某个块、子元素的**多单词**之间的连接记号
- `__` 双下划线：双下划线用来连接块和块的子元素
- `--` 双中划线：双中划线用来描述、修饰元素的状态、种类等

```css
/* Block 可以理解为开发的单个组件、模块（Component） */
.article-detail {
  display: flex;
}

/* Element 是 Block 的组成部分 */
.article-detail__button {
  width: 120px;
  height: 36px;
}

/* Modifier 用来描述、修饰元素的状态、种类等 */
.article-detail__button--primary {
  color: #fff;
  background-color: #3af;
}
```

但缺点也很明显，`BEM` 命名方式手写很繁琐，开发效率低，难以维护。

### CSS Modules

`CSS Modules` 实质上还是 CSS 文件，它不能单独使用，需要搭配打包构建工具使用。它赋予了原生 CSS 许多新的[特性](https://github.com/css-modules/css-modules)：

- 支持显式的编写**局部**与**全局** CSS 规则
- 允许以**模块**的方式被加载和使用到 `JS` 文件当中
- 打包时会将类名转换成**哈希值**，杜绝 CSS 类名冲突

```css
/* style.css */
.className {
  color: green;
  background: red;
}
.otherClassName {
  /* 支持样式组合（composes） */
  composes: className;
  color: yellow;
}
.otherClassName {
  /* 支持从其他文件导入 */
  composes: className from './style.css';
}
/* 以上样式，默认是局部作用域 */

/* 局部作用域 */
:local(p) {
  color: #333;
}
/* 全局作用域 */
:global(p) {
  color: #333;
}
```

```js
import styles from './style.css'
// import { className } from "./style.css";
element.innerHTML = '<div class="' + styles.className + '">'
// element.innerHTML = '<div class="' + styles['class-name'] + '">';
```

搭配 `webpack` 使用，配置如下：

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: {
          loader: 'css-loader',
          options: {
            modules: {
              // 自定义 hash 名称，可用变量
              localIdentName: '[path][name]__[local]--[hash:base64:5]'
            }
          }
        }
      }
    ]
  }
}
```

打包后的效果（类名被转换为自定义的哈希名称格式）：

```css
._2DHwuiHWMnKTOYG45T0x34 {
  color: red;
}

._10B-buq6_BEOTOl9urIjf8 {
  background-color: blue;
}
```

### Sass、Less 和 Stylus

为了方便前端开发人员编写 CSS，出现了很多**预处理器**：

- [`Sass`](https://sass-lang.com/)
- [`Less`](https://lesscss.org/)
- [`Stylus`](https://stylus-lang.com/)

总的来说，他们除了部分语法和特性的差异之外，大都具有以下特征：

- 默认局部作用域
- 支持嵌套规则
- 支持样式组合、继承
- 支持同一预处理器的外部样式文件引入（`@import`）
- 允许使用变量、函数（颜色函数等）
- 打包编译会将类名做哈希处理，不存在冲突问题

除了这些，不同的预处理器还具有**条件语句**、**循环语句**等不同的特性，详情参考对应预处理器文档。

这里需要注意一点，如果 `@import` 引入的是原生的 CSS 格式文件，那就会额外产生 `http` 请求。

而预处理器中的 `@import` 只要是引入对应预处理器的文件，是在语法语义层面引入，而不是引入原生 CSS，那就会在打包编译时被处理，最后只生成一个 CSS 文件，**不会**增加 `http` 请求。

```css
/* 引入原生 CSS，会增加 http 请求 */
@import 'reset.css';

/* 预处理器格式，less 为对应预处理器的文件拓展名，如 scss，styl */
/* body.less */
body {
  background: #eee;
}
/* style.less */
@import 'body.less';
```

### PostCSS

随着前端工程化的不断发展，越来越多的工具被开发出来，希望把所有重复性的工作都交给构建工具去完成，在 CSS 领域，`PostCSS` 兴起了。

关于 `PostCSS`，有一句话我觉得说的非常在理：

> `PostCSS` 可以被称为 CSS 界的 `Babel`。

`PostCSS` 通过分析 CSS 的语法树（`AST`），并对分析结果进行处理来完成一系列在前端开发者看来十分繁琐复杂的工作。常见的使用场景有：

- 搭配语言语法校验工具实现语法错误检测，如 [stylelint](https://stylelint.io/)
- 将 CSS 下一代版本的语法规则做**转译**（`Transpilers`）和**兼容**（`polyfill`）处理
- 搭配插件实现特定功能，比如使用 [`autoprefix`](https://github.com/postcss/autoprefixer) 实现自动添加浏览器前缀的功能

## 关于 CSS 层面的性能优化

常见的 CSS 性能优化的方式：

- **减少文件拆分**，请求多个 CSS 文件时会受到网络因素的制约
- 减少 CSS 嵌套，建议不超过三层
- 删除不必要的 CSS 选择器，合理选用 CSS 选择器，比如：**id 选择器**前无需再添加其他选择器
- 多复用同类元素的样式，如 `button`、`input` 元素等
- 减少**通配选择器**（`*`）与**属性选择器**（`[name=nav]`）的使用，这类选择器通常需要遍历所有元素
- 删除**无效、重复**的样式，比如：部分属性拥有继承的特点，如果父元素定义了，子元素就无需再次设置
- 分离页面间公共的 CSS 规则成单独的 CSS 文件，比如 `normalize.css`，浏览器只需加载一次（下次使用缓存）
- 多使用 `CSS Sprite`（或者叫做**精灵图**、**雪碧图**），减少图片、图标的请求次数
- 使用 CSS 压缩工具或者项目的编译打包工具对 CSS 进行压缩优化处理
- 减少 `@import` 的使用，会产生额外的请求且会影响加载的顺序（CSS 预处理语言除外）
- 减少**大幅频繁**的**布局重排**（窗口、元素、文字的大小改变、布局切换、尺寸计算等），减少渲染消耗
- 避免使用 `JS` 改变单条 CSS 样式，如是必要，可以先定义 CSS 类，然后通过改变类名来改变样式
- 减少使用**复杂、性能要求高**的 CSS 动画
