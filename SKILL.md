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
3. **Keep visible text about the subject**. Leave out renderer commentary such as "this page uses stage" or "visual component".
   - BAD: `"body": "本文档使用 motionStage 展示发布流程，便于可视化理解。"`
   - GOOD: `"body": "草稿到三平台发布的完整链路。"` — or omit `body` entirely.
4. **Turn flat text into visible structure**. When a block reads like a paragraph or list, recast it as a table, flow, comparison, or annotation. Keep copy direct and specific — omit filler and body text when the title already states the context.
5. **Use `matrix` for discrete objects needing column comparison** across 4+ rows and 3+ columns. Prefer `variantGrid` for ≤ 3 items, `flow` or `timeline` for sequences.
6. **Use inline emphasis naturally**. Use backtick code and `**bold**` for identifiers and conclusions. Use `[[Term|definition]]` for inline tooltips, or define `meta.glossary` for terms used in 3+ places.
7. **Let the renderer own the visual system**. Block content describes structure, relationships, and interactions; the renderer handles all styling automatically.
8. **Make `motionStage` show a real UI, not a flowchart**. Objects should look like recognizable interface elements — phone screens, app windows, metric cards, status badges. Each step must change something visible: content, status color, position, or opacity. Steps that only update the caption while the stage stays static add nothing.
   - BAD: three colored boxes moving left to right with step labels like "Step 1 → Step 2 → Step 3"
   - GOOD: a phone screen showing a cart, a window showing a payment form, a badge updating from "待支付" to "支付成功", a metric revealing ETA — each step changes real UI state
9. **Add export actions where they improve review**. Reviews, diffs, editors, boards, and matrices often benefit from copy buttons. Add `embed` when the reader benefits from seeing a source or live page inline.

## Component Choice

Use the narrowest component that fits:

- `hero`: document title, premise, tags
- `metrics`: key numbers and trends
- `chart`: data series as bar, line, or area chart
- `flow`: short process or simple state chain
- `timeline`: time-ordered events
- `matrix`: wide comparison or decision table
- `diffReview`: code/config diff with findings
- `codeAnnotation`: code snippet with notes
- `layeredArchitecture`: service map with lanes and routed arrows
- `stage`: static free-position diagram or UI sketch
- `motionStage`: step-by-step visual demo with persistent objects
- `relationshipMap`: source-to-target relationships
- `structureTree`: nested data or outline
- `emphasisPanel`: highlight entities inside text
- `evidenceBoard`: claims, evidence, rules, outputs
- `variantGrid`: side-by-side options
- `kanban`: grouped issue, task, risk, or feedback buckets
- `formEditor`, `sliderLab`, `promptEditor`: one-off editing or tuning surfaces
- `splitPanel`: PPT-style spatial layouts — left/right split (`lr`/`rl`), top/bottom (`tb`), multi-column (`2col`/`3col`/`4col`), or centered quote (`quote`)
- `crossRef`: primary document with highlighted links and bezier arrows to referenced files
- `embed`: iframe preview with fallback link
