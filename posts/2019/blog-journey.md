---
title: 'Hello World'
date: 2019-11-08
tags:
  - 'Blog'
  - 'Hexo'
  - 'Next.js'
  - 'Jekyll'
  - '博客'
  - '迁移'
excerpt: '记录我的博客从 Jekyll 到 Hexo，再到 xLog，最终迁移至 Next.js 的完整历程。分享技术选型背后的思考与折腾经历，见证个人博客的演进之路。'
---

## 2019.11.8

使用 [GitHub Pages](https://pages.github.com/) 和 [Jekyll](https://jekyllrb.com/) 建立个人博客时默认创建的一篇文章，留个纪念。

## 2020.3.22

经过长时间的折腾，终于将博客迁移到 [Hexo](https://hexo.io/) + [GitHub Pages](https://pages.github.com/) 的技术栈，中途踩了不少坑，好在最终实现了理想的效果。

选用了简约风格的 [Geek](https://github.com/sanjinhub/hexo-theme-geek) 主题，并根据个人偏好进行了定制化改造。将默认的 Sublime 语法高亮主题替换为 One Dark 主题（与 VS Code 编辑器保持一致），同时增加了博文发布时间显示，优化了部分 CSS 样式。

图片托管方案选择了 [sm.ms](https://sm.ms/) 免费图床服务。虽然单张图片大小和总容量有限制，但对于图片需求量不大的个人博客来说完全够用，且上传便捷快速。

总体而言，博客呈现效果令人满意，界面简洁美观，核心功能均已实现。

## 2020.9.2

- 更换博客主题为 [Stun](https://github.com/liuyib/hexo-theme-stun)
- 将博客部署迁移至 [Vercel](https://vercel.com/) 平台
- 集成基于 GitHub Issue 和 Preact 的 [Gitalk](https://gitalk.github.io/) 评论系统

## 2022.11.22

- 移除 [Gitalk](https://gitalk.github.io/) 评论插件
- 更换博客主题为 [Anatole](https://github.com/Ben02/hexo-theme-Anatole)，并进行了删减和性能优化
- 继续托管在 [Vercel](https://vercel.com/) 平台

> 当前主题的代码高亮效果有待改进，后续会继续优化。

## 2023.5.16

考虑到自行维护博客需要投入大量时间和精力，正在尝试迁移至基于区块链技术的 [xLog](https://xlog.app) 平台。

> 该平台在界面设计、数据安全和用户体验方面都很出色。

## 2025.11.19

近期发现 [xLog](https://xlog.app/) 服务出现了一系列问题，包括但不限于：

- [大陆地区访问异常](https://github.com/Crossbell-Box/xLog/issues/2228)
- [文章发布功能失效](https://github.com/Crossbell-Box/xLog/issues/2213)
- [首页被大量营销推广内容占领](https://github.com/Crossbell-Box/xLog/issues/2204)
- [后台无法登录，文章无法导出](https://github.com/Crossbell-Box/xLog/issues/2250)

鉴于服务质量持续下降，决定重新搭建独立博客。

新博客基于现代化技术栈构建：[Next.js 16](https://nextjs.org/) + [React 19](https://react.dev/) + [Tailwind CSS 4](https://tailwindcss.com/)，并部署在 [Vercel](https://vercel.com/) 平台。所有历史内容已完成手工迁移。
