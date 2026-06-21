---
type: EOS Type
title: Configuration
description: A composition of operators forming a reasoning chain over concept space.
tags: [eos, type]
timestamp: 2026-06-21
---

## Definition

A Configuration is a composition of [Operators](/eos/types/operator.md) forming a reasoning chain. It is how EOS produces a result: not a single operator but an ordered pipeline whose order matters.

## Form

```
O1 ∘ O2 ∘ … ∘ On
```

The safe default configuration for code review is:

```
O1 ∘ O4 ∘ O2 ∘ O5 ∘ O3
```

Stabilize → map relations → internalize → challenge assumptions → reframe in domain language. The invariant: never place [O5_DE_REFERENTIALIZATION](/eos/operators/o5-de-referentialization.md) before [O1_FOUNDATION](/eos/operators/o1-foundation.md). [O_META](/eos/operators/o-meta.md) optimizes a Configuration when its depth exceeds 6 operators.
