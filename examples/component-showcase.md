---
title: html-doc
subtitle: Component Showcase — 全组件参考
lang: zh-CN
glossary:
  Block: 页面上的一个内容单元，对应一个 Markdown 栅栏块
  Span: Block 在 12 列网格中占据的列数，控制水平布局宽度
---

~~~actions
[
  { "label": "View Source", "primary": true, "copy": "node scripts/render-html-doc.mjs examples/component-showcase.md dist/component-showcase.html" }
]
~~~

~~~hero
{
  "id": "hero",
  "span": 12,
  "kicker": "html-doc · 全组件参考",
  "title": "用 Markdown 栅栏块组合出高质量、可读、可交互的文档",
  "body": "每个组件对应一种信息结构：流程、对比、架构、状态变化、代码、关系、证据、编辑器。",
  "tags": ["warm-flat", "12-col-grid", "interactive", "export-ready"]
}
~~~

~~~metrics
{
  "id": "metrics",
  "span": 4,
  "title": "metrics — 关键指标",
  "items": [
    { "label": "[[Block]] 类型", "value": "23", "note": "覆盖所有信息形态", "spark": [3, 5, 8, 12, 16, 20, 23] },
    { "label": "文档体积", "value": "-62%", "note": "相比等效 HTML", "spark": [9, 8, 7, 6, 5, 4, 4] },
    { "label": "[[Span]] 系统", "value": "12 列", "note": "4/8, 6/6, 8/4 分列", "spark": [4, 4, 6, 8, 8, 12, 12] }
  ]
}
~~~

~~~chart
{
  "id": "chart-demo",
  "span": 8,
  "title": "chart — 数据趋势图",
  "variant": "line",
  "data": {
    "labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    "series": [
      { "label": "Web MAU", "values": [4200, 4800, 5100, 5600, 6200, 6800] },
      { "label": "Mobile MAU", "values": [2100, 2800, 3400, 3900, 4600, 5200] }
    ]
  }
}
~~~

~~~stage
{
  "id": "stage-demo",
  "span": 8,
  "title": "stage — 自由定位图",
  "stage": { "width": 960, "height": 480 },
  "elements": [
    { "id": "cfg",   "type": "panel",      "x": 70,  "y": 110, "w": 200, "h": 100, "title": "source_config",  "content": "rules / inputs" },
    { "id": "rt",    "type": "panel",      "x": 370, "y": 105, "w": 220, "h": 115, "title": "runtime_state",  "content": "current mode + status" },
    { "id": "log",   "type": "panel",      "x": 700, "y": 110, "w": 180, "h": 100, "title": "event_log",      "content": "immutable records" },
    { "id": "note1", "type": "annotation", "x": 370, "y": 285, "w": 240, "h": 64,  "content": "运行时只读取已确认配置和容量边界。" },
    { "id": "l1",    "type": "connection", "from": "cfg", "to": "rt" },
    { "id": "l2",    "type": "connection", "from": "rt",  "to": "log" }
  ]
}
~~~

~~~promptEditor
{
  "id": "prompt",
  "span": 4,
  "title": "promptEditor — 模板编辑器",
  "prompt": "Create a {{artifact_type}} for {{audience}}.\nPrefer diagrams and matrices over long prose."
}
~~~

~~~motionStage
{
  "id": "motion-demo",
  "span": 12,
  "title": "motionStage — 外卖下单支付流程",
  "body": "同一组持久对象在步骤间改变内容、状态和可见性，演示真实 UI 交互而非流程图。",
  "stage": { "width": 1180, "height": 500 },
  "objects": [
    {
      "id": "phone", "type": "phone",
      "x": 55, "y": 50, "w": 250, "h": 390,
      "title": "午餐外卖",
      "items": [
        { "label": "宫保鸡丁", "value": "×1" },
        { "label": "米饭", "value": "×2" },
        { "label": "合计", "value": "¥46" }
      ]
    },
    { "id": "map",    "type": "window", "x": 390, "y": 70,  "w": 340, "h": 270, "title": "配送追踪", "body": "等待骑手接单...", "opacity": 0.15 },
    { "id": "eta",    "type": "metric", "x": 820, "y": 65,  "w": 200, "h": 105, "label": "预计送达", "value": "—", "opacity": 0.3 },
    { "id": "status", "type": "badge",  "x": 390, "y": 370, "w": 200, "h": 45,  "title": "选餐中" },
    { "id": "notif",  "type": "note",   "x": 820, "y": 190, "w": 200, "h": 100, "body": "骑手已接单，正在取餐", "opacity": 0 }
  ],
  "steps": [
    {
      "title": "浏览菜单",
      "body": "菜单、价格、评价集中在一个屏幕里，地图和 ETA 待激活。",
      "states": {
        "phone":  { "status": "active" },
        "map":    { "opacity": 0.15 },
        "eta":    { "opacity": 0.3 },
        "status": { "title": "选餐中" },
        "notif":  { "opacity": 0 }
      }
    },
    {
      "title": "确认订单",
      "body": "红包自动抵扣，实付 ¥41，进入待支付状态。",
      "states": {
        "phone":  { "title": "确认订单", "status": "active" },
        "status": { "title": "待支付", "emphasis": "focus" },
        "map":    { "opacity": 0.15 },
        "eta":    { "opacity": 0.3 }
      }
    },
    {
      "title": "扫码支付",
      "body": "支付二维码 30 秒有效，超时自动刷新。",
      "states": {
        "phone":  { "title": "扫码支付", "body": "¥41 · 请在 30 秒内完成" },
        "status": { "title": "支付中", "emphasis": "focus" }
      }
    },
    {
      "title": "支付成功 · 骑手接单",
      "body": "配送追踪实时同步，预计 28 分钟送达。",
      "states": {
        "phone":  { "title": "已下单 ✓", "body": "骑手正在赶来", "emphasis": "success" },
        "map":    { "opacity": 1, "title": "配送追踪", "body": "距您 1.2km · 行驶中", "status": "active" },
        "eta":    { "opacity": 1, "value": "28 min" },
        "status": { "title": "配送中", "emphasis": "success" },
        "notif":  { "opacity": 1 }
      }
    }
  ]
}
~~~

~~~layeredArchitecture
{
  "id": "arch-demo",
  "title": "layeredArchitecture — 分层服务架构图",
  "stage": { "width": 1180, "height": 500 },
  "lanes": [
    { "id": "client", "title": "客户端",  "subtitle": "Web / Mobile" },
    { "id": "api",    "title": "API 层",   "subtitle": "网关 / 认证 / 业务" },
    { "id": "data",   "title": "数据层",   "subtitle": "持久化 / 缓存 / 队列" }
  ],
  "nodes": [
    { "id": "browser", "lane": "client", "row": 0, "kind": "api",      "title": "Browser",     "body": "SPA · React" },
    { "id": "mobile",  "lane": "client", "row": 1, "kind": "api",      "title": "Mobile App",  "body": "iOS / Android" },
    { "id": "gateway", "lane": "api",    "row": 0, "kind": "api",      "title": "API Gateway", "body": "限流 · 路由" },
    { "id": "auth",    "lane": "api",    "row": 1, "kind": "worker",   "title": "Auth Service","body": "JWT · OAuth2" },
    { "id": "service", "lane": "api",    "row": 2, "kind": "worker",   "title": "Business API","body": "核心逻辑" },
    { "id": "db",      "lane": "data",   "row": 0, "kind": "data",     "title": "PostgreSQL",  "body": "主库 · 只读副本" },
    { "id": "cache",   "lane": "data",   "row": 1, "kind": "data",     "title": "Redis",       "body": "会话 · 热数据" },
    { "id": "queue",   "lane": "data",   "row": 2, "kind": "provider", "title": "Message Queue","body": "异步任务" }
  ],
  "edges": [
    { "from": "browser",  "to": "gateway", "step": 1, "label": "HTTPS" },
    { "from": "mobile",   "to": "gateway", "step": 2, "label": "HTTPS" },
    { "from": "gateway",  "to": "auth",    "step": 3, "label": "verify token" },
    { "from": "auth",     "to": "service", "step": 4, "label": "authorized" },
    { "from": "service",  "to": "db",      "step": 5, "label": "read / write" },
    { "from": "service",  "to": "cache",   "style": "dashed", "label": "cache get/set" },
    { "from": "service",  "to": "queue",   "style": "dashed", "label": "enqueue job" }
  ]
}
~~~

~~~flow
{
  "id": "flow-demo",
  "span": 8,
  "title": "flow — 线性流程",
  "nodes": [
    { "label": "需求输入",  "note": "代码、数据、问题" },
    { "label": "写文档",    "note": "选组件、填字段" },
    { "label": "渲染",      "note": "node scripts/render-html-doc.mjs" },
    { "label": "HTML 输出", "note": "浏览器直接打开" }
  ]
}
~~~

~~~decisionTree
{
  "id": "decision-demo",
  "span": 4,
  "title": "decisionTree — 决策树",
  "items": [
    { "level": 0, "condition": "需要对比多个选项",   "result": "matrix 或 variantGrid" },
    { "level": 1, "condition": "≥ 4 行 + 3 列",     "result": "matrix（支持排序过滤）" },
    { "level": 1, "condition": "≤ 3 个方案",        "result": "variantGrid（更直观）" },
    { "level": 0, "condition": "需要演示状态变化",   "result": "motionStage" },
    { "level": 0, "condition": "需要服务架构图",     "result": "layeredArchitecture" }
  ]
}
~~~

~~~matrix
{
  "id": "matrix-demo",
  "span": 12,
  "title": "matrix — 决策矩阵",
  "body": "先显示对象、结论和风险，长证据放进展开详情。",
  "search": true,
  "sortable": true,
  "filters": [
    { "key": "risk", "label": "风险", "options": ["High", "Medium", "Low"] }
  ],
  "columns": [
    { "key": "object",   "label": "对象",       "minWidth": "190px" },
    { "key": "summary",  "label": "一句话结论", "minWidth": "260px" },
    { "key": "risk",     "label": "风险",       "width": "96px" },
    { "key": "evidence", "label": "关键证据",   "minWidth": "250px" },
    { "key": "next",     "label": "下一步",     "minWidth": "150px" }
  ],
  "rows": [
    { "group": "视觉组件" },
    {
      "object": "`matrix` 宽表",
      "summary": "**首列固定 + 可搜索**，适合 4 行 3 列以上的对比",
      "risk": { "badge": "Low", "tone": "success" },
      "evidence": { "summary": "表头和首列在横向滚动时保持可见", "detail": "支持搜索、多维过滤、排序、展开详情、进度条、badge 和 sparkline。" },
      "next": { "badge": "ship", "tone": "accent" }
    },
    {
      "object": "`motionStage` 动画",
      "summary": "对象位置、可见性、状态、内容变化时使用",
      "risk": { "badge": "Medium", "tone": "warning" },
      "evidence": { "summary": "字幕只做补充，主信息出现在画面变化里", "detail": "避免只改 caption 而画面不动——那种效果不如 timeline。" },
      "next": ["真实 UI 对象", "每步有变化"]
    },
    { "group": "内容建议" },
    {
      "object": "长正文段落",
      "summary": "**拆成组件**：矩阵、批注、流程或展开材料",
      "risk": { "badge": "High", "tone": "danger" },
      "evidence": { "summary": "连续段落让读者重建结构，视觉组件直接呈现", "detail": "如果内容有对比、顺序、关系或状态，改用对应组件。" },
      "next": { "badge": "refactor", "tone": "info" },
      "details": "经验法则：3 行以上的段落通常可以变成 flow、timeline 或 matrix 的一行。"
    }
  ]
}
~~~

~~~diffReview
{
  "id": "diff-demo",
  "span": 8,
  "title": "diffReview — 代码变更审查",
  "lines": [
    { "type": "context", "text": "  livenessProbe:" },
    { "type": "remove",  "text": "-   initialDelaySeconds: 5" },
    { "type": "add",     "text": "+   initialDelaySeconds: 15" },
    { "type": "remove",  "text": "-   timeoutSeconds: 5" },
    { "type": "add",     "text": "+   timeoutSeconds: 10" },
    { "type": "context", "text": "  readinessProbe:" },
    { "type": "remove",  "text": "-   initialDelaySeconds: 3" },
    { "type": "add",     "text": "+   initialDelaySeconds: 12" }
  ],
  "findings": [
    { "severity": "P1", "title": "修复冷启动误回滚", "body": "Java 服务 p50 启动 8-12s，原 5s 超时必然失败。" },
    { "severity": "P2", "title": "readiness 同步调整", "body": "避免未就绪时接收流量。" }
  ]
}
~~~

~~~timeline
{
  "id": "timeline-demo",
  "span": 4,
  "title": "timeline — 时间轴",
  "items": [
    { "time": "09:15", "title": "PR 合并",  "body": "feat: 优化发布逻辑" },
    { "time": "09:31", "title": "测试通过", "body": "450 个用例", "status": "active" },
    { "time": "09:52", "title": "发布完成", "body": "全量切换", "status": "active" }
  ]
}
~~~

~~~codeAnnotation
{
  "id": "code-demo",
  "span": 6,
  "title": "codeAnnotation — 代码批注",
  "code": "function renderBlock(block) {\n  const component = registry[block.type]\n  return component(block)\n}",
  "annotations": [
    { "ref": "registry",   "body": "组件注册表是 Skill 的稳定核心，新组件直接注册即可。" },
    { "ref": "block.type", "body": "Agent 负责选择意图，视觉系统由渲染器统一管理。" }
  ]
}
~~~

~~~sliderLab
{
  "id": "sliders-demo",
  "span": 6,
  "title": "sliderLab — 调节面板",
  "controls": [
    { "type": "range",  "label": "信息密度",   "min": 0, "max": 100, "value": 72 },
    { "type": "range",  "label": "暖色强度",   "min": 0, "max": 100, "value": 34 },
    { "type": "toggle", "label": "优先可视化", "value": true }
  ]
}
~~~

~~~variantGrid
{
  "id": "variants-demo",
  "span": 4,
  "title": "variantGrid — 方案对比",
  "items": [
    { "label": "A", "title": "报告型", "body": "洞察、证据、结论", "score": 88 },
    { "label": "B", "title": "审查型", "body": "diff、风险、路径", "score": 92 },
    { "label": "C", "title": "编辑型", "body": "表单、滑块、导出", "score": 84 }
  ]
}
~~~

~~~evidenceBoard
{
  "id": "evidence-demo",
  "span": 8,
  "title": "evidenceBoard — 证据板",
  "items": [
    { "label": "USER",   "title": "不喜欢容器过度嵌套",  "body": "整体采用铺地砖式 grid，组件之间共用 1px 分割线。" },
    { "label": "DESIGN", "title": "人文感字体",          "body": "标题使用 Optima / Avenir Next，中文回退苹方。" },
    { "label": "RULE",   "title": "文字尽量少",          "body": "正文保持轻量；细节交给矩阵、批注或展开材料。" },
    { "label": "HTML",   "title": "充分利用水平空间",    "body": "12 列 span 机制，支持 4/8、6/6、8/4 分列。" }
  ]
}
~~~

~~~crossRef
{
  "id": "crossref-demo",
  "span": 12,
  "title": "crossRef — GitHub Actions 部署流水线",
  "primary": {
    "label": ".github/workflows/deploy.yml",
    "sections": [
      {
        "title": "触发器 & 环境变量",
        "content": "on:\n  push:\n    branches: [main]\n  workflow_dispatch:\n\nenv:\n  APP_ENV: production\n  # 从 config/.env.production 注入\n  REGISTRY: ${{ secrets.ECR_REGISTRY }}\n  IMAGE_TAG: ${{ github.sha }}\n  APP_PORT:  ${{ vars.APP_PORT }}"
      },
      {
        "title": "build-and-push job",
        "content": "build:\n  runs-on: ubuntu-latest\n  steps:\n    - uses: actions/checkout@v4\n    - name: Build image\n      run: |\n        docker build \\\n          -f docker/Dockerfile \\\n          --build-arg APP_ENV=$APP_ENV \\\n          -t $REGISTRY/app:$IMAGE_TAG .\n    - name: Scan for vulnerabilities\n      uses: aquasecurity/trivy-action@master\n      with:\n        image-ref: $REGISTRY/app:$IMAGE_TAG\n    - name: Push to ECR\n      run: docker push $REGISTRY/app:$IMAGE_TAG"
      },
      {
        "title": "helm-deploy job",
        "content": "deploy:\n  needs: [build]\n  runs-on: ubuntu-latest\n  steps:\n    - name: Helm upgrade\n      run: |\n        helm upgrade --install app ./helm \\\n          -f helm/values.yaml \\\n          --set image.tag=$IMAGE_TAG \\\n          --set env=$APP_ENV \\\n          --atomic --timeout 5m\n    - name: Verify k8s rollout\n      run: |\n        kubectl apply -f k8s/deployment.yaml\n        kubectl rollout status \\\n          deployment/app --timeout=3m"
      },
      {
        "title": "post-deploy checks",
        "content": "verify:\n  needs: [deploy]\n  steps:\n    - name: Smoke test\n      run: |\n        curl -sf https://$APP_HOST/healthz \\\n          || (kubectl rollout undo deployment/app && exit 1)\n    - name: Notify Slack\n      if: always()\n      run: |\n        STATUS=${{ job.status }}\n        curl -X POST ${{ secrets.SLACK_WEBHOOK }} \\\n          -d \"{\\\"text\\\":\\\"deploy $IMAGE_TAG: $STATUS\\\"}\""
      }
    ]
  },
  "references": [
    {
      "id": "envfile",
      "label": "config/.env.production",
      "preview": "# Production environment\nAPP_PORT=8080\nAPP_HOST=app.example.com\nDB_POOL_MAX=20\nDB_POOL_IDLE=5\nLOG_LEVEL=warn\nCACHE_TTL=300\nFEATURE_CANARY=true\nFEATURE_NEW_CHECKOUT=false"
    },
    {
      "id": "dockerfile",
      "label": "docker/Dockerfile",
      "preview": "FROM node:20-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --only=production\nCOPY . .\nRUN npm run build\n\nFROM node:20-alpine\nWORKDIR /app\nCOPY --from=builder /app/dist ./dist\nCOPY --from=builder /app/node_modules ./node_modules\nEXPOSE 8080\nCMD [\"node\", \"dist/server.js\"]"
    },
    {
      "id": "helmvalues",
      "label": "helm/values.yaml",
      "preview": "replicaCount: 3\nimage:\n  repository: 123456.dkr.ecr.us-east-1.amazonaws.com/app\n  tag: latest\n  pullPolicy: IfNotPresent\nresources:\n  requests: { cpu: 250m, memory: 256Mi }\n  limits:   { cpu: 500m, memory: 512Mi }\nautoscaling:\n  enabled: true\n  minReplicas: 3\n  maxReplicas: 10\n  targetCPUUtilizationPercentage: 70\ningress:\n  enabled: true\n  host: app.example.com"
    },
    {
      "id": "k8sdeploy",
      "label": "k8s/deployment.yaml",
      "preview": "apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: app\nspec:\n  strategy:\n    type: RollingUpdate\n    rollingUpdate:\n      maxSurge: 1\n      maxUnavailable: 0\n  template:\n    spec:\n      containers:\n        - name: app\n          livenessProbe:\n            httpGet: { path: /healthz, port: 8080 }\n            initialDelaySeconds: 15\n          readinessProbe:\n            httpGet: { path: /ready, port: 8080 }"
    }
  ],
  "links": [
    { "text": "config/.env.production", "to": "envfile" },
    { "text": "docker/Dockerfile",      "to": "dockerfile" },
    { "text": "helm/values.yaml",       "to": "helmvalues" },
    { "text": "k8s/deployment.yaml",    "to": "k8sdeploy" }
  ]
}
~~~

~~~relationshipMap
{
  "id": "relmap-demo",
  "span": 12,
  "title": "relationshipMap — RBAC 权限分配",
  "body": "哪些角色可以访问哪些 API 权限组。连线密集的角色拥有更广泛的访问权限，便于权限审计时快速发现过度授权。",
  "sources": [
    { "id": "super-admin", "title": "超级管理员", "meta": "SRE Team" },
    { "id": "devops",      "title": "运维工程师", "meta": "Ops Team" },
    { "id": "developer",   "title": "开发工程师", "meta": "Eng Team" },
    { "id": "analyst",     "title": "数据分析师", "meta": "Data Team" },
    { "id": "readonly",    "title": "只读用户",   "meta": "Stakeholder" }
  ],
  "targets": [
    { "id": "infra-ops",  "title": "基础设施操作", "meta": "服务器 / 网络 / 证书" },
    { "id": "deploy-api", "title": "部署接口",     "meta": "发布 / 回滚 / 扩缩容" },
    { "id": "code-api",   "title": "代码 & CI",    "meta": "构建 / 制品 / 测试报告" },
    { "id": "data-query", "title": "数据查询",     "meta": "报表 / 指标 / 慢查询" },
    { "id": "audit-logs", "title": "审计日志",     "meta": "操作记录 / 变更历史" },
    { "id": "user-mgmt",  "title": "用户管理",     "meta": "账号 / 角色 / 权限配置" }
  ],
  "edges": [
    { "from": "super-admin", "to": "infra-ops" },
    { "from": "super-admin", "to": "deploy-api" },
    { "from": "super-admin", "to": "code-api" },
    { "from": "super-admin", "to": "data-query" },
    { "from": "super-admin", "to": "audit-logs" },
    { "from": "super-admin", "to": "user-mgmt" },
    { "from": "devops",      "to": "infra-ops" },
    { "from": "devops",      "to": "deploy-api" },
    { "from": "devops",      "to": "audit-logs" },
    { "from": "developer",   "to": "code-api" },
    { "from": "developer",   "to": "deploy-api" },
    { "from": "developer",   "to": "data-query" },
    { "from": "analyst",     "to": "data-query" },
    { "from": "analyst",     "to": "audit-logs" },
    { "from": "readonly",    "to": "data-query" }
  ]
}
~~~

~~~structureTree
{
  "id": "tree-demo",
  "span": 6,
  "title": "structureTree — 嵌套结构",
  "nodes": [
    { "key": "document", "type": ".md 文件", "children": [
      { "key": "frontmatter", "type": "YAML", "children": [
        { "key": "title",    "value": "\"文档标题\"",     "type": "String" },
        { "key": "subtitle", "value": "\"副标题\"",       "type": "String" },
        { "key": "glossary", "value": "{ 术语: 释义 }",  "type": "Object" }
      ]},
      { "key": "~~~hero", "type": "Block", "children": [
        { "key": "title", "value": "\"...\"", "type": "String" },
        { "key": "span",  "value": "12",      "type": "Number" }
      ]},
      { "key": "~~~matrix", "type": "Block", "children": [
        { "key": "columns", "value": "[...]", "type": "Array" },
        { "key": "rows",    "value": "[...]", "type": "Array" }
      ]}
    ]}
  ]
}
~~~

~~~emphasisPanel
{
  "id": "emphasis-demo",
  "span": 6,
  "text": "motionStage 渲染器在每个 step 中对 objects 应用增量 states，触发 CSS 过渡动画。每个 object 的 position、opacity、status 和 emphasis 都可以在任意步骤中独立更新，无需重新描述整个场景。",
  "active": "states",
  "items": [
    { "id": "objects",  "text": "objects",  "label": "持久化对象", "value": "定义一次，贯穿所有步骤",  "metaLabel": "类型",     "meta": "panel / card / phone / window / metric / badge / note / line" },
    { "id": "states",   "text": "states",   "label": "步骤状态",   "value": "每步只写变化的字段",     "metaLabel": "可用字段", "meta": "x, y, opacity, status, emphasis, title, body, value" },
    { "id": "position", "text": "position", "label": "位置变换",   "value": "CSS left / top 过渡",    "metaLabel": "动画",     "meta": "cubic-bezier(.2,.82,.2,1)，0.54s" },
    { "id": "emphasis", "text": "emphasis", "label": "强调状态",   "value": "改变边框色和背景色",     "metaLabel": "取值",     "meta": "focus / success / warning" }
  ]
}
~~~

~~~kanban
{
  "id": "kanban-demo",
  "span": 12,
  "title": "kanban — 分组清单",
  "columns": [
    {
      "title": "设计规则",
      "icon": "✦",
      "tone": "info",
      "items": [
        { "title": "内容写在栅栏块里，渲染器管样式", "done": true },
        { "title": "信息形状决定组件选择", "done": true },
        { "title": "可见文字只写主题，不写渲染注释", "done": true }
      ]
    },
    {
      "title": "写作规则",
      "icon": "✎",
      "tone": "warning",
      "items": [
        { "title": "`body` 字段：只在标题无法独立说明时填写", "done": false },
        "平铺文字 → 优先转成结构组件",
        { "title": "表格列顺序：对象、结论、风险、证据、下一步", "done": false }
      ]
    },
    {
      "title": "已验证",
      "icon": "✓",
      "tone": "success",
      "items": [
        { "title": "12 列网格分列布局", "done": true },
        { "title": "Tooltip / Glossary 内联注释", "done": true },
        { "title": "Matrix 搜索 + 过滤 + 排序", "done": true },
        { "title": "MotionStage 真实 UI 演示", "done": true }
      ]
    }
  ]
}
~~~

~~~formEditor
{
  "id": "form-demo",
  "span": 6,
  "title": "formEditor — 结构化表单",
  "fields": [
    { "name": "mode",    "label": "处理模式", "type": "select",   "value": "auto", "options": ["auto", "manual", "precheck"] },
    { "name": "density", "label": "密度",     "value": "compact" },
    { "name": "rule",    "label": "规则",     "type": "textarea", "value": "正文变长时优先转成视觉组件。" }
  ]
}
~~~

~~~promptEditor
{
  "id": "prompt2",
  "span": 6,
  "title": "promptEditor — 提示词模板（独立示例）",
  "prompt": "分析 {{repo}} 的 PR #{{number}}，输出风险矩阵、diff 审查和发布检查清单。"
}
~~~
