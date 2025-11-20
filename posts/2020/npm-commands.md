---
layout: 'post'
title: '常用 npm 命令汇总'
date: 2020-09-07
top_image: 'https://i.loli.net/2020/11/21/1JObhHLDaNfFs3v.jpg'
excerpt: '总结了一些常用的 npm 命令，方便自己日后翻阅。'
---


小括号中的参数为可选项

### 更换为国内淘宝源（通过命令直接修改）

```bash
npm config set registry https://registry.npm.taobao.org
```

### 更换为国内淘宝源（通过编辑配置文件）

```bash
npm config edit 加入 registry = https://registry.npm.taobao.org
```

### 还原成默认国外源

```bash
npm config set registry https://registry.npmjs.org
```

### 查看当前源

```bash
npm config get registry
```

### 安装依赖

```bash
npm install (-g) package_name (--save / --save-dev) (--registry https://registry.npm.taobao.org)
```

### 移除依赖

```bash
npm uninstall (-g) package_name (--save / --save-dev)
```

### 更新依赖

```bash
npm update (-g) package_name
```

### 检查更新

```bash
npm outdated (-g --depth=0)
```

### 设置默认协议

```bash
npm set init.license "MIT"
```

### 设置默认作者昵称

```bash
npm set init.author.name "Viki"
```

### 设置默认作者邮箱

```bash
npm set init.author.email "hi@viki.moe"
```

### 查看项目主页(如果有的话，无则跳到项目仓库)

```bash
npm home package_name
```

### 查看项目仓库

```bash
npm repo package_name
```

### 移除无关依赖

```bash
npm prune (package_name) (--production)
```

### 清理缓存，一般不需要删，除非遇到错误 (npm < @5)

```bash
npm cache clean
```

### 清理缓存，一般不需要删，除非遇到错误 (npm > @5)

```bash
npm cache verify
```

### 查看项目依赖

```bash
npm ls (--depth 0)
```

### 查看当前的配置

```bash
npm config list
```

### 更新至最新的公测版本

```bash
npm install -g npm@latest npm
```

### 更新至最新的发布版本（比 latest 更新）

```bash
npm install -g npm@next npm
```

### 添加用户信息

```bash
npm adduser / npm login
```

### 添加配置信息

```bash
npm config set foo:port 80
```

## 关于 npm 链接

作者主页地址: [https://npmjs.com/~username](https://npmjs.com/~vikiboss)

> 如 vikiboss 主页: https://npmjs.com/~vikiboss

包主页地址: [https://npmjs.com/package/package_name](https://npmjs.com/package/axios)

> 如 axios 主页: https://npmjs.com/package/axios
