# Prototype HTML

Use this reference when the document needs a high-fidelity UI prototype, product mockup, custom interaction canvas, or layout that would become awkward inside `stage` JSON.

The normal html-doc path is still Markdown first:

```bash
node scripts/render-html-doc.mjs examples/homepage.md index.html
```

Use standalone HTML only when the reader needs to inspect an interface shape directly: panels, drawers, responsive states, product chrome, dense controls, or a clickable prototype.

## Workflow

1. Create a standalone `.html` file under `dist/prototypes/` or another publishable folder.
2. Export the shared CSS once:

```bash
node scripts/export-html-doc-css.mjs dist/html-doc.css
```

3. Link the exported CSS from the prototype file.
4. Write only the prototype surface in custom HTML and CSS. Reuse html-doc tokens, typography, block surfaces, buttons, grid rhythm, and stage primitives when they fit.
5. Embed the prototype in the main Markdown document with `embed` when the report benefits from seeing it inline.

## Template

Save this as `dist/prototypes/editor-flow.html` when the prototype is part of a GitHub Pages build:

```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Editor Flow Prototype</title>
  <link rel="stylesheet" href="../html-doc.css">
  <style>
    body {
      min-height: 100vh;
      padding: var(--space-6);
    }

    .prototype-shell {
      width: min(100%, 1180px);
      margin: 0 auto;
      display: grid;
      grid-template-columns: 260px minmax(0, 1fr);
      gap: var(--space-4);
    }

    .prototype-panel {
      border: 1px solid var(--border-base);
      background: rgba(255, 255, 255, .72);
      padding: var(--space-4);
      min-height: 520px;
    }

    .prototype-toolbar {
      display: flex;
      gap: var(--space-2);
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid var(--border-base);
      padding-bottom: var(--space-3);
      margin-bottom: var(--space-4);
    }

    .prototype-title {
      font: 600 var(--fs-lg)/1.25 var(--font-human);
    }

    @media (max-width: 760px) {
      .prototype-shell { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <main class="prototype-shell">
    <aside class="prototype-panel">
      <div class="kicker">Input</div>
      <h2>初稿</h2>
      <p>把真实界面和关键控件画出来，让读者直接判断交互是否成立。</p>
    </aside>

    <section class="prototype-panel">
      <div class="prototype-toolbar">
        <div class="prototype-title">编辑器原型</div>
        <button class="primary">Run check</button>
      </div>
      <div class="stage-wrap" style="--stage-ratio: 16 / 9;">
        <div class="stage-layer">
          <div class="stage-el" style="--x:6%;--y:12%;--w:38%;--h:68%;">
            <div class="stage-panel">
              <div class="stage-panel-title">Draft</div>
              <p>标题
正文
待确认观点</p>
            </div>
          </div>
          <div class="stage-el" style="--x:56%;--y:12%;--w:34%;--h:68%;">
            <div class="stage-panel">
              <div class="stage-panel-title">Review</div>
              <p>语气
结构
证据</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</body>
</html>
```

## Embed In Markdown

```markdown
~~~embed
{
  "id": "editor-prototype",
  "span": 12,
  "title": "编辑器原型可以作为独立页面审阅",
  "body": "这类界面原型用独立 HTML 更容易控制布局、状态和响应式细节。",
  "url": "dist/prototypes/editor-flow.html",
  "height": "720px"
}
~~~
```

## Writing Rules

- Keep the surrounding report in Markdown. Use standalone HTML only for the prototype surface.
- Reuse html-doc CSS tokens first: `--bg-canvas`, `--border-base`, `--text-main`, `--accent-primary`, `--font-human`, and spacing variables.
- Keep prototype-specific CSS scoped under a prefix such as `.prototype-*`.
- Use html-doc classes when they already express the idea: `.block`, `.kicker`, `.label`, `.stage-wrap`, `.stage-panel`, `.stage-note`, buttons, and code styles.
- Avoid marketing sections, hero layouts, and decorative backgrounds. The prototype should show the actual product state or interaction idea.
- Verify the standalone page directly, then verify the Markdown document that embeds it.
