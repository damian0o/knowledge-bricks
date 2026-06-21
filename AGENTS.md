# AGENTS.md — Working Guide for `knowledge-bricks`

## What this repo is

`knowledge-bricks` is a knowledge base authored as an **OKF v0.1 bundle** (Open Knowledge Format,
Google Cloud spec, Apache-2.0). It encodes the **Epistemic Operator System (EOS)** — the
meta-reasoning layer of the AI Code Assistant (ACA v5) — and the **philosophical foundations** that
ground each EOS operator.

It is not code. It is a directory of markdown files that link to each other to form a graph spanning
*philosophy ↔ EOS ↔ engineering practice*. The bundle is meant to be readable by humans without
tooling, parseable by agents without an SDK, and diffable in version control.

## Repository layout

```
index.md                    bundle root (the ONLY index with frontmatter: okf_version: "0.1")
log.md                      change history (newest-first)
eos/                        the formal system
  index.md
  operators/                O1_FOUNDATION … O5_DE_REFERENTIALIZATION, O_META
  axioms/                   3 foundational axioms
  types/                    Concept, Operator, Configuration
  dynamics.md               open-system / local-stability-global-drift
philosophy/                 the foundation graph (conceptions of reality)
  index.md
  ancient/                  Parmenides → Plotinus, Sextus Empiricus
  medieval-rationalist/     Augustine → Leibniz
  empiricism-kant/          Bacon → Kant
  nineteenth-twentieth/     Hegel → Putnam
  poststructuralist/        Latour, Foucault, Deleuze, Derrida
  physics-of-reality/       Newton → Bell, the Measurement Problem
docs/superpowers/specs/     design spec(s) — process artifacts, not part of the bundle
```

A concept's **ID is its file path minus `.md`** (e.g. `philosophy/empiricism-kant/kant`).

## OKF conformance rules (do not break these)

- Every **concept file** (any `.md` that is not `index.md` or `log.md`) MUST have YAML frontmatter
  with a non-empty **`type`**. This is the one hard requirement.
- Recommended frontmatter, in this order: `title`, `description` (one sentence), `tags` (YAML list),
  `timestamp` (ISO `YYYY-MM-DD`). `resource` is omitted here — these are abstract concepts.
- `index.md` files carry **no frontmatter**, except the bundle-root `index.md`, which may declare
  `okf_version: "0.1"` and nothing else.
- `index.md` and `log.md` are **reserved** — never use them as concept files.
- Consumers must tolerate broken links, but **we do not author broken links** — only link to files
  that exist (see below).

## Concept types in this bundle

| `type`                           | Lives in           |
|----------------------------------|--------------------|
| `EOS Operator`                   | `eos/operators/`   |
| `EOS Axiom`                      | `eos/axioms/`      |
| `EOS Type`                       | `eos/types/`       |
| `EOS Concept`                    | `eos/dynamics.md`  |
| `Philosophical Model of Reality` | `philosophy/**`    |

## Brick body conventions

**Philosophy brick** sections: `## The model of reality`, `## Key concept`, `## Relations`, and —
only for the 7 operator-grounding thinkers — `## Grounds`.

**EOS Operator** sections: `## Transformation`, `## Engineering mapping`,
`## Philosophical grounding`, `## Composition rules`, `## Relations`.

Keep bricks concise and complete. They are reference nodes, not essays.

## Links and the graph

- Links are **plain markdown, bundle-relative, with a leading slash and `.md` suffix**:
  `[reacts against Hume](/philosophy/empiricism-kant/hume.md)`.
- A link asserts an **untyped directed edge**. The **prose around it names the relationship** —
  one of: influenced / reacts-against / refines / opposes / synthesizes / grounds.
- **Only link to concept IDs that exist.** For thinkers not in the bundle (e.g. Zeno of Elea,
  Feuerbach, Frege, de Broglie), mention them in plain prose with no link.

### Grounding edges (the philosophy ↔ EOS spine)

Each operator-grounding thinker links **forward** to its operator; each operator links **back**.
Keep both directions in sync when editing either side.

| Thinker      | Grounds                                              |
|--------------|------------------------------------------------------|
| Kant         | `O1_FOUNDATION`                                      |
| Quine        | `O4_RELATIONALIZATION`                               |
| Latour       | `O4_RELATIONALIZATION`                               |
| Wittgenstein | `O3_LINGUISTIC_SHIFT`                                |
| Deleuze      | `O3_LINGUISTIC_SHIFT` **and** `eos/dynamics.md`      |
| Foucault     | `O5_DE_REFERENTIALIZATION`                           |
| Derrida      | `O5_DE_REFERENTIALIZATION`                           |

`O2_INTERNALIZATION` is grounded in the **user model (ACA §8)**, not a philosopher — by design.

## Adding or editing a brick — checklist

1. Place the file in the right cluster directory; pick a kebab-case filename (the concept ID).
2. Add frontmatter with a non-empty `type` + the recommended fields; `timestamp` = today (ISO).
3. Write the body sections for its type.
4. In `## Relations`, name each relationship in prose and link existing targets only.
5. Add a bullet for it to the cluster's `index.md` (`* [Title](/path.md) - one-line description`).
6. If it is a grounding thinker, keep the forward/back links consistent on both sides.
7. Append a `**Update**`/`**Creation**` entry under today's date in `log.md` (newest-first).
8. Run the verification commands below.

## Verification

```sh
# every concept file has a non-empty `type`
for f in $(find eos philosophy -name '*.md' ! -name 'index.md'); do
  awk 'NR==1&&$0=="---"{f=1;next} f&&/^type:[[:space:]]*[^[:space:]]/{ok=1;exit} f&&$0=="---"{exit} END{exit !ok}' "$f" \
    || echo "MISSING type: $f"
done

# every internal bundle-relative link resolves
grep -rhoE '\]\(/[A-Za-z0-9_./-]+\.md\)' eos philosophy index.md \
  | sed -E 's/^\]\((\/.*)\)$/\1/' | sort -u \
  | while read -r l; do [ -f ".$l" ] || echo "BROKEN -> $l"; done
```

## Git conventions

- **Conventional Commits**: `<type>(<scope>): <imperative summary ≤72 chars>` + a body explaining
  **why** (the diff already shows what). Types: `feat`, `fix`, `refactor`, `docs`, `chore`, `arch`.
- **Never include AI-tool annotations** in commit messages (no `Co-authored-by: Claude/Copilot`,
  no "Generated with AI"). `git blame` must reflect human decision ownership. This follows the
  project's own ACA §4.7.2 rule and applies to all commits here.
- Default branch is `main`. No remote is configured.

## Scope notes / conventions of intent

- The **"next step for philosophy to resolve"** node is deliberately left unwritten — it is the
  empty socket the graph builds toward. Do not fill it without an explicit decision.
- The full **ACA v5 / EOS specification is the source material** this bundle encodes, but it is NOT
  this repo's operating mode. Editing the wiki does not mean adopting ACA's response format or
  reasoning protocols. (To adopt those for an agent, put them in this `AGENTS.md` deliberately.)
- Philosophy content is standard SEP/IEP-level scholarship authored without live web access;
  influence edges may be re-verified against primary sources before being treated as authoritative.
```

