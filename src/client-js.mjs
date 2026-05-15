export function clientJs(doc) {
  const data = JSON.stringify(doc).replaceAll("</", "<\\/");
  return `
const artifactSpec = ${data};
const toast = document.getElementById("toast");
function showToast(text) {
  toast.textContent = text || "已复制";
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1200);
}
async function copyText(text) {
  await navigator.clipboard.writeText(text);
  showToast("已复制");
}
function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
function inlineRich(value) {
  const placeholders = [];
  const inlineCodePattern = new RegExp("\\\\x60([^\\\\x60\\\\n]+)\\\\x60", "g");
  const text = String(value ?? "").replace(inlineCodePattern, (_, code) => {
    const index = placeholders.push("<code>" + escapeHtml(code) + "</code>") - 1;
    return "@@HTML_DOC_INLINE_" + index + "@@";
  });
  return escapeHtml(text)
    .replace(/\\*\\*([^*\\n]+)\\*\\*/g, "<strong>$1</strong>")
    .replace(/@@HTML_DOC_INLINE_(\\d+)@@/g, (_, index) => placeholders[Number(index)] || "");
}
document.querySelectorAll("[data-copy]").forEach((btn) => {
  btn.addEventListener("click", () => copyText(btn.dataset.copy || JSON.stringify(artifactSpec, null, 2)));
});
document.querySelectorAll("[data-copy-block]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const id = btn.dataset.copyBlock;
    const block = artifactSpec.content.find((item) => item.id === id);
    copyText(JSON.stringify(block || {}, null, 2));
  });
});
document.querySelectorAll("[data-slider]").forEach((slider) => {
  slider.addEventListener("input", () => {
    const value = document.querySelector('[data-value="' + slider.dataset.slider + '"]');
    if (value) value.textContent = slider.value;
  });
});
function detailRowFor(table, id) {
  return Array.from(table.querySelectorAll("[data-detail-row]")).find((row) => row.dataset.detailRow === id);
}
function matrixValueCompare(a, b, direction) {
  const an = Number(a);
  const bn = Number(b);
  const result = Number.isFinite(an) && Number.isFinite(bn)
    ? an - bn
    : String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: "base" });
  return direction === "asc" ? result : -result;
}
function applyMatrixFilters(id) {
  const table = document.querySelector('[data-matrix="' + id + '"]');
  if (!table) return;
  const search = (document.querySelector('[data-matrix-search="' + id + '"]')?.value || "").trim().toLowerCase();
  const selects = Array.from(document.querySelectorAll('[data-matrix-filter="' + id + '"]'));
  table.querySelectorAll("tbody tr[data-row-id]").forEach((row) => {
    const textMatch = !search || (row.dataset.search || "").toLowerCase().includes(search);
    const rowFilters = row.dataset.filters ? JSON.parse(row.dataset.filters) : {};
    const filterMatch = selects.every((select) => !select.value || String(rowFilters[select.dataset.filterKey] || "") === select.value);
    const visible = textMatch && filterMatch;
    row.hidden = !visible;
    const detail = detailRowFor(table, row.dataset.rowId);
    if (detail) detail.hidden = !visible || detail.dataset.open !== "true";
  });
}
document.querySelectorAll("[data-matrix-search]").forEach((input) => {
  input.addEventListener("input", () => applyMatrixFilters(input.dataset.matrixSearch));
});
document.querySelectorAll("[data-matrix-filter]").forEach((select) => {
  select.addEventListener("change", () => applyMatrixFilters(select.dataset.matrixFilter));
});
document.querySelectorAll("[data-detail-toggle]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const table = btn.closest("table");
    const detail = table ? detailRowFor(table, btn.dataset.detailToggle) : null;
    if (!detail) return;
    const open = detail.hidden;
    detail.hidden = !open;
    detail.dataset.open = open ? "true" : "false";
    btn.textContent = open ? "−" : "+";
  });
});
document.querySelectorAll('[data-matrix][data-sortable="true"] th[data-sort-index]').forEach((th) => {
  th.addEventListener("click", () => {
    const table = th.closest("table");
    const tbody = table?.querySelector("tbody");
    if (!tbody) return;
    const index = Number(th.dataset.sortIndex || 0);
    const direction = th.dataset.sortDir === "asc" ? "desc" : "asc";
    table.querySelectorAll("th[data-sort-index]").forEach((header) => delete header.dataset.sortDir);
    th.dataset.sortDir = direction;
    const sections = [];
    let section = { group: null, pairs: [] };
    sections.push(section);
    Array.from(tbody.children).forEach((row) => {
      if (row.classList.contains("matrix-group")) {
        section = { group: row, pairs: [] };
        sections.push(section);
        return;
      }
      if (!row.dataset.rowId) return;
      section.pairs.push({
        row,
        detail: detailRowFor(table, row.dataset.rowId),
        value: row.children[index]?.dataset.sortValue || row.children[index]?.textContent || "",
      });
    });
    sections.forEach((item) => {
      item.pairs.sort((a, b) => matrixValueCompare(a.value, b.value, direction));
      if (item.group) tbody.appendChild(item.group);
      item.pairs.forEach((pair) => {
        tbody.appendChild(pair.row);
        if (pair.detail) tbody.appendChild(pair.detail);
      });
    });
  });
});
document.querySelectorAll("[data-kanban]").forEach((board) => {
  board.querySelectorAll(".kanban-col").forEach((column) => {
    const boxes = Array.from(column.querySelectorAll('input[type="checkbox"]'));
    const count = column.querySelector("[data-kanban-done]");
    const update = () => {
      if (count) count.textContent = String(boxes.filter((box) => box.checked).length);
    };
    boxes.forEach((box) => box.addEventListener("change", update));
    update();
  });
});
function applyStageState(stage, state) {
  stage.dataset.state = state;
  stage.querySelectorAll("[data-visible-states]").forEach((el) => {
    const states = (el.dataset.visibleStates || "").split(" ").filter(Boolean);
    if (!states.length || states.includes(state)) el.classList.remove("hidden");
    else el.classList.add("hidden");
  });
  const states = Object.keys((artifactSpec.content.find((b) => b.id === stage.dataset.stage) || {}).states || {});
  const count = stage.querySelector("[data-stage-count]");
  if (count && states.length) count.textContent = String(states.indexOf(state) + 1) + "/" + states.length;
}
document.querySelectorAll("[data-stage]").forEach((stage) => {
  const block = artifactSpec.content.find((b) => b.id === stage.dataset.stage) || {};
  const states = Object.keys(block.states || {});
  applyStageState(stage, stage.dataset.state || states[0] || "");
  stage.addEventListener("click", (event) => {
    const setter = event.target.closest("[data-set-state]");
    if (setter) applyStageState(stage, setter.dataset.setState);
  });
  const next = stage.querySelector("[data-stage-next]");
  const prev = stage.querySelector("[data-stage-prev]");
  if (next) next.addEventListener("click", () => {
    const index = states.indexOf(stage.dataset.state);
    applyStageState(stage, states[(index + 1) % states.length]);
  });
  if (prev) prev.addEventListener("click", () => {
    const index = states.indexOf(stage.dataset.state);
    applyStageState(stage, states[(index - 1 + states.length) % states.length]);
  });
});
function setMotionText(root, selector, value) {
  const el = root.querySelector(selector);
  if (el && value != null) el.innerHTML = inlineRich(value);
}
function setMotionBox(el, state, stage) {
  const width = Number(stage.width || 1180);
  const height = Number(stage.height || 560);
  const pctValue = (value, total) => ((Number(value || 0) / total) * 100).toFixed(4) + "%";
  if (state.x != null) el.style.setProperty("--x", pctValue(state.x, width));
  if (state.y != null) el.style.setProperty("--y", pctValue(state.y, height));
  if (state.w != null) el.style.setProperty("--w", pctValue(state.w, width));
  if (state.h != null) el.style.setProperty("--h", pctValue(state.h, height));
  if (state.opacity != null) el.style.setProperty("--opacity", state.opacity);
  if (state.scale != null) el.style.setProperty("--scale", state.scale);
  if (state.rotate != null) el.style.setProperty("--rotate", Number(state.rotate || 0) + "deg");
  if (state.z != null) el.style.setProperty("--z", Number(state.z || 1));
  if (state.status != null) el.dataset.status = state.status;
  if (state.emphasis != null) el.dataset.emphasis = state.emphasis;
}
function applyMotionStep(motion, index) {
  const block = artifactSpec.content.find((item) => item.id === motion.dataset.motion) || {};
  const steps = block.steps || [];
  if (!steps.length) return;
  const stage = block.stage || {};
  const safeIndex = ((index % steps.length) + steps.length) % steps.length;
  const step = steps[safeIndex] || {};
  motion.dataset.index = String(safeIndex);
  motion.querySelectorAll("[data-motion-dot]").forEach((dot) => {
    dot.classList.toggle("active", Number(dot.dataset.motionDot) === safeIndex);
  });
  const caption = motion.querySelector("[data-motion-caption]");
  if (caption) {
    setMotionText(caption, "strong", step.title || "");
    setMotionText(caption, "span", step.body || "");
  }
  const objectStates = step.states || {};
  motion.querySelectorAll("[data-motion-object]").forEach((el) => {
    const id = el.dataset.motionObject;
    const source = (block.objects || []).find((obj) => obj.id === id) || {};
    const base = source.initial || source;
    const state = { ...base, ...(objectStates[id] || {}) };
    setMotionBox(el, state, stage);
    setMotionText(el, "[data-motion-title]", state.title);
    setMotionText(el, "[data-motion-body]", state.body);
    setMotionText(el, "[data-motion-label]", state.label);
    setMotionText(el, "[data-motion-value]", state.value);
  });
}
document.querySelectorAll("[data-motion]").forEach((motion) => {
  const block = artifactSpec.content.find((item) => item.id === motion.dataset.motion) || {};
  const steps = block.steps || [];
  let timer = null;
  const play = motion.querySelector("[data-motion-play]");
  const start = () => {
    if (!steps.length || timer) return;
    timer = setInterval(() => applyMotionStep(motion, Number(motion.dataset.index || 0) + 1), Number(block.interval || 1600));
    if (play) play.textContent = "Pause";
  };
  const stop = () => {
    clearInterval(timer);
    timer = null;
    if (play) play.textContent = "Play";
  };
  motion.querySelector("[data-motion-next]")?.addEventListener("click", () => {
    stop();
    applyMotionStep(motion, Number(motion.dataset.index || 0) + 1);
  });
  motion.querySelector("[data-motion-prev]")?.addEventListener("click", () => {
    stop();
    applyMotionStep(motion, Number(motion.dataset.index || 0) - 1);
  });
  motion.querySelectorAll("[data-motion-dot]").forEach((dot) => {
    dot.addEventListener("click", () => {
      stop();
      applyMotionStep(motion, Number(dot.dataset.motionDot));
    });
  });
  play?.addEventListener("click", () => timer ? stop() : start());
  applyMotionStep(motion, 0);
  if (block.autoplay !== false && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) start();
});
document.querySelectorAll("[data-rel-map]").forEach((map) => {
  const sources = Array.from(map.querySelectorAll("[data-rel-source]"));
  const targets = Array.from(map.querySelectorAll("[data-rel-target]"));
  const edges = Array.from(map.querySelectorAll("[data-rel-from][data-rel-to]"));
  const clear = () => map.querySelectorAll(".active").forEach((active) => active.classList.remove("active"));
  const activateSource = (source) => {
    clear();
    sources.find((item) => item.dataset.relSource === source)?.classList.add("active");
    edges.filter((edge) => edge.dataset.relFrom === source).forEach((edge) => {
      edge.classList.add("active");
      targets.find((item) => item.dataset.relTarget === edge.dataset.relTo)?.classList.add("active");
    });
  };
  const activateTarget = (target) => {
    clear();
    targets.find((item) => item.dataset.relTarget === target)?.classList.add("active");
    edges.filter((edge) => edge.dataset.relTo === target).forEach((edge) => {
      edge.classList.add("active");
      sources.find((item) => item.dataset.relSource === edge.dataset.relFrom)?.classList.add("active");
    });
  };
  sources.forEach((item) => {
    item.addEventListener("mouseenter", () => activateSource(item.dataset.relSource));
    item.addEventListener("mouseleave", clear);
  });
  targets.forEach((item) => {
    item.addEventListener("mouseenter", () => activateTarget(item.dataset.relTarget));
    item.addEventListener("mouseleave", clear);
  });
});
document.querySelectorAll("[data-tree-node]").forEach((node) => {
  node.addEventListener("click", () => {
    const toggle = node.querySelector(".vu-tree-toggle");
    const children = node.nextElementSibling;
    if (!toggle || !children?.classList.contains("vu-tree-children")) return;
    const open = toggle.classList.toggle("open");
    children.style.display = open ? "block" : "none";
  });
});
document.querySelectorAll("[data-flow-state]").forEach((flow) => {
  const block = artifactSpec.content.find((item) => item.id === flow.dataset.flowState) || {};
  const states = block.states || [];
  const detail = flow.querySelector("[data-state-details]");
  flow.querySelectorAll("[data-state-id]").forEach((pill) => {
    pill.addEventListener("click", () => {
      flow.querySelectorAll("[data-state-id]").forEach((item) => item.classList.remove("active"));
      pill.classList.add("active");
      const state = states.find((item) => item.id === pill.dataset.stateId) || {};
      if (detail) detail.innerHTML = inlineRich(state.detail || state.body || "");
    });
  });
});
document.querySelectorAll("[data-emphasis-panel]").forEach((panel) => {
  panel.querySelectorAll("[data-info-id]").forEach((hl) => {
    hl.addEventListener("mouseenter", () => {
      panel.querySelectorAll("[data-info-id]").forEach((item) => item.classList.remove("active"));
      panel.querySelectorAll("[data-info-item]").forEach((item) => item.classList.remove("active"));
      hl.classList.add("active");
      panel.querySelector('[data-info-item="' + hl.dataset.infoId + '"]')?.classList.add("active");
    });
  });
});`;
}
