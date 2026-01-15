---
title: '建设博客过程中的一些副产物，敏感肌也能用！'
date: 2026-01-15
excerpt: '在搭建和完善博客内容的过程中，积累了一些实用的 API 和资源，特别适合敏感肌。'
tags:
  - 'API'
  - '工具'
  - '资源'
  - '博客建设'
---

这阵子上班事少，闲的蛋疼，就一直在鼓捣自己的博客，为了尽可能 ~~加一些花里胡哨的东西~~ 充实博客内容，顺手写了很多相关的工具和资源，觉得其中一些还挺实用的，就整理出来分享给大家，方便有需要的朋友使用，敏感肌也能用哦～

## Steam 相关 API

博客有一个游戏页面，主要展示 Steam 个人资料、在线状态、游戏库存和时长等，~~方便大家视奸这家伙又在玩什么~~。这些可以直接通过 Steam 提供的公开 API 获取到，但你必须提供你自己的 API Key，还需要自己处理 Vanity ID 转换，而且数据格式其实不算友好。所以，我基于官方 API 进行了二次封装，提供了以下几个更加简单、易用的接口。

> 注：以下 Steam 接口均为公开 API，无需认证，但请注意以下几点：
>
> - 要求个人资料「**完全公开**」，包括库存、游戏等，否则部分字段可能为 0 或空。
> - 内置了请求限流，十分钟内不得超过 200 次请求，避免滥用。
> - ID 参数支持任意 Steam ID 格式，包括 SteamID64、SteamID32、SteamID 和 Vanity ID。
> - 支持使用 query 参数 key 来指定自己的 Steam API Key，获取自己信息更全面。
> - 传入的 Steam API Key 仅作临时调用使用，服务端不做任何存储。

### 个人资料（状态、等级、游戏数）

GET https://api.viki.moe/steam/:id

**展示效果**

![steam-profile](https://s2.loli.net/2026/01/15/5yBZfMCOlpkPzje.png)

> 如 CS 职业选手 ropz 的 Steam 资料信息：[https://api.viki.moe/steam/ropzkah](https://api.viki.moe/steam/ropzkah)。

<details>
  <summary>点击展开示例返回数据</summary>

```json
{
  "steam_id": "76561197991272318",
  "persona_name": "mmmmm",
  "profile_url": "https://steamcommunity.com/id/ropzkah",
  "is_online": false,
  "account_age_years": 18,
  "account_age_years_desc": "18 年",
  "online_status_desc": "当前离线",
  "avatar": {
    "small": "https://avatars.steamstatic.com/79c83891a69efa9d54656a77fc1a022d72c51cbc.jpg",
    "medium": "https://avatars.steamstatic.com/79c83891a69efa9d54656a77fc1a022d72c51cbc_medium.jpg",
    "full": "https://avatars.steamstatic.com/79c83891a69efa9d54656a77fc1a022d72c51cbc_full.jpg"
  },
  "profile_state": 1,
  "visibility": 3,
  "visibility_desc": "公开",
  "persona_state": 0,
  "persona_state_desc": "离线",
  "last_logoff": null,
  "last_logoff_at": null,
  "time_created": "2007/7/16 15:52:50",
  "time_created_at": 1184572370000,
  "game_info": null,
  "level": 53,
  "level_desc": "LV. 53",
  "games_owned": 24,
  "games_played": 20,
  "games_never_played": 4,
  "games_total_playtime": 1784777,
  "games_total_playtime_desc": "29,746 小时",
  "id_info": {
    "account_id": 31006590,
    "steam_id": "31006590",
    "steam_id_32": "31006590",
    "steam_id_64": "76561197991272318",
    "steam_id_3": "[U:1:31006590]",
    "steam_id_old": "STEAM_0:0:15503295",
    "profile_url": "https://steamcommunity.com/profiles/76561197991272318",
    "vanity_id": "ropzkah",
    "vanity_profile_url": "https://steamcommunity.com/id/ropzkah"
  }
}
```

</details>

### 最近在玩（近两周游戏及时长）

GET https://api.viki.moe/steam/:id/recently-played

**展示效果**

![steam-recently-played](https://s2.loli.net/2026/01/15/qMGlTBR7PcIDQax.png)

> 如 ropz 最近在玩：[https://api.viki.moe/steam/ropzkah/recently-played](https://api.viki.moe/steam/ropzkah/recently-played)。

<details>
  <summary>点击展开示例返回数据</summary>

```json
[
  {
    "appid": 730,
    "name": "Counter-Strike 2",
    "store_url": "https://store.steampowered.com/app/730",
    "playtime": {
      "recent_minutes": 3284,
      "recent_desc": "54 小时 44 分钟",
      "total_minutes": 1433508,
      "total_desc": "23,891 小时",
      "platforms": [] // 自己的 Key 可以获取自己的平台游玩时长信息
    },
    "image": {
       // 各种尺寸的图片链接
    }
  }
]
```

</details>

### 游戏库存（所有游戏及其时长）

GET https://api.viki.moe/steam/:id/games

**展示效果**

![steam-games](https://s2.loli.net/2026/01/15/UkvfLtzPXouM5bD.png)

> 如 ropz 的游戏库存：[https://api.viki.moe/steam/ropzkah/games](https://api.viki.moe/steam/ropzkah/games)。

<details>
  <summary>点击展开示例返回数据（部分省略）</summary>

```json
[
  {
    "appid": 730,
    "name": "Counter-Strike 2",
    "store_url": "https://store.steampowered.com/app/730",
    "playtime": {
      "recent_minutes": 3284,
      "recent_desc": "54 小时 44 分钟",
      "total_minutes": 1433508,
      "total_desc": "23,891 小时",
      "platforms": [] // 自己的 Key 可以获取自己的平台游玩时长信息
    },
    "image": {
      // 各种尺寸的图片链接
    },
    "has_community_visible_stats": true,
    "content_descriptors": ["暴力", "血腥"]
  },
  {
    "appid": 10,
    "name": "Counter-Strike",
    "store_url": "https://store.steampowered.com/app/10",
    "playtime": {
      "recent_minutes": null,
      "recent_desc": null,
      "total_minutes": 320630,
      "total_desc": "5,343 小时",
      "platforms": []
    },
    "image": {
      // 各种尺寸的图片链接
    },
    "has_community_visible_stats": null,
    "content_descriptors": ["暴力", "血腥"]
  },
  {
    "appid": 578080,
    "name": "PUBG: BATTLEGROUNDS",
    "store_url": "https://store.steampowered.com/app/578080",
    "playtime": {
      "recent_minutes": null,
      "recent_desc": null,
      "total_minutes": 12661,
      "total_desc": "211 小时",
      "platforms": []
    },
    "image": {
      // 各种尺寸的图片链接
    },
    "has_community_visible_stats": true,
    "content_descriptors": ["暴力", "血腥"]
  }
]
```
</details>

## 豆瓣相关 API

豆瓣并未提供公开 API，很多数据需要通过网页爬取获取。为了方便博客展示豆瓣在看的影视、书籍等内容，我写了一些接口来更加简单、方便地获取这些数据。

### 电影列表（在看、想看、看过）

GET https://api.viki.moe/douban/:id/movies

**展示效果**

![douban-movies](https://s2.loli.net/2026/01/15/bOpjKCGl92oIF1e.png)

> 如 VikiQAQ 的电影列表：[https://api.viki.moe/douban/vikiqaq/movies](https://api.viki.moe/douban/vikiqaq/movies)。

<details>
  <summary>点击展开示例返回数据（部分省略）</summary>

```json
{
  // 看过列表
  "collect":[
    {
      "id": "36851291",
      "title": "名侦探柯南：独眼的残像",
      "url": "https://movie.douban.com/subject/36851291/",
      "cover": "https://doubanio.viki.moe/view/photo/s_ratio_poster/public/p2922540490.jpg",
      "date": "2026-01-08"
    },
  ],
  // 想看列表
  "wish":[
    {
      "id": "37247394",
      "title": "孤独摇滚！ 第二季",
      "url": "https://movie.douban.com/subject/37247394/",
      "cover": "https://doubanio.viki.moe/view/photo/s_ratio_poster/public/p2918761250.jpg",
      "date": "2025-04-20"
    }
  ],
  // 在看列表
  "doings": [
    {
      "id": "35644319",
      "title": "吉伊卡哇",
      "url": "https://movie.douban.com/subject/35644319/",
      "cover": "https://doubanio.viki.moe/view/photo/s_ratio_poster/public/p2892879642.jpg",
      "date": "2025-03-16"
    }
  ]
}
```
</details>

### 书籍列表（在读、想读、读过）

GET https://api.viki.moe/douban/:id/books

**展示效果**

![douban-books](https://s2.loli.net/2026/01/15/AtgEUHqMalxjZw8.png)

> 如 VikiQAQ 的书籍列表：[https://api.viki.moe/douban/vikiqaq/books](https://api.viki.moe/douban/vikiqaq/books)。

<details>
  <summary>点击展开示例返回数据（部分省略）</summary>

```jsonc
{
  // 读过列表
  "collect": [
    {
      "id": "27118775",
      "title": "一个人去东京: 未来预想图01",
      "url": "https://book.douban.com/subject/27118775/",
      "cover": "https://doubanio.viki.moe/view/subject/s/public/s29576570.jpg",
      "date": "2023-11-22"
    },
    {
      "id": "1057244",
      "title": "边城",
      "url": "https://book.douban.com/subject/1057244/",
      "cover": "https://doubanio.viki.moe/view/subject/s/public/s1595557.jpg",
      "date": "2023-01-24"
    }
  ],
  // 想读列表
  "wish": [
    {
      "id": "1829226",
      "title": "肖申克的救赎",
      "url": "https://book.douban.com/subject/1829226/",
      "cover": "https://doubanio.viki.moe/view/subject/s/public/s4007145.jpg",
      "date": "2024-09-25"
    }
  ],
  // 在读列表
  "doings": [
    {
      "id": "2567698",
      "title": "三体: “地球往事”三部曲之一",
      "url": "https://book.douban.com/subject/2567698/",
      "cover": "https://doubanio.viki.moe/view/subject/s/public/s2768378.jpg",
      "date": "2023-01-24"
    }
  ]
}
```

</details>

### 豆瓣图片代理服务

豆瓣的图片资源无法直接被引用，哪怕新页面打开也无法访问，这主要通过限制请求头 Referrer 必须为豆瓣网站来实现的。

办法总比困难多，我还就偏要引用了。于是，我搞了一个简单的图片代理服务，可以绕过这个限制：

```diff
- https://img*.doubanio.com/**
+ https://doubanio.viki.moe/**
```

原理很简单，代理请求，并且添加上正确的 Referrer 请求头，就能成功获取图片资源了。

举例来说，*《肖申克的救赎》* 的电影封面图链接：

- 原始 URL: https://img3.doubanio.com/view/photo/s_ratio_poster/public/p480747492.webp
- 代理 URL: https://doubanio.viki.moe/view/photo/s_ratio_poster/public/p480747492.webp

你会发现，无法直接访问原始 URL，而通过代理 URL 则可以正常显示图片，且没有任何引用限制。

芜湖，起飞～

## Bilibili（B 站）相关 API

### 个人资料（等级、统计、大会员）

GET https://api.viki.moe/bili/u/:id

> 如我的 B 站个人资料：[https://api.viki.moe/bili/u/381636335](https://api.viki.moe/bili/u/381636335)

### 新番时间表（番剧、影视、国创）

GET https://api.viki.moe/bili/timeline

Query 参数
  - type: 番剧=bangumi, 电影=movie, 国创=donghua，默认 bangumi
  - before: 开始于前几日（0-7），默认 0
  - after: 结束于后几日（0-7），默认 6

### 追番列表（在看、想看、看过）

GET https://api.viki.moe/bili/u/:id/bangumi

可以通过返回的 `follow_status` 字段区分在看、想看、看过等状态
  - 1: 想看
  - 2: 在看
  - 3: 看过

**展示效果**

![bili-bangumi](https://s2.loli.net/2026/01/15/jXKuvsz38B9wG6o.png)

> 如我的追番列表：[https://api.viki.moe/bili/u/381636335/bangumi](https://api.viki.moe/bili/u/381636335/bangumi)

## 写在最后

目前就这些了，如果后续我还写了什么实用的 API 或资源，也会继续更新在这篇文章里。

如果恰好你也需要类似的功能，欢迎直接使用这些 API，完全免费且无需认证。如果你有更好的建议或需求，也欢迎联系我，一起交流讨论～

Happy coding!
