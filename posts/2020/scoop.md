---
layout: post
title: Scoop —— 实用的 Windows “包管理”软件
date: 2020-09-20
top_image: https://i.loli.net/2020/11/21/BZunq4vrKAHIj7P.png
excerpt: 使用 Scoop 提升你的 Windows 开发体验
---

## 前言

我们都知道 Linux 有包管理的概念，即：可以在命令行下通过一系列的指令来统一管理程序，常见的使用情景包括: 搜索、安装、更新、卸载等。

macOS 也有类似的包管理器，如 `brew`，`homebrew` 等

借助包管理器，我们可以达到统一管理常用软件的目的。

### Windows 平台弊端

Windows 目前的软件生态想必大家都很清楚，各种常用软件，比如：`Git`, `Chrome`, `VS code`, `7zip`, `网易云音乐` 等，安装方式比较多，位置杂乱，安装更新卸载流程繁琐耗时且效率低下，安装路径各异污染目录，且得不到统一的管理。

## 他来了 -- Scoop

Scoop 的出现，就是为了来解决上述问题的，简单地说，他将各种软件安装目录有序的堆放在一起，用户数据以及配置文件单独存放，更新时仅仅更新程序本身，极大的提高 Windows 平台上管理软件的效率。

## 如何安装 Scoop

请确保已经安装了：

- ① `PowerShell 5` (或更高版本，包括 `PowerShell Core`)
- ② `.net Framework 4.5` (或更高版本)。

> 现在大部分机子都上了 win10，系统大都符合要求，可以直接进行下面的操作

在终端运行下列命令（建议在当前用户根目录(C:\Users\\your_username)下）

```powershell
# 运行这条命令
Invoke-Expression (New-Object System.Net.WebClient).DownloadString('https://get.Scoop .sh')

# 或者这条更短的命令
iwr -useb get.Scoop .sh | iex
```

然后你就可以在终端中输入 `Scoop ` 命令来查看是否安装完成

如果你遇到错误，你可能需要改变执行策略，运行下列命令来启用 `PowerShell`

```powershell
Set-ExecutionPolicy RemoteSigned -scope CurrentUser
```

## Scoop 使用

### 添加 bucket

`bucket` 可以简单理解为软件清单

只有当前添加的 `bucket` 里有的软件才可以下载

通过下面的命令添加常用的 `bucket` 来扩大你可以安装的软件类别和数目

```bash
# 最常用的bucket
scoop bucket add extras
# 比较全的bucket
scoop bucket add extras
scoop bucket add dorado https://github.com/chawyehsu/dorado
scoop bucket add sushi https://github.com/kidonng/sushi
...
```

### 搜索软件

这条命令会在已经加入的 `bucket` 里搜寻合适的软件并打印出来

```bash
scoop search neteasemusic # 搜索网易云音乐
```

### 安装软件

```bash
scoop install <name>
```

以下列出了常用的程序的安装命令

> 必须先装 `7zip`，安装包的解压依靠它

```bash
# 推荐安装的常用程序（须先加 extras 的 bucket）
scoop install 7zip git googlechrome vscode nodejs yarn postman everything sharex quicklook telegram
# 个人使用的软件（须先加 extras、dorado 和 nonportable 的 bucket）
scoop install 7zip git googlechrome vscode yarn v2rayn sharex nodejs quicklook dismplusplus postman telegram oh-my-posh pscolor posh-git mactype-np neteasemusic everything mysql adb sudo nginx
```

### 卸载软件

```bash
scoop uninstall <name>
```

### 更新软件

```bash
scoop update <name>
# 一般都全部更新，用 * 通配符匹配所有
scoop update *
```

### 清理缓存（下载的安装包等）

```bash
scoop cache rm *
```

### 清理已安装软件残留的旧版本

更新程序后，旧版本的程序默认是保留的，可以手动清理

```bash
scoop cleanup *
```

### 切换版本

当安装的软件有多个版本，且都需要同时使用时，可以参考下面设置两个 nodejs 版本共存与切换类似的方法

- 先安装所需的版本

```bash
scoop install nodejs12

scoop install nodejs
```

此时默认的 `node -v` 输出的是最新版本

- 设置需要的版本 / 版本切换

因为 `node12` 和最新版共用 `node` 这个命令，只需要执行 `reset` 加对应的版本就能够将该命令设置为指定版本

切换为 `node12` 版本

```bash
scoop reset nodejs12
```

切换为 `node` 最新版本

```bash
scoop reset nodejs
```

### 忽略更新

通常我们会使用下面的命令来更新所有通过 Scoop 下载的软件

```bash
scoop update *
```

但是有时候我们不想让其中某个软件更新，这个时候就需要用到 `hold/unhold` 命令

```bash
# 更新软件时限制 Postman 更新
scoop hold postman

# 解除更新限制
scoop unhold postman
```
