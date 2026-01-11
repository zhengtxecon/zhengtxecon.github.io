# AGENTS.md - AI 代理工作指南（中文摘要）

> **English Version**: See [AGENTS.md](../AGENTS.md) for complete documentation.

## 📋 文档说明

本网站是一个**纯静态网站**（Static HTML/CSS/JS），通过 GitHub Pages 自动部署，**无构建系统**。

本指南为 AI 代理提供完整的工作指引，分为：
- **AGENTS.md**（英文主文档）- 完整的架构、约定和工作流
- **docs/AGENTS-zh.md**（本文档）- 中文摘要，供人类快速理解
- **docs/workflows/** - 具体任务的 step-by-step 指南
- **docs/patterns/** - 代码约定和模式详解
- **docs/reference/** - 快速速查和故障排查

---

## 🚀 快速开始

| 任务 | 查看文档 |
|------|---------|
| 添加新页面 | [workflows/add-new-page.md](workflows/add-new-page.md) |
| 添加博客文章 | [workflows/add-blog-post.md](workflows/add-blog-post.md) |
| 更新导航 | [workflows/update-navigation.md](workflows/update-navigation.md) |
| 更新现有内容 | [workflows/update-content.md](workflows/update-content.md) |
| 查找 CSS 变量 | [reference/css-variables.md](reference/css-variables.md) |
| HTML 结构模式 | [patterns/html-structure.md](patterns/html-structure.md) |
| CSS 约定 | [patterns/css-conventions.md](patterns/css-conventions.md) |
| JavaScript 模式 | [patterns/javascript-modules.md](patterns/javascript-modules.md) |
| 可访问性模式 | [patterns/accessibility-patterns.md](patterns/accessibility-patterns.md) |
| 组件参考 | [reference/components-overview.md](reference/components-overview.md) |
| 故障排查 | [reference/troubleshooting.md](reference/troubleshooting.md) |

---

## 📁 项目结构

```
/
├── index.html                      # 首页
├── cv.html, research.html, teaching.html, blog.html, contact.html
├── blog-research.html, blog-teaching.html, blog-tools.html  # 博客分类
├── series-how-i-almost-ai-everything.html    # 博客系列页
├── [blog-post].html               # 具体博客文章
├── includes/
│   ├── header.html                # 导航（JS 水合）
│   └── footer.html                # 页脚（JS 水合）
├── assets/
│   ├── css/
│   │   ├── style.css              # 主样式 + CSS 变量
│   │   └── [page].css            # 页面专用样式
│   ├── js/
│   │   └── main.js               # 核心交互 + 组件加载
│   ├── images/
│   └── files/
└── docs/                         # 文档目录
    ├── AGENTS-zh.md               # 本文档
    ├── workflows/                 # 工作流指南
    ├── patterns/                 # 代码模式
    └── reference/                # 速查参考
```

---

## 🎯 核心原则

| 原则 | 说明 |
|------|------|
| **优先复用** | 更新 `includes/` 而非复制代码 |
| **语义化 HTML** | 使用 `<section>`, `<article>`, `<nav>` 等 |
| **可访问性** | 添加 `aria-label`, `alt` 文本，键盘可访问 |
| **样式一致** | 使用 `style.css` 中的 CSS 变量，避免硬编码 |
| **性能优先** | `<script defer>`, 图片压缩 ≤200KB |
| **双语支持** | 英文主内容，中文摘要 |

---

## 📝 HTML 约定

### 每页必须包含

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/[page].css">
    <script src="assets/js/main.js" defer></script>
</head>
<body data-page="[context]">
    <div id="header-placeholder"></div>
    <main><!-- 内容 --></main>
    <div id="footer-placeholder"></div>
</body>
</html>
```

### 组件占位符（必须）

```html
<div id="header-placeholder"></div>
<!-- 页面内容 -->
<div id="footer-placeholder"></div>
```

详细模式见：[patterns/html-structure.md](patterns/html-structure.md)

---

## 🎨 CSS 约定

### CSS 变量（禁止硬编码颜色）

```css
:root {
    --color-brand: #3b5bfb;      /* 主色 */
    --color-accent: #f97316;     /* 强调色 */
    --content-max: 1200px;        /* 内容最大宽度 */
    --font-sans: 'Inter', sans-serif;
}
```

### 暗色模式支持

使用 `[data-theme="dark"]` 属性，JS 自动切换，存储在 `localStorage` 中。

详细约定见：[patterns/css-conventions.md](patterns/css-conventions.md)

---

## ⚡ JavaScript 约定

### 模块模式（防止全局污染）

```javascript
(function() {
    'use strict';
    document.addEventListener('DOMContentLoaded', () => {
        // 初始化逻辑
    });
})();
```

### 核心功能（main.js）

1. 组件水合：加载 `includes/header.html` 和 `includes/footer.html`
2. 导航：移动端菜单、页面高亮
3. 主题切换：深色/浅色模式，`localStorage` 持久化
4. 滚动动画：IntersectionObserver 实现淡入效果
5. Header 滚动：粘性导航栏

详细模式见：[patterns/javascript-modules.md](patterns/javascript-modules.md)

---

## 🔧 常见工作流

| 任务 | 修改文件 |
|------|---------|
| 添加新页面 | 创建 `new-page.html` + `assets/css/new-page.css` + `includes/header.html` |
| 添加博客文章 | 创建 `blog-topic.html` + 更新分类页 + `feed.xml` + `sitemap.xml` |
| 更新导航 | `includes/header.html` |
| 更新页脚 | `includes/footer.html` |
| 更新现有内容 | `cv.html`, `research.html`, `teaching.html` |

详细步骤见：[docs/workflows/](workflows/)

---

## ✅ 提交前检查清单

- [ ] HTML 通过 W3C 验证
- [ ] 所有颜色使用 CSS 变量
- [ ] 通过 WAVE 可访问性检查
- [ ] 深色模式正常工作
- [ ] 移动端响应式布局正确
- [ ] 图片已压缩（≤200KB）
- [ ] 所有图片有 `alt` 文本
- [ ] 新页面更新了 `sitemap.xml`
- [ ] 新博客更新了 `feed.xml`

---

## 🚨 常见陷阱

| 问题 | 原因 | 解决方案 |
|------|------|---------|
| 硬编码颜色 | 复制其他代码 | 始终使用 CSS 变量 `var(--color-brand)` |
| 组件占位符缺失 | 手动创建页面 | 必须包含 `header-placeholder` 和 `footer-placeholder` |
| 中文乱码 | 文件编码错误 | 保存为 UTF-8 格式 |
| 主题切换不工作 | 未加载 main.js | 确保包含 `<script src="assets/js/main.js" defer></script>` |

详细故障排查见：[reference/troubleshooting.md](reference/troubleshooting.md)

---

## 🌐 部署

### GitHub Pages

- **仓库**: `zhengtxecon/zhengtxecon.github.io`
- **分支**: `main`
- **部署**: 推送到 `main` 自动部署（1-3 分钟）
- **URL**: `https://zhengtxecon.github.io`

### 部署后验证

- [ ] 新内容出现在正确 URL
- [ ] 导航链接正常
- [ ] 深色模式切换正常
- [ ] 移动端布局正确
- [ ] 浏览器控制台无错误

---

## 📚 详细文档索引

- [AGENTS.md](../AGENTS.md) - 完整英文文档
- [workflows/](workflows/) - 工作流指南
- [patterns/](patterns/) - 代码模式
- [reference/](reference/) - 速查参考

---

**最后更新**: 2026年1月 | **版本**: 2.0
