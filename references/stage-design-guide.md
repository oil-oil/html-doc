这是一个非常绝妙的构想。为了满足你对「warm-nomad」主题的追求（略暖、清爽、扁平、低嵌套、人文感、小字号），这个组件更适合采用一种 **“绝对定位白板 + 响应式流式布局混合”** 的画布理念。

我将这个组件命名为 **`NomadStage`**。以下是具体的、可落地的设计规范与架构。

---

### 1. 视觉规范 (The "warm-nomad" Aesthetic)

尽量少用大阴影和粗暴的纯黑纯白。界面应该像一张撒了阳光的优质手账纸。

*   **色彩系统 (Colors)**
    *   `bg-canvas`: `#FBF9F6` (略带暖意的珍珠白，作为整个 Stage 的底色)
    *   `bg-panel`: `#F2EFEA` (面板背景色，区分度极低，靠细边框界定边界)
    *   `text-main`: `#2C2A28` (深原木灰，通常比 `#000` 更柔和)
    *   `text-muted`: `#8C857B` (用于标注、次要文本)
    *   `accent-primary`: `#D48C70` (赤陶色，用于主按钮、强调连线、热点)
    *   `accent-success`: `#8A9A86` (鼠尾草绿，用于成功状态或正确的分支)
    *   `border-light`: `#E6E1D8` (极细边框专用)
*   **字体排版 (Typography)**
    *   **字体栈**: `Avenir Next, "Fira Sans", system-ui, sans-serif` (人文主义无衬线体)。
    *   **字号**: 极度克制。全局基准字号 `13px`。标题最大不超过 `18px`，标注说明使用 `11px` (`letter-spacing: 0.02em`)。
    *   **行高**: `1.6`。
*   **形状与空间 (Geometry & Spacing)**
    *   **圆角 (Radius)**: `4px` (硬朗中带一丝柔和，拒绝药丸形状的过度圆滑)。
    *   **阴影 (Shadows)**: 常规 Drop-shadow 尽量少用。如需浮层，可以使用细边框加一层极弱的环境光阴影：`0 4px 12px rgba(44, 42, 40, 0.04), 0 0 0 1px #E6E1D8`。
    *   **网格**: 画布背景建议铺设 `20px` 间距的极淡点阵网格 (`#E6E1D8` 1px 圆点)，增强草图感。

---

### 2. JSON 数据结构 (Schema)

数据结构建议保持扁平。采用类似 Figma 的节点树，通过 `x, y, w, h` 进行自由布局，同时支持编组。

```json
{
  "stage": {
    "width": 800,
    "height": 600,
    "background": "grid", // "grid" | "blank"
    "initialState": "step_1"
  },
  "elements": [
    {
      "id": "panel_login",
      "type": "panel",
      "x": 120,
      "y": 80,
      "w": 320,
      "h": 240,
      "title": "Sign In",
      "style": { "border": true }
    },
    {
      "id": "btn_submit",
      "groupId": "panel_login", // 通过 groupId 代替嵌套
      "type": "button",
      "x": 140,
      "y": 260,
      "w": 280,
      "h": 36,
      "content": "Continue",
      "variant": "primary",
      "interactions": {
        "onClick": { "action": "setState", "target": "step_2" }
      }
    },
    {
      "id": "note_1",
      "type": "annotation",
      "x": 460,
      "y": 260,
      "w": 180,
      "content": "此处触发状态流转 -> step_2",
      "color": "muted"
    },
    {
      "id": "line_1",
      "type": "connection",
      "from": "btn_submit",
      "to": "note_1",
      "style": "dashed"
    }
  ],
  "states": {
    "step_1": { "visibleElements": ["panel_login", "btn_submit", "note_1", "line_1"] },
    "step_2": { "visibleElements": ["panel_dashboard"] }
  }
}
```

---

### 3. 可支持的元素类型 (Elements)

*   **UI 骨架类**:
    *   `panel`: 基础容器，支持带标题栏。
    *   `image`: 占位图（显示跨角对角线 `X` 的框）。
    *   `text`: 纯文本，支持 markdown 加粗。
*   **交互控件类**:
    *   `button`: 按钮（`primary`, `secondary`, `ghost`）。
    *   `input`: 输入框占位（白底，极细边框）。
    *   `checkbox` / `radio` / `toggle`: 状态开关。
*   **演示特化类 (Diagramming)**:
    *   `annotation`: 标注框，带有手写感或小号斜体文字。
    *   `connection`: 连线，支持直角折线 (`step`) 或直线，带箭头。
    *   `hotspot`: 热点区域（一个跳动的红陶色脉冲圆点），用于提示用户哪里可以点击。
    *   `cursor`: 模拟鼠标指针，可用于演示路径动画。

---

### 4. 交互类型 (Interactions)

保持轻量，避免重写完整的 Vue/React 状态机。优先覆盖以下四种宏观交互：
1.  **`setState` (Click)**: 切换全局 State，控制元素的显隐（如上述 JSON 中的 `step_1` 到 `step_2`）。
2.  **`toggleProperty` (Click/Toggle)**: 单体元素的简单属性切换（例如点击 Checkbox，它自己变成勾选状态，不影响全局）。
3.  **`hover`**: 鼠标悬浮时显示与之绑定的 `annotation` 或 tooltip。
4.  **`stepper` (Flow)**: 如果检测到全局配置了步骤流，在画布底部中央自动渲染一个浮动的 `< 1/4 >` 步进器，允许用户像看 PPT 一样阅览 UI 流程。

---

### 5. 导出能力 (Exports)

既然是设计和讨论工具，产出物的流转至关重要：
1.  **Export to PNG**: 提供 `2x` 分辨率截图，背景可以带上那层淡淡的点阵网格，方便直接贴到 Notion 或 GitHub Issue 里。
2.  **Copy JSON**: 一键复制背后的 DSL（领域特定语言）代码，方便另一个人丢给 AI 说：“在第一步的按钮旁边加一个说明文本”。
3.  **Export as React/Tailwind Snippet (可选的高级能力)**: 对于简单的 Panel 布局，通过算法将其绝对定位转译为 Flexbox Tailwind 代码，直接生成前端骨架。

### 总结设计箴言
对于 `NomadStage` 来说，**留白即结构**。减少层层叠叠的 `<div class="p-4 border">`。让文本、控件像排版杂志一样散落在带有点阵的珍珠白画布上，通过细致的连线和赤陶色的热点引导视觉。这样 AI 生成出的界面更像一份充满人文气质的产品设计草图。
