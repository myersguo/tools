# Terminal / CLI Template Studio

使用 React + TypeScript 构建的静态模板生成器。编辑器可部署到 GitHub Pages；每次生成的结果仍是一个可通过 `file://` 离线打开、无外部依赖的独立 HTML 文件。

## 本地开发

```bash
npm install
npm run dev
```

质量检查：

```bash
npm run check
```

生产产物位于 `dist/`。

## 内置模板

- `Feature + Terminal`：单项能力介绍
- `Hero + Terminal`：产品首屏与双 CTA
- `Quickstart Steps`：步骤列表及安装方式 tabs
- `Numbered Cards`：编号命令/能力网格

Steps 安装方式格式：

```text
1 | Install Codex | Choose an installation method.
[macOS/Linux]
Install Codex
curl -fsSL https://chatgpt.com/codex/install.sh | sh

[Windows]
Install Codex
irm https://chatgpt.com/codex/install.ps1 | iex

2 | Run Codex and sign in | Open a project directory and run codex.
```

## 添加自定义模板

1. 在 `src/templates/` 新建模板模块。
2. 使用统一的 `TemplateDefinition` 契约声明：
 - `id`、`name`、`description`
 - `fields`：模板专属字段 schema
 - `sample`：示例数据
 - `render(values)`：返回 `body`，以及可选的 `css`、`script`、`title`
3. 在 `src/templates/index.ts` 的 `templateRegistry` 中注册。
4. 添加模板契约测试。

模板字段 ID 可以自定义，不需要修改核心引擎。React只用于编辑器，不会进入导出的 HTML。

简化示例：

```ts
import { escapeHtml } from '../core/escape'
import { defineTemplate } from './index'

export const bannerTemplate = defineTemplate({
 id: 'custom-banner',
 name: 'Custom Banner',
 description: 'Project-specific banner.',
 fields: [
 { id: 'badge', label: 'Badge', kind: 'text', hint: 'Optional label.' },
 ],
 sample: { badge: 'Experimental' },
 render(values) {
 return { body: `<p>${escapeHtml(values.badge)}</p>` }
 },
})
```

所有自定义模板都必须使用 `src/core/escape.ts` 的转义工具处理用户输入；示例已采用 `escapeHtml()`。

## GitHub Pages 发布

本工具作为 `tools/terminal-cli-template-generator` 子工具发布。根仓库 `.github/workflows/deploy.yml` 会在推送到 `main` 后进入本目录，运行 `npm install` 和 `npm run check`，再把 `dist/` 移动到 `publish/terminal-cli-template-generator`。

发布入口：

- 在线路径：`https://myersguo.github.io/tools/terminal-cli-template-generator`
- 本地目录：`tools/terminal-cli-template-generator`
- 发布前检查：`npm run check`

Vite 使用 `base: './'`，可部署到用户站点或项目子路径。

##目录

```text
src/core/ 公共离线文档壳、转义、内容解析、类型
src/templates/ 模板注册表与各模板实现
src/components/ React 编辑器组件
src/styles/ 编辑器样式
tests/ 模板契约与 UI 回归测试
legacy/ 重构前单文件版本，仅作迁移参考
```
