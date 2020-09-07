---
layout: post
title: 关于CentOS7中yum失效问题的解决方案
date: 2020-1-12
excerpt: 列出了CentOS7中yum失效问题的可能原因，给出了对应的解决方案
---

刚在虚拟机中安装完的CentOS7的系统，可能出现**无法使用yum命令**的问题。可以使用下列方式进行尝试。

## 可能的原因

网卡未启动

## 解决方案

将网卡设置自启动，并重启网络服务或者系统

## 具体操作

1. 进入/etc/sysconfig/network-scripts 目录

``` bash
cd / etc / sysconfig / network - scripts
```

2. 修改名为ifcfg-ens33的网卡配置文件

``` bash
vi ifcfg - ens33 #用vi打开文件并进行编辑
```

> 此时涉及到vi的操作。输入完上述命令后，按i进入编辑式，
> 并将 "ONBOOT" 项的值修改为 "yes" ，然后按 `Esc` 输入 `:wq` 保存退出即可

3. 重启服务    

``` bash
reboot #重启系统
service network restart #或者重启网络服务
```

## 其他情况

若上述方法还是无效可以尝试修改CentOS-Base.repo中的地址，具体方法与上类似

1. 进入目录 "/etc/yum.repos.d" 。

2. 编辑文件 "vi CentOS-Base.repo" 。

3. 将所有的 "mirrorlist" 注释掉，将所有的 "baseurl" 取消注释。

4. 保存后输入"reboot"重启系统

## 参考文章

* [博客园](https://www.cnblogs.com/crowsong/p/9371216.html)

