---
title: CI/CD 发布管道架构审查
subtitle: v2.3 → v2.4 升级评估
lang: zh-CN
glossary:
  MTTR: Mean Time To Recovery — 平均故障恢复时间
  SLO: Service Level Objective — 服务质量目标
  Canary: 金丝雀发布，先将新版本推送到少量实例上观察稳定性再扩量
  P99: 第 99 百分位延迟，即 99% 的请求在此时间内完成
---

~~~hero
{
  "kicker": "架构审查",
  "title": "CI/CD 发布管道 v2.4",
  "body": "从代码提交到生产部署的完整链路评估，重点审查灰度策略与回滚路径。",
  "tags": ["CI/CD", "架构", "灰度发布", "可观测性"]
}
~~~

~~~metrics
{
  "span": 4,
  "items": [
    { "label": "部署频率", "value": "14/天", "note": "过去 30 天均值", "spark": [8, 11, 13, 12, 15, 14, 16] },
    { "label": "[[MTTR]]", "value": "4.2 min", "note": "目标 < 5 min", "spark": [9, 7, 5, 4, 6, 4, 4] },
    { "label": "发布成功率", "value": "99.1%", "note": "含回滚计算", "spark": [97, 98, 99, 99, 100, 99, 99] }
  ]
}
~~~

~~~chart
{
  "span": 8,
  "title": "发布成功率趋势",
  "variant": "area",
  "data": {
    "labels": ["1月", "2月", "3月", "4月", "5月"],
    "series": [
      { "label": "成功率 %", "values": [96.2, 97.8, 98.5, 99.1, 99.4] },
      { "label": "[[SLO]] 目标", "values": [99, 99, 99, 99, 99] }
    ]
  }
}
~~~

~~~layeredArchitecture
{
  "id": "pipeline-arch",
  "title": "发布管道架构",
  "stage": { "width": 1180, "height": 560 },
  "lanes": [
    { "id": "ci",       "title": "CI 层",    "subtitle": "构建 / 测试 / 打包" },
    { "id": "registry", "title": "制品层",   "subtitle": "镜像仓库 / 版本管理" },
    { "id": "cd",       "title": "CD 层",    "subtitle": "灰度 / 发布 / 回滚" },
    { "id": "obs",      "title": "可观测层", "subtitle": "指标 / 告警 / 日志" }
  ],
  "nodes": [
    { "id": "github",  "lane": "ci",       "row": 0, "kind": "api",      "title": "GitHub Actions",     "body": "PR merge 触发" },
    { "id": "builder", "lane": "ci",       "row": 1, "kind": "worker",   "title": "Build Worker",       "body": "Docker 多阶段构建" },
    { "id": "tester",  "lane": "ci",       "row": 2, "kind": "worker",   "title": "Test Runner",        "body": "单测 + 集成测试" },
    { "id": "ecr",     "lane": "registry", "row": 0, "kind": "data",     "title": "ECR",                "body": "镜像存储与漏洞扫描" },
    { "id": "argo",    "lane": "cd",       "row": 0, "kind": "api",      "title": "Argo CD",            "body": "GitOps 控制器" },
    { "id": "canary",  "lane": "cd",       "row": 1, "kind": "worker",   "title": "Canary Controller",  "body": "流量 5% → 50% → 100%" },
    { "id": "k8s",     "lane": "cd",       "row": 2, "kind": "worker",   "title": "Kubernetes",         "body": "滚动更新 + 健康检查" },
    { "id": "prom",    "lane": "obs",      "row": 0, "kind": "data",     "title": "Prometheus",         "body": "指标采集" },
    { "id": "alert",   "lane": "obs",      "row": 1, "kind": "provider", "title": "AlertManager",       "body": "告警路由" }
  ],
  "edges": [
    { "from": "github",  "to": "builder", "step": 1, "label": "trigger" },
    { "from": "builder", "to": "tester",  "step": 2, "label": "on success" },
    { "from": "tester",  "to": "ecr",     "step": 3, "label": "push image" },
    { "from": "ecr",     "to": "argo",    "step": 4, "label": "detect tag" },
    { "from": "argo",    "to": "canary",  "step": 5, "label": "deploy" },
    { "from": "canary",  "to": "k8s",     "step": 6, "label": "traffic shift" },
    { "from": "k8s",     "to": "prom",    "style": "dashed", "label": "metrics" },
    { "from": "prom",    "to": "alert",   "style": "dashed", "label": "threshold" },
    { "from": "alert",   "to": "argo",    "style": "dashed", "label": "rollback" }
  ]
}
~~~

~~~motionStage
{
  "id": "canary-flow",
  "title": "[[Canary]] 发布流程",
  "stage": { "width": 1180, "height": 460 },
  "objects": [
    { "id": "lb",       "type": "window", "x": 50,  "y": 170, "w": 200, "h": 120, "title": "Load Balancer", "body": "分流入口" },
    { "id": "v1",       "type": "card",   "x": 340, "y": 90,  "w": 220, "h": 110, "title": "v2.3 (stable)", "body": "100% 流量", "status": "active" },
    { "id": "v2",       "type": "card",   "x": 340, "y": 260, "w": 220, "h": 110, "title": "v2.4 (canary)", "body": "0% 流量", "opacity": 0.35 },
    { "id": "prom",     "type": "metric", "x": 660, "y": 90,  "w": 200, "h": 100, "label": "错误率", "value": "—", "opacity": 0.3 },
    { "id": "decision", "type": "note",   "x": 660, "y": 260, "w": 200, "h": 100, "body": "等待观测窗口", "opacity": 0.3 },
    { "id": "status",   "type": "badge",  "x": 960, "y": 195, "w": 160, "h": 50,  "value": "进行中", "opacity": 0.2 }
  ],
  "steps": [
    {
      "title": "部署 v2.4 到 Canary 实例",
      "body": "Argo CD 创建新 Pod，尚未接收流量，镜像拉取完成。",
      "states": {
        "v2": { "opacity": 1, "body": "0% 流量 — 已就绪" }
      }
    },
    {
      "title": "切入 5% 流量",
      "body": "Load Balancer 开始向 v2.4 分流，观察 [[P99]] 延迟与错误率。",
      "states": {
        "v1":   { "body": "95% 流量" },
        "v2":   { "body": "5% 流量", "status": "active" },
        "prom": { "opacity": 1, "value": "0.12%" }
      }
    },
    {
      "title": "扩大至 50%",
      "body": "指标正常，错误率低于阈值，继续扩大灰度比例。",
      "states": {
        "v1":       { "body": "50% 流量" },
        "v2":       { "body": "50% 流量", "emphasis": "success" },
        "prom":     { "value": "0.08%" },
        "decision": { "opacity": 1, "body": "错误率 < 0.5% ✓\n[[P99]] < 200ms ✓" }
      }
    },
    {
      "title": "全量切换完成",
      "body": "v2.4 接管全部流量，v2.3 保留 15 分钟作为快速回滚备用。",
      "states": {
        "v1":       { "body": "0% — 备用", "status": "muted" },
        "v2":       { "body": "100% 流量", "emphasis": "success" },
        "prom":     { "value": "0.07%" },
        "decision": { "body": "发布成功 ✓" },
        "status":   { "opacity": 1, "value": "发布完成", "emphasis": "success" }
      }
    }
  ]
}
~~~

~~~timeline
{
  "title": "v2.4 发布事件轴",
  "items": [
    { "time": "09:15", "title": "PR #847 合并", "body": "feat: 优化 Canary 流量切换逻辑" },
    { "time": "09:18", "title": "CI 构建启动", "body": "Build #1203，Docker 多阶段构建" },
    { "time": "09:31", "title": "全部测试通过", "body": "单测 412 个，集成测试 38 个", "status": "active" },
    { "time": "09:32", "title": "镜像推送 ECR", "body": "tag: v2.4.0-sha-3f9a2b，漏洞扫描 0 High" },
    { "time": "09:35", "title": "Argo CD 触发部署", "body": "检测到新镜像，启动 Canary 流程" },
    { "time": "09:52", "title": "全量发布完成", "body": "耗时 17 min，[[MTTR]] 基准更新", "status": "active" }
  ]
}
~~~

~~~matrix
{
  "id": "risk-matrix",
  "title": "风险评估矩阵",
  "search": true,
  "sortable": true,
  "filters": [
    { "key": "risk", "label": "风险等级", "options": ["High", "Medium", "Low"] }
  ],
  "columns": [
    { "key": "item",       "label": "检查项",   "minWidth": "200px" },
    { "key": "conclusion", "label": "结论",     "minWidth": "220px" },
    { "key": "risk",       "label": "风险",     "width": "96px" },
    { "key": "evidence",   "label": "依据",     "minWidth": "240px" },
    { "key": "action",     "label": "下一步",   "minWidth": "160px" }
  ],
  "rows": [
    { "group": "发布关键路径" },
    {
      "item": "`Canary Controller` 逻辑",
      "conclusion": "**流量切换已优化**，[[P99]] 延迟下降 18%",
      "risk": { "badge": "Low", "tone": "success" },
      "evidence": { "summary": "A/B 测试 3 天，错误率 0.08%", "detail": "对比 v2.3 的 0.21%，统计显著性 p<0.01，样本量 420 万次请求" },
      "action": { "badge": "ship", "tone": "accent" }
    },
    {
      "item": "自动回滚链路",
      "conclusion": "**手动演练通过，自动触发未验证**",
      "risk": { "badge": "Medium", "tone": "warning" },
      "evidence": { "summary": "AlertManager → Argo CD 链路仅有集成测试", "detail": "上次真实回滚（2月）是手动操作，自动路径未经真实故障验证" },
      "action": ["chaos test", "排期 Game Day"],
      "details": "建议在下周 Game Day 中加入回滚触发场景，注入 HTTP 500 错误超过阈值，观察自动回滚是否在 2 分钟内完成。"
    },
    {
      "item": "`livenessProbe` 超时",
      "conclusion": "**5s 超时在 Java 冷启动下不足，会触发误回滚**",
      "risk": { "badge": "High", "tone": "danger" },
      "evidence": { "progress": 30, "label": "冷启动 p50 进度（目标 15s）" },
      "action": ["调整为 15s", "验证"],
      "details": "Java 服务冷启动 p50 约 8-12s，p95 约 18s。当前 5s 超时在 cold start 场景下必然失败，会触发不必要的 Pod 重启和回滚。应改为 initialDelaySeconds: 15, timeoutSeconds: 10。"
    },
    { "group": "可观测性" },
    {
      "item": "[[P99]] 告警阈值",
      "conclusion": "阈值已与 [[SLO]] 对齐，留有 20% 缓冲",
      "risk": { "badge": "Low", "tone": "success" },
      "evidence": { "summary": "200ms 阈值 = SLO 的 80%", "detail": "历史数据：99.3% 的时间内 P99 < 160ms，告警噪音低" },
      "action": { "badge": "done", "tone": "success" }
    },
    {
      "item": "日志采样率",
      "conclusion": "高峰期 1% 采样导致排查困难",
      "risk": { "badge": "Medium", "tone": "warning" },
      "evidence": { "summary": "高峰期约 200 条/分钟", "detail": "上次 P2 故障排查耗时 40 分钟，主因日志量不足，无法定位具体请求链路" },
      "action": ["动态采样方案调研"]
    }
  ]
}
~~~

~~~decisionTree
{
  "span": 4,
  "title": "发布决策树",
  "items": [
    { "level": 0, "condition": "CI 全部通过？",          "result": "继续部署流程" },
    { "level": 1, "condition": "Canary 错误率 < 0.5%？", "result": "扩大灰度比例" },
    { "level": 2, "condition": "[[P99]] < 200ms？",      "result": "继续扩量到 100%" },
    { "level": 2, "condition": "P99 ≥ 200ms",            "result": "暂停，升级告警" },
    { "level": 1, "condition": "错误率 ≥ 0.5%",          "result": "立即触发自动回滚" },
    { "level": 0, "condition": "CI 失败",                "result": "阻断，通知责任人" }
  ]
}
~~~

~~~diffReview
{
  "span": 8,
  "title": "关键配置变更 — livenessProbe 超时",
  "lines": [
    { "number": 24, "type": "context", "text": "  livenessProbe:" },
    { "number": 25, "type": "remove",  "text": "-   initialDelaySeconds: 5" },
    { "number": 25, "type": "add",     "text": "+   initialDelaySeconds: 15" },
    { "number": 26, "type": "remove",  "text": "-   timeoutSeconds: 5" },
    { "number": 26, "type": "add",     "text": "+   timeoutSeconds: 10" },
    { "number": 27, "type": "context", "text": "  readinessProbe:" },
    { "number": 28, "type": "remove",  "text": "-   initialDelaySeconds: 3" },
    { "number": 28, "type": "add",     "text": "+   initialDelaySeconds: 12" },
    { "number": 29, "type": "remove",  "text": "-   failureThreshold: 3" },
    { "number": 29, "type": "add",     "text": "+   failureThreshold: 5" }
  ],
  "findings": [
    { "severity": "P1", "title": "修复冷启动误回滚", "body": "Java 服务 p50 启动耗时 8-12s，原 5s 超时必然在冷启动时触发失败。" },
    { "severity": "P2", "title": "readiness 同步调整", "body": "避免 Pod 未就绪时接收流量，`failureThreshold` 增大以减少抖动。" }
  ]
}
~~~

~~~kanban
{
  "title": "发布前检查清单",
  "columns": [
    {
      "title": "阻塞项",
      "icon": "!",
      "tone": "danger",
      "items": [
        { "title": "`livenessProbe` 超时调整并在 staging 验证", "done": false },
        { "title": "自动回滚链路端到端测试", "done": false }
      ]
    },
    {
      "title": "建议项",
      "icon": "~",
      "tone": "warning",
      "items": [
        "日志动态采样方案调研",
        { "title": "Game Day 回滚演练排期", "done": false },
        { "title": "Runbook 更新超时参数说明", "done": true }
      ]
    },
    {
      "title": "已完成",
      "icon": "✓",
      "tone": "success",
      "items": [
        { "title": "Canary Controller 逻辑审查", "done": true },
        { "title": "[[P99]] 告警阈值与 [[SLO]] 对齐", "done": true },
        { "title": "ECR 镜像漏洞扫描通过（0 High）", "done": true },
        { "title": "回归测试全部通过（450 个）", "done": true }
      ]
    }
  ]
}
~~~
