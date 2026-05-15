这是一套为你量身定制的**“温润游牧”（Warm Nomad）**视觉系统。整体倾向避开传统 Dashboard 那种臃肿的“卡片套卡片”和冷冰冰的科技蓝，转向一种**克制、智性、极具呼吸感**的网格化平铺设计。层级关系优先通过 1px 的边框和克制的留白来切分，让数据和信息本身成为视觉主体。

---

### 1. 核心设计 Token (Design Tokens)

**色彩 (Color Palette) - 微暖、克制**
*   `--bg-canvas: #F9F8F6;` (主背景色，温暖的糙纸白，不刺眼)
*   `--bg-surface: #FFFFFF;` (适合需要更强聚焦的组件内部)
*   `--border-base: #E2DDD5;` (全局通用分割线，带有一点大地色)
*   `--text-main: #2C2B29;` (深炭灰，避免纯黑带来的对立感)
*   `--text-muted: #8A857D;` (辅助文字，温暖的灰)
*   `--accent-primary: #D3543A;` (赤陶红，用于点睛、强调、告警)
*   `--accent-secondary: #4A6754;` (苔藓绿，用于成功、稳定状态)
*   `--accent-tertiary: #D4A35B;` (赭石黄，用于高亮、Insight)

**字体 (Typography) - 人文、小字号**
*   `--font-en: 'IBM Plex Sans', system-ui, sans-serif;` (带有打字机骨架的无衬线体，智性)
*   `--font-cn: 'LXGW WenKai', 'PingFang SC', sans-serif;` (霞鹜文楷，赋予极强的人文与阅读沉浸感)
*   `--font-mono: 'IBM Plex Mono', monospace;`
*   `--text-hero: 400 28px/1.2;` (不再使用巨大字号，靠排版留白撑起气场)
*   `--text-h1: 600 18px/1.4;`
*   `--text-body: 400 13px/1.6;` (克制的基础字号)
*   `--text-micro: 500 11px/1.2;` (用于全大写标签和图表标注，`letter-spacing: 0.5px`)

**间距与形体 (Spacing & Shape) - 扁平、平铺**
*   `--space-xs: 4px;` | `--space-sm: 8px;` | `--space-md: 16px;` | `--space-lg: 32px;` | `--space-xl: 64px;`
*   `--radius-base: 2px;` (几乎直角，仅消除尖锐感)
*   `--shadow-none: none;` (整体少用阴影，优先依靠边框和留白建立层级)

---

### 2. 分列布局规则 (Layout Rules)

布局倾向采用**CSS Grid 铺地砖式排版 (Bento Grid without gaps)**：
*   **充分利用水平空间**：容器可以尽量占满可读区域，内部采用 CSS Grid 划分。
*   **共用边框线**：相邻组件优先合并边框（使用 `border-collapse` 或 `grid-gap: 1px; background: var(--border-base)`，然后组件背景色设为 `#F9F8F6`，形成天然的 1px 分割线）。
*   **非对称切分**：当内容有明显主次时，多使用 `2fr 5fr 3fr` 这样有节奏的划分。

---

### 3. 文字密度倾向 (Text Density)

*   **能可视化就可视化**：状态 (Status) 可以用小色点表达，趋势可以用内联 Sparkline 表达。
*   **元数据轻量呈现**：创建人、时间、标签等信息适合收缩为小字号标签（如 `USR: J.DOE` / `T: 14:02`）。
*   **长文本换成结构**：当描述变长，优先拆成矩阵、批注、时间线、展开材料或复制输出，避免依靠硬截断掩盖信息。

---

### 4. 组件清单与视觉规则 (Component Visual Rules)

**全局设定**：组件整体保持低阴影、低圆角，通过排版和底色区分层级。

1.  **Hero (封面头图)**: 无背景色块。纯文字。顶部留白 `--space-xl`。主标题下紧跟一条赤陶红的 2px 横线，长度仅 40px。
2.  **Metric (核心指标)**: 数字字号放至 32px，`--font-mono`。剥离“总计/单位”等冗余词汇，直接用微型图标或全大写英文标注在数字左上角。下方紧贴一个 16px 高度的 SVG Sparkline 面积图。
3.  **Flow / Architecture Map (流程/架构图)**: 倾向少用传统的气泡+箭头。节点可以是一根横线加文字，或者直角矩形（无填充，仅 1px 黑框）。连接线适合直角折线，终点可以用一个 4px 红色圆点表示。
4.  **Timeline (时间线)**: 绝对水平布局。一条贯穿屏幕的 1px 横线，时间节点是线上的竖向短划线 (`|`)，文字信息在横线上下交错排列，紧凑且充分利用横向空间。
5.  **Matrix / Variant Grid (矩阵/变量网格)**: 像轻量 dashboard 一样扫读。表头和首列固定，第一列放对象，前几列放结论、风险、优先级，后面再放证据、成本、下一步。单元格内优先用标签、色块、进度条或极简图表表达，减少整段文字。
6.  **Decision Tree (决策树)**: 可以用**水平缩进的括号布局**或经典的层级缩进排版，每个层级左侧带有一条淡淡的竖线指引。
7.  **Code Annotation (代码批注)**: 代码块使用 `#F4F2EE` 底色，批注可以在代码行中间直接展开（Inline expanded），批注文字使用楷体 (`--font-cn`)，与无衬线代码形成“人机对话”的视觉反差。
8.  **Diff Review (差异对比)**: 经典左右分栏。删除行浅红背景 `#FBEBE8`，新增行浅绿背景 `#EAF2ED`。无边框，极简处理。
9.  **Evidence Board (洞察/证据板)**: 采用 Masonry (瀑布流) 布局。每个卡片使用极淡的背景色（如米黄、淡青），像散落在桌面的便签，边缘保持锐利（`--radius-base: 0`）。
10. **Kanban (看板)**: 列之间适合保留 1px 竖向分割线。任务卡片可以低边框、低阴影，白色底色悬浮在淡灰色列背景上。
11. **Form Editor (表单编辑器)**: 输入框可以采用更轻的边界，例如底部 1px 横线。Label 放在横线左侧同一行，利用较宽的水平空间。
12. **Slider Lab (滑块实验室)**: 滑道为极其纤细的 1px 横线，滑块为一个简单的长方形 (`4px * 16px`)，完全扁平。
13. **Prompt Editor (提示词编辑器)**: 巨大的纯白输入区，像一张打字机纸。系统变量用淡黄色背景高亮 (`<mark>` 标签重置样式)，像用荧光笔画过一样。
14. **Export Toolbar (导出工具栏)**: 可以放在右上角，使用深色按钮或轻量描边按钮。鼠标 Hover 时横向展开显示文字。

---

### 5. 导出/复制倾向 (Export/Copy)

这些组件常常承担生产力用途，适合提供一键复制或导出机制（例如在组件右上角显示微型按键）：

*   **Code Annotation / Diff Review**: 适合复制合并后代码，或导出 `.diff` 文本。
*   **Prompt Editor**: 适合复制最终解析完成的纯文本，以及导出为 JSON 格式的变量配置。
*   **Matrix / Variant Grid / Evidence Board**: 适合导出为 CSV 或 Markdown Table，方便插入其他文档。
*   **Flow / Architecture Map**: 适合导出该区域的 SVG 图片，或者基于 Mermaid/PlantUML 的 DSL 文本。
