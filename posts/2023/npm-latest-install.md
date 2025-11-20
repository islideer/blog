---
layout: 'post'
title: '频繁发布 npm 包时如何确保始终安装最新版本'
date: 2023-03-26
excerpt: '由于缓存和网络延迟的影响，在安装和更新的时候，可能安装的不是最新版本的 npm 包。'
draft: true
---


在一些极端情况下可能需要频繁发布 npm 包，而 npm 默认的缓存时间是 5 分钟。也就是说，在五分钟之内只会请求一次 npm 包的元数据，如果在更新后五分钟之内再次发包，默认情况下是不会检测到新版本的。

这个时候，如果你搭配 ncu（npm-check-updates 包）更新了 package.json 里的包到最新版本的话，由于 npm 的缓存，执行 `npm i` 会显示找不到目标 npm 包的指定版本从而更新失败。

## 解决方案

**使用 `--prefer-online` 标志**

执行 npm install 或 npm update 时添加 --prefer-online 标志，设置优先从远程 registry 获取。

```bash
npm install --prefer-online xxx
```

要将 prefer-online 设置应用于项目范围内，可以在项目根目录下的 `.npmrc` 文件中添加以下设置：

```ini
prefer-online=true
```

类似的选项还有 `--prefer-offline` 等，`--cache-max=0` 选项其实是 `--prefer-online` 的 alias。

更多有关 npm config 的信息请参考 [npm doc](https://docs.npmjs.com/cli/v9/using-npm/config#prefer-online)。
