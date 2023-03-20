---
layout: post
title: 频繁发布时如何确保始终安装最新的 npm 包
date: 2023-03-20
excerpt: 由于缓存和网络延迟的影响，在安装和更新的时候，可能安装的不是最新版本的 npm 包。
---

在频繁发布软件包的项目中，保持使用最新版本的 npm 包至关重要。然而，由于缓存和网络延迟的影响，确保总是获取最新版本可能具有挑战性。本文将讨论一些方法，帮助您确保始终安装最新的 npm 包，即使在频繁发布的情况下。

方法 1：使用 --prefer-online 标志

在执行 npm install 或 npm update 时，可以添加 --prefer-online 标志来优先从远程 registry 获取包，而不是从本地缓存中获取：

```css
npm install <package_name> --prefer-online
```

要将 prefer-online 设置应用于项目范围内，请在项目根目录下的 .npmrc 文件中添加以下设置：

```javascript
prefer-online=true
```

这样，每次在项目中运行 npm install 或 npm update 时，npm 都会优先从远程 registry 获取包。

方法 2：更改缓存策略
通过运行 npm config set prefer-online true，您可以将优先使用在线源作为全局设置。这将对所有后续的 npm install 和 npm update 操作生效。要取消此设置，可以运行 npm config delete prefer-online。

方法 3：使用 npm outdated 检查更新
在安装或更新之前，可以运行 npm outdated 命令来检查哪些包有可用的更新。然后，您可以手动更新这些包，以确保始终安装最新版本。

方法 4：针对特定包使用 --prefer-online 标志
如果您只想针对特定的一组包使用 --prefer-online 标志，可以在安装这些包时单独添加该标志：

```sql
npm install specific-package1 --prefer-online
npm install specific-package2 --prefer-online
```

对于其他不符合该模式的包，可以正常使用 npm install 命令，这样它们会根据 npm 的默认设置来处理缓存和在线源。

结论

虽然 npm 默认配置在大多数情况下表现良好，但在频繁发布的项目中，始终安装最新版本的 npm 包可能具有挑战性。通过使用本文中介绍的方法，您可以提高安装最新版本包的可能性，从而确保项目始终使用最新的依赖。
