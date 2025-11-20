---
layout: 'post'
title: '现代化的高质量 React Hooks 库（已开源）'
date: 2024-07-04
excerpt: '@shined/react-use 是一个对 SSR（服务端渲染）友好、全面且高度优化的 React Hooks 库，提供了灵活且高效的钩子解决方案。完全采用 TypeScript 开发，配备了包含丰富示例的交互式文档。'
---


![shined-react-use-logo](https://s2.loli.net/2024/07/03/XjReoNwi5mI7MbO.png)

## 介绍

`@shined/react-use` 是一个对 SSR（服务端渲染）友好、全面且高度优化的 React Hooks 库，提供了灵活且高效的钩子解决方案。完全采用 TypeScript 开发，配备了包含丰富示例的交互式文档。

主要受到 [VueUse](https://vueuse.org/) 的启发，同时也吸取了 [react-use](https://github.com/streamich/react-use)、[ahooks](https://ahooks.js.org/) 以及社区内许多其他优秀库的影响。特别感谢开源社区，尤其是上述库的作者们，感谢他们的杰出工作和灵感。

## 🚀 特性

- **灵活性**：特性包括 [ElementTarget](https://sheinsight.github.io/react-use/zh-cn/docs/features/element-target)、[Ref Getter](https://sheinsight.github.io/react-use/zh-cn/docs/features/ref-getter)、[Pausable](https://sheinsight.github.io/react-use/zh-cn/docs/features/pausable) 等。
- **可摇树优化**：采用 [ESM](https://nodejs.org/api/esm.html) 设计和交付，只导入你需要的内容。
- **交互式文档**：具有现场示例和 [Playground](https://react-online.vercel.app/#code=aW1wb3J0IHsgY3JlYXRlUm9vdCB9IGZyb20gJ3JlYWN0LWRvbS9jbGllbnQnCmltcG9JdCB7IHVzZU1vdXNlLCB1c2VSZWFjdGl2ZSB9IGZyb20gJ0BzaGluZWQvcmVhY3QtdXNlJwoKCmZ1bmN0aW9uIEFwcCgpIHsKICBjb25zdCB7IHgsIHkgfSA9IHVzZU1vdXNlKCkKICBjb25zdCBbeyBjb3VudCB9LCBtdXRhdGVdID0gdXNlUmVhY3RpdmUoeyBjb3VudDogMCB9KQoKICBjb25zdCBhZGRPbmUgPSAoKSA9PiBtdXRhdGUuY291bnQrKwoKICByZXR1cm4gKAogICAgPGRpdj4KICAgICAgPGRpdj4oeCwgeSk6ICh7eH0sIHt5fSk8L2Rpdj4KICAgICAgPGJ1dHRvbiBvbkNsaWNrPXthZGRPbmV9PkNvdW50OiB7Y291bnR9PC9idXR0b24%2BCiAgICA8L2Rpdj4KICApCn0KCmNyZWF0ZVJvb3QoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKSEpLnJlbmRlcig8QXBwIC8%2BKQo%3D)。
- **轻量级**：自豪地宣布 [零依赖](https://github.com/sheinsight/react-use/blob/main/package.json)。
- **对 SSR 友好**：确保所有钩子与服务端渲染（SSR）兼容。
- **一流的 TypeScript 支持**：用 [TypeScript](https://www.typescriptlang.org/) 编写，拥有命名良好的类型定义和 [JSDoc](https://jsdoc.app/) 注释。
- **全面测试**：（即将推出……）

## ⚡️ 优化

- **安全状态**：为所有有状态的钩子实现了 [安全状态](https://sheinsight.github.io/react-use/zh-cn/docs/optimization/safe-state) 策略，减少了 bug 和不希望的行为。
- **函数稳定**：默认情况下，每个导出函数都受益于 [稳定化](https://sheinsight.github.io/react-use/zh-cn/docs/optimization/stabilization)。
- **最新状态**：通过内部使用 [最新](https://sheinsight.github.io/react-use/zh-cn/docs/optimization/latest-state) 状态，避免了过期闭包问题。
- **减少不必要的重渲染**：使用 [Pausable](https://sheinsight.github.io/react-use/zh-cn/docs/features/pausable) 实例可选地控制某些钩子的行为。

## 其他

### 技术选型现代化、仓库配置标准化

1. 主流 pnpm + monorepo 架构，源码与文档、示例项目共存
2. 使用 .node-version、packageManager 锁定 Node.js 和包管理器版本
3. 使用 tsup 进行源码构建，由 esbuild 驱动，轻量快速
4. 使用 Biome 进行项目 Lint、格式化，基于 Rust 的现代工具
5. 使用 Vitest 进行测试，现代化、注重效率、ESM 优先
6. 使用 Docusaurus 编写文档 + UnoCSS 编写文档 Demo
7. 配置 GitHub Action，包括 CI (lint)、Release、GitHub Pages 流程规范化
8. 配置 npm 的 provenance 发布认证，避免供应链攻击
9. 使用 bumpp 进行版本控制，一站式 version bump、tag、commit、push
10. 使用 conventional-changelog-cli 自动生成更新日志（CHANGELOG.md）
11. 使用 changelogithub 规范化发布 （根据提交信息生成和发布 GitHub Release）
12. 规范 package.json，包括但不限于 exports、sideEffects、typesVersions 等
13. 配置 clean-pkg-json 在发布前执行，确保 package.json 干净、规范化
14. ...

### 完善底层、基础的 Hooks 打好地基，同时为上层特性服务

1. useSafeState => State 行为安全、符合官方倡导，额外支持 deep compare
2. useStableFn => Hooks 导出的函数引用稳定，内部的渲染优化之一
3. useTargetElement => 统一所有 ElementTarget 参数处理，简化元素定位
4. usePausable => 支持各个 Hook 底层的可暂停特性，可选的内部渲染优化之一
5. useSupported => 存在兼容性的 API 的可访问性状态的统一化
6. useEventListener => 处理各种符合事件接口的实例的事件操作
7. useLatest => 通过稳定的 Ref 的应用来避免过期闭包问题
8. useEffect 衍生出的一系列 Hooks (create-xxx-effect) 作为底层依赖
9. ...

## 相关链接

- [GitHub 仓库](https://github.com/sheinsight/react-use)
- [官方文档（中英双语）](https://sheinsight.github.io/react-use)
