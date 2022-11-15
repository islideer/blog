---
layout: post
title: Linux基础
date: 2020-01-12
top_image: https://i.loli.net/2020/11/21/NmiL9asOpcqPeCU.jpg
excerpt: 寒假学习之Linux基础
---

## 前言

因为家园的 todolist 作业涉及到要自己部署，所以要学会适用于服务端的 `Linux` 发行版 `CentOS` 的基本操作，并完成部署作业

我下载了官网的 CentOS7 版本的镜像, 并安装在 VM 虚拟机中进行学习

> 安装教程参考了：[VM 安装 Centos7-菜鸟教程](https:#www.runoob.com/w3cnote/vmware-install-centos7.html)

## 基本操作

### 基本命令

1. `man` 命令

```bash
man cp #查看cp命令的使用文档
```

2. `ls` 命令

```bash
ls #列出目录列表

ls - a #列出全部（包括隐藏的）文件及目录
```

3. `cd` 命令

```bash
cd / demo / demo #切换到根目录下的demo下的demo目录

cd demo #切换到当前目录下的demo下的demo目录

cd~ #回到到root(~)目录下

cd.. #回退到上一目录
```

4. `pwd` 、 `mkdir` 与 `rmdir` 命令

```bash
pwd #显示目前的目录

mkdir demo #在当前路径下新建名为demo的文件夹

rmdir demo #删除名为demo的空目录
```

5. `cp` 命令

```bash
cp demo demo1 - f - r #强制复制demo文件或文件夹及其子文件并改名为demo1
```

6. `rm` 和 `mv` 命令

```bash
rm demo - f - r #强制删除当前目录下的demo文件夹及其子文件夹和文件

mv demo demo1 #重命名当前目录的demo文件夹或文件为demo1

mv demo demo1 - f #若目标文件存在则强制覆盖

mv demo demo1 - i #若目标文件存在，询问是否覆盖
```

### 关于文本文件操作

```bash
touch test1 # 创建 test1 文件

nl demo.txt - n ln #查看demo.txt文件内容并在行首显示行号

vi demo.txt #创建demo.txt文件并进行编辑

vim demo.txt #编辑demo.txt文件
```

> 具体详细权限说明参考：[菜鸟教程](https:#www.runoob.com/linux/linux-file-attr-permission.html)

> Linux 内置了 Vim 编辑器，详细用法参考： [Vi/Vim 操作-菜鸟教程](https:#www.runoob.com/linux/linux-vim.html)

### 终端利用 ssh 登录远程服务器

```bash
#安装ssh:
yum install ssh

#启动ssh:
service sshd start

#登录远程服务器:
ssh - p 8080 name @127 .0 .0 .1
输入口令：
name @127 .0 .0 .1:

/*
-p 后面是端口
name 是服务器用户名
127.0.0.1 是服务器 ip
回车输入口令即可登录
*/
```

### Linux 用户管理

1. 添加用户

```bash
useradd– d / home / sam - m sam
```

此命令创建了一个用户 sam，其中 `-d` 和 `-m` 选项用来为登录名 sam 产生一个主目录`/home/sam` （ `/home` 为默认的用户主目录所在的父目录，所有用户的目录都应该在此目录下）。`-m` 命令保证了在目录不存在时自动创建目录

2. 删除用户

```bash
userdel - r sam
```

此命令删除用户 sam 在系统文件中（主要是 `/etc/passwd` , `/etc/shadow` , `/etc/group` 等）的记录，同时删除用户的主目录。

3. 修改用户

```bash
usermod - s / bin / ksh - d / home / z– g developer sam
```

此命令将用户 sam 的登录 `Shell` 修改为 `ksh` ，主目录改为 `/home/z` ，用户组改为 `developer` 。

4. 修改口令

- 修改当前用户口令

```bash
passwd
Old password: ** ** **
New password: ** ** ** *
Re - enter new password: ** ** ** *
```

- 超级用户修改任意用户口令

```bash
passwd sam
New password: ** ** ** *
Re - enter new password: ** ** ** *
```

- 清除用户口令

```bash
passwd - d sam
```

### 磁盘管理

#### 三个常用命令

1. `df` 命令

```bash
df - h / etc #将/etc底下的可用的磁盘容量以易读的容量格式显示
```

2. `du` 命令

```bash
du - a - h * #显示当前目录下所有文件/文件夹的容量大小
```

3. `fdisk` 命令

```bash
df - h / etc
```

## Vim 的基本操作

- [Vi/Vim - 菜鸟教程](https:#www.runoob.com/linux/linux-vim.html)

## 注意事项

- 实际安装时建议选择语言为 English，若选择其他语言很有可能发生意想不到的编码问题

## 参考文章

- [Linux 教程 - 菜鸟教程](https:#www.runoob.com/linux/linux-tutorial.html)
