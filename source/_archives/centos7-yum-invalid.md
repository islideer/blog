---
layout: post
title: 关于CentOS7中yum失效问题的解决方案
date: 2020-01-12
top_image: https://i.loli.net/2020/11/21/o7sYJZVIuqMRpT3.jpg
excerpt: 列出了CentOS7中yum失效问题的可能原因，给出了对应的解决方案
---

刚在虚拟机中安装完的 CentOS 7 的系统，可能出现**无法使用 yum 命令**的问题。可以使用下列方式进行尝试。

## 可能的原因

网卡未启动

## 解决方案

将网卡设置自启动，并重启网络服务或者系统

## 具体操作

1. 进入/etc/sysconfig/network-scripts 目录

```shell
cd / etc / sysconfig / network - scripts
```

2. 修改名为 ifcfg-ens33 的网卡配置文件

```shell
vi ifcfg - ens33 #用vi打开文件并进行编辑
```

> 此时涉及到 vi 的操作。输入完上述命令后，按 i 进入编辑式，
> 并将 "ONBOOT" 项的值修改为 "yes" ，然后按 `Esc` 输入 `:wq` 保存退出即可

3. 重启服务

```shell
reboot #重启系统
service network restart #或者重启网络服务
```

## 其他情况

若上述方法还是无效可以尝试修改 `CentOS-Base.repo` 中的地址，具体方法与上类似

1. 进入目录 `/etc/yum.repos.d` 。

2. 编辑文件 `vi CentOS-Base.repo` 。

3. 将所有的 `mirrorlist` 注释掉，将所有的 `baseurl` 取消注释。

4. 保存后输入 `reboot` 重启系统

## 参考文章

- [博客园](https://www.cnblogs.com/crowsong/p/9371216.html)
