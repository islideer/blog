---
title: I'm bar, but link to foo
date: 2020-02-03 15:39:40
excerpt: 这是一段文章摘要，是通过 Front-Matter 的 excerpt 属性设置的。
photos: "#"
top_image: https://xxxx.jpg
quicklink: true
top: true
tags:
  - demo
categories: # 子类
  - demo

no-emoji: true
# permalink: /foo
# comments: false
# link: "#"
# toc: true 
# 是否启用目录
# toc_min_depth: 1 
# 解析的最小深度 默认从h1开始
# toc_max_depth: 6
# math: true
# reward: true
# copyright: true
# categories:
#   - [Diary]
#   - [Life]
# categories:
#   - [Diary, PlayStation]
#   - [Diary, Games]
#   - [Life]
---

![s](https://xxxxx.png?size=200x100&show=inline)

{% friends _data/friends.json %}

{% table _data/reward.json 时间,赞助人,金额,留言 %}

<!-- With header, With icon -->
{% note success %}
**Success**
This is success note.
{% endnote %}

<!-- With header, No icon -->
{% note success no-icon %}
**Success**
This is success note.
{% endnote %}

<!-- No header, With icon -->
{% note success %}
This is success note.
{% endnote %}

<!-- No header, No icon -->
{% note success no-icon %}
This is success note.
{% endnote %}