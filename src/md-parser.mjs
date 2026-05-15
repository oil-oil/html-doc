/**
 * Parse hybrid Markdown + fenced-block format into the same
 * { meta, content } structure that renderArtifact() expects.
 *
 * Format:
 *   ---
 *   title: Document Title
 *   subtitle: Short context
 *   lang: zh-CN
 *   glossary:
 *     SLA: Service Level Agreement
 *   ---
 *
 *   ~~~hero
 *   { "title": "Main Idea", "tags": ["tag"] }
 *   ~~~
 *
 *   ~~~matrix
 *   { "span": 8, "columns": [...], "rows": [...] }
 *   ~~~
 *
 * Rules:
 * - Fence opener: ``` or ~~~ followed by the component type name
 * - Block body: JSON (the "type" field is implied by the fence identifier)
 * - If JSON.parse fails, that block becomes a visible error card
 * - Loose text between blocks is ignored
 */

export function parseMdDoc(source) {
  const { frontmatter, body } = splitFrontmatter(source);
  const meta = parseFrontmatter(frontmatter);
  const { content, actions } = extractBlocks(body);
  return { meta, content, actions };
}

// ---------------------------------------------------------------------------
// Frontmatter
// ---------------------------------------------------------------------------

function splitFrontmatter(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { frontmatter: "", body: source };
  return { frontmatter: match[1], body: source.slice(match[0].length) };
}

function parseFrontmatter(text) {
  const meta = {};
  if (!text.trim()) return meta;

  let inGlossary = false;

  for (const line of text.split(/\r?\n/)) {
    if (!line.trim()) continue;

    // Indented key under glossary:
    if (inGlossary && /^ {2,}/.test(line)) {
      const m = line.match(/^ +([^:]+):\s*(.*)/);
      if (m) {
        meta.glossary = meta.glossary || {};
        meta.glossary[m[1].trim()] = m[2].trim();
      }
      continue;
    }

    // Top-level key: value
    const m = line.match(/^([a-zA-Z_][a-zA-Z0-9_-]*):\s*(.*)/);
    if (!m) continue;

    const [, key, val] = m;
    if (key === "glossary") {
      inGlossary = true;
      meta.glossary = meta.glossary || {};
    } else {
      inGlossary = false;
      meta[key] = val.trim();
    }
  }

  return meta;
}

// ---------------------------------------------------------------------------
// Block extraction
// ---------------------------------------------------------------------------

function extractBlocks(body) {
  const blocks = [];
  let actions;
  const lines = body.split(/\r?\n/);
  let i = 0;

  while (i < lines.length) {
    const openMatch = lines[i].match(/^(`{3,}|~{3,})(\w+)\s*$/);
    if (!openMatch) { i++; continue; }

    const [, fenceChar, type] = openMatch;
    const closingPrefix = fenceChar[0].repeat(fenceChar.length);
    i++;

    const jsonLines = [];
    while (i < lines.length && !lines[i].startsWith(closingPrefix)) {
      jsonLines.push(lines[i]);
      i++;
    }
    i++; // skip closing fence

    const raw = jsonLines.join("\n").trim();
    if (!raw) continue;

    // Special block: actions array for the document toolbar
    if (type === "actions") {
      try { actions = JSON.parse(raw); } catch (e) { /* ignore */ }
      continue;
    }

    try {
      const obj = JSON.parse(raw);
      if (!obj.type) obj.type = type;
      if (!obj.id) obj.id = type + "-" + blocks.length;
      blocks.push(obj);
    } catch (err) {
      blocks.push({
        type: "kanban",
        id: "parse-error-" + blocks.length,
        columns: [{
          title: "Parse Error — " + type,
          icon: "!",
          tone: "danger",
          items: [{ title: err.message, done: false }],
        }],
      });
    }
  }

  return { content: blocks, actions };
}
