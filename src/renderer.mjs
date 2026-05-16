import { clientJs } from "./client-js.mjs";
import { baseCss } from "./styles.mjs";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

let _currentGlossary = {};
const moduleDir = path.dirname(fileURLToPath(import.meta.url));
const logoDataUri = readAssetDataUri("../assets/brand/html-doc-logo-toolbar.png", "image/png");
const faviconDataUri = readAssetDataUri("../assets/brand/html-doc-favicon.png", "image/png");
const appleTouchDataUri = readAssetDataUri("../assets/brand/html-doc-apple-touch.png", "image/png");

export function renderArtifact(doc) {
  _currentGlossary = (doc.meta || {}).glossary || {};
  const meta = doc.meta || {};
  const content = Array.isArray(doc.content) ? doc.content : [];
  const title = meta.title || "HTML Doc";

  return `<!doctype html>
<html lang="${esc(meta.lang || "zh-CN")}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  ${faviconDataUri ? `<link rel="icon" type="image/png" href="${faviconDataUri}">` : ""}
  ${appleTouchDataUri ? `<link rel="apple-touch-icon" href="${appleTouchDataUri}">` : ""}
  <style>${baseCss()}</style>
</head>
<body>
  ${renderToolbar(doc)}
  <main class="artifact-shell">
    ${renderNav(content)}
    <section class="artifact-grid">
      ${content.map((block) => renderBlock(block)).join("\n")}
    </section>
  </main>
  <div class="toast" id="toast">已复制</div>
  <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
  <script>${clientJs(doc)}
if (typeof lucide !== "undefined") lucide.createIcons();
</script>
</body>
</html>`;
}

function renderToolbar(doc) {
  const meta = doc.meta || {};
  const actions = Array.isArray(doc.actions) ? doc.actions : [];
  return `<header class="toolbar">
    <div class="toolbar-brand">
      ${logoDataUri ? `<img class="toolbar-logo" src="${logoDataUri}" alt="" aria-hidden="true">` : ""}
      <div class="toolbar-title"><strong>${rich(meta.title || "html-doc")}</strong><span>${rich(meta.subtitle || "visual doc")}</span></div>
    </div>
    <div class="toolbar-actions">
      ${actions.map((action, i) => `<button class="${action.primary ? "primary" : ""}" data-copy="${esc(action.copy || action.label || "")}" data-action="${i}">${rich(action.label || "Copy")}</button>`).join("")}
    </div>
  </header>`;
}

function readAssetDataUri(relativePath, mimeType) {
  try {
    const filePath = path.join(moduleDir, relativePath);
    return `data:${mimeType};base64,${fs.readFileSync(filePath).toString("base64")}`;
  } catch {
    return "";
  }
}

function renderNav(content) {
  const links = content
    .filter((block) => block.id && block.title)
    .map((block) => `<a href="#${escAttr(block.id)}">${rich(block.title)}</a>`)
    .join("");
  return `<aside class="side-nav">${links}</aside>`;
}

function renderBlock(block) {
  const type = block.type || "section";
  const span = block.span || defaultSpan(type);
  const classes = ["block", editorPanelFor(type)].filter(Boolean).join(" ");
  const style = `--span:${span};${block.minHeight ? `--min-h:${escAttr(block.minHeight)};` : ""}`;
  return `<article class="${classes}" id="${escAttr(block.id || type)}" style="${style}">
    ${renderByType(block)}
  </article>`;
}

function defaultSpan(type) {
  return {
    hero: 12,
    metrics: 8,
    promptEditor: 4,
    diffReview: 8,
    matrix: 12,
    timeline: 12,
    evidenceBoard: 8,
    kanban: 4,
    formEditor: 6,
    sliderLab: 6,
    flow: 12,
    stage: 12,
    layeredArchitecture: 12,
    motionStage: 12,
    relationshipMap: 12,
    structureTree: 12,
    emphasisPanel: 12,
    embed: 12,
    decisionTree: 4,
    variantGrid: 8,
    splitPanel: 12,
    codeAnnotation: 6,
    chart: 8,
    crossRef: 12,
  }[type] || 12;
}

function editorPanelFor(type) {
  return ["promptEditor", "formEditor"].includes(type) ? "editor-panel" : "";
}

function renderByType(block) {
  const renderers = {
    hero: renderHero,
    metrics: renderMetrics,
    flow: renderFlow,
    stage: renderStage,
    layeredArchitecture: renderLayeredArchitecture,
    motionStage: renderMotionStage,
    relationshipMap: renderRelationshipMap,
    structureTree: renderStructureTree,
    emphasisPanel: renderEmphasisPanel,
    embed: renderEmbed,
    timeline: renderTimeline,
    matrix: renderMatrix,
    decisionTree: renderDecisionTree,
    codeAnnotation: renderCodeAnnotation,
    diffReview: renderDiffReview,
    chart: renderChart,
    crossRef: renderCrossRef,
    evidenceBoard: renderEvidenceBoard,
    variantGrid: renderVariantGrid,
    kanban: renderKanban,
    splitPanel: renderSplitPanel,
    formEditor: renderFormEditor,
    sliderLab: renderSliderLab,
    promptEditor: renderPromptEditor,
    section: renderSection,
  };
  return (renderers[block.type] || renderSection)(block);
}

function renderHead(block, extra = "") {
  return `<div class="block-header">
    <div>
      ${block.kicker ? `<div class="kicker">${rich(block.kicker)}</div>` : ""}
      ${block.title ? `<h2>${rich(block.title)}</h2>` : ""}
      ${block.body ? `<p class="body-copy">${rich(block.body)}</p>` : ""}
    </div>
    ${extra}
  </div>`;
}

function renderHero(block) {
  return `<div class="kicker">${rich(block.kicker || "html-doc")}</div>
    <h1>${rich(block.title || "")}</h1>
    <div class="rule"></div>
    ${block.body ? `<p class="body-copy">${rich(block.body)}</p>` : ""}
    ${block.tags ? `<div class="tags" style="margin-top:var(--space-4)">${block.tags.map((tag) => `<span class="tag">${rich(tag)}</span>`).join("")}</div>` : ""}`;
}

function renderMetrics(block) {
  const hasHead = block.kicker || block.title || block.body;
  return `${hasHead ? renderHead(block) : ""}<div class="metrics-grid">
    ${(block.items || []).map((item) => `<div class="metric">
      <div class="label">${rich(item.label || "")}</div>
      <div class="metric-value">${rich(item.value || "")}</div>
      <div class="text-muted">${rich(item.note || "")}</div>
      ${sparkline(item.spark)}
    </div>`).join("")}
  </div>`;
}

function sparkline(values = []) {
  if (!Array.isArray(values) || values.length < 2) return "";
  const max = Math.max(...values);
  const min = Math.min(...values);
  const points = values.map((v, i) => {
    const x = (i / (values.length - 1)) * 100;
    const y = 20 - ((v - min) / Math.max(1, max - min)) * 16;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  return `<svg class="sparkline" viewBox="0 0 100 24" preserveAspectRatio="none"><polyline points="${points}" fill="none" stroke="var(--accent-secondary)" stroke-width="1.5"/><line x1="0" y1="22" x2="100" y2="22" stroke="var(--border-base)" /></svg>`;
}

function renderFlow(block) {
  if (block.variant === "state") return renderStateFlowAsFlow(block);
  return `${renderHead(block)}<div class="flow"><div class="flow-track">
    ${(block.nodes || []).map((node, i) => `<div class="flow-node"><span class="dot"></span><strong>${rich(node.label || node)}</strong>${node.note ? `<p class="text-sm">${rich(node.note)}</p>` : ""}</div>`).join("")}
  </div></div>`;
}

function renderStateFlowAsFlow(block) {
  const states = block.states || block.nodes || [];
  const activeId = block.active || states[0]?.id || "";
  const active = states.find((state) => state.id === activeId) || states[0] || {};
  return `${renderHead(block)}<div data-flow-state="${escAttr(block.id || "")}">
    <div class="vu-state-flow">
      ${states.map((state, index) => `${index ? `<span class="vu-state-arrow">→</span>` : ""}<div class="vu-state-pill ${state.id === activeId ? "active" : ""}" data-state-id="${escAttr(state.id)}">${rich(state.label || state.title || state.id)}</div>`).join("")}
    </div>
    <div class="vu-state-details" data-state-details>${rich(active.detail || active.body || active.note || "")}</div>
  </div>`;
}

function renderMotionStage(block) {
  const stage = block.stage || {};
  const width = Number(stage.width || 1180);
  const height = Number(stage.height || 560);
  const steps = Array.isArray(block.steps) ? block.steps : [];
  const objects = Array.isArray(block.objects) ? block.objects : [];
  return `${renderHead(block, copyButton(block))}<div class="motion-wrap" data-motion="${escAttr(block.id || "")}" data-index="0" data-autoplay="true">
    <div class="motion-canvas" style="--motion-ratio:${width} / ${height}">
      ${objects.map((obj) => renderMotionObject(obj, width, height)).join("")}
    </div>
    <div class="motion-footer">
      <div class="motion-caption" data-motion-caption>
        <strong>${rich(steps[0]?.title || "")}</strong>
        <span>${rich(steps[0]?.body || "")}</span>
      </div>
      <div class="motion-controls">
        <button data-motion-prev>‹</button>
        <div class="motion-dots">${steps.map((_, index) => `<button class="motion-dot ${index === 0 ? "active" : ""}" data-motion-dot="${index}" aria-label="Step ${index + 1}"></button>`).join("")}</div>
        <button data-motion-next>›</button>
        <button data-motion-play>Pause</button>
      </div>
    </div>
  </div>`;
}

function renderMotionObject(obj, width, height) {
  const initial = motionInitialState(obj);
  const type = obj.type || "panel";
  const style = [
    `--x:${pct(initial.x, width)}`,
    `--y:${pct(initial.y, height)}`,
    `--w:${pct(initial.w || 140, width)}`,
    `--h:${pct(initial.h || 42, height)}`,
    `--opacity:${initial.opacity ?? 1}`,
    `--scale:${initial.scale ?? 1}`,
    `--rotate:${Number(initial.rotate || 0)}deg`,
    `--z:${Number(initial.z || 1)}`,
  ].join(";");
  const attrs = `class="motion-object motion-${escAttr(type)}" data-motion-object="${escAttr(obj.id || "")}" data-status="${escAttr(initial.status || "")}" data-emphasis="${escAttr(initial.emphasis || "")}" style="${style}"`;
  return `<div ${attrs}>${renderMotionSurface(obj, initial)}</div>`;
}

function motionInitialState(obj) {
  return {
    x: obj.x ?? obj.initial?.x ?? 0,
    y: obj.y ?? obj.initial?.y ?? 0,
    w: obj.w ?? obj.initial?.w ?? 160,
    h: obj.h ?? obj.initial?.h ?? 56,
    opacity: obj.opacity ?? obj.initial?.opacity ?? 1,
    scale: obj.scale ?? obj.initial?.scale ?? 1,
    rotate: obj.rotate ?? obj.initial?.rotate ?? 0,
    z: obj.z ?? obj.initial?.z ?? 1,
    status: obj.status ?? obj.initial?.status ?? "",
    emphasis: obj.emphasis ?? obj.initial?.emphasis ?? "",
    title: obj.title ?? obj.initial?.title ?? "",
    body: obj.body ?? obj.initial?.body ?? "",
    label: obj.label ?? obj.initial?.label ?? "",
    value: obj.value ?? obj.initial?.value ?? "",
    props: { ...(obj.props || {}), ...(obj.initial?.props || {}) },
  };
}

function renderMotionSurface(obj, state) {
  const props = state.props || {};
  if (obj.type === "phone") {
    return `<div class="motion-surface"><div class="motion-phone-screen">
      ${state.label ? `<div class="label" data-motion-label>${rich(state.label)}</div>` : ""}
      ${state.title ? `<strong data-motion-title>${rich(state.title)}</strong>` : ""}
      ${renderMotionList(props.items || obj.items || [])}
    </div></div>`;
  }
  if (obj.type === "window") {
    return `<div class="motion-surface">
      <div class="motion-window-bar"><span></span><span></span><span></span></div>
      ${state.label ? `<div class="label" data-motion-label>${rich(state.label)}</div>` : ""}
      ${state.title ? `<strong data-motion-title>${rich(state.title)}</strong>` : ""}
      ${state.body ? `<p class="text-sm" data-motion-body>${rich(state.body)}</p>` : `<p class="text-sm" data-motion-body></p>`}
      ${renderMotionList(props.items || obj.items || [])}
    </div>`;
  }
  if (obj.type === "metric") {
    return `<div class="motion-surface">
      <div class="motion-value" data-motion-value>${rich(state.value)}</div>
      <p class="text-sm" data-motion-label>${rich(state.label)}</p>
    </div>`;
  }
  if (obj.type === "badge" || obj.type === "button") {
    return `<div class="motion-surface" data-motion-title>${rich(state.title || state.label || state.body)}</div>`;
  }
  if (obj.type === "line") {
    return `<div class="motion-surface"></div>`;
  }
  if (obj.type === "text") {
    return `<div class="motion-surface"><div class="stage-text" data-motion-title>${rich(state.title || state.body || state.label)}</div></div>`;
  }
  return `<div class="motion-surface">
    ${state.label ? `<div class="label" data-motion-label>${rich(state.label)}</div>` : ""}
    ${state.title ? `<strong data-motion-title>${rich(state.title)}</strong>` : `<strong data-motion-title></strong>`}
    ${state.body ? `<p class="text-sm" data-motion-body>${rich(state.body)}</p>` : `<p class="text-sm" data-motion-body></p>`}
    ${renderMotionList(props.items || obj.items || [])}
  </div>`;
}

function renderMotionList(items = []) {
  if (!Array.isArray(items) || !items.length) return "";
  return `<div class="motion-list">${items.map((item) => {
    if (typeof item === "string") return `<div class="motion-list-item"><span>${rich(item)}</span></div>`;
    return `<div class="motion-list-item"><span>${rich(item.label || item.title || "")}</span>${item.value ? `<span class="motion-pill">${rich(item.value)}</span>` : ""}</div>`;
  }).join("")}</div>`;
}

function renderStage(block) {
  const stage = block.stage || {};
  const width = Number(stage.width || 960);
  const height = Number(stage.height || 540);
  const initialState = stage.initialState || "";
  const elements = block.elements || [];
  const stateNames = Object.keys(block.states || {});
  const extra = copyButton(block);
  return `${renderHead(block, extra)}<div class="stage-wrap" data-stage="${escAttr(block.id || "")}" data-state="${escAttr(initialState)}" style="--stage-ratio:${width} / ${height}; --stage-bg:${escAttr(stage.backgroundColor || "#FBF9F6")}">
    ${renderStageLines(block, width, height)}
    <div class="stage-layer">
      ${elements.filter((el) => el.type !== "connection").map((el) => renderStageElement(el, block, width, height)).join("")}
    </div>
    ${stateNames.length ? renderStageStepper(block, stateNames, initialState) : ""}
  </div>`;
}

function renderStageLines(block, width, height) {
  const elementsById = new Map((block.elements || []).map((el) => [el.id, el]));
  const lines = (block.elements || []).filter((el) => el.type === "connection").map((line) => {
    const from = elementsById.get(line.from);
    const to = elementsById.get(line.to);
    if (!from || !to) return "";
    const states = visibleStates(line, block).join(" ");
    const connection = stageConnectionPath(from, to, line);
    return `<path class="stage-line ${states ? "" : ""}" data-visible-states="${escAttr(states)}" d="${connection.path}" fill="none" stroke="var(--accent-primary)" stroke-width="1.4" stroke-dasharray="${line.dashed ? "4 4" : "0"}"/><circle data-visible-states="${escAttr(states)}" cx="${connection.target.x}" cy="${connection.target.y}" r="3.5" fill="var(--accent-primary)" />`;
  }).join("");
  return `<svg class="stage-lines" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">${lines}</svg>`;
}

function stageConnectionPath(from, to, line) {
  const fromCenter = stageCenter(from);
  const toCenter = stageCenter(to);
  const dx = toCenter.x - fromCenter.x;
  const dy = toCenter.y - fromCenter.y;
  const horizontal = Math.abs(dx) >= Math.abs(dy);
  const fromSide = line.fromSide || (horizontal ? (dx >= 0 ? "right" : "left") : (dy >= 0 ? "bottom" : "top"));
  const toSide = line.toSide || (horizontal ? (dx >= 0 ? "left" : "right") : (dy >= 0 ? "top" : "bottom"));
  const source = stageAnchor(from, fromSide);
  const target = stageAnchor(to, toSide);
  if (line.style === "straight") {
    return { source, target, path: `M ${source.x} ${source.y} L ${target.x} ${target.y}` };
  }
  const path = horizontal
    ? stageHorizontalPath(source, target)
    : stageVerticalPath(source, target);
  return { source, target, path };
}

function stageCenter(el) {
  return {
    x: Number(el.x || 0) + Number(el.w || 0) / 2,
    y: Number(el.y || 0) + Number(el.h || 0) / 2,
  };
}

function stageAnchor(el, side) {
  const x = Number(el.x || 0);
  const y = Number(el.y || 0);
  const w = Number(el.w || 0);
  const h = Number(el.h || 0);
  if (side === "left") return { x, y: y + h / 2 };
  if (side === "right") return { x: x + w, y: y + h / 2 };
  if (side === "top") return { x: x + w / 2, y };
  if (side === "bottom") return { x: x + w / 2, y: y + h };
  return { x: x + w / 2, y: y + h / 2 };
}

function stageHorizontalPath(source, target) {
  const gap = Math.max(24, Math.abs(target.x - source.x) / 2);
  const mid = target.x >= source.x ? source.x + gap : source.x - gap;
  return `M ${source.x} ${source.y} L ${mid} ${source.y} L ${mid} ${target.y} L ${target.x} ${target.y}`;
}

function stageVerticalPath(source, target) {
  const gap = Math.max(24, Math.abs(target.y - source.y) / 2);
  const mid = target.y >= source.y ? source.y + gap : source.y - gap;
  return `M ${source.x} ${source.y} L ${source.x} ${mid} L ${target.x} ${mid} L ${target.x} ${target.y}`;
}

function renderStageElement(el, block, width, height) {
  const states = visibleStates(el, block).join(" ");
  const style = `--x:${pct(el.x, width)};--y:${pct(el.y, height)};--w:${pct(el.w || 120, width)};--h:${pct(el.h || 30, height)};`;
  const interaction = el.interactions?.onClick;
  const clickAttrs = interaction?.action === "setState" ? `data-set-state="${escAttr(interaction.target)}"` : "";
  const attrs = `class="stage-el" data-el="${escAttr(el.id || "")}" data-visible-states="${escAttr(states)}" style="${style}" ${clickAttrs}`;
  if (el.type === "panel") {
    return `<div ${attrs}><div class="stage-panel">${el.title ? `<div class="stage-panel-title">${rich(el.title)}</div>` : ""}${el.content ? `<p>${rich(el.content)}</p>` : ""}</div></div>`;
  }
  if (el.type === "button") {
    return `<div ${attrs}><button class="stage-button ${el.variant === "primary" ? "primary" : ""}">${rich(el.content || el.label || "Button")}</button></div>`;
  }
  if (el.type === "input") {
    return `<div ${attrs}><div class="stage-input">${rich(el.placeholder || el.content || "")}</div></div>`;
  }
  if (el.type === "toggle") {
    return `<div ${attrs}><label class="stage-toggle"><input class="switch" type="checkbox" ${el.checked ? "checked" : ""}> ${rich(el.label || "")}</label></div>`;
  }
  if (el.type === "annotation") {
    return `<div ${attrs}><div class="stage-note">${rich(el.content || "")}</div></div>`;
  }
  if (el.type === "hotspot") {
    return `<div ${attrs}><div class="stage-hotspot" title="${escAttr(el.label || "")}"></div></div>`;
  }
  return `<div ${attrs}><div class="stage-text">${rich(el.content || el.label || "")}</div></div>`;
}

function renderStageStepper(block, states, initialState) {
  const index = Math.max(0, states.indexOf(initialState));
  return `<div class="stage-stepper" data-stage-stepper><button data-stage-prev>‹</button><span data-stage-count>${index + 1}/${states.length}</span><button data-stage-next>›</button></div>`;
}

function visibleStates(el, block) {
  const states = block.states || {};
  const names = Object.keys(states);
  if (!names.length) return [];
  return names.filter((name) => (states[name].visibleElements || []).includes(el.id));
}

function pct(value, total) {
  return `${((Number(value || 0) / total) * 100).toFixed(4)}%`;
}

function renderTimeline(block) {
  return `${renderHead(block)}<div class="timeline-line">
    ${(block.items || []).map((item) => `<div class="timeline-item ${escAttr(item.status || "")}"><div class="label">${rich(item.time || item.label || "")}</div><strong>${rich(item.title || "")}</strong><p class="text-sm">${rich(item.body || "")}</p></div>`).join("")}
  </div>`;
}

function renderMatrix(block) {
  const columns = normalizeColumns(block.columns || []);
  const filters = Array.isArray(block.filters) ? block.filters : [];
  const rows = Array.isArray(block.rows) ? block.rows : [];
  const id = block.id || "matrix";
  const sortable = block.sortable === true;
  const controls = block.search || filters.length ? `<div class="matrix-tools" data-matrix-tools="${escAttr(id)}">
    ${block.search ? `<input data-matrix-search="${escAttr(id)}" type="search" placeholder="${escAttr(block.searchPlaceholder || "Search table")}" />` : ""}
    ${filters.map((filter) => `<label>${rich(filter.label || filter.key || "")}<select data-matrix-filter="${escAttr(id)}" data-filter-key="${escAttr(filter.key || "")}">
      <option value="">All</option>
      ${(filter.options || []).map((option) => `<option value="${escAttr(option)}">${rich(option)}</option>`).join("")}
    </select></label>`).join("")}
  </div>` : "";
  let dataRowIndex = 0;
  const body = rows.map((row, rowIndex) => {
    const html = renderMatrixRow(row, columns, block, rowIndex, filters, dataRowIndex);
    if (!(row && typeof row === "object" && !Array.isArray(row) && row.group)) dataRowIndex += 1;
    return html;
  }).join("");
  return `${renderHead(block, copyButton(block))}${controls}<div class="matrix-wrap">
    <table class="matrix" data-matrix="${escAttr(id)}" data-sortable="${sortable ? "true" : "false"}">
      <thead><tr>${columns.map((col, index) => `<th style="${columnStyle(col)}" ${sortable ? `data-sort-index="${index}"` : ""}>${rich(columnLabel(col))}</th>`).join("")}</tr></thead>
      <tbody>${body}</tbody>
    </table>
  </div>`;
}

function normalizeColumns(columns) {
  return columns.map((column, index) => {
    if (typeof column === "string") return { key: column, label: column, index };
    return { ...column, key: column.key || column.label || String(index), label: column.label || column.key || String(index), index };
  });
}

function columnLabel(column) {
  return column.label || column.key || "";
}

function columnStyle(column) {
  const styles = [];
  if (column.width) styles.push(`width:${escAttr(column.width)}`);
  if (column.minWidth) styles.push(`min-width:${escAttr(column.minWidth)}`);
  if (column.align) styles.push(`text-align:${escAttr(column.align)}`);
  return styles.join(";");
}

function renderMatrixRow(row, columns, block, rowIndex, filters, dataRowIndex = 0) {
  if (row && typeof row === "object" && !Array.isArray(row) && row.group) {
    return `<tr class="matrix-group"><td colspan="${columns.length}">${rich(row.group)}</td></tr>`;
  }
  const rowId = `${block.id || "matrix"}-${rowIndex}`;
  const rowClass = dataRowIndex % 2 === 1 ? "matrix-row stripe" : "matrix-row";
  const detail = row && typeof row === "object" && !Array.isArray(row) ? (row.details || row.detail || row._details) : "";
  const searchText = matrixRowText(row, columns);
  const filterData = Object.fromEntries(filters.map((filter) => {
    const filterIndex = columns.findIndex((col) => col.key === filter.key || col.label === filter.key);
    return [filter.key, plainCell(rowValue(row, { key: filter.key, label: filter.key }, filterIndex))];
  }));
  const cells = columns.map((col, index) => {
    const value = rowValue(row, col, index);
    const detailButton = index === 0 && detail ? `<button class="matrix-toggle" data-detail-toggle="${escAttr(rowId)}" aria-label="Toggle row detail">+</button>` : "";
    return `<td data-sort-value="${escAttr(sortValue(value))}" style="${columnStyle(col)}">${detailButton}${renderCell(value)}</td>`;
  }).join("");
  const detailRow = detail ? `<tr class="matrix-detail-row" data-detail-row="${escAttr(rowId)}" hidden><td colspan="${columns.length}">${rich(detail)}</td></tr>` : "";
  return `<tr class="${rowClass}" data-row-id="${escAttr(rowId)}" data-search="${escAttr(searchText)}" data-filters="${escAttr(JSON.stringify(filterData))}">${cells}</tr>${detailRow}`;
}

function rowValue(row, column, index) {
  if (Array.isArray(row)) return row[index];
  if (!row || typeof row !== "object") return "";
  return row[column.key] ?? row[column.label] ?? row.cells?.[column.key] ?? row.cells?.[index] ?? "";
}

function renderCell(value) {
  if (value && typeof value === "object" && value.score != null) {
    return `<span class="score" style="--score:${Number(value.score) || 0}%"></span> ${rich(value.label || "")}`;
  }
  if (Array.isArray(value)) {
    return `<span class="cell-tags">${value.map((item) => `<span class="cell-badge">${rich(item)}</span>`).join("")}</span>`;
  }
  if (value && typeof value === "object") {
    if (value.badge || value.status) return `<span class="cell-badge ${toneClass(value.tone || value.status)}">${rich(value.badge || value.label || value.status)}</span>`;
    if (value.tags) return `<span class="cell-tags">${value.tags.map((tag) => `<span class="cell-badge ${toneClass(tag.tone)}">${rich(tag.label || tag)}</span>`).join("")}</span>`;
    if (value.progress != null) return `<span class="cell-progress"><span style="--progress:${Number(value.progress) || 0}%"></span></span>${value.label ? ` ${rich(value.label)}` : ""}`;
    if (value.spark) return `${sparkline(value.spark)}${value.label ? `<div class="text-xs">${rich(value.label)}</div>` : ""}`;
    if (value.summary || value.detail) return `<div class="cell-summary">${rich(value.summary || value.label || "")}</div>${value.detail ? `<div class="cell-detail">${rich(value.detail)}</div>` : ""}`;
    if (value.value != null) return rich(value.value);
  }
  return rich(value ?? "");
}

function toneClass(tone = "") {
  return ["danger", "warning", "success", "info", "accent"].includes(tone) ? `tone-${tone}` : "";
}

function matrixRowText(row, columns) {
  return columns.map((col, index) => plainCell(rowValue(row, col, index))).join(" ");
}

function plainCell(value) {
  if (value == null) return "";
  if (Array.isArray(value)) return value.map(plainCell).join(" ");
  if (typeof value === "object") {
    return [value.label, value.value, value.badge, value.status, value.summary, value.detail, value.tags ? plainCell(value.tags) : ""].filter(Boolean).join(" ");
  }
  return String(value);
}

function sortValue(value) {
  if (value && typeof value === "object") {
    if (value.score != null) return Number(value.score);
    if (value.progress != null) return Number(value.progress);
  }
  return plainCell(value);
}

function renderDecisionTree(block) {
  return `${renderHead(block)}<div class="decision-tree">
    ${(block.items || []).map((item) => {
      const level = item.level || 0;
      return `<div class="decision-node" data-level="${level}" style="--indent:${level * 20}px">
        <span class="dt-cond">${rich(item.condition || item.title || "")}</span>
        <span class="dt-sep">→</span>
        <span class="dt-res">${rich(item.result || item.body || "")}</span>
      </div>`;
    }).join("")}
  </div>`;
}

function renderCodeAnnotation(block) {
  return `${renderHead(block, copyButton(block))}<div class="code-wrap">
    <pre>${esc(block.code || "")}</pre>
    <div class="annotation-pane">${(block.annotations || []).map((a) => `<p><mark>${rich(a.ref || "")}</mark> ${rich(a.body || "")}</p>`).join("")}</div>
  </div>`;
}

function renderDiffReview(block) {
  const diff = `<div class="vu-diff-block">
    ${(block.lines || []).map((line) => `<div class="diff-line ${line.type === "add" ? "diff-add" : line.type === "remove" ? "diff-remove" : "diff-context"}"><span class="diff-num">${esc(line.number || "")}</span><span>${esc(line.text || "")}</span></div>`).join("")}
  </div>`;
  const findings = (block.findings || []).length
    ? `<div class="annotation-pane">${(block.findings || []).map((f) => `<p><mark>${rich(f.severity || "note")}</mark> ${rich(f.title || "")}<br>${rich(f.body || "")}</p>`).join("")}</div>`
    : "";
  const body = findings ? `<div class="diff-wrap">${diff}${findings}</div>` : diff;
  return `${renderHead(block, copyButton(block))}<div>${body}</div>`;
}

function renderRelationshipMap(block) {
  const sources = block.sources || [];
  const targets = block.targets || [];
  const edges = block.edges || [];
  const sourceIndex = new Map(sources.map((item, index) => [item.id, index]));
  const targetIndex = new Map(targets.map((item, index) => [item.id, index]));
  const height = Math.max(sources.length, targets.length, 2) * 76;
  return `${renderHead(block)}<div>
    <div class="vu-rel-grid" data-rel-map="${escAttr(block.id || "")}">
      <ul class="vu-rel-list">
        ${sources.map((item) => `<li class="vu-rel-item" data-rel-source="${escAttr(item.id)}">
          <div class="vu-rel-title">${rich(item.title || item.id)}</div>
          <div class="vu-rel-meta">${rich(item.meta || item.body || "")}</div>
        </li>`).join("")}
      </ul>
      <div class="vu-rel-lines">
        <svg viewBox="0 0 100 ${height}" preserveAspectRatio="none">
          ${edges.map((edge, index) => {
            const y1 = (sourceIndex.get(edge.from) ?? 0) * 76 + 35;
            const y2 = (targetIndex.get(edge.to) ?? 0) * 76 + 35;
            return `<path class="vu-rel-link" data-rel-from="${escAttr(edge.from)}" data-rel-to="${escAttr(edge.to)}" d="M 0 ${y1} C 50 ${y1}, 50 ${y2}, 100 ${y2}" />`;
          }).join("")}
        </svg>
      </div>
      <ul class="vu-rel-list">
        ${targets.map((item) => `<li class="vu-rel-item" data-rel-target="${escAttr(item.id)}">
          <div class="vu-rel-title">${rich(item.title || item.id)}</div>
          <div class="vu-rel-meta">${rich(item.meta || item.body || "")}</div>
        </li>`).join("")}
      </ul>
    </div>
  </div>`;
}

function renderStructureTree(block) {
  return `${renderHead(block)}<div class="vu-tree">
    ${(block.nodes || []).map((node) => renderTreeNode(node)).join("")}
  </div>`;
}

function renderTreeNode(node) {
  const hasChildren = Array.isArray(node.children) && node.children.length;
  return `<div class="vu-tree-node" ${hasChildren ? "data-tree-node" : ""}>
    <span class="vu-tree-toggle ${hasChildren && node.open !== false ? "open" : ""}" style="${hasChildren ? "" : "visibility:hidden;"}">▶</span>
    <span class="vu-tree-key">${rich(node.key || node.name || "")}</span>${node.value != null ? `:<span class="vu-tree-value">${rich(node.value)}</span>` : ""}
    ${node.type ? `<span class="vu-tree-type">${rich(node.type)}</span>` : ""}
  </div>${hasChildren ? `<div class="vu-tree-children" style="${node.open === false ? "display:none;" : ""}">${node.children.map((child) => renderTreeNode(child)).join("")}</div>` : ""}`;
}

function renderEmphasisPanel(block) {
  const items = block.items || [];
  const activeId = block.active || items[0]?.id || "";
  const text = String(block.text || "");
  const html = items.reduce((result, item) => {
    const label = item.text || item.value || "";
    if (!label) return result;
    return result.replace(esc(label), `<span class="vu-hl ${item.id === activeId ? "active" : ""}" data-info-id="${escAttr(item.id)}">${rich(label)}</span>`);
  }, esc(text));
  return `${renderHead(block)}<div data-emphasis-panel="${escAttr(block.id || "")}">
    <div class="vu-emphasis-grid">
      <div class="vu-text-block">${html}</div>
      <div class="vu-info-panel">
        ${items.map((item) => `<div class="vu-info-item ${item.id === activeId ? "active" : ""}" data-info-item="${escAttr(item.id)}">
          <div class="vu-info-label">${rich(item.label || "")}</div>
          <div class="vu-info-value">${rich(item.value || item.text || "")}</div>
          ${item.meta ? `<div class="vu-info-label" style="margin-top:8px;">${rich(item.metaLabel || "Detail")}</div><div class="vu-info-value" style="font-size:13px;color:#6B6965;">${rich(item.meta)}</div>` : ""}
        </div>`).join("")}
      </div>
    </div>
  </div>`;
}

function renderLayeredArchitecture(block) {
  const layout = layoutLayeredArchitecture(block);
  return `${renderHead(block, copyButton(block))}
  <div class="layered-arch" style="--arch-height:${layout.height}px">
    ${layout.lanes.map((lane) => `<section class="arch-lane" style="--x:${lane.x}px;--w:${lane.w}px">
      <div class="arch-lane-title">${rich(lane.title || lane.id)}${lane.subtitle ? `<span>${rich(lane.subtitle)}</span>` : ""}</div>
    </section>`).join("")}
    <svg class="arch-edges" viewBox="0 0 ${layout.width} ${layout.height}" preserveAspectRatio="none">
      <defs>
        <marker id="arch-arrow-${escAttr(block.id || "main")}" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 0 L 8 4 L 0 8 z" fill="var(--accent-primary)"></path>
        </marker>
      </defs>
      ${layout.edges.map((edge) => `<path class="arch-edge ${edge.style === "dashed" ? "dashed" : ""}" d="${escAttr(edge.path)}" marker-end="url(#arch-arrow-${escAttr(block.id || "main")})"></path>`).join("")}
    </svg>
    ${layout.edges.map((edge) => `${edge.step ? `<span class="arch-step" style="--x:${edge.stepX}px;--y:${edge.stepY}px">${rich(edge.step)}</span>` : ""}${edge.label ? `<span class="arch-edge-label" style="--x:${edge.labelX}px;--y:${edge.labelY}px">${rich(edge.label)}</span>` : ""}`).join("")}
    ${layout.nodes.map((node) => `<div class="arch-box ${escAttr(node.kind || "")}" style="--x:${node.x}px;--y:${node.y}px;--w:${node.w}px;--h:${node.h}px">
      <div class="label">${rich(node.label || node.kind || "")}</div>
      <strong>${rich(node.title || node.id)}</strong>
      ${node.body || node.note ? `<p>${rich(node.body || node.note)}</p>` : ""}
    </div>`).join("")}
    ${layout.legend.length ? `<div class="arch-legend">${layout.legend.map((item) => `<span class="arch-legend-item"><span class="arch-legend-swatch ${escAttr(item.kind || "")}"></span>${rich(item.label || item.kind || "")}</span>`).join("")}</div>` : ""}
  </div>`;
}

function layoutLayeredArchitecture(block) {
  const stage = block.stage || {};
  const width = Number(stage.width || 1180);
  const height = Number(stage.height || 660);
  const lanes = Array.isArray(block.lanes) ? block.lanes : [];
  const nodes = Array.isArray(block.nodes) ? block.nodes : [];
  const edges = Array.isArray(block.edges) ? block.edges : [];
  const margin = 28;
  const gap = Number(stage.gap || 18);
  const laneTotal = width - margin * 2 - gap * Math.max(0, lanes.length - 1);
  const laneWeights = lanes.map((lane) => Number(lane.weight || 1));
  const weightTotal = laneWeights.reduce((sum, value) => sum + value, 0) || lanes.length || 1;
  let cursor = margin;
  const laneLayouts = lanes.map((lane, index) => {
    const w = Math.max(108, laneTotal * laneWeights[index] / weightTotal);
    const item = { ...lane, x: cursor, w };
    cursor += w + gap;
    return item;
  });
  const laneById = new Map(laneLayouts.map((lane) => [lane.id, lane]));
  const rowGap = Number(stage.rowGap || 108);
  const startY = Number(stage.startY || 122);
  const boxHeight = Number(stage.nodeHeight || 78);
  const nodeLayouts = nodes.map((node, index) => {
    const lane = laneById.get(node.lane) || laneLayouts[0] || { x: margin, w: 160 };
    const w = Math.min(Number(node.w || lane.w - 34), lane.w - 24);
    const x = lane.x + (lane.w - w) / 2 + Number(node.dx || 0);
    const row = Number(node.row ?? index);
    const y = Number(node.y ?? startY + row * rowGap + Number(node.dy || 0));
    return { ...node, x, y, w, h: Number(node.h || boxHeight) };
  });
  const nodeById = new Map(nodeLayouts.map((node) => [node.id, node]));
  const edgeLayouts = edges.map((edge) => {
    const from = nodeById.get(edge.from);
    const to = nodeById.get(edge.to);
    if (!from || !to) return null;
    const dx = to.x - from.x;
    const sameLane = Math.abs(dx) < 60;
    let path, labelX, labelY;
    if (sameLane) {
      const goDown = to.y >= from.y;
      const start = anchorPoint(from, goDown ? "bottom" : "top");
      const end = anchorPoint(to, goDown ? "top" : "bottom");
      path = `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
      labelX = from.x + from.w + 6;
      labelY = (start.y + end.y) / 2 - 8;
    } else {
      const goRight = dx > 0;
      const start = anchorPoint(from, goRight ? "right" : "left");
      const end = anchorPoint(to, goRight ? "left" : "right");
      const midX = (start.x + end.x) / 2;
      path = `M ${start.x} ${start.y} L ${midX} ${start.y} L ${midX} ${end.y} L ${end.x} ${end.y}`;
      labelX = midX - 22;
      labelY = Math.min(from.y, to.y) - 20;
    }
    const stepX = labelX - 28;
    const stepY = labelY;
    return { ...edge, path, labelX, labelY, stepX, stepY };
  }).filter(Boolean);
  return { width, height, lanes: laneLayouts, nodes: nodeLayouts, edges: edgeLayouts, legend: block.legend || [] };
}

function anchorPoint(node, side) {
  if (side === "left") return { x: node.x, y: node.y + node.h / 2 };
  if (side === "top") return { x: node.x + node.w / 2, y: node.y };
  if (side === "bottom") return { x: node.x + node.w / 2, y: node.y + node.h };
  return { x: node.x + node.w, y: node.y + node.h / 2 };
}

function renderEvidenceBoard(block) {
  return `${renderHead(block)}<div class="masonry">
    ${(block.items || []).map((item) => `<div class="note"><div class="label">${rich(item.label || "")}</div><strong>${rich(item.title || "")}</strong><p class="text-sm">${rich(item.body || "")}</p></div>`).join("")}
  </div>`;
}

function renderVariantGrid(block) {
  return `${renderHead(block, copyButton(block))}<div class="variant-grid">
    ${(block.items || []).map((item) => `<div class="variant"><div class="label">${rich(item.label || "")}</div><h3>${rich(item.title || "")}</h3><p class="text-sm">${rich(item.body || "")}</p>${item.score ? `<div class="score" style="--score:${Number(item.score)}%; margin-top:var(--space-2)"></div>` : ""}</div>`).join("")}
  </div>`;
}

function renderKanban(block) {
  return `${renderHead(block, copyButton(block))}<div class="kanban" data-kanban="${escAttr(block.id || "")}">
    ${(block.columns || []).map((col) => renderKanbanColumn(col)).join("")}
  </div>`;
}

function renderKanbanColumn(col) {
  const items = Array.isArray(col.items) ? col.items : [];
  const done = items.filter((item) => typeof item === "object" && item.done).length;
  return `<section class="kanban-col ${toneClass(col.tone)}">
    <header class="kanban-head">
      <div class="kanban-title">${col.icon ? `<span class="kanban-icon">${rich(col.icon)}</span>` : ""}<span>${rich(col.title || "")}</span></div>
      <div class="kanban-count"><span data-kanban-done>${done}</span> / <span>${items.length}</span></div>
    </header>
    <ul class="kanban-list">
      ${items.map((item) => renderKanbanItem(item)).join("")}
    </ul>
  </section>`;
}

function renderKanbanItem(item) {
  const data = typeof item === "object" ? item : { title: item };
  return `<li class="kanban-card ${toneClass(data.tone)}">
    <label class="kanban-check">
      <input type="checkbox" ${data.done ? "checked" : ""}>
      <span class="kanban-box"></span>
      <span class="kanban-text">${data.icon ? `<span class="kanban-item-icon">${rich(data.icon)}</span>` : ""}${rich(data.title || data.body || "")}</span>
    </label>
  </li>`;
}

function renderIcon(name) {
  if (!name) return "";
  // Lucide icon name: lowercase letters, digits, hyphens only
  return /^[a-z][a-z0-9-]*$/.test(name)
    ? `<i data-lucide="${escAttr(name)}"></i>`
    : esc(name);
}

function renderSplitPanel(block) {
  const variant = block.variant || "lr";

  if (variant === "quote") {
    // quote has no column grid; render block-header normally above the quote content
    const head = (block.kicker || block.title || block.body) ? renderHead(block) : "";
    return `${head}<div class="sp-quote-wrap">
      <div class="sp-quote-text">${rich(block.quote || "")}</div>
      ${block.attribution ? `<div class="sp-quote-attr">— ${rich(block.attribution)}</div>` : ""}
    </div>`;
  }

  // For grid variants, render the title as a full-width header row INSIDE the grid
  // so column dividers connect all the way to the block's top border
  const spHead = (block.kicker || block.title || block.body)
    ? `<div class="sp-header">
        ${block.kicker ? `<div class="kicker">${rich(block.kicker)}</div>` : ""}
        ${block.title ? `<h2>${rich(block.title)}</h2>` : ""}
        ${block.body ? `<p class="body-copy">${rich(block.body)}</p>` : ""}
      </div>`
    : "";

  if (["columns", "2col", "3col", "4col"].includes(variant)) {
    const items = block.items || [];
    const cols = block.cols || (variant === "2col" ? 2 : variant === "4col" ? 4 : 3);
    return `<div class="split-panel sp-columns" style="--sp-col-count:${cols}">
      ${spHead}
      ${items.map((item) => `<div class="sp-cell">
        ${item.icon ? `<div class="sp-icon">${renderIcon(item.icon)}</div>` : ""}
        ${item.kicker ? `<div class="sp-kicker">${rich(item.kicker)}</div>` : ""}
        ${item.title ? `<div class="sp-title">${rich(item.title)}</div>` : ""}
        ${item.body ? `<div class="sp-body">${rich(item.body)}</div>` : ""}
        ${Array.isArray(item.list) ? `<ul class="sp-list">${item.list.map((l) => `<li>${rich(typeof l === "string" ? l : l.text || "")}</li>`).join("")}</ul>` : ""}
        ${item.meta ? `<div class="sp-meta">${rich(item.meta)}</div>` : ""}
      </div>`).join("")}
    </div>`;
  }

  if (variant === "tb") {
    const top = block.top || {};
    const bottom = block.bottom || {};
    return `<div class="split-panel sp-tb">
      ${spHead}
      ${renderSpCell(top, "sp-cell sp-top")}
      ${renderSpCell(bottom, "sp-cell sp-bottom")}
    </div>`;
  }

  // lr / rl
  const ratio = block.ratio || "1:1";
  const [a, b] = ratio.split(":").map((n) => Number(n) || 1);
  const left = block.left || {};
  const right = block.right || {};
  const leftPrimary = variant !== "rl" && a >= b;
  const rightPrimary = variant === "rl" || b > a;
  return `<div class="split-panel sp-lr" style="--sp-cols:${a}fr ${b}fr">
    ${spHead}
    ${renderSpCell(left, `sp-cell${leftPrimary ? " sp-primary" : ""}`)}
    ${renderSpCell(right, `sp-cell${rightPrimary ? " sp-primary" : ""}`)}
  </div>`;
}

function renderSpCell(cell, className) {
  const parts = [];
  if (cell.kicker) parts.push(`<div class="sp-kicker">${rich(cell.kicker)}</div>`);
  if (cell.title) parts.push(`<div class="sp-title">${rich(cell.title)}</div>`);
  if (cell.body) parts.push(`<div class="sp-body">${rich(cell.body)}</div>`);
  if (Array.isArray(cell.list)) {
    parts.push(`<ul class="sp-list">${cell.list.map((l) => `<li>${rich(typeof l === "string" ? l : l.text || "")}</li>`).join("")}</ul>`);
  }
  if (cell.meta) parts.push(`<div class="sp-meta">${rich(cell.meta)}</div>`);
  return `<div class="${className}">${parts.join("")}</div>`;
}

function renderFormEditor(block) {
  return `${renderHead(block, copyButton(block))}<div class="form-grid">
    ${(block.fields || []).map((field) => `<label class="field"><span class="label">${rich(field.label || field.name || "")}</span>${inputFor(field)}</label>`).join("")}
  </div>`;
}

function inputFor(field) {
  if (field.type === "textarea") return `<textarea>${esc(field.value || "")}</textarea>`;
  if (field.type === "select") return `<select>${(field.options || []).map((opt) => `<option ${opt === field.value ? "selected" : ""}>${esc(opt)}</option>`).join("")}</select>`;
  return `<input value="${escAttr(field.value || "")}">`;
}

function renderSliderLab(block) {
  return `${renderHead(block)}<div>
    ${(block.controls || []).map((control, i) => control.type === "toggle"
      ? `<div class="slider-row"><span class="label">${rich(control.label || "")}</span><input class="switch" type="checkbox" ${control.value ? "checked" : ""}><span></span></div>`
      : `<div class="slider-row"><span class="label">${rich(control.label || "")}</span><input type="range" min="${escAttr(control.min ?? 0)}" max="${escAttr(control.max ?? 100)}" value="${escAttr(control.value ?? 50)}" data-slider="${i}"><span class="mono" data-value="${i}">${rich(control.value ?? 50)}</span></div>`).join("")}
  </div>`;
}

function renderPromptEditor(block) {
  const html = esc(block.prompt || "").replace(/\{\{([^}]+)\}\}/g, "<mark>{{$1}}</mark>");
  return `${renderHead(block, copyButton(block))}<div class="prompt-paper" contenteditable="true">${html}</div>`;
}

function renderEmbed(block) {
  const height = block.height || "520px";
  return `${renderHead(block)}<div class="embed-wrap" style="--embed-height:${escAttr(height)}">
    <iframe class="embed-frame" src="${escAttr(block.url || "about:blank")}" title="${escAttr(block.title || "Embedded content")}" loading="lazy" sandbox="${escAttr(block.sandbox || "allow-scripts allow-same-origin allow-forms allow-popups")}"></iframe>
    <div class="embed-fallback">如果预览无法加载，可以打开：<a href="${escAttr(block.url || "#")}" target="_blank" rel="noopener noreferrer">${rich(block.url || "")}</a></div>
  </div>`;
}

function renderCrossRef(block) {
  const primary = block.primary || {};
  const refs = Array.isArray(block.references) ? block.references : [];
  const links = Array.isArray(block.links) ? block.links : [];
  const markerId = `cr-arrow-${escAttr(block.id || "main")}`;
  function highlightContent(content) {
    let html = esc(String(content || ""));
    links.forEach(link => {
      const escaped = esc(link.text || "");
      if (!escaped) return;
      const safe = escaped.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      html = html.replace(new RegExp(safe, "g"),
        `<mark class="crossref-hl" data-cr-from="${escAttr(link.to)}">${escaped}</mark>`);
    });
    return html;
  }
  const sectionsHtml = (primary.sections || []).map(s =>
    `<div class="crossref-section">${s.title ? `<div class="crossref-section-title">${esc(s.title)}</div>` : ""}<pre>${highlightContent(s.content)}</pre></div>`
  ).join("");
  const refsHtml = refs.map(ref =>
    `<div class="crossref-ref" data-cr-target="${escAttr(ref.id)}"><div class="crossref-ref-label">${esc(ref.label || ref.id)}</div><pre>${esc(ref.preview || "")}</pre></div>`
  ).join("");
  return `${renderHead(block)}<div class="crossref" data-crossref="${escAttr(block.id || "main")}">
    <svg class="crossref-arrows"><defs><marker id="${markerId}" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="var(--accent-tertiary)"/></marker></defs></svg>
    <div class="crossref-layout">
      <div class="crossref-primary"><div class="crossref-file-label">${esc(primary.label || "")}</div>${sectionsHtml}</div>
      <div class="crossref-refs">${refsHtml}</div>
    </div>
  </div>`;
}

function renderChart(block) {
  const variant = block.variant || "bar";
  const data = block.data || {};
  const labels = data.labels || [];
  const series = Array.isArray(data.series) ? data.series : [];
  const W = 720, H = 280, padL = 48, padR = 20, padT = 20, padB = 38;
  const plotW = W - padL - padR, plotH = H - padT - padB;
  const allVals = series.flatMap(s => (s.values || []).map(Number)).filter(isFinite);
  const yMax = niceChartMax(allVals.length ? Math.max(...allVals) : 10);
  const COLORS = ["var(--accent-primary)", "var(--accent-secondary)", "var(--accent-tertiary)", "#637699", "#9B7BA8"];
  const toY = v => padT + plotH * (1 - Math.max(0, Math.min(1, Number(v) / yMax)));
  const toX = i => padL + (labels.length > 1 ? (i / (labels.length - 1)) * plotW : plotW / 2);
  const p = [];
  for (let t = 0; t <= 4; t++) {
    const frac = t / 4, y = padT + plotH * (1 - frac);
    p.push(`<line x1="${padL}" y1="${y.toFixed(1)}" x2="${W - padR}" y2="${y.toFixed(1)}" stroke="var(--border-base)" stroke-width="1"/>`);
    p.push(`<text x="${padL - 6}" y="${(y + 4).toFixed(1)}" text-anchor="end" fill="var(--text-faint)" font-size="11">${formatChartVal(yMax * frac)}</text>`);
  }
  p.push(`<line x1="${padL}" y1="${padT}" x2="${padL}" y2="${padT + plotH}" stroke="var(--border-base)" stroke-width="1"/>`);
  if (variant === "bar") {
    const gw = plotW / Math.max(labels.length, 1);
    const bw = series.length ? (gw * 0.72) / series.length : gw * 0.72;
    labels.forEach((lbl, i) => {
      const gx = padL + i * gw + gw * 0.14;
      series.forEach((s, j) => {
        const val = Number((s.values || [])[i] ?? 0);
        const bh = Math.max(0, (val / yMax) * plotH);
        p.push(`<rect x="${(gx + j * bw).toFixed(1)}" y="${(padT + plotH - bh).toFixed(1)}" width="${Math.max(1, bw - 1).toFixed(1)}" height="${bh.toFixed(1)}" fill="${COLORS[j % COLORS.length]}" opacity="0.9"/>`);
      });
      p.push(`<text x="${(padL + i * gw + gw / 2).toFixed(1)}" y="${H - 10}" text-anchor="middle" fill="var(--text-faint)" font-size="11">${esc(String(lbl))}</text>`);
    });
  } else {
    series.forEach((s, j) => {
      const pts = (s.values || []).map((v, i) => `${toX(i).toFixed(1)},${toY(v).toFixed(1)}`);
      if (pts.length < 2) return;
      const color = COLORS[j % COLORS.length];
      if (variant === "area") {
        p.push(`<polygon points="${pts.join(" ")} ${toX((s.values || []).length - 1).toFixed(1)},${padT + plotH} ${toX(0).toFixed(1)},${padT + plotH}" fill="${color}" opacity="0.12"/>`);
      }
      p.push(`<polyline points="${pts.join(" ")}" fill="none" stroke="${color}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>`);
      (s.values || []).forEach((v, i) => {
        p.push(`<circle cx="${toX(i).toFixed(1)}" cy="${toY(v).toFixed(1)}" r="3.5" fill="${color}"/>`);
      });
    });
    labels.forEach((lbl, i) => {
      p.push(`<text x="${toX(i).toFixed(1)}" y="${H - 10}" text-anchor="middle" fill="var(--text-faint)" font-size="11">${esc(String(lbl))}</text>`);
    });
  }
  const legend = series.length > 1
    ? `<div class="chart-legend">${series.map((s, j) => `<span class="chart-legend-item"><span class="chart-dot" style="background:${COLORS[j % COLORS.length]}"></span>${rich(s.label || "")}</span>`).join("")}</div>`
    : "";
  return `${renderHead(block)}<div class="chart-wrap"><svg class="chart-svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet">${p.join("")}</svg>${legend}</div>`;
}

function niceChartMax(val) {
  if (val <= 0) return 10;
  const exp = Math.pow(10, Math.floor(Math.log10(val)));
  return Math.ceil(val / exp) * exp;
}

function formatChartVal(val) {
  if (val >= 1e6) return `${(val / 1e6).toFixed(1)}M`;
  if (val >= 1e3) return `${(val / 1e3).toFixed(0)}k`;
  return String(Math.round(val * 100) / 100);
}

function renderSection(block) {
  return `${renderHead(block)}${block.body ? `<p>${rich(block.body)}</p>` : ""}`;
}

function copyButton(block) {
  return `<button class="copy-mini" data-copy-block="${escAttr(block.id || "")}">Copy</button>`;
}

function esc(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function rich(value) {
  const ph = [];
  let s = String(value ?? "");
  s = s.replace(/```[a-zA-Z0-9_-]*\n([\s\S]*?)```/g, (_, code) =>
    `@@P${ph.push(`<pre class="rich-code-block"><code>${esc(String(code).trimEnd())}</code></pre>`) - 1}@@`);
  s = s.replace(/`([^`\n]+)`/g, (_, code) =>
    `@@P${ph.push(`<code>${esc(code)}</code>`) - 1}@@`);
  s = s.replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, (_, term, def) =>
    `@@P${ph.push(`<span class="tt">${esc(term.trim())}<span class="tt-b">${esc(def.trim())}</span></span>`) - 1}@@`);
  s = s.replace(/\[\[([^\]]+)\]\]/g, (_, term) => {
    const def = _currentGlossary[term.trim()];
    if (!def) return term.trim();
    return `@@P${ph.push(`<span class="tt">${esc(term.trim())}<span class="tt-b">${esc(def)}</span></span>`) - 1}@@`;
  });
  return esc(s)
    .replace(/\*\*([^*\n]+)\*\*/g, "<strong>$1</strong>")
    .replace(/@@P(\d+)@@/g, (_, i) => ph[Number(i)] || "");
}

function escAttr(value) {
  return esc(value).replaceAll("`", "&#96;");
}
