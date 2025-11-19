---
layout: post
title: 解决 git/ssh 报错：too many authentication failures
date: 2024-10-14
excerpt: 主要是因为 ssh 的 host 规则配置过多，且没有设置精确匹配，加上又存在多个密钥，导致了 ssh 挨个尝试，在没有尝试到成功的匹配之前，因为失败次数过多而被服务器拒绝了。
---

主要是因为 ssh 的 host 规则配置过多，且没有设置精确匹配，加上又存在多个密钥，导致了 ssh 挨个尝试，在没有尝试到成功的匹配之前，因为失败次数过多而被服务器拒绝了。

解决方案：host 匹配规则里加上精确匹配。

```bash
# ~/.ssh/config

Host gitlab.xxx.com
  HostName gitlab.xxx.com
  User root
  IdentityFile ~/.ssh/other_rsa
  # 加上下面这一行，精确匹配对应密钥
  IdentitiesOnly yes
  # 且不使用任何代理
  IdentityAgent none

# GitHub
Host github.com
  # for 443 port
  HostName ssh.github.com
  User git
  Port 443
  IdentityFile ~/.ssh/viki_rsa
  IdentitiesOnly yes

Host *
  User root
  IdentityFile ~/.ssh/viki_rsa
  PreferredAuthentications publickey
  IdentityAgent "xxx"
```
