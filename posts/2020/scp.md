---
layout: 'post'
title: '使用 scp 命令跨服务器双向传输文件'
date: 2020-02-14
top_image: 'https://i.loli.net/2020/11/21/wYd3n5xtlVofF7E.jpg'
excerpt: '通过 scp 命令能够高效率的向服务器传输文件以及文件夹'
---


`scp` 是 **Secure Copy** 的简写，用于在 Linux 下进行远程拷贝文件的命令，和它类似的命令有 `cp`，不过 `cp` 只是在本机进行拷贝不能跨服务器，而且 `scp` 传输是加密的。

> 使用前请确保配置好了 `ssh`，即：能够通过 ssh 成功访问远程服务器

### 将本地文件上传到服务器上

```bash
scp /home/project/demo.text root@xxx.xxx.xxx.xxx:/home/
```

### 将本地文件夹上传到服务器上

```bash
scp -r /home/project root@xxx.xxx.xxx.xxx:/home/
```

> `-r` 参数表示递归（recursive）

### 获取服务器上的文件（文件夹）

```bash
scp -r root@xxx.xxx.xxx.xxx:/home/project /home/
```

### 参数说明

- `-P` 指定 SSH 连接端口
- `-r` 递归
- `-v` 显示进度
- `-C` 使用压缩选项
- `-4` 使用 IPV4 地址
- `-6` 使用 IPV6 地址
