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
