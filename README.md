# html-doc

`html-doc` is a general-purpose Skill for turning compact JSON into readable, visual-first HTML review documents.

Use it when Markdown makes the information too flat: wide comparisons, architecture maps, state changes, code diffs, evidence boards, nested structures, decision matrices, and lightweight editors.

## What It Does

- Write simple JSON.
- The bundled renderer creates a warm, flat, human-readable HTML document.
- The visual system is handled by the renderer, so the JSON stays focused on content, components, relationships, and useful interactions.
- Tables include sticky headers, frozen first columns, default stripe rows, compact badges, progress cells, search, filters, sorting, grouping, and expandable details.
- Visible text supports light inline `code` and `**bold**` formatting across components.

## Render An Example

```bash
node scripts/render-html-doc.mjs examples/component-showcase.json dist/component-showcase.html
```

Then open the generated HTML file in a browser.

## Files

- `SKILL.md`: the Skill entrypoint
- `references/schema.md`: JSON component reference
- `scripts/render-html-doc.mjs`: renderer CLI
- `src/`: renderer, styles, and client interactions
- `examples/`: JSON examples
- `dist/`: generated HTML examples

## Install Locally

Copy this folder into your local skills directory:

```bash
cp -R . /path/to/skills/html-doc
```

## 配置、依赖与使用边界

Node.js 运行 scripts/render-html-doc.mjs；无需专用账号或 API Key。以 references/schema.md 为组件字段依据。

文档渲染不替代有实时业务状态的应用。只处理选定文件；有外部字体或图表依赖时，离线交付需一起本地化。

使用示例：

```text
把这份方案对比做成 html-doc，保留来源与宽表。
```

## GitHub 安装

把 [仓库地址](https://github.com/oil-oil/html-doc) 交给 Agent，要求按 README 安装；也可运行：

```bash
npx skills add oil-oil/html-doc
```

安装后由宿主重新加载 Skill。
