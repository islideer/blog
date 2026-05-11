---
title: '使用 scp 命令跨服务器双向传输文件'
date: 2020-02-14
topic: '技术'
top_image: 'https://i.loli.net/2020/11/21/wYd3n5xtlVofF7E.jpg'
excerpt: '详解 Linux 系统中 scp 命令的使用方法。'
tags:
  - 'Linux'
  - 'SSH'
  - 'SCP'
  - '命令行'
  - '服务器'
---

## 什么是 SCP

`scp` 是 **Secure Copy** 的简写，用于在 Linux 下进行远程拷贝文件的命令。和它类似的命令有 `cp`，不过 `cp` 只能在本机进行拷贝，而 `scp` 可以跨服务器传输，并且传输过程是加密的，安全性更高。

> **前置条件**：使用前请确保配置好了 SSH，即能够通过 `ssh` 命令成功访问远程服务器。

## 基本用法

### 上传文件到服务器

将本地单个文件上传到服务器指定目录：

```bash
scp /home/project/demo.txt root@xxx.xxx.xxx.xxx:/home/
```

### 上传文件夹到服务器

将本地文件夹（包含所有子文件和子文件夹）上传到服务器：

```bash
scp -r /home/project root@xxx.xxx.xxx.xxx:/home/
```

> `-r` 参数表示递归（recursive），用于传输整个目录。

### 从服务器下载文件或文件夹

将服务器上的文件或文件夹下载到本地：

```bash
# 下载单个文件
scp root@xxx.xxx.xxx.xxx:/home/project/demo.txt /home/

# 下载整个文件夹
scp -r root@xxx.xxx.xxx.xxx:/home/project /home/
```

## 常用参数

| 参数 | 说明                     |
| ---- | ------------------------ |
| `-P` | 指定 SSH 连接端口        |
| `-r` | 递归传输（用于文件夹）   |
| `-v` | 显示详细传输过程         |
| `-C` | 启用压缩（加快传输速度） |
| `-4` | 强制使用 IPv4 地址       |
| `-6` | 强制使用 IPv6 地址       |

## 实用技巧

### 指定 SSH 端口

如果服务器的 SSH 端口不是默认的 22，需要使用 `-P` 参数指定：

```bash
scp -P 2222 /home/project/demo.txt root@xxx.xxx.xxx.xxx:/home/
```

> 注意：是大写的 `-P`，不是小写的 `-p`。

### 加速传输

对于大文件或文件夹，可以使用 `-C` 参数启用压缩：

```bash
scp -C -r /home/project root@xxx.xxx.xxx.xxx:/home/
```

### 查看传输进度

使用 `-v` 参数可以看到详细的传输过程：

```bash
scp -v /home/project/demo.txt root@xxx.xxx.xxx.xxx:/home/
```
