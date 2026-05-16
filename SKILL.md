---
name: html-doc
description: Create readable HTML documents from a Markdown file when Markdown is too flat for human review. Use for wide comparisons, flows, architecture maps, state changes, code diffs, evidence boards, nested structures, decision matrices, and lightweight editors that need copy/export output.
metadata:
  short-description: HTML docs for human confirmation
---

# HTML Doc

Create readable HTML documents by writing a Markdown file with YAML frontmatter and fenced component blocks, then rendering it with the bundled script.

## When To Use

Use this Skill when a person needs to review information that Markdown makes hard to scan: wide tables, comparisons, flows, architecture maps, state changes, code diffs, or decision matrices.

For tiny answers, raw logs, short command output, or files that already have a required format, a plain response is usually enough.

Prefer a plain response or raw HTML when:
- **Another agent will read the output** — plain Markdown or YAML is easier to parse than rendered HTML.
- **The interface needs live two-way state** — drag-and-drop sorting, real-time preview, conditional form logic. These need a frontend framework, not a document renderer.
- **The content already has a required format** — config file, migration script, log output.

## File Format

A document is a `.md` file with two parts:

**YAML frontmatter** (optional) — document-level metadata:

```markdown
---
title: My Document
subtitle: A short premise
lang: zh-CN
glossary:
  MTTR: Mean Time To Recovery
  SLO: Service Level Objective
---
```

**Fenced component blocks** — the language identifier is the component type; the body is the block's JSON fields:

~~~markdown
~~~hero
{
  "title": "Document Title",
  "body": "Short premise.",
  "tags": ["architecture", "review"]
}
~~~

~~~metrics
{
  "items": [
    { "label": "Uptime", "value": "99.9%", "spark": [99, 100, 99, 100] }
  ]
}
~~~
~~~

Each block parses independently — a JSON error in one block shows an error card without breaking the rest of the document.

## Workflow

1. Identify the information shape: summary, metrics, sequence, comparison, architecture, state change, or code review.
2. Create a `.md` file. Open `references/schema.md` when exact fields are needed. See `examples/component-showcase.md` for every component type.
3. Render it:

```bash
node scripts/render-html-doc.mjs examples/my-doc.md dist/my-doc.html
```

## Core Principles

These principles exist because an agent's first instinct is to pour content into a component without restructuring it. That produces something that looks like Markdown with a fancier wrapper. The goal is to make a document that a person can scan in 30 seconds and understand.

**Think like a PPT designer.** The best presentations follow two constraints:
- **One block = one idea.** If you're trying to say two things, make two blocks. A block that covers multiple points is a sign the content hasn't been focused yet.
- **Title = conclusion, not topic.** "System Architecture" is a topic label. "Three services share one DB — that's the bottleneck" is a conclusion. Write every block title so the reader learns something from it alone.

**The scan test:** Cover all body copy. Can you read just the titles and understand the document's core argument? If not, the titles are describing topics, not delivering insights.

**No repetition across blocks.** Every block must advance the document. If a point has already been made — even in different words — delete it. A document that circles back to what it already said is padding. Ask before writing each block: what does this add that hasn't been said yet?

---

1. **Write Markdown, render HTML**. Author a `.md` file with YAML frontmatter and `~~~componentType` fenced blocks. For high-fidelity UI prototypes, custom interaction canvases, or product mockups that are too detailed for component JSON, write a standalone HTML prototype using `references/prototype-html.md`, reuse the exported html-doc CSS, then embed it with `embed`.

2. **Choose by information shape — then think in the component's native language**. Pick the component whose shape matches the content's structure. But selecting the right component is only the first step. Each component has its own grammar:
   - `matrix` thinks in **intersections** — cell values should be short, comparable, and scannable; if a cell contains a sentence, the content hasn't been restructured
   - `splitPanel` thinks in **contrast and juxtaposition** — two regions must create visual tension, not just sit next to each other
   - `motionStage` thinks in **state machines** — what objects exist, what triggers each transition, what visibly changes at each step
   - `flow` thinks in **gates** — each node should represent a decision or transformation, not just a label

   After choosing, restructure the information to fit that grammar. Pouring the original text into a new container without restructuring produces the wrong result in a fancier wrapper.

3. **Prose in a cell or body is a warning sign**. When a block reads like a paragraph or list, recast it as a table, flow, comparison, or annotation. A `matrix` cell that contains a sentence should become a badge, a score, a short tag, or a two-word label. A `splitPanel` body that runs four lines should become a nested `flow` or a `3col` layout. Keep copy direct and specific — if the title already states the context, delete the body.
   - BAD: matrix cell = "生成 6 种明显不同的方案，分别改变布局、语气和信息密度，放在 HTML 网格里并排比较，标注每个方案的取舍"
   - GOOD: matrix cell = `{ "badge": "可视对比", "tone": "success" }` with a short label

4. **Title carries the message; delete body copy that repeats it**. Write each block's title as a conclusion. Only add body copy when it contains information the title cannot hold — a number, a constraint, a specific example, a reason. If a sentence says the same thing as the title in different words, delete it.
   - BAD: `"title": "发布流程"`
   - GOOD: `"title": "草稿到三平台：五个节点，两个人工确认"`
   - BAD body: title = "调参结果可直接粘回 Claude Code", body = "滑块调整算法参数，copy 按钮把结果直接粘贴回 Claude Code，形成闭环。" ← body says the same thing as the title
   - BAD body: ends with "仅凭这一点，就已经足够了" or "这就是为什么……" ← filler that adds zero information
   - Warning signs: body begins by rephrasing the title; two adjacent sentences make the same point; body could be deleted and nothing would be lost.

5. **Vary visual rhythm**. Alternate anchor blocks (`hero`, `splitPanel quote`, `metrics`) with detail blocks (`splitPanel`, `flow`, `matrix`). Readers lose engagement after three blocks of equal visual weight — aim for one anchor every 2–3 detail blocks.

6. **Reach for `motionStage` whenever a workflow has visible state changes**. A 5-step animation showing a real UI in motion communicates more than 5 splitPanel cells of text describing the same thing. If content describes a feature flow, a user journey, or any sequence where something changes on screen — motionStage is almost always the right call.
   - **Trigger signals**: feature walkthroughs, before/after UI states, AI model loops, checkout flows, editor workflows, status progressions
   - **Objects must look like real UI**: app windows, metric cards, status badges — not abstract colored boxes
   - Each step must change something visible: content, status color, position, or opacity. Steps that only update the caption while the stage stays static add nothing.
   - BAD: three colored boxes moving left to right with labels "Step 1 → Step 2 → Step 3"
   - GOOD: an editor window showing draft text, a badge updating to "AI 检查中", a score metric fading in at 78

7. **Use inline emphasis naturally**. Use backtick code and `**bold**` for identifiers and conclusions. Use `[[Term|definition]]` for inline tooltips, or define `meta.glossary` for terms used in 3+ places.

8. **Let the renderer own the visual system**. Block content describes structure, relationships, and interactions; the renderer handles all styling automatically.

9. **Add export actions where they improve review**. Reviews, diffs, editors, and matrices often benefit from copy buttons. Add `embed` when the reader benefits from seeing a source or live page inline.

10. **Use standalone prototype HTML for real interface sketches**. When the task is to inspect a real UI surface, build a small publishable HTML page under `dist/prototypes/`, export shared CSS with `node scripts/export-html-doc-css.mjs dist/html-doc.css`, and embed it back into the report. Keep the main report in Markdown so the narrative stays structured.

## Component Reference

Pick the component whose shape matches the content's structure.

### Opening & numbers
- **`hero`** — Opening block: title, premise, tags. Use as the first block in every document.
- **`metrics`** — 2–6 key numbers with optional spark lines. Use when numbers anchor the story before detail. Supports `{ "value": "99%", "label": "Uptime", "note": "...", "spark": [98, 99, 100] }`.

### Sequence & flow
- **`flow`** — 3–7 ordered steps, states, or decisions. Each node should represent a transformation or gate, not just a label. Stop at 7 nodes. Supports date fields for time-ordered sequences.

### Spatial layout
- **`splitPanel`** — PPT-style layouts. Choose variant by content shape:

  | Variant | Choose when |
  |---------|-------------|
  | `quote` | Single powerful statement — design principle, brand philosophy, key takeaway |
  | `4col` / `3col` | 3–5 parallel items of equal weight (features, steps, personas) |
  | `2col` | Two complementary or contrasting views |
  | `lr` 1:2 | Left is a short label; right holds detail or a list |
  | `lr` 2:1 | Left is full explanation; right is highlights |
  | `tb` | Top is concept or premise; bottom is example or implementation |

### Comparison & decision
- **`matrix`** — 4+ rows × 3+ columns for dense cross-comparison. Cell values should be short: badges, scores, tags, or two-word labels. Long prose in cells means the content needs restructuring. Add `sortable` for interactive filtering.
- **`variantGrid`** — 2–3 side-by-side options when the reader needs to pick one. Use `matrix` when attributes matter more than the choice itself.

### Code & technical review
- **`diffReview`** — Code or config diff with findings. Use when a human must approve a specific change.
- **`codeAnnotation`** — Single snippet with line-level notes. Use when explaining how specific code works.

### Architecture & visual
- **`layeredArchitecture`** — Service map with swim-lane columns and routed arrows. Use when spatial tier (layer, zone) carries meaning.
- **`stage`** — Free-position diagram or UI sketch. Use when layout geometry itself is the content.
- **`motionStage`** — Step-by-step UI demo. **Default choice for any product feature walkthrough, user journey, or UI state sequence.** Objects must look like real interface elements; each step changes something visible; never use for static flowcharts.
- **`relationshipMap`** — Directed connections. Use when direction and cardinality tell the story, not spatial position.

### Narrative & evidence
- **`emphasisPanel`** — Annotated prose. Use when specific entities inside running text need highlighting and a side-panel detail view.
- **`kanban`** — Status-grouped tasks, risks, or feedback. Use when grouping by status matters; use `matrix` when attributes matter more than status.

### Editing surfaces
- **`formEditor`** — Structured form with copy output. Use when the reader needs to fill in fields and export the result.
- **`sliderLab`** — Parameter sliders with live preview and copy output. Use for tuning numeric values (model parameters, animation settings).
- **`promptEditor`** — Prompt template editor with variable substitution and copy. Use when the reader needs to customize and export a prompt.

### Utility
- **`embed`** — iframe preview with hover link. Use when the reader benefits from seeing a live page inline.
- **Standalone prototype HTML** — Use `references/prototype-html.md` for high-fidelity UI prototypes that reuse html-doc CSS and embed back into the report.
