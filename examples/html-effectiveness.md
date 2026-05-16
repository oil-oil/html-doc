---
title: HTML 的非凡有效性
subtitle: 为什么 agent 的输出应该是 HTML，而不是 Markdown
lang: zh-CN
---

~~~hero
{
  "kicker": "Thariq Shihipar · Anthropic",
  "title": "HTML 的非凡有效性",
  "body": "Markdown 已经变成了一种限制性格式。HTML 让 agent 传达更丰富的信息，也让人类真正愿意阅读它。",
  "tags": ["Claude Code", "Agent 工作流", "HTML artifacts", "可视化"]
}
~~~

~~~splitPanel
{
  "variant": "quote",
  "quote": "如果不能使用 HTML，模型在 Markdown 中可能会采用更低效的方式，比如 ASCII 图表——或者用 Unicode 字符来估算颜色。",
  "attribution": "Thariq Shihipar，Anthropic"
}
~~~

~~~metrics
{
  "title": "四个数字说明为什么 HTML 不是额外开销",
  "items": [
    { "label": "可表达的信息类型", "value": "∞", "note": "几乎不存在 Claude 能读取但无法用 HTML 高效表示的内容" },
    { "label": "Markdown 阅读瓶颈", "value": "100行", "note": "超过此长度的计划文档很少被真正读完" },
    { "label": "生成时间倍数", "value": "2–4×", "note": "比 Markdown 更慢，但人类实际读完的概率大幅提升" },
    { "label": "上下文窗口", "value": "1M", "note": "额外的 token 开销在这个量级下不再是瓶颈" }
  ]
}
~~~

~~~motionStage
{
  "id": "html-vs-md",
  "kicker": "核心对比",
  "title": "同样的内容，截然不同的命运",
  "stage": { "width": 1180, "height": 480 },
  "interval": 2800,
  "objects": [
    {
      "id": "md-win",
      "type": "window",
      "x": 30, "y": 20, "w": 520, "h": 360,
      "label": "Markdown 计划",
      "title": "# 实现计划（第 1/5 步）",
      "body": "## 背景\n本文档旨在说明……\n\n## 步骤\n- 详细步骤一的说明\n- 详细步骤二的说明\n\n## 风险\n……"
    },
    {
      "id": "html-win",
      "type": "window",
      "x": 630, "y": 20, "w": 520, "h": 360,
      "label": "HTML artifact",
      "title": "等待生成",
      "body": "",
      "opacity": 0.15
    },
    {
      "id": "md-score",
      "type": "metric",
      "x": 30, "y": 400, "w": 130, "h": 60,
      "opacity": 0,
      "value": "12%",
      "label": "阅读完成率"
    },
    {
      "id": "html-score",
      "type": "metric",
      "x": 630, "y": 400, "w": 130, "h": 60,
      "opacity": 0,
      "value": "84%",
      "label": "阅读完成率"
    }
  ],
  "steps": [
    {
      "title": "Agent 写完了 200 行 Markdown 计划",
      "body": "内容完整，信息密度极高——但你大概率不会真正读完它。",
      "states": {
        "md-win": { "status": "" },
        "html-win": { "opacity": 0.15, "title": "等待生成", "body": "" },
        "md-score": { "opacity": 0 },
        "html-score": { "opacity": 0 }
      }
    },
    {
      "title": "改为生成 HTML artifact",
      "body": "同样的分析，agent 用结构化标题、指标卡、流程图、代码注释重新组织。",
      "states": {
        "md-win": { "status": "muted" },
        "html-win": { "opacity": 1, "title": "正在生成...", "body": "结构化标题 · 关键指标 · 流程图", "emphasis": "focus" }
      }
    },
    {
      "title": "HTML 渲染完成，人类愿意阅读",
      "body": "可浏览结构、图表、颜色标注——组织里的其他人也会真正打开它。",
      "states": {
        "md-win": { "status": "muted" },
        "html-win": { "title": "实现计划", "body": "步骤 1–5 · 关键指标 · 风险矩阵", "emphasis": "success" },
        "md-score": { "opacity": 1 },
        "html-score": { "opacity": 1 }
      }
    },
    {
      "title": "一键分享，任何设备都能打开",
      "body": "上传到 S3 或 GitHub Pages，发链接给同事，浏览器直接打开，无需 Markdown 渲染器。",
      "states": {
        "html-win": { "title": "实现计划", "body": "https://pages.../plan.html  ↗ 已分享", "emphasis": "success" },
        "md-score": { "opacity": 1 },
        "html-score": { "opacity": 1 }
      }
    }
  ]
}
~~~

~~~splitPanel
{
  "title": "六个理由：HTML 在每个维度都优于 Markdown",
  "kicker": "为什么选 HTML",
  "variant": "3col",
  "items": [
    {
      "icon": "layers",
      "kicker": "信息密度",
      "title": "几乎没有 HTML 表达不了的信息",
      "body": "表格、SVG、JavaScript 交互、canvas——Markdown 遇到复杂信息只能退化到 ASCII 图或 Unicode 颜色块。"
    },
    {
      "icon": "eye",
      "kicker": "视觉清晰",
      "title": "100 行后 Markdown 开始失去读者",
      "body": "HTML 用标签页、折叠、颜色、图表组织结构，适合浏览而非线性阅读。移动端响应式，任何设备都好看。"
    },
    {
      "icon": "share-2",
      "kicker": "易于分享",
      "title": "上传即可发链接，无需任何工具",
      "body": "浏览器无法原生渲染 Markdown。HTML 上传到 S3 或 GitHub Pages 就有可分享链接，同事直接打开。"
    }
  ]
}
~~~

~~~splitPanel
{
  "variant": "3col",
  "title": "HTML 还形成双向工作闭环",
  "items": [
    {
      "icon": "mouse-pointer-2",
      "kicker": "双向交互",
      "title": "调参结果可直接粘回 Claude Code",
      "body": "不需要切换工具，修改后的参数直接进入下一轮提示。"
    },
    {
      "icon": "database",
      "kicker": "数据摄取",
      "title": "代码库 + git + Slack 综合成一份报告",
      "body": "无需人工整合，agent 直接读取所有上下文，图表也是同一次生成的。"
    },
    {
      "icon": "sparkles",
      "kicker": "更有乐趣",
      "title": "感觉自己更在创作循环中",
      "body": "用 Claude 制作 HTML 文档就是更有趣，让人感觉更参与。"
    }
  ]
}
~~~

~~~matrix
{
  "id": "use-cases",
  "title": "这五个场景，HTML 明显优于 Markdown",
  "kicker": "从何入手",
  "columns": [
    { "key": "scene", "label": "场景", "width": "140px" },
    { "key": "value", "label": "核心价值", "width": "120px" },
    { "key": "prompt_keys", "label": "提示词要点", "minWidth": "220px" },
    { "key": "baseline", "label": "没有 HTML", "width": "120px" }
  ],
  "rows": [
    {
      "scene": "规格说明与探索",
      "value": { "badge": "可视对比", "tone": "success" },
      "prompt_keys": ["6种方案", "并排网格", "标注取舍"],
      "baseline": { "badge": "文字列表", "tone": "warning" }
    },
    {
      "scene": "代码审查",
      "value": { "badge": "行内批注", "tone": "success" },
      "prompt_keys": ["渲染 diff", "按严重程度着色", "附在 PR 里"],
      "baseline": { "badge": "GitHub diff", "tone": "warning" }
    },
    {
      "scene": "设计与原型",
      "value": { "badge": "即调即看", "tone": "success" },
      "prompt_keys": ["参数滑块", "实时预览", "copy 导出"],
      "baseline": { "badge": "纯文字描述", "tone": "warning" }
    },
    {
      "scene": "报告与研究",
      "value": { "badge": "会被读完", "tone": "success" },
      "prompt_keys": ["流程图", "关键代码片段", "gotchas"],
      "baseline": { "badge": "200行Markdown", "tone": "warning" }
    },
    {
      "scene": "自定义编辑界面",
      "value": { "badge": "一次性工具", "tone": "success" },
      "prompt_keys": ["可拖拽卡片", "copy as markdown"],
      "baseline": { "badge": "无法实现", "tone": "danger" }
    }
  ]
}
~~~

~~~matrix
{
  "id": "reddit-limits",
  "title": "Reddit 的三个质疑：都有根据，都有边界条件",
  "kicker": "支持、质疑与折中",
  "columns": [
    { "key": "concern", "label": "质疑", "width": "130px" },
    { "key": "severity", "label": "严重程度", "width": "120px" },
    { "key": "when", "label": "真正影响到的场景", "minWidth": "220px" },
    { "key": "fix", "label": "折中方案", "minWidth": "180px" }
  ],
  "rows": [
    {
      "concern": "Token 开销更大",
      "severity": { "badge": "预算敏感", "tone": "warning" },
      "when": "高频、大规模自动化 agent 工作流",
      "fix": "仅在人类需要阅读时用 HTML"
    },
    {
      "concern": "版本控制更难",
      "severity": { "badge": "长期维护", "tone": "warning" },
      "when": "计划、规格、路线图等反复演进的文档",
      "fix": "保留 Markdown 源格式，按需渲染 HTML"
    },
    {
      "concern": "Agent 复用不友好",
      "severity": { "badge": "机器读取", "tone": "danger" },
      "when": "后续 agent 需要解析和读取内容时",
      "fix": "HTML 只做呈现层，不做唯一事实来源"
    }
  ]
}
~~~

~~~splitPanel
{
  "variant": "3col",
  "title": "社区的三条实用准则：让两种格式各得其所",
  "items": [
    {
      "icon": "check-circle",
      "kicker": "唯一公认场景",
      "title": "交互式一次性工具最没争议",
      "body": "拖拽排序 ticket、参数调节、并排对比设计、导出 JSON/prompt——这类场景没有人反对使用 HTML。"
    },
    {
      "icon": "layers",
      "kicker": "格式分工",
      "title": "HTML 呈现层，Markdown 源格式",
      "body": "不要让 HTML 成为 agent 反复读写的唯一事实来源。展示给人看用 HTML，机器读取和版本控制用 Markdown/JSON。"
    },
    {
      "icon": "terminal",
      "kicker": "实用工作流",
      "title": "先存 Markdown，零 token 渲染 HTML",
      "body": "保存 Markdown 或 JSON 作为源格式，用 Pandoc 或自建渲染器按需生成 HTML，不消耗额外 token。"
    }
  ]
}
~~~

~~~variantGrid
{
  "title": "两种格式，各司其职",
  "kicker": "折中结论",
  "items": [
    {
      "label": "HTML",
      "title": "呈现层：给人看的",
      "body": "阅读、分享、演示和交互。涉及图表、布局、对比、交互和一次性编辑器时，HTML 是更强的 artifact 格式。",
      "score": 90
    },
    {
      "label": "Markdown / JSON / YAML",
      "title": "源格式：给机器读的",
      "body": "机器读取、版本控制和 agent 复用。可编辑、可 diff、可 grep、可由 agent 反复读取。作为事实来源不可替代。",
      "score": 90
    }
  ]
}
~~~

~~~splitPanel
{
  "variant": "quote",
  "quote": "我使用 HTML 的真正原因，是它让我感觉自己更在 Claude 的工作循环中。",
  "attribution": "Thariq Shihipar"
}
~~~
