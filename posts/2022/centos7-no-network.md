---
layout: post
title: VMware 17 安装 CentOS 7 无法连接网络
date: 2022-11-30
excerpt: CentOS 默认不连接网络，需要在安装的时候连接，或者手动设置开机时自动连接。
---

之前电脑 Win11 的一个大版本更新给我电脑干坏了，自从系统重装之后，就没怎么用过 VMware 了。

发现 VMware 最近出了 17 新版本，兼容 Win11，就整了一个，然后下了一个 CentOS 7 的镜像，但是安装完发现连不上网络。

## 可能的原因

CentOS 默认是不连接网络的，需要在安装的时候（GUI 界面）手动选择连接网络。应该是我忘了勾选 =.=

## 解决方案

如果安装的时候选忘了勾选咋整？

我知道你很急，但你先别急

使用 `vi` 编辑 `/etc/sysconfig/network-scripts/ifcfg-ens33` 文件，将 `ONBOOT` 改为 `yes`，然后保存并退出就好啦！

好吧，其实改完了还不行，你得让这个改动生效。

你可以通过 `service network restart` 命令重启网络服务，或者输入 `reboot` 重启 CentOS。
