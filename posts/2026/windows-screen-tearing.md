---
title: 'Win 11 下浏览器等应用部分区域冻结无法滚动的问题及解决方案'
date: 2026-01-18
excerpt: '沟槽的微软 MPO，你知道我受了多大苦多大委屈吗？'
tags:
  - 'Windows'
  - 'MPO'
  - '屏幕卡住'
  - '浏览器'
  - '显卡驱动'
---

## 解决方案

先说解决方案，打开终端执行以下命令并重启电脑即可：

```ps1
reg add HKLM\SOFTWARE\Microsoft\Windows\Dwm /v OverlayTestMode /t REG_DWORD /d 5 /f
```

如果你不知道终端是什么，你也可以这样：

新建 `mpo_disable.reg` 文件，写入以下内容并保存，双击执行，重启电脑即可。

```ini
Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\Dwm]
"OverlayTestMode"=dword:00000005
```

如果你对问题的成因和我的心路历程感兴趣，可以继续往下看。

## 前言：我显卡要寄了？

最近 [把电脑重装到最新版本 25H2](https://blog.viki.moe/thoughts#74) 后，浏览器（Google、Brave 等）和 VS Code 老是出现页面局部区域卡住、冻结固定在屏幕上的问题，窗口却可以正常滚动，但就是这个卡住区域滑动不刷新，需要过好一会儿，或者手动双击 Win 键切一下才能恢复正常，而且每隔几分钟就会出现。

![tearing-demo](https://s2.loli.net/2026/01/18/OHKktyeJ39E4zbT.gif)

具体来说：

- 网页切换时，屏幕的一半或一小块区域仍然显示上一个网页内容
- 现象有点类似 Excel 的冻结窗格，但其余部分仍能正常滚动
- Electron 等应用的一半或一小块区域还显示上一个程序窗口内容，比如 VS Code 写着写着，往下滑的时候，部分代码区域还显示之前的内容
- 在 Chromium 系浏览器和 VS Code 等其他 Electron 应用中经常遇到
- 每隔几分钟就会出现，不稳定但频繁，双击 Win 键可以强制刷新恢复正常

这个现象非常像系统底层涉及渲染什么的东西出了问题，一开始我总以为是我显卡或者显示屏的没毛病，也没多管，就感觉显卡命不久矣，~~我的 4070s 你不要似啊，你留下我一个人怎么办。~~

## 问题排查

因为已经持续出现大概一个月了，被彻底搞烦了，今天闲着没事去搜了一下，看看到底是哪里出了问题，我的显卡是不是真的要寄了，我的钱包是不是又要瘪了。

一顿 Google 后，这不搜不知道，一搜真的是想把微软打一顿。这个问题遇到的人还真不少，而且已经比较久了，截至本文发布，正式版本仍然没修复。 =_=

## 问题成因

Windows 微软在最新的 Windows 11 24H2 版本中用 Rust 语言对图形设备接口（GDI）和 DWriteCore 进行了 [重写](https://learn.microsoft.com/en-us/windows/whats-new/whats-new-windows-11-version-24h2#rust-in-the-windows-kernel)。

> 参考资料：目前微软主要改写了两个项目，DWriteCore 以及 Win32 GDI，包含了一些非常古老的代码。这项工作是从 2020 年开始的，目前 DWriteCore 包含约 15.2 万行 Rust 代码和 9.6 万行 C++ 代码。Windows 图形设备接口（Win32 GDI）也在进行 Rust 移植，目前已拥有 3.6 万行 Rust 代码。

这样看来，不仅仅是基于 Chromium 的应用受到影响，所有与重写后的显示 IO 及上层 API（如 Microsoft Basic Display Adapter）相关的应用应该都有可能出现类似问题。

这一大规模重写带来的驱动软件的不兼容性，恐怕正是造成这个问题的根本原因。

## MPO 功能

MPO（Multi-Plane Overlay）是 Windows 的图形合成技术，从 Windows 8.1（WDDM 1.3）中引入，允许图形硬件将多层内容组合到一个图像中，然后它可以在屏幕上显示。它本质上是一种硬件加速的方法，用于组合不同的内容平面，用于优化视频、游戏等场景的渲染效率。

但部分硬件或驱动兼容性不佳时，可能引发异常。具体来说，当使用 AMD 集成显卡或特定驱动（如 NVIDIA Game Ready Driver 461.09 及以上版本）时，Windows 11 可能因 MPO 技术干扰导致上述问题。

## 解决方法

这么一分析，问题就清楚了，微软这次大规模重写图形子系统，显然没有充分考虑到所有显卡驱动的兼容性问题，尤其是 MPO 功能与某些驱动之间的冲突。

所以这个问题的临时解决方案，就是文章最开始提到的，通过注册表设置 OverlayTestMode = 5 禁用或调整 MPO 的某些功能，然后重启系统就能恢复正常了。

## 微软和 NVIDIA 的跟进

微软已经在 [Windows 11 Canary build 27959](https://blogs.windows.com/windows-insider/2025/10/06/announcing-windows-11-insider-preview-build-27959-canary-channel/) 版本里把这毛病给 [修了](https://blogs.windows.com/windows-insider/2025/10/06/announcing-windows-11-insider-preview-build-27959-canary-channel/#:~:text=partially%20stuck%20onscreen%20content)，但截至本文发布，正式版本还没推送。所以理论上你也可以升级到 Canary 频道的预览版 Windows 11 来解决这个问题。~~但这个版本无异于功能试验田，微软多少得再带几个毛病，你有胆你就去吧。~~

NVIDIA 这边，其实在 2021 年发布了 [相关文章](https://nvidia.custhelp.com/app/answers/detail/a_id/5157) 说明了类似问题，并给出了注册表文件供用户来禁用 MPO 功能以解决问题。但驱动方面，还没见到相关更新说明提到这个问题。

## 多说一嘴

好笑的是，我在搜相关解决方案和写这篇文章的时候，还没先去修复这个问题，然后边写边发现屏幕又卡住了，参考文章前面那张图。 =_=

## 参考文章

- [What's new in Windows 11, version 24H2 for IT pros | Microsoft Learn](https://learn.microsoft.com/en-us/windows/whats-new/whats-new-windows-11-version-24h2)
- [Announcing Windows 11 Insider Preview Build 27959 (Canary Channel) | Windows Insider Blog](https://blogs.windows.com/windows-insider/2025/10/06/announcing-windows-11-insider-preview-build-27959-canary-channel/)
- [After updating to NVIDIA Game Ready Driver 461.09 or newer, some desktop apps may flicker or stutter when resizing the window on some PC configurations | NVIDIA](https://nvidia.custhelp.com/app/answers/detail/a_id/5157)
- [Microsoft, AMD, Nvidia, are all sleeping on Windows 11 MPO display issues - Neowin](https://www.neowin.net/news/microsoft-amd-nvidia-are-all-sleeping-on-windows-11-mpo-display-issues/)
- [30 年老代码被干掉！微软用 18 万行 Rust 改写 Windows 系统内核 - 知乎](https://zhuanlan.zhihu.com/p/626626115)
- [Win11 24H2 滚动窗口时卡屏的解决方法 - NGA 玩家社区](https://ngabbs.com/read.php?tid=43131639&rand=126)
- [Windwos11 网页切换残留/卡屏/冻结/残影问题 - CSDN](https://blog.csdn.net/qq_62267045/article/details/149601940)
- [笔记本电脑屏幕有一部分会卡住 - LINUX DO](https://linux.do/t/topic/861055/5)
- [解决 Win11 浏览器/VSCode 滚动时上半部分屏幕卡住/撕裂的问题 - LINUX DO](https://linux.do/t/topic/1017574)

