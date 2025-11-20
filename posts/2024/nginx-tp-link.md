---
layout: 'post'
title: '公网访问 TP-LINK 路由管理页绕过 tplogin.cn 跳转'
date: 2024-09-30
excerpt: '先说解决方案，通过 nginx 配置代理并利用其替换功能修改前端页面里写死的判别逻辑即可。'
---


## 解决方案

先说解决方案，通过 `nginx` 配置代理并利用其替换功能修改前端页面里写死的判别逻辑即可。

```bash
server {
  # 暴露的端口
  listen 1234;

  location / {
    # 管理页地址
    proxy_pass http://192.168.0.1/;
    # 关键逻辑，替换前端写死的域名检测
    subs_filter 'tplogin.cn' 'your.domain.com';
    # 设置对所有文件类型生效
    subs_filter_types *;
}
```

如果提示 `subs_filter` 模块不可用而报错，可以尝试安装 `nginx-extras` 或者从源码编译解决。

最后，重启 `nginx` 服务生效。

```bash
# sudo systemctl restart nginx
nginx -s reload
```

## 背景

最近在鼓捣家里云，申请了个公网 IP，暴露了些服务到广域网。

> 待续。
