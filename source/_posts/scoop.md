---
layout: post
title: scoop —— 实用的 windows 包管理软件
date: 2020-09-20
top_image: https://i.loli.net/2020/11/21/BZunq4vrKAHIj7P.png
excerpt: scoop可以提升你的windows开发体验
---

## 前言

我们都知道 Linux 有包管理的概念，即：可以在命令行下通过一系列的指令来统一管理程序，常见的使用情景包括: 搜索、安装、更新、卸载等。macOS 也有类似的包管理器（brew，homebrew 等）

借助包管理器，我们可以达到统一管理常用软件的目的。

### windows 平台弊端

讲真的，在 Mac 上写代码进行开发，体验是远超 windows 的，但是不是人人都买得起 Mac，在 windows 平台下进行开发是很多开发人员不得不面对的事实

可是，windows 目前的软件生态想必大家都很清楚，各种常用开发软件（git chrome python vscode 等等）安装方式层出不穷，安装更新卸载流程繁琐耗时且效率低下，安装路径各异污染目录，且得不到统一的管理

## 他来了 -- scoop

scoop 的出现，就是为了来解决上述问题的

简单地说，他将各种软件安装目录有序的堆放在一起，用户数据以及配置文件单独存放，更新时仅仅更新程序本身，极大的提高 windows 平台上管理软件的效率。

## 如何安装 scoop

请确保已经安装了：

- ① `PowerShell 5` (或更高版本，包括 `PowerShell Core`)
- ② `.net Framework 4.5` (或更高版本)。

> 现在大部分机子都上了 win10，系统大都符合要求，可以直接进行下面的操作

在终端运行下列命令（建议在当前用户根目录(C:\Users\\your_username)下）

```powershell
# 运行这条命令
Invoke-Expression (New-Object System.Net.WebClient).DownloadString('https://get.scoop.sh')

# 或者这条更短的命令
iwr -useb get.scoop.sh | iex
```

然后你就可以在终端中输入 `scoop` 命令来查看是否安装完成

如果你遇到错误，你可能需要改变执行策略，运行下列命令来启用 `powershell`

```powershell
Set-ExecutionPolicy RemoteSigned -scope CurrentUser
```

## scoop 使用

### 添加 bucket

bucket 可以简单理解为软件清单

只有当前添加的 bucket 里有的软件才可以下载

通过下面的命令添加常用的 bucket 来扩大你可以安装的软件类别和数目

```powershell
# 最常用的bucket
scoop bucket add extras
# 比较全的bucket
scoop bucket add extras
scoop bucket add dorado https://github.com/chawyehsu/dorado
scoop bucket add sushi https://github.com/kidonng/sushi
...
```

### 搜索软件

这条命令会在已经加入的 bucket 里搜寻合适的软件并打印出来

```powershell
scoop search neteasemusic # 搜索网易云音乐
```

### 安装软件

```powershell
scoop install APP_NAME
```

以下列出了常用的程序的安装命令

> 必须先装 `7zip`，安装包的解压依靠它

```powershell
# 推荐安装的常用程序（须先加extras的bucket）
scoop install 7zip git googlechrome vscode nodejs yarn postman everything sharex quicklook telegram
# 个人使用的软件（须先加extras、dorado和nonportable的bucket）
scoop install 7zip git googlechrome vscode yarn v2rayn sharex nodejs quicklook dismplusplus postman telegram oh-my-posh pscolor posh-git mactype-np neteasemusic everything mysql adb sudo nginx
```

### 卸载软件

```powershell
scoop uninstall APP_NAME
```

### 更新软件

```powershell
scoop update APP_NAME
# 一般都全部更新，用 * 通配符匹配所有
scoop update *
```

### 清理缓存（下载的安装包等）

```powershell
scoop cache rm *
```

### 清理已安装软件残留的旧版本

更新程序后，旧版本的程序默认是保留的，可以手动清理

```powershell
scoop cleanup *
```

### 切换版本

当安装的软件有多个版本，且都需要同时使用时，可以参考下面设置两个 nodejs 版本共存与切换类似的方法

- 先安装所需的版本

```powershell
scoop install nodejs12
scoop install nodejs # 此时默认的node -v输出的是最新版本
```

- 设置需要的版本 / 版本切换

因为 nodejs12 和最新版共用 node 这个命令，只需要执行 reset 加对应的版本就能够将该命令设置为指定版本

切换为 nodejs 12 版本

```powershell
scoop reset nodejs12
```

切换为 nodejs 最新版本

```powershell
scoop reset nodejs
```

### 忽略更新

通常我们会使用下面的命令来更新所有通过 scoop 下载的软件

```powershell
scoop update *
```

但是有时候我们不想让其中某个软件更新，这个时候就需要用到 hold/unhold 命令

```powershell
scoop hold postman # 更新软件时禁止 postman 更新
scoop unhold postman # 取消禁止
```
