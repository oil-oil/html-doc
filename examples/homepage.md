---
title: html-doc
subtitle: Markdown 起稿，生成一页更适合人阅读、审阅和确认的 HTML
lang: zh-CN
glossary:
  信息形状: 内容真正要呈现的关系类型——顺序、对比、状态变化、架构或证据
---

~~~hero
{
  "kicker": "html-doc · readable documents from Markdown",
  "title": "Markdown 超过 100 行就不会被读完——html-doc 重组它",
  "body": "用 [[信息形状]] 驱动选组件，而不是用文字填容器。作者写 `.md`，渲染器负责视觉，读者只需确认。",
  "tags": ["Markdown 起稿", "结构清楚", "适合审阅", "可分享"]
}
~~~

~~~splitPanel
{
  "variant": "quote",
  "quote": "选对了组件还不够——要用它的语法重组信息，而不是把原文倒进去。",
  "attribution": "核心原则"
}
~~~

~~~metrics
{
  "title": "三个数字说明它为什么值得用",
  "items": [
    { "label": "可用组件", "value": "18", "note": "覆盖顺序、对比、架构、代码审查和编辑面板" },
    { "label": "渲染命令", "value": "1行", "note": "node scripts/render-html-doc.mjs input.md dist/out.html" },
    { "label": "作者格式", "value": ".md", "note": "Markdown 保持轻量，HTML 交给渲染器" }
  ]
}
~~~

~~~motionStage
{
  "id": "authoring-loop",
  "title": "四步：从 Markdown 到读者能确认的 HTML",
  "stage": { "width": 1180, "height": 480 },
  "interval": 2600,
  "objects": [
    {
      "id": "editor",
      "type": "window",
      "x": 40, "y": 60, "w": 310, "h": 300,
      "title": "my-doc.md",
      "body": "---\ntitle: 发布计划\n---\n\n~~~flow\n{ ... }\n~~~\n\n~~~matrix\n{ ... }\n~~~"
    },
    {
      "id": "shape-badge",
      "type": "badge",
      "x": 420, "y": 110, "w": 240, "h": 52,
      "title": "识别信息形状",
      "opacity": 0.15
    },
    {
      "id": "cmd",
      "type": "badge",
      "x": 420, "y": 210, "w": 240, "h": 52,
      "title": "render-html-doc.mjs",
      "opacity": 0.15
    },
    {
      "id": "page",
      "type": "window",
      "x": 740, "y": 55, "w": 380, "h": 310,
      "title": "dist/my-doc.html",
      "body": "等待生成...",
      "opacity": 0.15
    },
    {
      "id": "score",
      "type": "metric",
      "x": 760, "y": 390, "w": 160, "h": 72,
      "label": "可扫读结构",
      "value": "就绪",
      "opacity": 0
    }
  ],
  "steps": [
    {
      "title": "写 Markdown，只关注内容",
      "body": "用 YAML frontmatter 定义标题，用 ~~~componentType 栅栏块描述每个信息单元。",
      "states": {
        "editor": { "status": "active" },
        "shape-badge": { "opacity": 0.15 },
        "cmd": { "opacity": 0.15 },
        "page": { "opacity": 0.15 },
        "score": { "opacity": 0 }
      }
    },
    {
      "title": "识别信息形状，选对组件",
      "body": "顺序→flow，状态变化→motionStage，密集对比→matrix。选完之后用组件的语法重组信息——不是把原文填进去。",
      "states": {
        "shape-badge": { "opacity": 1, "emphasis": "focus", "title": "flow · matrix · motionStage" },
        "editor": { "body": "---\ntitle: 发布计划\n---\n\n~~~motionStage\n{ 状态机 }\n~~~\n\n~~~matrix\n{ 徽章单元格 }\n~~~" }
      }
    },
    {
      "title": "一行命令渲染",
      "body": "node scripts/render-html-doc.mjs input.md dist/out.html — 渲染器接管所有样式、导航和交互。",
      "states": {
        "cmd": { "opacity": 1, "emphasis": "focus" },
        "shape-badge": { "opacity": 0.5 }
      }
    },
    {
      "title": "读者拿到可扫读的 HTML",
      "body": "扫读标题→确认论点，展开细节→核对依据。可上传 S3 或 GitHub Pages 直接发链接。",
      "states": {
        "page": { "opacity": 1, "status": "active", "body": "发布计划\n━━━━━━━\n▶ 步骤 1–5\n📊 风险矩阵\n✓ 三个确认点" },
        "score": { "opacity": 1, "emphasis": "success" },
        "cmd": { "opacity": 0.5 }
      }
    }
  ]
}
~~~

~~~splitPanel
{
  "variant": "3col",
  "title": "写出好文档的三条规则",
  "kicker": "每次都要检查",
  "items": [
    {
      "icon": "presentation",
      "kicker": "PPT 原则",
      "title": "一个 block = 一个观点",
      "body": "如果一个 block 在说两件事，拆成两个。内容没有聚焦时，block 会覆盖多个主题。"
    },
    {
      "icon": "type",
      "kicker": "标题规则",
      "title": "标题写结论，不写话题",
      "body": "「发布流程」是话题。「草稿到三平台：五节点两次人工确认」是结论。读者扫标题就能理解全文论点。"
    },
    {
      "icon": "alert-triangle",
      "kicker": "警示信号",
      "title": "单元格里出现长句 = 没重组",
      "body": "matrix 单元格写成句子，splitPanel body 写成段落——这说明内容还没用组件的语法重组，只是换了个容器。"
    }
  ]
}
~~~

~~~matrix
{
  "id": "component-ref",
  "title": "从读者要完成的动作选组件",
  "kicker": "组件参考",
  "search": true,
  "sortable": true,
  "filters": [
    { "key": "category", "label": "类别", "options": ["Opening", "Layout", "Sequence", "Comparison", "Code", "Architecture", "Planning", "Editor"] }
  ],
  "columns": [
    { "key": "component", "label": "组件", "minWidth": "160px" },
    { "key": "category", "label": "类别", "width": "110px" },
    { "key": "trigger", "label": "选它当…", "minWidth": "200px" },
    { "key": "reader", "label": "读者动作", "width": "130px" }
  ],
  "rows": [
    { "component": "`hero`", "category": { "badge": "Opening", "tone": "info" }, "trigger": "每篇文档的第一个 block", "reader": { "badge": "定方向", "tone": "info" } },
    { "component": "`metrics`", "category": { "badge": "Opening", "tone": "info" }, "trigger": "2–6 个数字需要先锚定全局", "reader": { "badge": "掌握规模", "tone": "info" } },
    { "component": "`splitPanel`", "category": { "badge": "Layout", "tone": "accent" }, "trigger": "内容有对比、并列或引用形状", "reader": { "badge": "扫读对比" } },
    { "component": "`flow`", "category": { "badge": "Sequence", "tone": "warning" }, "trigger": "3–7 个步骤或状态节点", "reader": { "badge": "确认顺序", "tone": "warning" } },
    { "component": "`matrix`", "category": { "badge": "Comparison" }, "trigger": "4 行 × 3 列以上的密集比较", "reader": { "badge": "过滤判断" } },
    { "component": "`variantGrid`", "category": { "badge": "Comparison" }, "trigger": "2–3 个方案要选一个", "reader": { "badge": "选方向" } },
    { "component": "`motionStage`", "category": { "badge": "Architecture", "tone": "success" }, "trigger": "任何 UI 状态变化、功能演示、用户旅程", "reader": { "badge": "确认变化", "tone": "success" } },
    { "component": "`layeredArchitecture`", "category": { "badge": "Architecture", "tone": "success" }, "trigger": "空间层级（泳道/区域）有语义", "reader": { "badge": "理解边界", "tone": "success" } },
    { "component": "`stage`", "category": { "badge": "Architecture", "tone": "success" }, "trigger": "几何位置本身就是内容", "reader": { "badge": "读布局" } },
    { "component": "`relationshipMap`", "category": { "badge": "Architecture", "tone": "success" }, "trigger": "方向性连接，基数关系", "reader": { "badge": "追依赖" } },
    { "component": "`diffReview`", "category": { "badge": "Code", "tone": "danger" }, "trigger": "需要人工批准一段变更", "reader": { "badge": "审批", "tone": "danger" } },
    { "component": "`codeAnnotation`", "category": { "badge": "Code", "tone": "danger" }, "trigger": "代码片段需要行内解释", "reader": { "badge": "逐行理解", "tone": "danger" } },
    { "component": "`emphasisPanel`", "category": { "badge": "Planning" }, "trigger": "正文实体需要侧边注释", "reader": { "badge": "读原文+注释" } },
    { "component": "`kanban`", "category": { "badge": "Planning" }, "trigger": "任务或风险按状态分组", "reader": { "badge": "掌握进展" } },
    { "component": "`formEditor`", "category": { "badge": "Editor" }, "trigger": "结构化字段需要复制导出", "reader": { "badge": "填写复制" } },
    { "component": "`sliderLab`", "category": { "badge": "Editor" }, "trigger": "数值参数需要实时调节", "reader": { "badge": "调参复制" } },
    { "component": "`promptEditor`", "category": { "badge": "Editor" }, "trigger": "提示词模板需要变量替换", "reader": { "badge": "复制提示词" } },
    { "component": "`embed`", "category": { "badge": "Editor" }, "trigger": "内联展示外部页面", "reader": { "badge": "不离页查看" } }
  ]
}
~~~

~~~layeredArchitecture
{
  "id": "renderer-pipeline",
  "title": "职责清晰：作者写结构，渲染器管样式，读者负责确认",
  "stage": { "width": 1180, "height": 520 },
  "lanes": [
    { "id": "author", "title": "起稿", "subtitle": "Markdown source" },
    { "id": "renderer", "title": "生成", "subtitle": "parse · compose · style" },
    { "id": "reader", "title": "审阅", "subtitle": "scan · interact · copy" }
  ],
  "nodes": [
    { "id": "frontmatter", "lane": "author", "row": 0, "kind": "api", "title": "frontmatter", "body": "title, subtitle, glossary" },
    { "id": "blocks", "lane": "author", "row": 2, "kind": "worker", "title": "fenced blocks", "body": "~~~flow / ~~~matrix / ~~~motionStage" },
    { "id": "parse", "lane": "renderer", "row": 0, "kind": "worker", "title": "parser", "body": "每个 block 独立解析，JSON 错误不影响其他" },
    { "id": "style", "lane": "renderer", "row": 2, "kind": "data", "title": "统一视觉", "body": "排版、配色、间距由渲染器统一处理" },
    { "id": "html", "lane": "reader", "row": 0, "kind": "api", "title": "单页 HTML", "body": "可直接打开或发布到 GitHub Pages" },
    { "id": "review", "lane": "reader", "row": 2, "kind": "provider", "title": "人工审阅", "body": "扫读标题 → 确认论点 → 复制输出" }
  ],
  "edges": [
    { "from": "frontmatter", "to": "parse", "step": 1, "label": "metadata" },
    { "from": "blocks", "to": "parse", "step": 2, "label": "block tree" },
    { "from": "parse", "to": "style", "step": 3, "label": "HTML + CSS" },
    { "from": "style", "to": "html", "step": 4, "label": "readable page" },
    { "from": "html", "to": "review", "step": 5, "label": "share" }
  ]
}
~~~

~~~promptEditor
{
  "id": "prompt-starter",
  "kicker": "从这里开始",
  "title": "给 Agent 的起始提示词——先说读者任务，再说信息形状",
  "prompt": "Create examples/{{doc_name}}.md and render it with html-doc.\nAudience: {{audience}}\nDecision to confirm: {{decision}}\nFor each information unit, pick the component whose shape matches the content.\nTitle = conclusion, not topic. If a matrix cell contains a sentence, restructure it into a badge or short label."
}
~~~

~~~formEditor
{
  "id": "doc-brief",
  "title": "正式起稿前先确认四件事",
  "fields": [
    { "name": "audience", "label": "读者", "value": "PM / engineer / designer / operator" },
    { "name": "decision", "label": "要确认什么", "value": "approve launch plan" },
    { "name": "shape", "label": "主要信息形状", "type": "select", "value": "state change", "options": ["comparison", "relationship", "sequence", "state change", "evidence"] },
    { "name": "title_rule", "label": "标题规则", "type": "textarea", "value": "每个 block 标题写结论，不写话题；遮住 body 后标题串起来就是全文论点。" }
  ]
}
~~~

~~~kanban
{
  "id": "ship-checklist",
  "title": "发布前三件事：结构、节奏、行动",
  "columns": [
    {
      "title": "内容结构",
      "icon": "scan-search",
      "tone": "info",
      "items": [
        { "title": "遮住 body，只读标题能串出全文论点", "done": true },
        { "title": "每个 block 只说一件事", "done": true },
        "matrix 单元格没有长句",
        "motionStage 每步有真实的可见变化"
      ]
    },
    {
      "title": "视觉节奏",
      "icon": "layout-grid",
      "tone": "warning",
      "items": [
        { "title": "每 2–3 个 detail block 后有一个 anchor block", "done": true },
        "没有连续三张等重量表格",
        "移动端文字不挤压"
      ]
    },
    {
      "title": "读者行动",
      "icon": "check",
      "tone": "success",
      "items": [
        { "title": "需要复制输出的地方加了 copy 按钮", "done": true },
        "matrix 的 search / filter 可用",
        "渲染命令跑通，无 JSON 错误"
      ]
    }
  ]
}
~~~
