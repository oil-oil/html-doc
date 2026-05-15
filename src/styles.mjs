import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const baseCssPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "base.css");
const staticCss = fs.readFileSync(baseCssPath, "utf8");

export function baseCss() {
  return `
:root {
  --bg-canvas: #F9F8F6;
  --bg-surface: #FFFFFF;
  --bg-soft: #F4F2EE;
  --border-base: #E2DDD5;
  --border-strong: #CFC8BD;
  --text-main: #2C2B29;
  --text-muted: #524E49;
  --text-faint: #8A857D;
  --accent-primary: #D3543A;
  --accent-secondary: #4A6754;
  --accent-tertiary: #D4A35B;
  --danger-bg: #FBEBE8;
  --success-bg: #EAF2ED;
  --mark-bg: #FFF1C7;
  --font-ui: "Avenir Next", Avenir, "IBM Plex Sans", "PingFang SC", "Hiragino Sans GB", "Noto Sans CJK SC", "Microsoft YaHei", sans-serif;
  --font-human: Optima, "Avenir Next", "PingFang SC", "Hiragino Sans GB", "Noto Sans CJK SC", sans-serif;
  --font-mono: "SFMono-Regular", Menlo, Consolas, monospace;
  --fs-xs: 12px;
  --fs-sm: 14px;
  --fs-base: 15px;
  --fs-md: 16px;
  --fs-lg: 18px;
  --fs-hero: 30px;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --radius: 2px;
  --nav-width: 180px;
  --content-max: 1180px;
  --shell-gap: 0px;
  --shell-max: calc(var(--nav-width) + var(--shell-gap) + var(--content-max));
}

${staticCss}
`;
}
