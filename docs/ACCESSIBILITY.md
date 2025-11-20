# 无障碍性指南 (Accessibility Guidelines)

本文档概述了本博客项目的无障碍性实现和最佳实践。

## 目录

- [概述](#概述)
- [已实施的无障碍功能](#已实施的无障碍功能)
- [键盘导航](#键盘导航)
- [屏幕阅读器支持](#屏幕阅读器支持)
- [颜色与对比度](#颜色与对比度)
- [语义 HTML](#语义-html)
- [图片替代文本](#图片替代文本)
- [测试指南](#测试指南)
- [持续改进](#持续改进)

---

## 概述

本博客遵循 [Web Content Accessibility Guidelines (WCAG) 2.1](https://www.w3.org/WAI/WCAG21/quickref/) AA 级标准,确保所有用户都能访问和使用网站内容。

### 可访问性目标

- **感知性** - 信息和界面组件必须以用户可以感知的方式呈现
- **可操作性** - 界面组件和导航必须是可操作的
- **可理解性** - 信息和界面操作必须是可理解的
- **健壮性** - 内容必须足够健壮,能够被各种用户代理(包括辅助技术)可靠地解释

---

## 已实施的无障碍功能

### 1. 跳转链接 (Skip Links)

实现位置: [app/layout.tsx](../app/layout.tsx:92-97)

```tsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
>
  跳转到主要内容
</a>
```

- 键盘用户可以通过 `Tab` 键快速跳转到主要内容区域
- 默认隐藏,仅在获得焦点时显示
- 提供良好的视觉反馈

### 2. ARIA 标签和角色

实现位置: [app/layout.tsx](../app/layout.tsx:101-143)

```tsx
<header role="banner">
  <nav role="navigation" aria-label="主导航">
    {/* 导航链接 */}
  </nav>
</header>
<main id="main-content" role="main">
  {children}
</main>
<footer role="contentinfo">
  {/* 页脚内容 */}
</footer>
```

- 明确的地标角色 (`banner`, `navigation`, `main`, `contentinfo`)
- 描述性的 `aria-label` 用于导航区域
- 屏幕阅读器能够快速识别页面结构

### 3. 焦点指示器

实现位置: [app/globals.css](../app/globals.css:88-118)

```css
/* 增强的焦点样式 */
:focus-visible {
  outline: 3px solid var(--color-text-primary);
  outline-offset: 3px;
  box-shadow: 0 0 0 3px rgba(128, 128, 128, 0.2);
}

/* 链接焦点样式 */
a:focus-visible {
  outline: 2px solid var(--color-text-primary);
  background-color: rgba(128, 128, 128, 0.1);
}

/* 按钮焦点样式 */
button:focus-visible {
  outline: 2px solid var(--color-text-primary);
  box-shadow: 0 0 0 4px rgba(128, 128, 128, 0.15);
}

/* 导航链接焦点样式 */
nav a:focus-visible {
  padding: 2px 6px;
  border-radius: var(--radius-sm);
}
```

- 明显的焦点指示器(3px 轮廓)
- 为不同元素提供定制的焦点样式
- 使用 `:focus-visible` 避免鼠标点击时显示焦点环

### 4. 语义化时间元素

实现位置: 所有页面

```tsx
<time dateTime={post.date}>
  {dayjs(post.date).format('YYYY-MM-DD')}
</time>
```

- 使用 `<time>` 元素标记日期
- `dateTime` 属性提供机器可读的 ISO 格式
- 人类可读的显示格式

### 5. 主题切换按钮

实现位置: [components/theme-toggle.tsx](../components/theme-toggle.tsx:45-62)

```tsx
<button
  onClick={toggleTheme}
  aria-label={theme === 'light' ? '切换到暗色模式' : '切换到亮色模式'}
  className="..."
>
  {/* 图标 */}
  <span className="sr-only">切换主题</span>
</button>
```

- 动态 `aria-label` 描述当前状态
- `.sr-only` 文本为屏幕阅读器提供额外信息
- 键盘可访问 (`Enter` 和 `Space` 键)

### 6. 外部链接处理

实现位置: [lib/mdx.ts](../lib/mdx.ts:11-23), [app/globals.css](../app/globals.css:76-81)

```tsx
// 自动为外部链接添加属性
<a href="..." target="_blank" rel="noopener noreferrer">
  外部链接
</a>
```

```css
/* 外部链接视觉标识 */
a[target='_blank']::after {
  content: ' ↗';
  opacity: 0.6;
}
```

- `rel="noopener noreferrer"` 增强安全性
- 视觉指示器(箭头)告知用户链接在新标签页打开
- 防止钓鱼攻击

---

## 键盘导航

### 支持的键盘操作

| 键 | 功能 |
|---|------|
| `Tab` | 向前导航到下一个可交互元素 |
| `Shift + Tab` | 向后导航到上一个可交互元素 |
| `Enter` | 激活链接或按钮 |
| `Space` | 激活按钮 |
| `Escape` | (如有模态框)关闭模态框 |

### 焦点管理

- 所有交互元素(链接、按钮)都可通过键盘访问
- 焦点顺序遵循视觉流程和逻辑顺序
- 无焦点陷阱 - 用户可以自由导航

### Tab 顺序

1. 跳转到主要内容链接(隐藏,按 `Tab` 显示)
2. Logo / 网站标题
3. 导航链接:归档、标签、关于
4. 主题切换按钮
5. 主要内容区域(文章列表、文章内容等)
6. 页脚链接

---

## 屏幕阅读器支持

### 已测试的屏幕阅读器

- **macOS VoiceOver** (推荐用于开发测试)
- **NVDA** (Windows)
- **JAWS** (Windows)

### 屏幕阅读器特性

#### 地标导航

屏幕阅读器用户可以通过地标快速导航:

- `banner` - 网站头部
- `navigation` - 主导航菜单
- `main` - 主要内容区域
- `contentinfo` - 页脚

#### 标题结构

```
h1: 页面主标题(每页一个)
├── h2: 主要章节
│   ├── h3: 子章节
│   │   └── h4: 更小的章节(如需要)
```

- 严格遵循标题层级
- 不跳过标题级别
- 使用标题传达内容结构

#### 链接上下文

- 所有链接都有描述性文本
- 避免使用"点击这里"等模糊文本
- 外部链接有视觉和语义指示

---

## 颜色与对比度

### 颜色系统

实现位置: [app/styles/vars.css](../app/styles/vars.css)

使用 OKLCH 色彩空间确保一致和可访问的颜色:

#### 亮色模式

```css
--color-text-primary: oklch(0.08 0 0);    /* 深灰,约 13% 亮度 */
--color-text-secondary: oklch(0.38 0 0);  /* 中灰 */
--color-text-tertiary: oklch(0.58 0 0);   /* 浅灰 */
--color-bg-primary: oklch(1 0 0);         /* 纯白 */
```

#### 暗色模式

```css
--color-text-primary: oklch(0.98 0 0);    /* 浅色,约 98% 亮度 */
--color-text-secondary: oklch(0.70 0 0);  /* 中浅 */
--color-text-tertiary: oklch(0.50 0 0);   /* 中灰 */
--color-bg-primary: oklch(0.12 0 0);      /* 深灰背景 */
```

### 对比度标准

遵循 WCAG 2.1 AA 级标准:

- **正常文本**: 至少 4.5:1 的对比度
- **大文本**(18pt 或 14pt 粗体): 至少 3:1 的对比度
- **UI 组件**: 至少 3:1 的对比度

### 不依赖颜色

- 链接使用下划线(不仅仅是颜色)
- 错误/成功状态使用图标+文本
- 焦点指示器使用轮廓(不仅仅是颜色变化)

---

## 语义 HTML

### 正确的元素使用

#### 文档结构

```html
<header>           <!-- 页面头部 -->
<nav>              <!-- 导航菜单 -->
<main>             <!-- 主要内容 -->
<article>          <!-- 独立的文章内容 -->
<section>          <!-- 内容的主题分组 -->
<aside>            <!-- 侧边栏/相关内容 -->
<footer>           <!-- 页脚 -->
```

#### 文本内容

```html
<h1>-<h6>          <!-- 标题层级 -->
<p>                <!-- 段落 -->
<ul>, <ol>, <li>   <!-- 列表 -->
<blockquote>       <!-- 引用 -->
<figure>, <figcaption> <!-- 图表和说明 -->
```

#### 表格

```html
<table>
  <thead>
    <tr>
      <th scope="col">列标题</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>数据单元格</td>
    </tr>
  </tbody>
</table>
```

- 使用 `<th>` 作为表头
- `scope` 属性明确关联
- 简单表格避免使用嵌套

---

## 图片替代文本

### Alt Text 最佳实践

#### 1. 信息性图片

```tsx
<img src="chart.png" alt="2024年第一季度销售增长趋势图,显示1月至3月销售额从100万增至150万" />
```

- 描述图片传达的信息
- 无需包含"图片"或"图像"等词

#### 2. 装饰性图片

```tsx
<img src="divider.svg" alt="" />
```

- 空 `alt` 属性 (`alt=""`)
- 屏幕阅读器将跳过该图片

#### 3. 功能性图片(图标按钮)

```tsx
<button aria-label="关闭对话框">
  <img src="close-icon.svg" alt="" />
</button>
```

- 图标使用空 `alt`
- 按钮使用 `aria-label` 描述功能

#### 4. 复杂图片(图表、流程图)

```tsx
<figure>
  <img src="flowchart.png" alt="用户注册流程图" />
  <figcaption>
    详细描述:用户首先访问注册页面,填写邮箱和密码...
  </figcaption>
</figure>
```

- 简短的 `alt` 文本概括图片
- `<figcaption>` 提供详细描述

### 图片替代文本检查清单

- [ ] 所有 `<img>` 元素都有 `alt` 属性
- [ ] 信息性图片有描述性 alt text
- [ ] 装饰性图片使用 `alt=""`
- [ ] Alt text 简洁(约 150 字符以内)
- [ ] Alt text 不包含"图片"、"图像"等冗余词汇
- [ ] 复杂图片有额外的描述(longdesc 或 figcaption)

---

## 测试指南

### 自动化测试工具

#### 1. **axe DevTools** (浏览器插件)

- [Chrome 插件](https://chrome.google.com/webstore/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd)
- [Firefox 插件](https://addons.mozilla.org/en-US/firefox/addon/axe-devtools/)
- 检测 WCAG 违规

#### 2. **Lighthouse** (Chrome DevTools)

```bash
# 运行 Lighthouse 审计
1. 打开 Chrome DevTools (F12)
2. 切换到 Lighthouse 标签
3. 选择"Accessibility"类别
4. 点击"分析页面加载"
```

- 检查无障碍性、性能、SEO
- 提供可操作的改进建议

#### 3. **WAVE** (Web Accessibility Evaluation Tool)

- [WAVE 在线工具](https://wave.webaim.org/)
- [浏览器插件](https://wave.webaim.org/extension/)
- 可视化无障碍性问题

### 手动测试

#### 键盘导航测试

1. **仅使用键盘导航**
   ```
   - 按 Tab 键遍历所有交互元素
   - 确认焦点指示器清晰可见
   - 测试 Enter 和 Space 键激活链接和按钮
   - 确认焦点顺序符合逻辑
   ```

2. **跳转链接测试**
   ```
   - 加载页面后按 Tab 键
   - 确认"跳转到主要内容"链接出现
   - 按 Enter 键确认焦点移至主要内容
   ```

#### 屏幕阅读器测试

**macOS VoiceOver**

```bash
# 启动 VoiceOver
Command + F5

# 基本导航
Control + Option + 右箭头: 移至下一项
Control + Option + 左箭头: 移至上一项
Control + Option + Shift + 下箭头: 进入元素
Control + Option + Shift + 上箭头: 退出元素

# 地标导航
Control + Option + U: 打开转子菜单
左/右箭头: 切换到地标列表
上/下箭头: 选择地标
Enter: 跳转到地标
```

**测试清单**

- [ ] 页面标题被正确朗读
- [ ] 地标(banner, navigation, main, contentinfo)可识别
- [ ] 标题层级正确且有意义
- [ ] 链接文本具有描述性
- [ ] 图片 alt text 被正确朗读
- [ ] 表单字段有关联的标签
- [ ] 按钮和交互元素有清晰的名称

#### 颜色对比度测试

**工具**

1. **WebAIM Contrast Checker**
   - [在线工具](https://webaim.org/resources/contrastchecker/)

2. **Chrome DevTools**
   ```
   1. 检查元素
   2. 查看 Styles 面板
   3. 点击颜色值旁边的色板
   4. 查看对比度评级(AA, AAA)
   ```

**测试清单**

- [ ] 正常文本对比度 ≥ 4.5:1
- [ ] 大文本对比度 ≥ 3:1
- [ ] UI 组件对比度 ≥ 3:1
- [ ] 焦点指示器对比度 ≥ 3:1

#### 缩放和文本大小

```
1. 浏览器缩放至 200%
   - 内容依然可读
   - 布局不破坏
   - 无水平滚动条(除非必要)

2. 浏览器字体大小设置为"特大"
   - 文本不被截断
   - 不重叠其他内容
```

---

## 持续改进

### 优先级改进项

#### 高优先级

- [ ] 添加 OG 图片生成(增强社交媒体分享可访问性)
- [ ] 图片优化和 lazy loading
- [ ] 表单验证和错误消息(如添加评论功能)

#### 中优先级

- [ ] 添加搜索功能(需要键盘和屏幕阅读器支持)
- [ ] 实现服务工作者(离线访问)
- [ ] 添加打印样式表

#### 低优先级

- [ ] 增加字体大小控制
- [ ] 高对比度主题选项
- [ ] 动画减少选项(prefers-reduced-motion)

### 无障碍性审查流程

#### 每次发布前检查

1. **自动化测试**
   ```bash
   # 运行 Lighthouse
   pnpm build
   # 使用 Chrome DevTools Lighthouse 分析 out/ 目录
   ```

2. **键盘导航测试**
   - 仅使用键盘浏览新功能
   - 确认焦点指示器可见

3. **屏幕阅读器测试**
   - 使用 VoiceOver 测试关键路径
   - 确认新增内容有正确的语义

4. **对比度检查**
   - 检查所有新增颜色的对比度

#### 定期审查(季度)

- 完整的 WCAG 2.1 AA 级审查
- 使用真实屏幕阅读器测试
- 用户反馈收集和处理
- 更新无障碍性文档

---

## 参考资源

### 规范和指南

- [WCAG 2.1 快速参考](https://www.w3.org/WAI/WCAG21/quickref/)
- [WAI-ARIA 创作实践](https://www.w3.org/WAI/ARIA/apg/)
- [MDN 无障碍性文档](https://developer.mozilla.org/zh-CN/docs/Web/Accessibility)

### 工具

- [axe DevTools](https://www.deque.com/axe/devtools/)
- [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/)
- [WAVE](https://wave.webaim.org/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

### 学习资源

- [WebAIM](https://webaim.org/)
- [The A11y Project](https://www.a11yproject.com/)
- [Inclusive Components](https://inclusive-components.design/)

---

## 联系和反馈

如果您在使用本博客时遇到无障碍性问题,请通过以下方式联系我们:

- GitHub Issues: [提交无障碍性问题](https://github.com/your-repo/issues)
- 邮箱: your-email@example.com

我们致力于持续改进网站的无障碍性,感谢您的反馈!

---

**最后更新**: 2025-11-20
**维护者**: Viki
**版本**: 1.0.0
