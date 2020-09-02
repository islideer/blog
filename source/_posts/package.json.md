---
layout: post
title: package.json 文件详解
date: 2020-4-23
excerpt: package.json 文件详解
---

此篇文章适合于对 `JavaScript` `nodejs` `npm` `json` 有一定了解，但不清楚 `package.json` 文件具体作用及其含义的读者

## 什么是 package.json 文件？😱

`nodejs` 的项目遵循**模块化**的架构，`package.json` 文件是用来**描述项目的相关信息**，便于 `npm`、`yarn` 等包管理工具对项目进行操作。简单的来理解，就是每个项目都可以被叫做“包”，`package.json` 则是用来描述包信息的一个文件，一般存在于项目的根目录下。

## 直接上个实例 🎉

`package.json` 文件本身是 `json` 文件，当然也遵循 `json` 的语法

> JSON 语法参考链接 => [JSON 基础语法 - 菜鸟教程](https://www.runoob.com/json/json-syntax.html)

```json
// package.json 文件内容

{
  "name": "demo", // 包名，必须，字母小写，无空格，下划线、横线可选
  "version": "1.1.0", // 版本号，必须
  "author": "Viki", // 作者信息
  "description": "source code repo", // 包描述
  "main": "main.js", // 入口文件
  "license": "MIT", // 遵循的协议
  "scripts": {
    // 自定义脚本
    "start": "react-native run-android" // 脚本示例
    // ... 其他自定义脚本
  },
  "dependencies": {
    // 生产依赖(项目正式上线时所依赖的包)
    "react": "^16.13.1" // 表示兼容 react 的16.13.1版本
    // ... 其他生产依赖
  },
  "repository": {
    // 项目仓库信息
    "type": "git",
    "url": "git@github.com:vikiboss/blog.git"
  },
  "devDependencies": {
    // 开发依赖(开发和测试环境中依赖的包)
    "@babel/core": "~7.0.0"
    // ... 其他开发依赖
  }
  // ... 以上是常见的描述信息，还可在此添加其他自定义的描述信息
}
```

## 它有什么用？🤔

它**配置和描述了该如何与项目进行交互、运行**。包管理器（`npm`、`yarn`等）也可以通过它来**识别项目并分析出如何处理项目的依赖关系**。当你执行`npm instal`或者`yarn`来安装依赖的时候，就是通过这个文件来识别。此外，如果你的项目需要发布到 `npm` 的 registry 上供别人使用，也需要通过这个文件来**提供项目的信息**。

> 在 npm 5.x 及以上还会生成一个package-lock.json文件，它用来描述更加确切的版本信息。package.json文件有缺陷，只能锁定大版本，也就是版本号的第一位，并不能锁定后面的小版本，每次npm install拉取的是该大版本下的最新的版本，为了稳定性考虑我们几乎是不敢随意升级依赖包的，这将导致多出来很多工作量，测试/适配等，所以package-lock.json文件出来了，当你每次安装一个依赖的时候就锁定在你安装的这个版本。

## 自定义字段 🎨

**package.json** 文件中的字段不是固定的。如果你要发布的话，那就只有 `name` 和 `version` 是必须的，其他可选，且**可以根据需要自定义添加**。需要的时候可被其他文件引用。如果不需要发布，则任何都是可选的，且建议将`private`字段设置为`true`并移除`main`入口，这样可以防止代码意外发布（示例在下方，加减分别代表增删）。

```json
  {
+   "private": true,
-   "main": "index.js",
  }
```



> 例如：博客项目可能还需要 `"title":"Viki's Blog"` 类似的字段

其他字段参考： `keywords`、`contributors`、`homepage`、`preferGlobal`、`style`、`bin`、`bugs`、`config`、`browser`、`engines`、`man`、`peerDependencies`

## 脚本（scripts）字段 👟

这个字段约定了什么时候用`npm start`，`npm run dev`应该执行什么，或者说它告诉了程序员`npm start`运行的是什么命令。使用的时候可根据需要在此自定义。

例如：若一个项目的 `package.json` 如下

```json
{
  "name": "demo",
  "version": "1.0.0",
  "scripts": {
    "start": "cd app && react-native run-android"
  }
}
```

则在项目路径下运行`npm run start`或者`yarn start`时，等效于执行`cd app`进入 `app` 目录，然后执行`react-native run-android`

## 版本描述方式 🔨

常见的版本描述方式有以下几种

| `具体的版本` | 比如`1.2.2`，遵循“**大版本.次要版本.小版本**”的格式规定，安装时只安装指定版本。                                                                                                                                                                   |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `~ + 版本`     | **比如`~1.2.2`，表示安装 1.2.x 的最新版本（不低于 1.2.2），但是不安装 1.3.x，也就是说安装时不改变大版本号和次要版本号。**                                                                                                                         |
| `^ + 版本`     | **比如`ˆ1.2.2`，表示安装 1.x.x 的最新版本（不低于 1.2.2），但是不安装 2.x.x，也就是说安装时不改变大版本号。需要注意的是，如果大版本号为 0，则插入号的行为与波浪号相同，这是因为此时处于开发阶段，即使是次要版本号变动，也可能带来程序的不兼容。** |
| `latest`     | **安装最新版本。**                                                                                                                                                                                                                                |

## 如何生成？🤒

- 手动写ㄟ( ▔, ▔ )ㄏ

新建一个文本文件并修改文件名和后缀名为`package.json`

- 自动生成(～￣▽￣)～

通过`npm init`新建，前提是已经配置好了 `npm` 的环境

## 想了解更多? 🙃

> 强烈推荐阅读 => [package.json 文件 - 阮一峰][1]

## 参考文章 👍

- [package.json 文件 - 阮一峰][1]

- [package.json - npm][2]

- [package.json 详解 - 拉勾][3]

- [package.json 详解 - 掘金][4]

[1]:https://javascript.ruanyifeng.com/nodejs/packagejson.html	"package.json 文件 - 阮一峰"
[2]:https://docs.npmjs.com/files/package.json	"package.json - npm"
[3]:https://www.lagou.com/lgeduarticle/43699.html	"package.json 详解 - 拉勾"
[4]:https://juejin.im/post/5ddf97986fb9a071ac1a0b09#heading-2	"package.json 详解 - 掘金"