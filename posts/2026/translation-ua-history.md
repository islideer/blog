---
title: '[译] 浏览器 User Agent 字符串的历史'
date: 2026-01-29
excerpt: '一段以幽默风格讲述的从 Mosaic 到 Chrome，看各大浏览器如何互相伪装，最终导致 UA 字符串彻底沦为一团乱麻。'
tags:
  - '浏览器'
  - 'Web'
  - '翻译'
  - '历史'
---

> 原文标题：History of the browser user-agent string
> 
> 发布时间：2008 年 9 月 3 日
> 
> 原文作者：Aaron Andersen
> 
> 原文链接：https://webaim.org/blog/user-agent-string-history/

---

## 译文

> 大部分内容由 [Claude](https://claude.ai) 辅助翻译完成，译者进行了润色和校对。

太初，世界上只有 [NCSA Mosaic](http://www.ncsa.illinois.edu/Projects/mosaic.html)，它自称 `NCSA_Mosaic/2.0 (Windows 3.1)`。Mosaic 能在文字旁边显示图片，于是人们欢呼雀跃。

<img src="https://webaim.org/blog/media/useragents/mosaic.jpg" alt="NCSA Mosaic 浏览器截图" style="max-height: 60px;" />

且看，一个新浏览器诞生了，名曰「[Mozilla](http://en.wikipedia.org/wiki/Mozilla)」，取「Mosaic Killer」（Mosaic 杀手）之意。但 Mosaic 并不买账，于是这浏览器改名作 [Netscape](https://en.wikipedia.org/wiki/Netscape)，自称 `Mozilla/1.0 (Win3.1)`，群众更加欢呼雀跃。Netscape 支持 [frames](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/frame)（框架），frames 在人群中广为流传，但 Mosaic 不支持 frames。于是「[User Agent 嗅探](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Browser_detection_using_the_user_agent)」诞生了——网站管理员向「Mozilla」发送 frames，却不给其他浏览器发送。

<img src="https://webaim.org/blog/media/useragents/netscape.jpg" alt="Netscape 浏览器截图" style="max-height: 60px;" />

然后 Netscape 说，让咱们戏谑微软一番，把 Windows 称作「一堆调试不完的设备驱动」，微软大怒。于是微软造了自己的浏览器，名为 [Internet Explorer](https://en.wikipedia.org/wiki/Internet_Explorer)，欲使其成为「Netscape 杀手」。IE 支持 frames，但它不是 Mozilla，故而得不到 frames。微软按捺不住，不愿等网站管理员慢慢认识 IE 并开始发送 frames，于是 IE 宣称自己「兼容 Mozilla」，开始冒充 Netscape，自称 `Mozilla/1.22 (compatible; MSIE 2.0; Windows 95)`。IE 收到了 frames，微软上下皆欢，但网站管理员们懵了。

<img src="https://webaim.org/blog/media/useragents/ie.png" alt="Internet Explorer 浏览器截图" style="max-height: 60px;" />

微软把 IE 和 Windows 捆绑销售，还把它做得比 Netscape 更好，第一次浏览器大战在大地上燃起。且看，Netscape 倒下了，微软举司欢庆。但 Netscape 以 [Mozilla](https://www.mozilla.org/) 之名重生，Mozilla 造了 [Gecko](https://developer.mozilla.org/zh-CN/docs/Glossary/Gecko)，自称 `Mozilla/5.0 (Windows; U; Windows NT 5.0; en-US; rv:1.1) Gecko/20020826`，Gecko 乃渲染引擎，Gecko 是好的。Mozilla 化身 [Firefox](https://www.mozilla.org/firefox/)，自称 `Mozilla/5.0 (Windows; U; Windows NT 5.1; sv-SE; rv:1.7.5) Gecko/20041108 Firefox/1.0`，Firefox 非常好。Gecko 开始繁衍，其他使用其代码的浏览器纷纷诞生，比如自称 `Mozilla/5.0 (Macintosh; U; PPC Mac OS X Mach-O; en-US; rv:1.7.2) Gecko/20040825 Camino/0.8.1` 的 Camino，和自称 `Mozilla/5.0 (Windows; U; Windows NT 5.1; de; rv:1.8.1.8) Gecko/20071008 SeaMonkey/1.0` 的 SeaMonkey，每个都伪装成 Mozilla，但皆由 Gecko 驱动。

<img src="https://webaim.org/blog/media/useragents/mozilla.png" alt="Mozilla Firefox 浏览器截图" style="display: inline; max-height: 60px;" />
<img src="https://webaim.org/blog/media/useragents/firefox.jpg" alt="Firefox 浏览器截图" style="display: inline; max-height: 60px;" />

Gecko 是好的，IE 则不然，于是嗅探重生，Gecko 得到好的网页代码，其他浏览器得不到。Linux 的追随者们悲伤不已，因为他们造了 [Konqueror](https://en.wikipedia.org/wiki/Konqueror)，其引擎是 [KHTML](https://en.wikipedia.org/wiki/KHTML)，他们自认为它和 Gecko 一样好，但它不是 Gecko，故而得不到好页面。于是 Konqueror 开始假装「像 Gecko」来获得好页面，自称 `Mozilla/5.0 (compatible; Konqueror/3.2; FreeBSD) (KHTML, like Gecko)`，混乱加剧。

<img src="https://webaim.org/blog/media/useragents/konqueror.jpg" alt="Konqueror 浏览器截图" style="max-height: 60px;" />

然后 [Opera](https://www.opera.com/) 登场了，曰：「我辈理应让用户决定要冒充哪个浏览器」，于是 Opera 添了个菜单项，Opera 可以自称 `Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; en) Opera 9.51`，或者 `Mozilla/5.0 (Windows NT 6.0; U; en; rv:1.8.1) Gecko/20061208 Firefox/2.0.0 Opera 9.51`，或者 `Opera/9.51 (Windows NT 5.1; U; en)`，取决于用户选了哪个选项。

<img src="https://webaim.org/blog/media/useragents/opera.jpg" alt="Opera 浏览器截图" style="max-height: 60px;" />

苹果造了 [Safari](https://www.apple.com.cn/safari/)，用了 KHTML，但加了许多功能，fork 了项目，称其为 [WebKit](https://webkit.org/)，但仍想要为 KHTML 编写的页面，于是 Safari 自称 `Mozilla/5.0 (Macintosh; U; PPC Mac OS X; de-de) AppleWebKit/85.7 (KHTML, like Gecko) Safari/85.5`，事情愈发糟糕。

<img src="https://webaim.org/blog/media/useragents/safari.jpg" alt="Safari 浏览器截图" style="max-height: 60px;" />

微软极为惧怕 Firefox，于是 IE 回归，自称 `Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0)`，它能渲染好代码，但唯当网站管理员命令它如此行事。

然后 Google 造了 [Chrome](https://www.google.com/chrome/)，Chrome 用 WebKit，它像 Safari，想要为 Safari 编写的页面，于是伪装成 Safari。于是 Chrome 使用 WebKit，伪装成 Safari，而 WebKit 伪装成 KHTML，而 KHTML 伪装成 Gecko，所有浏览器皆伪装成 Mozilla，Chrome 自称 `Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/525.13 (KHTML, like Gecko) Chrome/0.2.149.27 Safari/525.13`，至此 User Agent 字符串彻底沦为一团乱麻，近乎无用，人人都假装成他人，混乱遍布大地。

<img src="https://webaim.org/blog/media/useragents/chrome.jpg" alt="Google Chrome 浏览器截图" style="max-height: 60px;" />

---

## 译者注

原文用的是圣经史诗体（「In the beginning」、「And behold」），翻译时加入了些文言色彩（「太初」「且看」「名曰」），希望能保留那种庄严又荒诞的幽默感。

「Mozilla」 这个名字由「Mosaic Killa」（Killa 是俚语中 Killer 的拼法）变化而来，并与经典的虚拟怪物哥斯拉谐趣：「Godzilla eat the Mosaic」，即 Mosaic + Godzilla + Killa = Mozilla。

这篇文章写于 2008 年，那时 Chrome 才刚出生。如果作者今天续写，大概还得加上 Edge 投降 Chromium 的故事，然后 User Agent 字符串继续混乱，直到彻底变成一串没人看得懂的咒语。好在现代浏览器已经在慢慢放弃这套把戏了。

延伸阅读: *[History of the user-agent string](https://humanwhocodes.com/blog/2010/01/12/history-of-the-user-agent-string/)*（另一篇内容类似但说明更加详细、严肃的文章。）

---

## 附录：原文

In the beginning there was [NCSA Mosaic](http://www.ncsa.illinois.edu/Projects/mosaic.html), and Mosaic called itself NCSA_Mosaic/2.0 (Windows 3.1), and Mosaic displayed pictures along with text, and there was much rejoicing.

<img src="https://webaim.org/blog/media/useragents/mosaic.jpg" alt="NCSA Mosaic" style="max-height: 60px;" />

And behold, then came a new web browser known as “[Mozilla](http://en.wikipedia.org/wiki/Mozilla)”, being short for “Mosaic Killer,” but Mosaic was not amused, so the public name was changed to Netscape, and Netscape called itself Mozilla/1.0 (Win3.1), and there was more rejoicing. And Netscape supported frames, and frames became popular among the people, but Mosaic did not support frames, and so came “user agent sniffing” and to “Mozilla” webmasters sent frames, but to other browsers they sent not frames.

<img src="https://webaim.org/blog/media/useragents/netscape.jpg" alt="Netscape" style="max-height: 60px;" />

And Netscape said, let us make fun of Microsoft and refer to Windows as “poorly debugged device drivers,” and Microsoft was angry. And so Microsoft made their own web browser, which they called Internet Explorer, hoping for it to be a “Netscape Killer”. And Internet Explorer supported frames, and yet was not Mozilla, and so was not given frames. And Microsoft grew impatient, and did not wish to wait for webmasters to learn of IE and begin to send it frames, and so Internet Explorer declared that it was “Mozilla compatible” and began to impersonate Netscape, and called itself Mozilla/1.22 (compatible; MSIE 2.0; Windows 95), and Internet Explorer received frames, and all of Microsoft was happy, but webmasters were confused.

<img src="https://webaim.org/blog/media/useragents/ie.png" alt="Internet Explorer" style="max-height: 60px;" />

And Microsoft sold IE with Windows, and made it better than Netscape, and the first browser war raged upon the face of the land. And behold, Netscape was killed, and there was much rejoicing at Microsoft. But Netscape was reborn as Mozilla, and Mozilla built Gecko, and called itself Mozilla/5.0 (Windows; U; Windows NT 5.0; en-US; rv:1.1) Gecko/20020826, and Gecko was the rendering engine, and Gecko was good. And Mozilla became Firefox, and called itself Mozilla/5.0 (Windows; U; Windows NT 5.1; sv-SE; rv:1.7.5) Gecko/20041108 Firefox/1.0, and Firefox was very good. And Gecko began to multiply, and other browsers were born that used its code, and they called themselves Mozilla/5.0 (Macintosh; U; PPC Mac OS X Mach-O; en-US; rv:1.7.2) Gecko/20040825 Camino/0.8.1 the one, and Mozilla/5.0 (Windows; U; Windows NT 5.1; de; rv:1.8.1.8) Gecko/20071008 SeaMonkey/1.0 another, each pretending to be Mozilla, and all of them powered by Gecko.

<img src="https://webaim.org/blog/media/useragents/mozilla.png" alt="Mozilla Firefox" style="display: inline; max-height: 60px;" />
<img src="https://webaim.org/blog/media/useragents/firefox.jpg" alt="Firefox" style="display: inline; max-height: 60px;" />

And Gecko was good, and IE was not, and sniffing was reborn, and Gecko was given good web code, and other browsers were not. And the followers of Linux were much sorrowed, because they had built Konqueror, whose engine was KHTML, which they thought was as good as Gecko, but it was not Gecko, and so was not given the good pages, and so Konquerer began to pretend to be “like Gecko” to get the good pages, and called itself Mozilla/5.0 (compatible; Konqueror/3.2; FreeBSD) (KHTML, like Gecko) and there was much confusion.

<img src="https://webaim.org/blog/media/useragents/konqueror.jpg" alt="Konqueror" style="max-height: 60px;" />

Then cometh Opera and said, “surely we should allow our users to decide which browser we should impersonate,” and so Opera created a menu item, and Opera called itself Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; en) Opera 9.51, or Mozilla/5.0 (Windows NT 6.0; U; en; rv:1.8.1) Gecko/20061208 Firefox/2.0.0 Opera 9.51, or Opera/9.51 (Windows NT 5.1; U; en) depending on which option the user selected.

<img src="https://webaim.org/blog/media/useragents/opera.jpg" alt="Opera" style="max-height: 60px;" />

And Apple built Safari, and used KHTML, but added many features, and forked the project, and called it WebKit, but wanted pages written for KHTML, and so Safari called itself Mozilla/5.0 (Macintosh; U; PPC Mac OS X; de-de) AppleWebKit/85.7 (KHTML, like Gecko) Safari/85.5, and it got worse.

<img src="https://webaim.org/blog/media/useragents/safari.jpg" alt="Safari" style="max-height: 60px;" />

And Microsoft feared Firefox greatly, and Internet Explorer returned, and called itself Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0) and it rendered good code, but only if webmasters commanded it to do so.

And then Google built Chrome, and Chrome used Webkit, and it was like Safari, and wanted pages built for Safari, and so pretended to be Safari. And thus Chrome used WebKit, and pretended to be Safari, and WebKit pretended to be KHTML, and KHTML pretended to be Gecko, and all browsers pretended to be Mozilla, and Chrome called itself Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/525.13 (KHTML, like Gecko) Chrome/0.2.149.27 Safari/525.13, and the user agent string was a complete mess, and near useless, and everyone pretended to be everyone else, and confusion abounded.

<img src="https://webaim.org/blog/media/useragents/chrome.jpg" alt="Google Chrome" style="max-height: 60px;" />
