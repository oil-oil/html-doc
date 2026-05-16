# HTML Doc JSON

The agent writes JSON. The renderer creates the final HTML.

## Top Level

```json
{
  "meta": {
    "lang": "zh-CN",
    "title": "Document title",
    "subtitle": "Short context",
    "glossary": {
      "SLA": "Service Level Agreement — 约定服务可用性的标准",
      "P99": "第 99 百分位延迟，即 99% 的请求在此时间内完成"
    }
  },
  "actions": [
    { "label": "Copy Summary", "copy": "text to copy" }
  ],
  "content": []
}
```

`meta.glossary` is optional. Define terms that appear in 3 or more places. Any text field can then reference a term with `[[Term]]` and the renderer adds a hover tooltip automatically. For one-off explanations use `[[Term|definition]]` inline instead — no glossary entry needed.

Keep the JSON focused on content, components, relationships, and useful interactions. The renderer already applies the warm flat theme and centered grid layout.

## Shared Block Fields

```json
{
  "id": "stable-anchor",
  "type": "matrix",
  "span": 12,
  "title": "Short title",
  "kicker": "optional label",
  "body": "One sentence of context the title alone cannot convey — or omit."
}
```

`body` is optional. Include it only when the reader needs a single sentence of context to interpret the component — the scope of a comparison, the incident a timeline covers, or the constraint a decision tree is solving. Leave it out when the `title` already states the context. A block with a good title and no `body` is almost always cleaner than one with a redundant `body`.

Use `span` for horizontal layout: `12`, `8 + 4`, `6 + 6`, or `4 + 4 + 4`.

## Inline Text

Most visible text fields support light inline formatting:

- `` `code` `` for identifiers, commands, keys, paths, and short values.
- `**bold**` for conclusions, status words, and important differences.
- `[[Term|definition]]` for a one-off hover tooltip on any term.
- `[[Term]]` to reference a term defined in `meta.glossary` (renders as hover tooltip).

Keep this formatting short. Use components for structure and use inline emphasis for scan targets.

## Component Choice

| Need | Use |
| --- | --- |
| title, premise, tags | `hero` |
| key numbers | `metrics` |
| short process | `flow` |
| time sequence | `timeline` |
| wide comparison | `matrix` |
| branch logic | `decisionTree` |
| code with notes | `codeAnnotation` |
| code/config diff | `diffReview` |
| service lanes and request paths | `layeredArchitecture` |
| static custom diagram with short labels | `stage` |
| high-fidelity UI prototype or custom interaction canvas | standalone HTML from `references/prototype-html.md`, embedded with `embed` |
| step-by-step visual demo with real state changes | `motionStage` |
| source-to-target relationships | `relationshipMap` |
| nested data or outline | `structureTree` |
| highlighted entities in text | `emphasisPanel` |
| evidence, claims, rules, outputs | `evidenceBoard` |
| side-by-side options | `variantGrid` |
| grouped issue/task/risk buckets | `kanban` |
| structured input surface | `formEditor` |
| tuning controls | `sliderLab` |
| prompt/template editor | `promptEditor` |
| file cross-references with arrows | `crossRef` |
| important external page | `embed` |

## Core Blocks

### hero

```json
{
  "type": "hero",
  "title": "Main idea",
  "body": "Short premise.",
  "tags": ["architecture", "review"]
}
```

### metrics

```json
{
  "type": "metrics",
  "items": [
    { "label": "SLO", "value": "99.9%", "note": "current target", "spark": [7, 8, 8, 9] }
  ]
}
```

### chart

Use `chart` for data series that benefit from a visual scale — trends over time, comparisons across categories, or distributions. Supports `bar` (default), `line`, and `area` variants. Multiple series are shown with distinct colors and a legend.

```json
{
  "type": "chart",
  "title": "Monthly Active Users",
  "variant": "line",
  "data": {
    "labels": ["Jan", "Feb", "Mar", "Apr", "May"],
    "series": [
      { "label": "2024", "values": [120, 145, 132, 178, 190] },
      { "label": "2025", "values": [145, 162, 190, 210, 235] }
    ]
  }
}
```

For a single series, omit `label` in the series object and no legend is shown. Use `variant: "area"` to fill beneath the line for cumulative or volume data. Prefer `metrics` for a handful of key numbers; use `chart` when the trend or shape across many data points matters.

### flow

```json
{
  "type": "flow",
  "nodes": [
    { "label": "Receive", "note": "validate input" },
    { "label": "Process", "note": "run job" },
    { "label": "Notify", "note": "send result" }
  ]
}
```

Use `variant: "state"` for simple state chains:

```json
{
  "type": "flow",
  "variant": "state",
  "active": "processing",
  "states": [
    { "id": "created", "label": "Created", "detail": "Request accepted." },
    { "id": "processing", "label": "Processing", "detail": "Worker owns the job." }
  ]
}
```

### timeline

```json
{
  "type": "timeline",
  "items": [
    { "time": "10:02", "title": "Build triggered", "body": "main branch" },
    { "time": "10:12", "title": "Canary rollout", "status": "active" }
  ]
}
```

### matrix

```json
{
  "type": "matrix",
  "title": "Decision table",
  "search": true,
  "sortable": true,
  "filters": [
    { "key": "risk", "label": "Risk", "options": ["High", "Medium", "Low"] }
  ],
  "columns": [
    { "key": "object", "label": "Object", "minWidth": "180px" },
    { "key": "summary", "label": "Conclusion", "minWidth": "220px" },
    { "key": "risk", "label": "Risk", "width": "96px" },
    { "key": "evidence", "label": "Evidence", "minWidth": "240px" },
    { "key": "next", "label": "Next action", "minWidth": "160px" }
  ],
  "rows": [
    { "group": "Launch blockers" },
    {
      "object": "`capacity.reserve`",
      "summary": "**Keep manual confirm** for retry-heavy jobs",
      "risk": { "badge": "High", "tone": "danger" },
      "evidence": { "summary": "Retries can double-consume capacity.", "detail": "Check idempotency key and `void` path." },
      "next": ["audit", "test"],
      "details": "Raw logs, links, and long reasoning stay here."
    },
    {
      "object": "Dashboard copy",
      "summary": "Ready after one wording pass",
      "risk": { "badge": "Low", "tone": "success" },
      "evidence": { "progress": 82, "label": "review coverage" },
      "next": { "badge": "ship", "tone": "accent" }
    }
  ]
}
```

`matrix` uses stripe rows and freezes the header and first column by default. Use `search`, `sortable`, `filters`, group rows, badges, tags, progress bars, sparklines, and expandable `details` when the table is large enough to need them.

### decisionTree

```json
{
  "type": "decisionTree",
  "items": [
    { "level": 0, "condition": "Needs async work", "result": "Use worker queue" },
    { "level": 1, "condition": "Needs immediate response", "result": "Return accepted state" }
  ]
}
```

### codeAnnotation

```json
{
  "type": "codeAnnotation",
  "code": "function reserve() { return capacity.lock() }",
  "annotations": [
    { "ref": "reserve", "body": "Locks capacity before the long task starts." }
  ]
}
```

### diffReview

```json
{
  "type": "diffReview",
  "lines": [
    { "number": 12, "type": "remove", "text": "- timeout: 5000" },
    { "number": 12, "type": "add", "text": "+ timeout: 15000" }
  ],
  "findings": [
    { "severity": "P1", "title": "Retry window changed", "body": "Check worker lease duration." }
  ]
}
```

## Diagram Blocks

### stage

Use `stage` for static custom diagrams, UI sketches, ER-like relationships, and free-position flowcharts. It works best with short labels and clear spatial relationships. Paragraph-heavy UI mockups and complex hand-routed architecture usually read better as `layeredArchitecture`, `matrix`, `flow`, or `motionStage`. When the reader needs to inspect a real product surface, build a standalone HTML prototype with `references/prototype-html.md`, reuse the exported html-doc CSS, and embed it with `embed`.

```json
{
  "type": "stage",
  "stage": { "width": 960, "height": 540 },
  "elements": [
    { "id": "api", "type": "panel", "x": 80, "y": 120, "w": 200, "h": 90, "title": "API", "content": "validate request" },
    { "id": "queue", "type": "panel", "x": 380, "y": 120, "w": 200, "h": 90, "title": "Queue", "content": "durable jobs" },
    { "id": "line", "type": "connection", "from": "api", "to": "queue" }
  ]
}
```

Stage element types: `panel`, `text`, `button`, `input`, `toggle`, `annotation`, `connection`.

Connection rules:

- Prefer left-to-right or top-to-bottom diagrams.
- For service maps, use `layeredArchitecture` instead of manually placing many `stage` panels.
- For UI explanation, show the UI structure with short labels, then put detailed behavior in nearby `matrix`, `flow`, or `motionStage`.

### layeredArchitecture

Use `layeredArchitecture` for service maps with lanes, deployable nodes, stores, queues, providers, numbered request paths, and legends.

```json
{
  "type": "layeredArchitecture",
  "stage": { "width": 1180, "height": 660 },
  "lanes": [
    { "id": "api", "title": "API Tier", "subtitle": "auth, route, limit" },
    { "id": "data", "title": "Data Plane", "subtitle": "state and queues" },
    { "id": "worker", "title": "Worker Tier", "subtitle": "long tasks" }
  ],
  "nodes": [
    { "id": "edge", "lane": "api", "row": 0, "kind": "api", "title": "Webhook edge", "body": "verify token" },
    { "id": "queue", "lane": "data", "row": 0, "kind": "data", "title": "Job queue", "body": "reply jobs" },
    { "id": "worker", "lane": "worker", "row": 0, "kind": "worker", "title": "Reply worker", "body": "compose response" }
  ],
  "edges": [
    { "from": "edge", "to": "queue", "step": 1, "label": "enqueue" },
    { "from": "queue", "to": "worker", "step": 2, "label": "consume", "style": "dashed" }
  ]
}
```

Start with lanes, nodes, and edges. Add small position nudges only after a browser check shows overlap or unclear routing.

### motionStage

Use `motionStage` for visual step-by-step demos. Define persistent `objects[]` once, then include changed fields in `steps[].states`. It works best when the stage itself changes through movement, visibility, progress, status, or UI content. Motion plays by default with a `1600ms` interval.

```json
{
  "type": "motionStage",
  "stage": { "width": 1180, "height": 520 },
  "objects": [
    { "id": "api", "type": "window", "x": 70, "y": 120, "w": 260, "h": 170, "title": "reserve()", "body": "Validate feature and quantity." },
    { "id": "usage", "type": "metric", "x": 830, "y": 145, "w": 180, "h": 120, "value": "0", "label": "capacity_used", "opacity": 0.2 }
  ],
  "steps": [
    { "title": "Reserve", "body": "Capacity is locked.", "states": { "api": { "title": "reserved", "body": "Lock created for the async job.", "status": "active" } } },
    { "title": "Confirm", "body": "Usage is recorded.", "states": { "usage": { "opacity": 1, "value": "+1", "emphasis": "success" } } }
  ]
}
```

Motion object types: `panel`, `card`, `phone`, `window`, `metric`, `note`, `badge`, `button`, `text`, `line`.

Per-step state fields: `x`, `y`, `w`, `h`, `opacity`, `scale`, `rotate`, `z`, `status`, `emphasis`, `title`, `body`, `label`, `value`, `props`.

Good motion changes include moving cards between zones, revealing panels, updating progress, changing status, replacing UI content, highlighting the active object, and showing before/after states.

## Structure And Relationship Blocks

### relationshipMap

```json
{
  "type": "relationshipMap",
  "sources": [{ "id": "events", "title": "User events", "meta": "Kafka topic" }],
  "targets": [{ "id": "warehouse", "title": "Warehouse", "meta": "analytics schema" }],
  "edges": [{ "from": "events", "to": "warehouse" }]
}
```

### structureTree

```json
{
  "type": "structureTree",
  "nodes": [
    { "key": "data", "type": "Object", "children": [
      { "key": "id", "value": "\"usr_123\"", "type": "String" }
    ] }
  ]
}
```

### emphasisPanel

```json
{
  "type": "emphasisPanel",
  "text": "Worker worker-pool-b-04 exceeded memory limits.",
  "active": "node",
  "items": [
    { "id": "node", "text": "worker-pool-b-04", "label": "Node", "value": "worker-pool-b-04", "metaLabel": "Zone", "meta": "us-east-1c" }
  ]
}
```

## Boards, Editors, And Embeds

### evidenceBoard

```json
{
  "type": "evidenceBoard",
  "items": [
    { "label": "RULE", "title": "Capacity lock", "body": "Reserve before async execution." }
  ]
}
```

### variantGrid

```json
{
  "type": "variantGrid",
  "items": [
    { "label": "A", "title": "Simple queue", "body": "Lower operational cost.", "score": 82 }
  ]
}
```

### kanban

```json
{
  "type": "kanban",
  "columns": [
    {
      "title": "Trust risks",
      "icon": "!",
      "tone": "danger",
      "items": [
        "Confirming brand facts before search",
        { "title": "Leaking internal `stage` names", "done": true }
      ]
    }
  ]
}
```

Use `kanban` for grouped checklists: risk buckets, task buckets, review buckets, or feedback buckets. `icon` is optional and should be a short symbol or label that helps identify the group. Supported tones: `danger`, `warning`, `success`, `info`, `accent`.

### formEditor

```json
{
  "type": "formEditor",
  "fields": [
    { "name": "mode", "label": "Mode", "type": "select", "value": "auto", "options": ["auto", "manual"] },
    { "name": "notes", "label": "Notes", "type": "textarea", "value": "Keep visible copy short." }
  ]
}
```

### sliderLab

```json
{
  "type": "sliderLab",
  "controls": [
    { "type": "range", "label": "Delay", "min": 0, "max": 1000, "value": 240 },
    { "type": "toggle", "label": "Autoplay", "value": false }
  ]
}
```

### promptEditor

```json
{
  "type": "promptEditor",
  "prompt": "Create a {{doc_type}} for {{audience}}."
}
```

### crossRef

Use `crossRef` to show how a primary document references other files, with highlighted terms and bezier arrows connecting them to the referenced panels. Ideal for skill bundling diagrams, multi-file architecture explanations, config cross-references, and any scenario where inline links in source text need to be traced to their targets.

```json
{
  "type": "crossRef",
  "title": "Skill File Bundle",
  "primary": {
    "label": "my-skill/SKILL.md",
    "sections": [
      {
        "title": "YAML Frontmatter",
        "content": "---\nname: my-skill\ndescription: Does useful things.\n---"
      },
      {
        "title": "Markdown",
        "content": "## Usage\n\nOpen references/schema.md for field details.\nSee examples/showcase.json for a full example."
      }
    ]
  },
  "references": [
    {
      "id": "schema",
      "label": "my-skill/references/schema.md",
      "preview": "# Schema Reference\n\nAll available fields and component types are documented here.\n\n## Top Level\n..."
    },
    {
      "id": "showcase",
      "label": "my-skill/examples/showcase.json",
      "preview": "{\n  \"meta\": { \"title\": \"Showcase\" },\n  \"content\": [\n    { \"type\": \"hero\", ... },\n    { \"type\": \"matrix\", ... }\n  ]\n}"
    }
  ],
  "links": [
    { "text": "references/schema.md", "to": "schema" },
    { "text": "examples/showcase.json", "to": "showcase" }
  ]
}
```

`primary.sections[]` each take a `title` (optional) and `content` (preformatted text). `links[]` define which text strings inside `content` should be highlighted — the renderer finds each `text` occurrence and draws an arrow to the `references[]` entry whose `id` matches `to`. Each `references[].preview` is shown truncated; keep it representative but concise.

### embed

Use `embed` for important external pages and local prototype pages. For custom UI prototypes, create a standalone HTML file, export shared CSS with `node scripts/export-html-doc-css.mjs dist/html-doc.css`, then embed the prototype URL.

```json
{
  "type": "embed",
  "title": "Live Prototype",
  "url": "https://example.com/prototype",
  "height": "560px"
}
```
