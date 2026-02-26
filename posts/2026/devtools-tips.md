---
title: '你不知道的 Chrome DevTools'
date: 2026-02-26
excerpt: '偶然间逛到 Chrome DevTools 官方文档，发现了很多非常骚的小功能、小技巧。特地码了篇文章给自己加强印象，顺便给大家也科普、巩固一下。'
tags:
  - 'DevTools'
  - '前端开发'
  - '调试技巧'
  - '性能优化'
  - '浏览器'
top_image: 'https://image.viki.moe/blog/96fbf0.png'
---

偶然间逛到 [Chrome DevTools 官方文档](https://developer.chrome.com/docs/devtools?hl=zh-cn)，发现了很多非常骚的小功能、小技巧。其中很多完全没有用过，甚至根本没有听说过。特地码了篇文章给自己加强印象，顺便给大家也科普、巩固一下。

## 隔壁大妈都知道的 DevTools 功能

首先说一些大家都知道的基础功能热热身：

- Element 面板: 查看/修改 HTML 的结构/样式，实时预览。
- Console 面板: 看报错和警告、跑跑简单 JS，`clear()` 清空。
- Network 面板: 查看网络请求、分析/重写响应、模拟慢速/无网环境。
- Sources 面板: 调试源码、设置断点、查看调用栈和变量。
- 切换设备模式: 模拟不同屏幕尺寸、分辨率、用户代理（UA）。

## 你可能不知道的 DevTools 骚功能

### 1. `$_` 和 `$0`、`$1` 等快捷变量

在 Console 面板中，`$_` 代表上一个表达式的结果，适合连续操作。比如你在 Console 中执行了一个查询，想要对结果进行进一步操作，就可以直接使用 `$_`。

![51331a.png](https://image.viki.moe/blog/51331a.png)

`$0`、`$1`、`$2`、`$3`、`$4` 这五个变量则是分别代表 Elements 面板中最近选中的元素及其前一个、前两个元素，后续依次类推。这可以让你不写 `document.querySelector()` 就能快速访问这些元素，非常方便。

![8cb772.png](https://image.viki.moe/blog/8cb772.png)

### 2. `copy()` 打头阵的多个实用函数

在 Console 面板中，`copy(someValue)` 可以将 `someValue` 的内容以合适的字符串格式复制到剪贴板。对于对象，则会以 JSON 格式复制，非常实用。

![7b4f4c.png](https://image.viki.moe/blog/7b4f4c.png)

其他实用函数还包括：

- `inspect()`: 跳转到 Elements 面板中查看某个 DOM 元素
- `monitor()`, `debug()`: 监视函数调用、调试函数执行
- `table()`, `dir()`: 多种格式输出变量，方便查看
- `keys()`, `values()`: 获取对象的键或值列表

### 3. `$()` 和 `$$()` 快速选取元素

看到这个是不是想起了 jQuery？

我猜你之前肯定手动写过不少 `document.querySelector()`。但实际上你可以直接在 Console 面板中使用 `$()` 来选择单个元素，使用 `$$()` 来选择多个元素。

![297488.png](https://image.viki.moe/blog/297488.png)

### 4. `time()` 和 `timeEnd()` 计时函数

如果你需要看看某段代码跑了多久，你就可以用到这两兄弟了。`console.time('label')` 开始计时，`console.timeEnd('label')` 结束计时并输出结果。非常适合快速性能测试。

![970f4a.png](https://image.viki.moe/blog/970f4a.png)

### 5. 花里胡哨的日志样式

有两种方式实现，你可以借用 ANSI 转义序列，或者直接使用 CSS 样式。

CSS 样式有更多的发挥空间，可以设置颜色、字体、背景等各种样式，让你的日志看起来更有层次感，~~更炫酷、更亮眼、更装逼~~。

你可以尝试按 F12 打开控制台，复制下面的代码看看效果：

```js
// 使用 ANSI 转义序列
console.log('\x1b[31m红色字体的日志\x1b[0m');

// 使用 CSS 样式
console.log('%c炫酷吊炸天的日志', 'color: white; background: linear-gradient(90deg, #00f, #f0f); padding: 4px 8px; border-radius: 4px; text-shadow: 0 0 5px rgba(255, 255, 255, 0.5); animation: glow 1s infinite alternate;');
```

![c93e51.png](https://image.viki.moe/blog/c93e51.png)

### 6. 远程调试（Node.js、WebView 等环境通杀）

Chrome DevTools 还支持远程调试功能，可以连接到各种系统的 WebView、甚至是 Node.js 环境进行调试。这对于移动端开发或者调试特定环境下的代码非常有帮助。

只需要在地址栏输入 `chrome://inspect` 就可以看到可连接的设备和环境，按提示连接即可。

![8a5c46.png](https://image.viki.moe/blog/8a5c46.png)

> 多说一嘴，这些 `chrome://` 开头的都是 Chrome 内置的特殊页面，提供了各种功能和信息。类似的还有 `chrome://about`、`chrome://extensions` 等等。~~你要是闲的蛋疼，还可以打开 `chrome://dino` 玩玩离线页面的小恐龙游戏。~~

对于 Node.js，你可以在启动 Node.js 应用时加上 `--inspect` 参数，然后在 DevTools 中连接到对应的调试端口，就可以像调试前端代码一样调试你的后端代码了。

```bash
node --inspect your-script.ts
```

当然，如果你使用 VS Code，你也可以直接直接新建一个「JavaScript 调试终端」来调试 Node.js，享受 VS Code 深度整合带来更加友好的断点调试体验。

![9776d8.png](https://image.viki.moe/blog/9776d8.png)

### 7. 模拟媒体查询（浏览器内测试夜间模式）

模拟用户代理（UA）和网络环境我想大家都用烂了，但模拟媒体查询我猜你没用过。你可以切换到 Rendering 面板，通过调节不同的模拟选项，来测试暗黑模式、弱动画偏好等功能，也可以禁用 WebP/AVIF 等图片格式。

终于不用再像我一样手动到系统设置里傻乎乎地一次次切换了，像个笨蛋一样。

![ca0416.png](https://image.viki.moe/blog/ca0416.png)

### 8. 你的网页我说了算

在 Console 面板中输入下面这行神奇代码，你就是整个 Web 界最靓的仔：

```js
document.body.contentEditable = true
```

这行代码会让整个网页变得可编辑，你可以轻轻松松在网页上随意修改任意文本内容，无需复杂代码，无需打开 Element 面板。请注意，是任意（斜眼笑）。请马上打开你的支付宝余额页，把余额改成 9999999.99，截图发给老板，看看能不能给你涨工资。涨了 V 我 50，没涨别说是我教的。

![e0479e.png](https://image.viki.moe/blog/e0479e.png)

## 参考资料

- [Chrome DevTools 官方文档](https://developer.chrome.com/docs/devtools?hl=zh-cn)
