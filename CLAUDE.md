# Tools - Web 开发工具集合

## 项目定位

`tools` 是一个 Web 前端工具集合，提供多个实用的在线工具。所有工具采用 React + TypeScript 构建，使用统一的配色方案，部署在 GitHub Pages。

**在线访问**：https://myersguo.github.io/tools/

## 项目结构

```
tools/
├── homepage/              # 工具集主页（导航入口）
├── json-diff-viewer/      # JSON 对比工具
├── json-formatter/        # JSON 格式化工具
├── encoder-decoder/       # 编解码工具
└── CLAUDE.md             # 本文件
```

## 子项目概览

| 项目 | 用途 | 技术栈 | 访问路径 |
|------|------|--------|---------|
| **homepage** | 工具集主页 | React + Tailwind CSS + Lucide React | `/` |
| **json-diff-viewer** | JSON 对比查看器 | React + Bootstrap + react-diff-viewer-continued | `/json-diff-viewer` |
| **json-formatter** | JSON 格式化工具 | React + Bootstrap + react-json-view-lite | `/json-formatter` |
| **encoder-decoder** | 编解码工具 | React + Bootstrap | `/encoder-decoder` |

## 统一配色方案

所有项目使用配色，确保视觉一致性。

### 配色变量定义

**homepage（Tailwind 配置）** - 在 `tailwind.config.js` 中定义：

```javascript
colors: {
  'claude': {
    'primary': 'hsl(195, 100%, 40%)',  // 青蓝色 - 链接和交互
    'button': '#334BFA',                // 按钮蓝
    'accent': '#CC785C',                // 陶土橙 - 强调色
  },
  'claude-bg': {
    'main': '#FFFFFF',                  // 主背景
    'header': '#F0F0EB',                // 页眉背景 - 米白色
    'footer': '#191919',                // 页脚背景 - 深炭黑
    'card': '#FFFFFF',                  // 卡片背景
  },
  'claude-text': {
    'primary': '#1a1a1a',               // 主文本
    'secondary': '#737373',             // 次要文本
    'light': '#F0F0EB',                 // 浅色文本（深色背景）
  },
  'claude-status': {
    'info': '#334bfa',
    'info-bg': '#dce1f9',
    'success': '#0f7134',
    'success-bg': '#d7efdc',
    'warning': '#b24d00',
    'warning-bg': '#ffebdb',
    'error': '#df2020',
    'error-bg': '#ffdbdb',
  },
  'claude-border': {
    'light': '#E6E6E6',                 // 浅灰边框
    'medium': '#CCCCCC',                // 中灰边框
  }
}
```

**其他项目（CSS 变量）** - 在 `src/index.css` 中定义：

```css
:root {
  /* Claude brand colors */
  --claude-primary: hsl(195, 100%, 40%);
  --claude-button: #334BFA;
  --claude-accent: #CC785C;

  /* Background colors */
  --claude-bg-main: #FFFFFF;
  --claude-bg-header: #F0F0EB;
  --claude-bg-footer: #191919;
  --claude-bg-card: #FFFFFF;

  /* Text colors */
  --claude-text-primary: #1a1a1a;
  --claude-text-secondary: #737373;
  --claude-text-light: #F0F0EB;

  /* Status colors */
  --claude-status-info: #334bfa;
  --claude-status-info-bg: #dce1f9;
  --claude-status-success: #0f7134;
  --claude-status-success-bg: #d7efdc;
  --claude-status-warning: #b24d00;
  --claude-status-warning-bg: #ffebdb;
  --claude-status-error: #df2020;
  --claude-status-error-bg: #ffdbdb;

  /* Border colors */
  --claude-border-light: #E6E6E6;
  --claude-border-medium: #CCCCCC;
}
```

## 常用命令

### 根目录操作

```bash
# 查看所有子项目
ls -d */

# 批量安装依赖
for dir in homepage json-diff-viewer json-formatter encoder-decoder; do
  cd $dir && npm install && cd ..
done

# 批量构建
for dir in homepage json-diff-viewer json-formatter encoder-decoder; do
  cd $dir && npm run build && cd ..
done
```

### 单个项目操作

```bash
# 进入子项目目录
cd homepage  # 或 json-diff-viewer / json-formatter / encoder-decoder

# 安装依赖
npm install

# 本地开发
npm start

# 构建生产版本
npm run build

# 运行测试
npm test
```

### 部署到 GitHub Pages

所有项目配置了 `homepage` 字段，构建后直接推送到仓库即可自动部署。

## 开发规范

### 1. 配色规范

**必须遵守**：
- 所有新功能必须使用配色变量，禁止硬编码颜色值
- homepage 项目使用 Tailwind 类名（如 `text-claude-text-primary`）
- 其他项目使用 CSS 变量（如 `var(--claude-text-primary)`）
- 不使用 dark mode 媒体查询，统一使用配色

**配色使用示例**：

```tsx
// homepage (Tailwind)
<div className="bg-claude-bg-card border border-claude-border-light">
  <h1 className="text-claude-text-primary">标题</h1>
  <p className="text-claude-text-secondary">描述</p>
  <button className="bg-claude-button text-white">按钮</button>
</div>

// 其他项目 (CSS 变量)
<div className="card">
  <h1>标题</h1>  {/* 通过 CSS: color: var(--claude-text-primary) */}
</div>
```

### 2. 代码规范

- **TypeScript 优先**：所有新代码使用 TypeScript
- **组件化开发**：拆分可复用组件
- **命名规范**：
  - 组件文件：PascalCase（如 `JsonDiffViewer.tsx`）
  - 样式文件：camelCase（如 `index.css`, `App.css`）
  - 常量：UPPER_SNAKE_CASE

### 3. 文件结构规范

每个子项目遵循标准的 Create React App 结构：

```
project/
├── public/
│   └── index.html
├── src/
│   ├── App.tsx        # 主组件
│   ├── App.css        # 组件样式（使用配色变量）
│   ├── index.tsx      # 入口文件
│   └── index.css      # 全局样式（定义配色变量）
├── package.json
└── tsconfig.json
```

### 4. 依赖管理

- 优先使用项目内已有的依赖版本
- 添加新依赖前评估必要性
- 共享依赖保持版本一致

### 5. 提交规范

```bash
# 提交信息格式
feat: add xxx feature      # 新功能
fix: fix xxx bug          # 修复
style: update colors      # 样式调整
refactor: refactor xxx    # 重构
docs: update README       # 文档
```

## 修改配色流程

如果需要调整配色，按以下步骤操作：

1. **修改 homepage**：编辑 `homepage/tailwind.config.js` 的 `colors` 部分
2. **修改其他项目**：编辑各项目的 `src/index.css` 中的 `:root` 变量定义
3. **验证**：启动所有项目检查视觉效果
4. **文档同步**：更新本文件的配色变量定义部分

## 添加新工具

1. 在根目录创建新项目：`npx create-react-app new-tool --template typescript`
2. 配置 `package.json`：
   ```json
   {
     "homepage": "https://myersguo.github.io/tools/new-tool"
   }
   ```
3. 复制配色定义：
   - 复制 `json-diff-viewer/src/index.css` 中的 `:root` 部分
   - 在组件 CSS 中使用配色变量
4. 在 `homepage/src/App.tsx` 添加工具卡片
5. 构建并测试部署

## 技术参考

- [Create React App](https://create-react-app.dev/)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [Tailwind CSS](https://tailwindcss.com/)
