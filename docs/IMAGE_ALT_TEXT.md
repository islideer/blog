# 图片替代文本指南 (Image Alt Text Guide)

本文档提供编写高质量图片替代文本(Alt Text)的完整指南,确保网站图片对所有用户都可访问。

## 目录

- [为什么需要 Alt Text](#为什么需要-alt-text)
- [Alt Text 基础](#alt-text-基础)
- [不同类型图片的处理](#不同类型图片的处理)
- [编写技巧](#编写技巧)
- [常见错误](#常见错误)
- [测试和验证](#测试和验证)
- [MDX 中的图片](#mdx-中的图片)
- [检查清单](#检查清单)

---

## 为什么需要 Alt Text

### 无障碍性

- **屏幕阅读器用户** - 视力障碍用户依赖 alt text 理解图片内容
- **图片加载失败** - 网络问题或文件丢失时,alt text 提供替代信息
- **文本浏览器** - 某些用户使用纯文本浏览器
- **认知障碍** - Alt text 可以帮助理解复杂图片

### SEO 优势

- **搜索引擎** - Google 等搜索引擎使用 alt text 理解图片内容
- **图片搜索** - 改善在 Google Images 等服务中的排名
- **上下文关联** - 帮助搜索引擎理解页面主题

### 法律合规

- **WCAG 2.1 要求** - Level A 要求所有非装饰性图片有 alt text
- **各国法规** - 美国 ADA,欧盟 EN 301 549 等要求无障碍性

---

## Alt Text 基础

### 语法

```html
<!-- HTML -->
<img src="path/to/image.jpg" alt="描述性文本" />

<!-- Markdown -->
![描述性文本](path/to/image.jpg)

<!-- MDX / JSX -->
<img src="/images/example.jpg" alt="描述性文本" />
```

### 基本原则

1. **简洁** - 通常 125-150 字符以内
2. **描述性** - 准确描述图片传达的信息
3. **语境相关** - 考虑图片在页面中的用途
4. **不冗余** - 避免"图片"、"图像"等词
5. **不重复** - 不要重复周围的文字内容

---

## 不同类型图片的处理

### 1. 信息性图片 (Informative Images)

传达重要信息或增强文本理解的图片。

#### 示例 1: 技术图表

```markdown
❌ 不好的 Alt Text
![图片](./component-lifecycle.png)

✅ 好的 Alt Text
![React 组件生命周期图,展示挂载、更新、卸载三个阶段及其对应的钩子函数](./component-lifecycle.png)
```

#### 示例 2: 代码截图

```markdown
❌ 不好的 Alt Text
![代码](./code-example.png)

✅ 好的 Alt Text
![TypeScript 代码示例,展示如何使用泛型约束定义一个获取对象属性的函数](./code-example.png)
```

#### 示例 3: UI 截图

```markdown
❌ 不好的 Alt Text
![截图](./dashboard.png)

✅ 好的 Alt Text
![应用仪表盘界面,显示本月访问量 15,234 次,用户增长 12%,以及最近 7 天的流量趋势图](./dashboard.png)
```

**原则**:
- 描述图片传达的关键信息
- 如果图片包含文字,考虑转录重要文字
- 说明图片的目的或结论

---

### 2. 装饰性图片 (Decorative Images)

纯装饰、不传达额外信息的图片。

#### 识别装饰性图片

- 纯美化效果的背景图案
- 分隔线、装饰性边框
- 已在文字中描述的图片
- 纯氛围图片

#### 处理方式

```markdown
<!-- 使用空 alt 属性 -->
![](./decorative-pattern.svg)

<!-- 或明确标记为装饰 -->
<img src="./divider.svg" alt="" role="presentation" />
```

**示例**:

```markdown
❌ 不好 - 不必要的描述
![蓝色波浪形分隔线](./wave-divider.svg)

✅ 好 - 空 alt
![](./wave-divider.svg)
```

**注意**: 空 alt (`alt=""`) 不等于没有 alt 属性!

---

### 3. 功能性图片 (Functional Images)

作为链接或按钮的图片,传达动作或目的。

#### 示例 1: 图标链接

```tsx
❌ 不好
<a href="https://github.com/user">
  <img src="github-icon.svg" alt="GitHub" />
</a>

✅ 好
<a href="https://github.com/user">
  <img src="github-icon.svg" alt="访问 GitHub 主页" />
</a>
```

#### 示例 2: 按钮图标

```tsx
❌ 不好
<button>
  <img src="close-icon.svg" alt="X" />
</button>

✅ 好
<button aria-label="关闭对话框">
  <img src="close-icon.svg" alt="" />
</button>
```

**原则**:
- 描述点击后的动作,而非图片外观
- 如果父元素有 `aria-label`,图标可以使用空 alt
- 避免重复(如链接文字已说明,图标可用空 alt)

---

### 4. 复杂图片 (Complex Images)

包含大量信息的图片,如图表、流程图、信息图。

#### 方法 1: 简短 Alt + 详细说明

```markdown
![网站架构流程图](./architecture.png)

**流程图说明:**
1. 用户请求到达 CDN
2. CDN 检查缓存,若命中直接返回
3. 若未命中,请求转发至负载均衡器
4. 负载均衡器将请求分发至应用服务器
5. 应用服务器查询数据库并返回结果
```

#### 方法 2: 使用 Figure 和 Figcaption

```html
<figure>
  <img
    src="./sales-chart.png"
    alt="2024 年第一季度销售数据图表"
  />
  <figcaption>
    <p><strong>详细数据:</strong></p>
    <ul>
      <li>1 月销售额: 100 万元,同比增长 15%</li>
      <li>2 月销售额: 120 万元,同比增长 20%</li>
      <li>3 月销售额: 150 万元,同比增长 25%</li>
    </ul>
  </figcaption>
</figure>
```

#### 方法 3: 链接到详细描述

```html
<img
  src="./complex-diagram.png"
  alt="系统交互序列图"
/>
<a href="#diagram-description">查看详细说明</a>

<!-- 页面其他位置 -->
<div id="diagram-description">
  <h3>序列图详细说明</h3>
  <p>该序列图展示了...</p>
</div>
```

**原则**:
- Alt text 简要概括
- 提供完整的文字描述
- 考虑使用表格或列表呈现数据

---

### 5. 文本图片 (Images of Text)

包含文字的图片(应尽量避免,优先使用真实文本)。

#### 处理方式

```markdown
❌ 避免使用文本图片
![欢迎来到我的博客](./text-banner.png)

✅ 使用真实文本
<h1>欢迎来到我的博客</h1>

⚠️ 如果必须使用
![引用:"代码是写给人读的,只是恰好可以被机器执行" - Donald Knuth](./quote.png)
```

**原则**:
- 转录图片中的所有文字
- 包含作者信息(如引用)
- 如果文字很长,考虑在周围提供完整文本

---

## 编写技巧

### 1. 描述内容,而非外观

```markdown
❌ 不好 - 描述外观
![一个红色的圆形按钮](./button.png)

✅ 好 - 描述功能
![提交表单按钮](./button.png)
```

### 2. 保持简洁

```markdown
❌ 太冗长
![这是一张显示了一位开发者坐在电脑前写代码的照片,背景是一个现代化的办公室,有很多植物,窗外阳光明媚](./developer.jpg)

✅ 简洁有效
![开发者在现代办公室编写代码](./developer.jpg)
```

### 3. 避免冗余词汇

```markdown
❌ 冗余
![图片:React Hooks 示意图](./hooks.png)
![React Hooks 的图像](./hooks.png)

✅ 简洁
![React Hooks 示意图](./hooks.png)
```

### 4. 考虑上下文

```markdown
<!-- 文章: "React 19 新特性介绍" -->

❌ 脱离上下文
![代码](./code.png)

✅ 符合上下文
![React 19 中 use() Hook 的使用示例](./code.png)
```

### 5. 特殊字符处理

```markdown
<!-- 包含数学公式 -->
![E = mc² 公式,展示质能等价关系](./formula.png)

<!-- 包含代码 -->
![函数签名: function useState<T>(initialValue: T): [T, (newValue: T) => void]](./signature.png)
```

---

## 常见错误

### ❌ 错误 1: 没有 Alt 属性

```html
<!-- 缺少 alt 属性 -->
<img src="important-chart.png" />
```

**后果**: 屏幕阅读器会朗读文件名,可能是"important dash chart dot P N G"

---

### ❌ 错误 2: 空白 Alt Text(对信息性图片)

```markdown
<!-- 信息性图片使用空 alt -->
![](./architecture-diagram.png)
```

**后果**: 屏幕阅读器用户完全跳过该图片,错失重要信息

---

### ❌ 错误 3: 文件名作为 Alt Text

```markdown
<!-- 使用文件名 -->
![react-component-lifecycle-2024-v2-final.png](./react-component-lifecycle-2024-v2-final.png)
```

**后果**: 无意义的技术细节,用户体验差

---

### ❌ 错误 4: "图片"等冗余词

```markdown
<!-- 冗余 -->
![图片:React Hooks 使用方法](./hooks.png)
![这是一张关于组件生命周期的图](./lifecycle.png)
```

**后果**: 浪费字符,增加听觉负担

---

### ❌ 错误 5: Alt Text 过长

```markdown
<!-- 过长 -->
![本图展示了 React 组件的完整生命周期,从组件创建、挂载到 DOM、接收新的 props 或 state、更新渲染、最终从 DOM 卸载的整个过程,包括 constructor、getDerivedStateFromProps、render、componentDidMount、shouldComponentUpdate、getSnapshotBeforeUpdate、componentDidUpdate 和 componentWillUnmount 等所有生命周期方法,以及它们的调用顺序和时机](./lifecycle.png)
```

**后果**: 听起来冗长,可能被截断

---

### ❌ 错误 6: 重复周围文字

```markdown
## React Hooks 使用指南

React Hooks 是 React 16.8 引入的新特性...

<!-- 重复标题 -->
![React Hooks 使用指南](./hooks.png)

<!-- ✅ 应该描述图片独特信息 -->
![useState 和 useEffect 的代码示例](./hooks.png)
```

---

## 测试和验证

### 自动化测试

#### 1. Lighthouse (Chrome DevTools)

```bash
1. 打开 Chrome DevTools (F12)
2. Lighthouse 标签
3. 选择 Accessibility
4. 运行审计
5. 检查 "Image elements have [alt] attributes" 项
```

#### 2. axe DevTools

```bash
1. 安装 axe DevTools 浏览器插件
2. 打开插件
3. 点击 "Scan"
4. 查看 "Images must have alternate text" 问题
```

#### 3. WAVE 工具

```bash
1. 访问 https://wave.webaim.org/
2. 输入页面 URL
3. 查看红色错误图标(缺失 alt)
4. 查看警告图标(可疑的 alt)
```

### 手动测试

#### 方法 1: 屏幕阅读器测试

**macOS VoiceOver**:

```bash
1. 启动 VoiceOver (Command + F5)
2. 浏览图片
3. 听取 alt text 朗读
4. 确认信息清晰、有意义
```

**Windows NVDA**:

```bash
1. 启动 NVDA
2. 使用箭头键浏览
3. 遇到图片时听取描述
```

#### 方法 2: 浏览器开发工具

```bash
1. 右键点击图片
2. 选择"检查"
3. 查看 alt 属性值
4. 评估是否描述准确
```

#### 方法 3: 禁用图片测试

```bash
Chrome:
1. Settings → Privacy and Security → Content → Images
2. 选择 "Do not show images"
3. 刷新页面
4. 检查 alt text 是否提供足够信息

Firefox:
1. about:config
2. 搜索 permissions.default.image
3. 设置为 2(禁用图片)
```

### 验证检查清单

- [ ] 所有 `<img>` 元素都有 `alt` 属性
- [ ] 信息性图片有描述性 alt text
- [ ] 装饰性图片使用空 alt (`alt=""`)
- [ ] Alt text 长度合适(通常 < 150 字符)
- [ ] Alt text 没有"图片"、"图像"等冗余词
- [ ] 功能性图片描述动作,而非外观
- [ ] 复杂图片有额外的详细描述
- [ ] Alt text 不重复周围文字
- [ ] Alt text 与图片上下文相关

---

## MDX 中的图片

### 基础用法

```mdx
---
title: 我的文章
---

# 标题

这是一段文字。

![React 组件层级树,展示父组件 App、子组件 Header 和 Main、以及孙组件 Nav 和 Content 的关系](./component-tree.png)
```

### 使用 Next.js Image 组件

```mdx
import Image from 'next/image'

<Image
  src="/images/architecture.png"
  alt="微服务架构图,展示 API Gateway、服务注册中心、多个微服务实例和数据库的交互关系"
  width={800}
  height={600}
/>
```

### 图片+说明 (Figure)

```mdx
<figure>
  <img
    src="./performance-metrics.png"
    alt="性能指标对比图"
  />
  <figcaption>
    **性能提升明显:** 优化后 LCP 从 3.2s 降至 1.5s,FID 从 150ms 降至 50ms
  </figcaption>
</figure>
```

### 多张相关图片

```mdx
<div class="image-grid">
  <figure>
    <img src="./before.png" alt="优化前:页面加载时间 5.2 秒" />
    <figcaption>优化前</figcaption>
  </figure>

  <figure>
    <img src="./after.png" alt="优化后:页面加载时间 1.8 秒" />
    <figcaption>优化后</figcaption>
  </figure>
</div>
```

---

## 检查清单

### 文章发布前检查

- [ ] **所有图片都有 alt 属性**
  ```bash
  grep -r '<img' --include="*.mdx" --include="*.md" | grep -v 'alt='
  ```

- [ ] **信息性图片有描述**
  - 技术图表?
  - 代码截图?
  - UI 界面?
  - 数据图表?

- [ ] **装饰性图片使用空 alt**
  - 分隔线?
  - 背景图案?
  - 纯装饰元素?

- [ ] **复杂图片有详细说明**
  - 流程图?
  - 架构图?
  - 数据可视化?

- [ ] **功能性图片描述动作**
  - 按钮图标?
  - 链接图片?
  - 交互元素?

### 定期审查(月度)

- [ ] 使用 Lighthouse 扫描所有页面
- [ ] 抽查 5-10 篇文章的图片 alt text
- [ ] 用屏幕阅读器测试新文章
- [ ] 检查是否有新的图片类型需要指南更新

---

## 实用工具

### Alt Text 生成辅助

虽然不能完全依赖 AI,但可以用作起点:

1. **ChatGPT / Claude**
   ```
   提示词: "请为这张图片生成描述性的 alt text。图片内容是..."
   ```

2. **Microsoft Azure Computer Vision**
   - 自动生成图片描述
   - 需要人工审核和调整

3. **Google Cloud Vision API**
   - 识别图片内容
   - 提供标签和描述建议

**注意**: AI 生成的 alt text 必须经过人工审核!

### 长度检查工具

```javascript
// Alt text 长度检查
function checkAltTextLength(altText) {
  if (altText.length > 150) {
    console.warn(`Alt text 过长 (${altText.length} 字符): ${altText}`)
  }
  if (altText.length === 0) {
    console.warn('Alt text 为空,确认图片是否为装饰性')
  }
}
```

---

## 资源链接

### 官方指南

- [W3C Alt Text Guidelines](https://www.w3.org/WAI/tutorials/images/)
- [WebAIM Alternative Text](https://webaim.org/techniques/alttext/)
- [WCAG 2.1 - Text Alternatives](https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html)

### 工具

- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE](https://wave.webaim.org/)
- [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/)

### 进阶阅读

- [An alt Decision Tree](https://www.w3.org/WAI/tutorials/images/decision-tree/)
- [Alt Text for Complex Images](https://www.w3.org/WAI/tutorials/images/complex/)
- [Accessible Images Guide](https://www.a11yproject.com/posts/alt-text/)

---

## 实际示例

### 示例 1: 技术博客文章

```mdx
---
title: "React 19 新特性详解"
---

# React 19 新特性详解

React 19 引入了多个令人兴奋的新特性。

## use() Hook

![use() Hook 代码示例,展示如何使用 use() 解包 Promise 并在组件中直接使用返回值](./use-hook-example.png)

`use()` Hook 允许你在组件中直接"使用"Promise...

## Server Components

![React Server Components 架构图,显示服务器组件在服务端渲染、客户端组件在浏览器渲染、以及两者之间的边界](./server-components-arch.png)

**架构说明:**
- 服务器组件(灰色区域):在服务端执行,可直接访问数据库
- 客户端组件(蓝色区域):在浏览器执行,可处理交互
- 边界(虚线):数据序列化传输点

---

![](./decorative-divider.svg)

## 性能对比

<figure>
  <img
    src="./performance-comparison.png"
    alt="React 18 vs React 19 性能对比柱状图"
  />
  <figcaption>
    **性能提升数据:**
    - 初始加载: React 19 快 25%
    - 水合时间: React 19 快 30%
    - 交互响应: React 19 快 15%
  </figcaption>
</figure>
```

---

## 总结

编写高质量的 alt text 是 Web 无障碍性的基础:

1. ✅ **每张图片都要有 alt 属性**(装饰性图片用空 alt)
2. ✅ **描述内容和意义**,而非外观
3. ✅ **保持简洁**,通常 150 字符以内
4. ✅ **考虑上下文**,与周围内容协调
5. ✅ **定期测试**,使用自动化工具和屏幕阅读器

良好的 alt text 不仅帮助残障用户,也改善 SEO、增强用户体验,是每个开发者的责任。

---

**最后更新**: 2025-11-20
**维护者**: Viki
**版本**: 1.0.0
