# Component Roadmap

Use this roadmap when expanding the renderer. New visual component families should have a design reference first, then be implemented as JSON-driven blocks.

## Task Components

Add these as first-class blocks:

- `todoList`: interactive checklist with checkbox state, group labels, priority, due date, and copy/export.
- `taskTable`: dense task table with assignee, status, priority, due date, filters, and optional grouping.
- `progressTracker`: linear or segmented progress bar for phases, milestones, or rollout status.
- `dependencyList`: compact dependency tree with blockers, owners, and downstream impact.
- `reviewChecklist`: review-focused checklist with pass/fail/warn states and short notes.
- `statusBoard`: smaller than kanban, optimized for current state, owner, and next action.

Design rules:

- Keep rows thin and scannable.
- Use dots, ticks, tags, and 1px progress lines before prose.
- Support copy as Markdown and JSON.
- Avoid card-heavy task rows; tables and line-separated lists are preferred.

## Presentation Components

PPT-like artifacts should not be generic slides with giant text. They should be compact narrative canvases that can also work inside long HTML reports.

Add these as first-class blocks:

- `slideTitle`: title, subtitle, metadata, restrained typography.
- `slideSection`: chapter divider with section index and short premise.
- `slideAgenda`: agenda with current section highlight.
- `slideBigNumber`: one metric plus tiny context and optional sparkline.
- `slideQuote`: quote with source and thin accent rule.
- `slideCompare`: two to four options with visual tradeoffs.
- `slideTimeline`: horizontal milestones.
- `slideProcess`: step flow with compact labels.
- `slideArchitecture`: `stage`-backed system diagram.
- `slideDemo`: `motionStage`-backed UI or process walkthrough.
- `slideImageMockup`: image/screenshot frame with callouts.
- `slideChart`: simple bar/line/area chart.
- `slideTakeaways`: 3-5 takeaway strips.
- `slideClosing`: Q&A, next steps, or contact.
- `slideAppendix`: dense reference table/code/source links.

Design rules:

- Use 16:9 aspect-ratio wrappers for cases where the user explicitly wants presentation-like output.
- Keep default slide typography modest; avoid 6rem numbers unless the component is a true keynote moment.
- Use horizontal composition and visual hierarchy instead of huge text.
- Let `stage` power static architecture and mockup slides. Let `motionStage` power demos where objects move, change status, or reveal state over time.

## Design Reference

Current visual exploration:

- `assets/todo-ppt-components-reference.html`

Useful patterns from that file:

- Checklist row interaction.
- Task table filtering.
- Segmented project progress.
- Thin-line slide timeline.

Patterns to correct before implementation:

- Replace Inter/Georgia with the warm-nomad humanist stack.
- Reduce oversized presentation typography.
- Add missing modules: architecture, demo stage, chart, takeaways, appendix.
- Keep slide modules compatible with the existing grid system.
