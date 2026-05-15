---
name: html-doc
description: Create readable HTML documents from simple JSON when Markdown is too flat for human review. Use for wide comparisons, flows, architecture maps, state changes, code diffs, evidence boards, nested structures, decision matrices, and lightweight editors that need copy/export output.
metadata:
  short-description: HTML docs for human confirmation
---

# HTML Doc

Create readable HTML documents by writing simple JSON and rendering it with the bundled script.

## When To Use

Use this Skill when a person needs to review information that Markdown makes hard to scan: wide tables, comparisons, flows, architecture maps, state changes, code diffs, evidence boards, nested structures, or decision matrices.

For tiny answers, raw logs, short command output, or files that already have a required format, a plain response is usually enough.

Prefer a plain response or raw HTML when:
- **Another agent will read the output** — plain JSON, Markdown, or YAML is easier to parse and modify than rendered HTML.
- **The interface needs live two-way state** — drag-and-drop sorting, real-time preview driven by slider input, conditional form logic. These need a frontend framework, not a document renderer.
- **The content already has a required format** — config file, migration script, log output.

## Core Principles

1. **Write JSON, render HTML**. Create JSON first. Hand-written HTML is mainly useful when debugging the renderer.
2. **Choose by information shape**. Pick components for structure, relationships, sequence, comparison, change, evidence, or editable values.
3. **Keep visible text about the subject**. Leave out renderer commentary such as "this page uses stage", "converted from Markdown", "visual component", "better than Mermaid", or "this HTML".
   - BAD: `"body": "本文档使用 motionStage 展示发布流程，便于可视化理解。"`
   - GOOD: `"body": "草稿到三平台发布的完整链路。"` — or omit `body` entirely.
4. **Turn flat text into visible structure**. When a block reads like a Markdown paragraph or list, recast it as a table, map, flow, comparison, state view, annotation, or demo.
5. **Use matter-of-fact copy**. Say only what helps the reader decide or understand. Avoid filler, grand framing, creator intent, and rhetorical contrast that first denies one idea then elevates another.
6. **Prefer concise copy**. Use specific headings and compact body text. Put deeper explanations into matrices, annotations, timelines, or copy/export data. The `body` field on any block is optional — include it only when the reader needs one sentence of context to interpret the component (the scope of a comparison, the incident a timeline covers). Leave it empty when the title already states the context.
7. **Make tables decisive**. Use `matrix` to help readers find the object, compare differences, and judge priority. Lead with object, conclusion, status/risk/priority, evidence, cost/impact/confidence, next action, then details. Use `matrix` only when the content is a set of discrete objects that benefit from column comparison across 4+ rows and 3+ meaningful columns — not for processes, sequences, or small option sets. For 3 or fewer items prefer `variantGrid` or `kanban`. For linear processes prefer `flow` or `timeline`.
8. **Use inline emphasis naturally**. Text fields can include backtick code and `**bold**`; use them for identifiers, commands, status words, and conclusions. Use `[[Term|definition]]` for one-off inline tooltips, or define a `meta.glossary` and reference terms with `[[Term]]` — both render as a hover tooltip. Define each term once in the glossary when it appears in 3+ places.
9. **Let the renderer own the visual system**. JSON describes content, components, relationships, and useful interactions; the renderer handles visual styling automatically.
10. **Keep container depth shallow**. Blocks sit directly on the grid; repeated items inside a component are fine.
11. **Choose `stage` for compact spatial diagrams**. It works best with short labels, clear positions, and simple connections. For long explanations or dense UI behavior, pair it with `matrix`, `flow`, or `motionStage`.
12. **Make `motionStage` earn its place**. Each step should change positions, visibility, emphasis, progress, status, or UI content on persistent objects. Caption changes alone rarely help readers.
13. **Use `embed` when external material helps**. Include it when the reader benefits from seeing the source or live page inline.
14. **Add export actions where they improve review**. Reviews, diffs, editors, boards, prompts, and matrices often benefit from useful copy output.

## Workflow

1. Identify the information shape: summary, metrics, sequence, comparison, architecture, state change, code review, evidence, nested structure, or editor.
2. Create a JSON file. Open `references/schema.md` when exact fields or examples are needed.
3. Render it:

```bash
node scripts/render-html-doc.mjs examples/component-showcase.json dist/component-showcase.html
```

4. Open the generated HTML in a browser and check:
   - each information shape has a fitting component
   - paragraphs and lists have been turned into visible structure where that improves understanding
   - stage lines connect to the intended objects
   - motion changes objects on the stage; caption updates are supporting context
   - visible text stays focused on the subject
   - copy is direct, useful, and free of unnecessary framing
   - tables surface judgment first and keep long evidence in details
   - the layout has clear section separation
   - container hierarchy stays shallow
   - interactive controls work
   - copy/export buttons provide useful output

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
- `crossRef`: primary document with highlighted links and bezier arrows to referenced files
- `embed`: iframe preview with fallback link
