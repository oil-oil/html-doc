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
