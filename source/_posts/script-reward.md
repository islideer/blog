---
layout: post
title: 竟然有人给我打赏了
date: 2020-06-17
excerpt: 随手写的一个油猴脚本竟然获得了打赏，人生第一次写代码获得物质上的肯定。
---

> 2022 年更新：百度网盘网页端已更新，本文提到的脚本和文中的示例代码已失效，如仍有倍速播放需求，可以使用 Google Chrome 的浏览器扩展 [Global Speed](https://chrome.google.com/webstore/detail/global-speed/jpbjcnkcffbooppibceonlgknpkniiff?hl=zh-CN)。

前天（2020.6.15）我在百度网盘看网课视频（真的只是网课学习视频！！命苦的大学牲在准备期末复习）的时候，发现普通用户视频不能倍速播放，学习效率很低，困扰到了我。

爱折腾的我，就去谷歌了下解决方案，搜到的结果是，百度网盘在线播放的控件使用的是 开源的 videojs，只要在浏览器控制台输入下面这行代码拿到实例并调用相关 API，就能轻松实现视频倍速播放：

```js
window.videojs.getPlayers('video-player').html5Player.tech_.setPlaybackRate(2.0)
```

虽然确实可行，但是我觉得，每次都要手动打开开发者工具然后复制代码到控制台执行，还是比较麻烦的，同时我又想到了平时一直都有在用的 [Tampermonkey](https://www.tampermonkey.net/) ，想着是不是自己也可以写一些类似的脚本。

于是我开始动手了，进行了简单的 DOM 操作添加了几个按钮（用原网页提供的 CSS class 样式），这样看来简洁美观不冲突，然后将按钮点击事件改为上述代码，修改了对应的倍率，就完事了。随后，我把代码开源在了 [GitHub](https://github.com/vikiboss/BaidupanPlaySpeedControl) 上，同时发布到了 [Greasy Fork](https://greasyfork.org/zh-CN/scripts/405388) 方便安装。

昨天晚上（2020.6.16）我微信竟然收到了五块钱打赏，对方并没有留下备注，只是加上了一行话：”网盘倍速播放不错哦“，我看了下打赏人姓名：“\*生”，应该不是我认识的身边人。

虽然 💰 不多，脚本核心代码也就四十多行没什么技术含量，但是通过自己创造的东西，帮助到了别人，还得到别人的认同（这种认同还是物质性的），对我来说，还是算作非常非常大的鼓励吧。
