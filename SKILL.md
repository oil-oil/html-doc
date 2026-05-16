---
name: html-doc
description: Create readable HTML documents from a Markdown file when Markdown is too flat for human review. Use for wide comparisons, flows, architecture maps, state changes, code diffs, evidence boards, nested structures, decision matrices, and lightweight editors that need copy/export output.
metadata:
  short-description: HTML docs for human confirmation
---

# HTML Doc

Create readable HTML documents by writing a Markdown file with YAML frontmatter and fenced component blocks, then rendering it with the bundled script.

## When To Use

Use this Skill when a person needs to review information that Markdown makes hard to scan: wide tables, comparisons, flows, architecture maps, state changes, code diffs, evidence boards, nested structures, or decision matrices.

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

1. Identify the information shape: summary, metrics, sequence, comparison, architecture, state change, code review, evidence, nested structure, or editor.
2. Create a `.md` file. Open `references/schema.md` when exact fields are needed. See `examples/component-showcase.md` for every component type; `examples/cicd-review.md` for a realistic multi-component document.
3. Render it:

```bash
node scripts/render-html-doc.mjs examples/cicd-review.md dist/cicd-review.html
```

4. Open the HTML in a browser and verify: each information shape uses a fitting component, motion steps change visible objects, and text stays focused on the subject.

## Core Principles

1. **Write Markdown, render HTML**. Author a `.md` file with YAML frontmatter and `~~~componentType` fenced blocks. Hand-written HTML is only useful when debugging the renderer.
2. **Choose by information shape**. Pick components for structure, relationships, sequence, comparison, change, evidence, or editable values.
3. **Title carries the message**. Write each block's title so it delivers the key insight on its own. If the body restates what the title already says, delete the body — body copy exists only for context the title cannot hold. Leave out renderer commentary such as "this page uses stage" or "visual component".
   - BAD: `"body": "本文档使用 motionStage 展示发布流程，便于可视化理解。"`
   - GOOD: `"body": "草稿到三平台发布的完整链路。"` — or omit `body` entirely.
4. **Turn flat text into visible structure**. When a block reads like a paragraph or list, recast it as a table, flow, comparison, or annotation. Keep copy direct and specific — omit filler and body text when the title already states the context.
5. **Vary visual rhythm**. Alternate anchor blocks (`hero`, `splitPanel quote`, `metrics`) with detail blocks (`splitPanel`, `flow`, `matrix`). Readers lose engagement after three blocks of equal visual weight — aim for one anchor every 2–3 detail blocks.
6. **Use inline emphasis naturally**. Use backtick code and `**bold**` for identifiers and conclusions. Use `[[Term|definition]]` for inline tooltips, or define `meta.glossary` for terms used in 3+ places.
7. **Let the renderer own the visual system**. Block content describes structure, relationships, and interactions; the renderer handles all styling automatically.
8. **Reach for `motionStage` whenever a workflow has visible state changes**. A 5-step animation showing a real UI in motion communicates more than 5 splitPanel cells of text describing the same thing. If content describes a product's feature flow, a user's journey through an interface, or any sequence where something changes on screen — motionStage is almost always the right call over splitPanel + body text.
   - **Trigger signals**: "how does X work?", feature walkthroughs, before/after UI states, AI model loops, checkout flows, editor workflows, status progressions
   - **Objects must look like real UI**: phone screens, app windows, metric cards, status badges — not abstract colored boxes
   - Each step must change something visible: content, status color, position, or opacity. Steps that only update the caption while the stage stays static add nothing.
   - BAD: three colored boxes moving left to right with step labels like "Step 1 → Step 2 → Step 3"
   - GOOD: an editor window showing draft text, a badge updating to "AI 检查中", a score metric fading in at 78 — each step reveals real product behavior
9. **Add export actions where they improve review**. Reviews, diffs, editors, boards, and matrices often benefit from copy buttons. Add `embed` when the reader benefits from seeing a source or live page inline.

## Component Choice

Pick the component whose shape matches the content's structure.

**Opening & numbers**
- `hero`: opening block — title, premise, tags. Use as the first block in every document.
- `metrics`: 2–6 key numbers with trends — use when numbers anchor the story before detail
- `chart`: time-series or category comparison — use when the pattern across values matters more than individual figures

**Sequence**
- `flow`: 3–7 ordered steps or states — stop at 7 nodes; each node should change something
- `timeline`: time-ordered events with dates — prefer `flow` when dates are absent or irrelevant

**Spatial layout**
- `splitPanel`: PPT-style layouts — choose variant by the shape of the content:

  | Variant | Choose when |
  |---------|-------------|
  | `quote` | Single powerful statement — brand moment, design principle, philosophy |
  | `4col` / `3col` | 3–5 parallel items of roughly equal content weight (steps, features, personas) |
  | `2col` | Two complementary or contrasting views; concept vs implementation |
  | `lr` 1:2 ratio | Left is a short label or context; right holds the list or detail |
  | `lr` 2:1 ratio | Left is the full explanation; right is highlights or a short summary |
  | `tb` | Top row is the concept or premise; bottom row is example or implementation |

**Comparison & decision**
- `matrix`: 4+ rows × 3+ columns — dense cross-comparison; add `sortable` for filtering. Prefer `variantGrid` for ≤ 3 items.
- `variantGrid`: 2–3 side-by-side options — use when the reader needs to pick one; use `matrix` when attributes matter more than the choice itself

**Code & technical review**
- `diffReview`: code/config diff with findings — use when a human must approve a specific change
- `codeAnnotation`: single snippet with line notes — use when explaining how the code works
- `crossRef`: primary document linking to referenced files — use when tracing a feature across a codebase

**Architecture & visual**
- `layeredArchitecture`: service map with swim lanes and routed arrows — use when spatial tier (layer, zone) carries meaning
- `stage`: free-position diagram or UI sketch — use when layout geometry itself is the content
- `motionStage`: step-by-step UI demo — **default choice for any product feature walkthrough, user journey, or UI state sequence**; objects must look like real interface elements; each step changes something visible; never use for static flowcharts
- `relationshipMap`: directed connections — use when direction and cardinality tell the story, not spatial position

**Narrative & evidence**
- `structureTree`: nested data or outline — use when hierarchy depth is the point
- `emphasisPanel`: annotated prose — use when entities inside running text need highlighting and side-panel detail
- `evidenceBoard`: claims, evidence, rules, outputs — use for audit trails and compliance reasoning
- `kanban`: status-grouped tasks, risks, or feedback — use when grouping by status matters; use `matrix` when attributes matter more than status

**Editing surfaces**
- `formEditor`, `sliderLab`, `promptEditor`: lightweight editing or tuning surfaces — use when the reader needs to copy or adjust output

**Utility**
- `embed`: iframe preview with fallback link — use when the reader benefits from seeing a live page inline
