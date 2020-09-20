---
layout: post
title: scoop —— 实用的 windows 包管理软件
date: 2020-9-20
top_image: https://www.multmax.top/images/2020/09/20/scoop-logo.png
excerpt: scoop可以提升你的windows开发体验
---
## 前言 

### 包管理的概念

使用过 Linux 的伙伴都知道 Linux 有包管理的概念

即：可以在命令行下通过一系列的指令来统一管理程序

常见的使用情景包括: 搜索、安装、更新、卸载等

macOS 也有类似的包管理器（brew，homebrew 等）

借助包管理器，我们可以达到统一管理常用软件的目的

### windows 平台弊端

但是, 不是人人都~~是马化腾~~有 mac 的, 所以在 windows 平台下进行开发是很多开发人员不得不面对的事实

可是 ，windows 目前的软件生态想必大家都很清楚，各种常用开发软件（git chrome python vscode 等等）安装方式层出不穷，安装更新卸载流程繁琐且效率低下，安装路径各异，且得不到统一的管理

## scoop

scoop 的出现，就是为了来解决这个问题的

简单地说，他将各种软件安装目录有序的堆放在一起，用户数据以及配置文件单独存放，更新时仅仅更新程序本身，极大的提高了 windows 平台上管理软件以及开发的效率。

## 安装 scoop

请确保已经安装了：

- ① `PowerShell 5` (或更高版本，包括 `PowerShell Core`)
- ② `.net Framework 4.5` (或更高版本)。

> 近两年家用 win10 系统都符合要求，可以直接进行下面的操作

在终端运行下列命令（建议在当前用户目录下）

```powershell
# 运行这条命令
Invoke-Expression (New-Object System.Net.WebClient).DownloadString('https://get.scoop.sh')

# 或者运行这条更短的命令
iwr -useb get.scoop.sh | iex
```

然后你就可以在终端中输入 `scoop` 来查看是否安装完成

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
```

### 安装程序

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

### 卸载程序

```powershell
scoop uninstall APP_NAME
```

### 更新程序

```powershell
scoop update APP_NAME
# 一般都全部更新，用 * 通配符匹配所有
scoop update *
```

### 清理缓存（下载的安装包等）

```powershell
scoop cache rm *
```

### 清理旧版本

更新程序后，旧版本的程序默认是保留的，可以手动清理

```powershell
scoop cleanup *
```
