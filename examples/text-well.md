---
title: Text-Well
subtitle: 全流程 AI 创作工作台
lang: zh-CN
---

~~~hero
{
  "kicker": "产品介绍",
  "title": "Text-Well",
  "body": "基于你的初稿，一步步把一个还不错的想法，变成一篇真正出色的文章。",
  "tags": ["AI 写作", "内容创作", "评审", "翻译"]
}
~~~

~~~splitPanel
{
  "variant": "quote",
  "quote": "最好的想法依然源自于人。我们不会帮你无中生有，而是把你还不错的想法，变成一篇真正出色的文章。",
  "attribution": "Text-Well 设计原则"
}
~~~

~~~splitPanel
{
  "variant": "4col",
  "title": "四步工作流",
  "items": [
    {
      "icon": "scan-search",
      "kicker": "第一步",
      "title": "AI 检查",
      "body": "修正错别字和语法，统一风格术语，去除翻译腔。让文章先变得「正确」。"
    },
    {
      "icon": "users",
      "kicker": "第二步",
      "title": "AI 评审",
      "body": "邀请有独立世界观的 AI 评审团，模拟真实读者反馈，提前发现逻辑盲点。"
    },
    {
      "icon": "sparkles",
      "kicker": "第三步",
      "title": "包装呈现",
      "body": "从五个创意方向生成 10 个候选标题；分析文章意境，推荐高质量配图。"
    },
    {
      "icon": "globe",
      "kicker": "第四步",
      "title": "走向世界",
      "body": "信达雅翻译，原文译文对照视图，每行都可单独重译，确保精准传达。"
    }
  ]
}
~~~

~~~metrics
{
  "items": [
    { "label": "AI 检查模式", "value": "7" },
    { "label": "AI 评审人数", "value": "3–5" },
    { "label": "候选标题", "value": "10" },
    { "label": "配图方式", "value": "2" }
  ]
}
~~~

~~~motionStage
{
  "id": "workflow-demo",
  "kicker": "实战演示",
  "title": "从初稿到精品，全程可控",
  "stage": { "width": 1180, "height": 500 },
  "interval": 2600,
  "objects": [
    {
      "id": "editor",
      "type": "window",
      "x": 30, "y": 20, "w": 570, "h": 460,
      "label": "Text-Well 编辑器",
      "title": "发布前的最后一步",
      "body": "最后做一遍全文检查，对比修改前后，确认没有遗漏。"
    },
    {
      "id": "sidebar",
      "type": "panel",
      "x": 630, "y": 20, "w": 520, "h": 265,
      "label": "AI 工具",
      "title": "选择一个步骤开始",
      "body": "AI 检查  ·  AI 评审  ·  包装工具  ·  AI 翻译"
    },
    {
      "id": "status",
      "type": "badge",
      "x": 630, "y": 295, "w": 145, "h": 40,
      "title": "就绪"
    },
    {
      "id": "score",
      "type": "metric",
      "x": 800, "y": 295, "w": 120, "h": 90,
      "opacity": 0,
      "value": "—",
      "label": "评审评分"
    },
    {
      "id": "titles",
      "type": "panel",
      "x": 630, "y": 405, "w": 520, "h": 75,
      "opacity": 0,
      "label": "标题候选",
      "body": "从草稿到爆款：AI 如何重塑内容创作"
    }
  ],
  "steps": [
    {
      "title": "用户写好初稿",
      "body": "编辑器里写好初稿，四个 AI 工具等待激活。",
      "states": {
        "editor": { "status": "active" },
        "sidebar": { "label": "AI 工具", "title": "选择一个步骤开始", "body": "AI 检查  ·  AI 评审  ·  包装工具  ·  AI 翻译" },
        "status": { "title": "就绪", "emphasis": "" },
        "score": { "opacity": 0 },
        "titles": { "opacity": 0 }
      }
    },
    {
      "title": "AI 检查：7 种模式扫描全文",
      "body": "选择「基础检查」，AI 扫描语法错误、去除翻译腔、统一术语格式。",
      "states": {
        "editor": { "status": "" },
        "sidebar": { "label": "AI 检查 · 基础检查", "title": "正在扫描...", "body": "修正语法错误  ·  去除 AI 味儿  ·  统一标点格式" },
        "status": { "title": "AI 检查中", "emphasis": "focus" }
      }
    },
    {
      "title": "修改建议一键替换",
      "body": "3 条建议出现在侧栏，每条都有理由说明，点击即可替换进编辑器。",
      "states": {
        "editor": { "title": "发布前的最后一步", "body": "✓ 已应用 3 处建议  ·  标点 / 语气词 / 引号" },
        "sidebar": { "label": "AI 检查 · 完成", "title": "发现 3 处建议", "body": "「最后」→「最终」  ·  删除冗余语气词  ·  引号改直角" },
        "status": { "title": "✓ 检查完成", "emphasis": "success" }
      }
    },
    {
      "title": "AI 评审：私人陪审团",
      "body": "3 位 AI 评审人，每人有独立世界观，0—100 分整体评分，建议可直接替换。",
      "states": {
        "editor": { "title": "发布前的最后一步", "body": "最终做一遍全文检查，对比修改前后，确认没有遗漏。" },
        "sidebar": { "label": "AI 评审 · 技术专家 李明", "title": "逻辑清晰，数据薄弱", "body": "「论点清晰，第二段需要更多数据支撑。」" },
        "status": { "title": "评审完成", "emphasis": "success" },
        "score": { "opacity": 1, "value": "78", "label": "整体评分" }
      }
    },
    {
      "title": "标题生成：10 个候选",
      "body": "深度分析核心主题与情感内核，从五个创意方向生成候选标题，每条配创作理由。",
      "states": {
        "sidebar": { "label": "包装工具 · 标题生成", "title": "10 个候选标题", "body": "故事型  ·  痛点型  ·  数据对比型  ·  对话型  ·  金句型" },
        "status": { "title": "标题就绪", "emphasis": "success" },
        "titles": { "opacity": 1, "label": "热门方向", "body": "从草稿到爆款：AI 如何重塑内容创作" }
      }
    }
  ]
}
~~~

~~~matrix
{
  "id": "check-detail",
  "title": "AI 检查 — 7 种模式",
  "kicker": "第一步 · 让文章先变得「正确」",
  "columns": [
    { "key": "mode",  "label": "模式",     "minWidth": "120px" },
    { "key": "focus", "label": "优化重点", "minWidth": "240px" },
    { "key": "when",  "label": "适用场景", "minWidth": "160px" }
  ],
  "rows": [
    { "mode": "基础检查",   "focus": "只修正无可争议的错误，不改动任何风格",   "when": "所有文章的保守起点" },
    { "mode": "去除 AI 味儿", "focus": "消除陈词滥调，打破单调句式结构",       "when": "AI 辅助或生成的内容" },
    { "mode": "正式写作",   "focus": "提升至专业商务标准，中和情绪化语言",     "when": "商务报告、提案" },
    { "mode": "清晰表达",   "focus": "拆分复杂长句，降低读者认知负荷",         "when": "技术文档、长说明文" },
    { "mode": "一致性检查", "focus": "统一全文术语、格式和标点规范",           "when": "长文档、多章节作品" },
    { "mode": "地道表达",   "focus": "修正不符合母语习惯的词语搭配",           "when": "翻译内容或非母语写作" },
    { "mode": "学术写作",   "focus": "移除主观表达，软化绝对化论断",           "when": "论文、学术报告" }
  ]
}
~~~

~~~splitPanel
{
  "id": "review-detail",
  "variant": "3col",
  "title": "AI 评审 — 你的私人陪审团",
  "kicker": "第二步",
  "items": [
    {
      "icon": "users",
      "kicker": "角色创建",
      "title": "AI 自动创建评审人",
      "body": "系统根据文章内容智能创建 3—5 位评审角色，每位都有含个人故事的完整人设和独特批评风格。"
    },
    {
      "icon": "shuffle",
      "kicker": "多元视角",
      "title": "观点有时相互冲突",
      "body": "每位评审人有指导判断的核心世界观，观点碰撞避免千篇一律的「专家」式评价，0—100 分整体评分。"
    },
    {
      "icon": "target",
      "kicker": "评审结果",
      "title": "可直接替换的优化建议",
      "body": "评审完成后左侧工具栏按评审人分组显示完整意见，每条建议可直接替换进编辑器，与编辑器实时联动。"
    }
  ]
}
~~~

~~~splitPanel
{
  "id": "translate-detail",
  "variant": "tb",
  "title": "AI 翻译 — 信达雅",
  "top": {
    "kicker": "第四步",
    "title": "原文译文对照，每行都可单独重译",
    "body": "翻译完成后提供逐行对照视图。对任何翻译不满意的行，点击重新翻译按钮即可单独处理——你对每一行都有完全的控制权。格式标记（Markdown、HTML、代码块）在翻译过程中完全保留。"
  },
  "bottom": {
    "list": [
      "**信（准确性）** — 准确传达原文意思，专业术语精确翻译",
      "**达（表达力）** — 表达自然流畅，使用目标语言的地道方式",
      "**雅（文采）** — 维持原文的语气、风格和语调，有人味儿"
    ]
  }
}
~~~

~~~splitPanel
{
  "id": "finish-tools",
  "variant": "2col",
  "title": "包装工具",
  "items": [
    {
      "icon": "lightbulb",
      "kicker": "AI 标题生成",
      "title": "10 个候选标题",
      "body": "深度分析文章核心主题、叙事弧光和情感内核，从五个创意方向生成选项。",
      "list": [
        "故事 / 历程型",
        "痛点 / 解法型",
        "成果 / 数据对比型",
        "对话 / 提问型",
        "金句 / 态度型"
      ],
      "meta": "每个标题配详细创作理由说明"
    },
    {
      "icon": "image",
      "kicker": "AI 智能配图",
      "title": "2 种配图方式",
      "body": "分析文章意境，找到契合内容的高质量视觉表达，而非千篇一律的商业图库照片。",
      "list": [
        "关键词搜索 — 三步融合策略，Unsplash 图库",
        "AI 创意生图 — 9 种专业视觉风格可选"
      ],
      "meta": "所有生成图片均不含文字，避免与文章冲突"
    }
  ]
}
~~~
