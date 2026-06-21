# Design: `knowledge-bricks` — the EOS Knowledge Base (OKF v0.1)

**Date:** 2026-06-21
**Status:** Approved scope, pending final review before build
**Format:** Open Knowledge Format (OKF) v0.1 bundle (Google Cloud spec, Apache-2.0)

---

## 1. Purpose

`knowledge-bricks` is a portable, human- and agent-readable knowledge base that encodes the
**Epistemic Operator System (EOS)** — the meta-reasoning layer of the AI Code Assistant (ACA v5) —
together with the **philosophical foundations** that ground each EOS operator.

It is the materialized local wiki that ACA §7 mandates ("Code must never exist without a knowledge
structure"). It is built as an OKF bundle so it is readable by humans without tooling, parseable by
agents without an SDK, and diffable in version control.

This document specifies the **build of the wiki only**. It does NOT change how any agent operates.

## 2. What this is NOT (scope boundaries)

- NOT the ACA v5 agent specification itself (that stays outside the wiki for now).
- NOT a change to operating mode — no ACA protocols are adopted by building this.
- NOT the "what is the next step for philosophy" node — that socket is left deliberately empty.

## 3. Format & conformance

OKF v0.1 rules we adhere to:

- A **bundle** is a directory tree of `.md` files. Each non-reserved file is one **concept**; its
  path minus `.md` is its **concept ID** (e.g. `philosophy/empiricism-kant/kant`).
- Every concept file has YAML frontmatter with a non-empty **`type`** (the only required field) plus
  recommended fields `title`, `description`, `tags`, `timestamp`. (`resource` omitted — abstract concepts.)
- **Reserved files:** `index.md` (navigable listing, no frontmatter except `okf_version` at bundle root)
  and `log.md` (change history, newest-first, ISO dates). These are never concept files.
- **Links are plain markdown, bundle-relative with a leading `/`**, e.g.
  `[reacts against Hume](/philosophy/empiricism-kant/hume.md)`. A link asserts an untyped directed
  edge; the **surrounding prose names the relationship** (influenced / reacts-against / refines /
  opposes / synthesizes / grounds). Consumers must tolerate broken links.

## 4. Concept types

| `type`                          | What it is                                              | Lives in            |
|---------------------------------|---------------------------------------------------------|---------------------|
| `EOS Operator`                  | A transformation O: Concept × Context → Concept         | `eos/operators/`    |
| `EOS Axiom`                     | A foundational non-negotiable axiom                     | `eos/axioms/`       |
| `EOS Type`                      | Concept / Operator / Configuration                      | `eos/types/`        |
| `Philosophical Model of Reality`| A thinker's conception of what reality fundamentally is | `philosophy/**`     |

## 5. Brick schemas

### 5.1 Philosophy brick
```
---
type: Philosophical Model of Reality
title: <Thinker> — <model name>
description: <one sentence: what reality IS, per this thinker>
tags: [<era>, <-ism>, <domain>]
timestamp: 2026-06-21
---

## The model of reality        — what reality fundamentally is, per this thinker
## Key concept                 — the signature idea/term
## Relations                   — prose with bundle-relative links naming each edge
## Grounds (if applicable)     — link FORWARD to the EOS operator this thinker grounds
```

### 5.2 EOS Operator brick
```
---
type: EOS Operator
title: O<n>_<NAME>
description: <transformation in one sentence>
tags: [eos, operator, <stabilization|cognitive_shift|semantic|network|destabilization|meta>]
timestamp: 2026-06-21
---

## Transformation              — the formal C → C' rule
## Engineering mapping         — how it applies to code/architecture
## Philosophical grounding     — link to grounding philosopher brick(s)
## Composition rules           — ordering constraints (e.g. "never apply O5 without O1")
## Relations                   — links to other operators
```

## 6. Bundle structure (~65 files)

```
knowledge-bricks/
├── index.md                         # bundle root, okf_version: "0.1"
├── log.md
├── eos/
│   ├── index.md
│   ├── axioms/                      # 3 axioms (no-fixed-grounding, meaning-from-transformation,
│   │   ├── index.md                 #          no-privileged-reference) + index
│   │   └── *.md
│   ├── operators/
│   │   ├── index.md
│   │   ├── o1-foundation.md         # grounds: Kant
│   │   ├── o2-internalization.md    # grounds: (user model / cognitive structure)
│   │   ├── o3-linguistic-shift.md   # grounds: Wittgenstein, Deleuze
│   │   ├── o4-relationalization.md  # grounds: Quine, Latour
│   │   ├── o5-de-referentialization.md # grounds: Foucault, Derrida
│   │   └── o-meta.md
│   ├── types/
│   │   ├── index.md
│   │   ├── concept.md · operator.md · configuration.md
│   └── dynamics.md                  # open system, local stability / global drift
└── philosophy/
    ├── index.md
    ├── ancient/                     # 10: Parmenides, Heraclitus, Pythagoras, Plato, Aristotle,
    │                                #     Atomists, Epicurus, Stoics, Plotinus, Sextus Empiricus
    ├── medieval-rationalist/        # 12: Augustine, Avicenna, Averroes, al-Ghazali, Anselm,
    │                                #     Aquinas, Duns Scotus, Ockham, Descartes, Malebranche,
    │                                #     Spinoza, Leibniz
    ├── empiricism-kant/             # 7: Bacon, Hobbes, Locke, Berkeley, Hume, Reid, Kant
    ├── nineteenth-twentieth/        # 15: Hegel, Schopenhauer, Marx, Nietzsche, Mach, Peirce,
    │                                #     James, Bergson, Husserl, Whitehead, Russell,
    │                                #     Wittgenstein, Heidegger, Quine, Putnam
    ├── poststructuralist/           # 4 NEW: Latour, Foucault, Deleuze, Derrida
    └── physics-of-reality/          # 9: Newton, Einstein, Bohr, Heisenberg, Schrödinger,
                                     #    Everett, Bohm, Bell, Measurement-Problem
```

Each directory has an `index.md` grouping its bricks. The bundle-root and `philosophy/`, `eos/`
indexes provide progressive disclosure top-down.

## 7. The cross-link graph (what makes it a graph, not a list)

Three families of edges, all as bundle-relative markdown links with relation named in prose:

1. **Influence edges** (within `philosophy/`) — the researched relationships: influenced /
   reacts-against / refines / opposes / synthesizes. Cross-era and dense
   (Hume→Kant, Mach→Einstein, Einstein⟷Bohr, Plato→Plotinus→Augustine→Descartes, Leibniz⟷Newton).
2. **Grounding edges** (`philosophy/ ⟷ eos/operators/`) — each operator links to its grounding
   philosopher(s); each grounding philosopher links forward to its operator.
3. **EOS internal edges** — operators ↔ axioms ↔ types ↔ dynamics, including composition
   constraints (the `O1 ∘ O4 ∘ O2 ∘ O5 ∘ O3` default chain; "never O5 without O1").

## 8. Content source & accuracy

Philosophy content comes from five parallel research passes (standard SEP/IEP-level scholarship).
Web verification was unavailable to the sub-agents; content is canonical history of philosophy and
reliable, but edges may be re-verified against live sources later if desired. EOS content comes
verbatim-in-intent from the ACA v5 / EOS §14 specification provided by the user.

## 9. Build approach

1. Define a canonical concept-ID map (every node → its file path) so parallel authors produce
   consistent, resolvable cross-links.
2. Author `eos/` (operators, axioms, types, dynamics) — small, high-coupling, authored directly.
3. Author `philosophy/` clusters — parallelizable per directory, each author given the node list,
   the ID map, the edge list, and the brick template.
4. Generate all `index.md` files and the root `index.md` (`okf_version: "0.1"`) + `log.md`.
5. Verify: every concept has a `type`; spot-check that grounding edges resolve both directions.

## 10. Out of scope / future sockets

- The "next step for philosophy to resolve" node (intentionally empty).
- Adopting ACA v5 as operating mode (separate decision; best persisted via CLAUDE.md).
- Live web re-verification of influence edges.
- Promotion of the bundle into a website or queryable graph (OKF makes this non-destructive later).
```

