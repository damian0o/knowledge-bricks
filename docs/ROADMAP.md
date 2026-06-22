# knowledge-bricks — Roadmap / Future Plans

_Last updated: 2026-06-22_

A running list of where this project could go next. Not a commitment — a menu of
the highest-value moves, grouped by theme. Tick items as they ship; add new ideas freely.

## Current state (done)
- OKF v0.1 bundle: **75 concepts** — EOS (operators, axioms, types, dynamics) + a philosophy
  graph of conceptions of reality (ancient → quantum) + a cross-cultural / non-Western cluster.
- 7 operator-grounding thinkers + cross-cultural antecedents (Nāgārjuna → no-fixed-grounding,
  dependent origination → O4) wired as a bidirectional grounding spine.
- `tools/okf-to-astro/` builder → static site with a typed interactive knowledge graph.
- Live on GitHub Pages: **https://damian0o.github.io/knowledge-bricks/** ; CI auto-deploys
  `main` → `gh-pages` on every push (Astro build, Node 22, checkout/setup-node v5).

## Polish (quick wins)
- [ ] **README.md** at repo root — what an OKF bundle is, the EOS↔philosophy idea, the live
  link, how to run the builder. (The GitHub landing page is currently bare. Highest priority.)
- [ ] Repo description + topics on GitHub for discoverability.
- [ ] Graph UX: mobile layout, label-collision handling, maybe a minimap.

## Content (deepen the philosophy)
- [ ] **Proposal B — "conceptual tensions" layer.** New node type `Philosophical Tension` for
  recurring dialectics (Being↔Becoming, Absolute↔Relational, Realism↔Anti-realism,
  Mind-dependent↔Mind-independent, One↔Many). Thinkers link to the axes they take a position on;
  maps onto operators (O5 destabilizes Absolute→Relational, etc.). Top content pick.
- [ ] **Accuracy pass.** Re-verify the philosophy influence edges against real sources (SEP/IEP)
  with web access — the original authoring agents had none. Standard scholarship, but unverified.
- [ ] **Proposal C — synthesis "arc" brick.** One node reading the whole graph as the
  stability→destabilization story and naming EOS's axioms as its inheritance — WITHOUT filling
  the deliberately-empty "next step for philosophy" socket.
- [ ] More cross-cultural breadth (e.g. Confucius, Ibn ʿArabī, Ubuntu/relational ontologies).
- [ ] Decide how/whether to frame the empty "next step for philosophy to resolve" node as an
  explicit open-question node (currently intentionally absent).

## Product (the okf-to-astro tool)
- [ ] **Extract `okf-to-astro` into its own repo / npm package / GitHub Action** — the stated
  future direction: "point it at any OKF repo → instant Pages site." Biggest piece; turns the
  builder into reusable machinery beyond this bundle. (Monorepo now is the deliberate first step.)
- [ ] Site features: full-text search (Pagefind), per-page "local graph", polished
  backlinks/grounding panels, breadcrumbs, dark/light toggle.
- [ ] Make the builder fully bundle-path-parameterized + a small config schema, ready for reuse.

## Loose ends / operational
- [ ] `gh` active account is currently `damian0o` (switched for deploy). Decide: leave, or switch
  back to `damianhico`. See memory: use `damian0o` for this project's repos/pushes.

## Standing decisions (do not re-litigate without reason)
- **OKF v0.1 only** as the source format; the bundle stays the source of truth.
- **No Astro project or build output committed to `main`** — only the builder + template; the
  built site lives on the `gh-pages` branch.
- **Conventional Commits, and no AI-tool annotations** in commit messages (per ACA §4.7.2).
- Use the **`damian0o`** GitHub account for this project.
