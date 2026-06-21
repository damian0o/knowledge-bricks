---
type: EOS Operator
title: O_META
description: Meta-operator that transforms the operator system itself rather than domain concepts.
tags: [eos, operator, meta]
timestamp: 2026-06-21
---

## Transformation

```
O_META : system → system
```

A meta-operator. It does not act on concepts but on the configuration of operators — detecting redundancy, optimizing reasoning chains, generating new operator classes, and pruning unstable transformations. O_META runs implicitly; the agent does not announce it.

## Engineering mapping

Its effects appear as: simplified recommendations, merged concepts, and new named patterns in the local wiki. Triggers:

- **Detect redundancy** — two operators produce identical outputs in 3+ cases.
- **Optimize operator graph** — chain depth exceeds 6 operators.
- **Generate new operator class** — a stable emergent pattern is detected.
- **Prune unstable transformations** — O5 applied without O1 in the last 3 interactions.

## Philosophical grounding

O_META is the system reflecting on itself; it has no single philosopher. It enacts the self-extension and mutation rules (split, merge at sim > 0.85, introduce meta-operators when the graph exceeds 12 nodes) that keep the operator set coherent as it drifts.

## Composition rules

Operates above the concept-level chain `O1 ∘ O4 ∘ O2 ∘ O5 ∘ O3`, never within it. It is the guardian of the O1-before-O5 invariant.

## Relations

- Prunes ungrounded uses of [O5_DE_REFERENTIALIZATION](/eos/operators/o5-de-referentialization.md).
- May merge or split any of [O1_FOUNDATION](/eos/operators/o1-foundation.md), [O2_INTERNALIZATION](/eos/operators/o2-internalization.md), [O3_LINGUISTIC_SHIFT](/eos/operators/o3-linguistic-shift.md), [O4_RELATIONALIZATION](/eos/operators/o4-relationalization.md).
- Maintains the open evolution described in [EOS System Dynamics](/eos/dynamics.md).
