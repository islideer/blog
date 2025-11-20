---
layout: 'post'
title: 'Hello World'
date: 2019-11-08
excerpt: '记录我的博客行程轨迹。'
---

## 2019.11.8

使用 [GitHub Pages](https://pages.github.com/) 和 [Jekyll](https://jekyllrb.com/) 建立个人博客时默认创建的一篇文章，留个纪念。

## 2020.3.22

好累，折腾了很久终于把博客转移到 [Hexo](https://hexo.io/) + [GitHub Pages](https://pages.github.com/) 了，中途踩了很多坑。好在时间没白花，最后还是搞成了自己想要的样子。

这次找了个简约的 [Geek](https://github.com/sanjinhub/hexo-theme-geek) 主题，然后把自己不喜欢的地方改了下，加了点需要的东西。默认语法高亮主题是 `sublime` 的高亮主题，我不是很喜欢，改成了 `One Dark` 的高亮主题。（和我 `vscode` 的主题保持一致）然后加上了博文的发布时间，对一些 CSS 样式进行了更改。

写博客难免要插入一些图片，我的解决方案是 [sm.ms](https://sm.ms/)，免费的图床网站。最大的优点就是简单，快速，缺点是单张图片大小有限制，总容量也不多，但是对我这种对图片需求量不大的人来说还是绰绰有余的。

总体来说还是很满意的，比较简洁，不失美感，想要的功能大都实现了。

## 2020.9.2

- 更换博客主题为 [stun](https://github.com/liuyib/hexo-theme-stun)。
- 将博客免费托管在 [Vercel](https://vercel.com/) 上。
- 评论系统使用基于 GitHub Issue 和 Preact 的 [Gitalk](https://gitalk.github.io/)。

## 2022.11.22

- 移除了原博客的 [Gitalk](https://gitalk.github.io/) 评论插件。
- 更换博客主题为 [Anatole](https://github.com/Ben02/hexo-theme-Anatole)，并做了删减和优化。
- 仍然免费托管在 [Vercel](https://vercel.com/) 上。

> 目前的主题，似乎代码高亮不太行，有空再鼓捣鼓捣。

## 2023.5.16

自己维护博客太花费时间和精力了，正在尝试迁移到基于区块链的 [xLog](https://xlog.app)。

> 兼具颜值、安全和用户体验于一身，很喜欢。

## 2025.11.19

近期发现，[xLog](https://xlog.app/) 的服务出现包括但不限于:

- [大陆访问异常](https://github.com/Crossbell-Box/xLog/issues/2228)
- [文章无法发布](https://github.com/Crossbell-Box/xLog/issues/2213)
- [首页被大量营销推广内容占领](https://github.com/Crossbell-Box/xLog/issues/2204)
- [后台无法登录，文章无法导出](https://github.com/Crossbell-Box/xLog/issues/2250)
- ...
 
等等问题，已经无法忍受，决定重新搭建博客。

新博客使用 [Next.js 16](https://nextjs.org/) + [React 19](https://react.dev/) + [Tailwind CSS 4](https://tailwindcss.com/) + [Vercel](https://vercel.com/) 重新搭建和设计，内容已全数手工迁移至新博客 =.=。
