// prepare.mjs — OKF bundle reader / generator.
// Reads an OKF v0.1 knowledge bundle, copies concept + index/log markdown into
// the Astro content collection, and builds a typed knowledge graph (graph.json).
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Args: optional bundle path; default = repo root (two levels up from tool dir).
const bundleArg = process.argv[2];
const BUNDLE = bundleArg
  ? path.resolve(process.cwd(), bundleArg)
  : path.resolve(__dirname, "../../");

const CONTENT_DIR = path.join(__dirname, "src/content/bricks");
const DATA_DIR = path.join(__dirname, "src/data");
const PUBLIC_DIR = path.join(__dirname, "public");

const RESERVED = new Set(["index.md", "log.md"]); // never concepts (basename check too)

// Recursively collect *.md files under a directory.
async function walk(dir) {
  let out = [];
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      out = out.concat(await walk(full));
    } else if (e.isFile() && e.name.endsWith(".md")) {
      out.push(full);
    }
  }
  return out;
}

// A file is a concept unless its basename is index.md or log.md.
function isConcept(relId) {
  return !RESERVED.has(path.basename(relId));
}

// cluster for a concept id.
function clusterFor(relId) {
  if (relId.startsWith("eos/")) return "eos";
  if (relId.startsWith("philosophy/")) {
    const seg = relId.split("/")[1];
    return seg || "philosophy";
  }
  return "root";
}

function isEos(id) {
  return id.startsWith("eos/");
}
function isPhilosophy(id) {
  return id.startsWith("philosophy/");
}

async function main() {
  // 1. Collect files: eos/**, philosophy/**, root index.md, root log.md.
  const eosFiles = await walk(path.join(BUNDLE, "eos"));
  const philFiles = await walk(path.join(BUNDLE, "philosophy"));
  const rootFiles = [];
  for (const name of ["index.md", "log.md"]) {
    const p = path.join(BUNDLE, name);
    try {
      await fs.access(p);
      rootFiles.push(p);
    } catch {
      /* optional */
    }
  }
  const allFiles = [...eosFiles, ...philFiles, ...rootFiles];

  // 2. Copy into content collection preserving relative paths.
  await fs.rm(CONTENT_DIR, { recursive: true, force: true });
  await fs.mkdir(CONTENT_DIR, { recursive: true });

  const concepts = new Map(); // id -> { id, relId, title, type, body }
  for (const abs of allFiles) {
    const relId = path.relative(BUNDLE, abs).split(path.sep).join("/");
    const dest = path.join(CONTENT_DIR, relId);
    await fs.mkdir(path.dirname(dest), { recursive: true });
    const raw = await fs.readFile(abs, "utf8");
    await fs.copyFile(abs, dest);

    if (isConcept(relId)) {
      const parsed = matter(raw);
      const id = relId.replace(/\.md$/, "");
      const fm = parsed.data || {};
      concepts.set(id, {
        id,
        relId,
        title: fm.title || path.basename(id),
        type: fm.type || "Concept",
        body: parsed.content || "",
      });
    }
  }

  // 3. Build graph.
  const nodes = [];
  for (const c of concepts.values()) {
    nodes.push({
      id: c.id,
      label: c.title,
      type: c.type,
      cluster: clusterFor(c.id),
      url: `/${c.id}/`,
    });
  }

  const conceptIds = new Set(concepts.keys());
  const linkRe = /\]\((\/[^)]+\.md)\)/g;
  const edges = [];
  const seenEdge = new Set();

  for (const c of concepts.values()) {
    let m;
    linkRe.lastIndex = 0;
    while ((m = linkRe.exec(c.body)) !== null) {
      const targetId = m[1].replace(/^\//, "").replace(/\.md$/, "");
      const source = c.id;
      const target = targetId;
      if (source === target) continue;
      if (!conceptIds.has(target)) continue; // skip index/log/missing

      let kind;
      if (
        (isEos(source) && isPhilosophy(target)) ||
        (isPhilosophy(source) && isEos(target))
      ) {
        kind = "grounding";
      } else if (isEos(source) && isEos(target)) {
        kind = "structural";
      } else {
        kind = "influence";
      }

      const key = `${source}|${target}|${kind}`;
      if (seenEdge.has(key)) continue;
      seenEdge.add(key);
      edges.push({ source, target, kind });
    }
  }

  const graph = { nodes, edges };

  // Write to both data/ and public/.
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.mkdir(PUBLIC_DIR, { recursive: true });
  const json = JSON.stringify(graph, null, 2);
  await fs.writeFile(path.join(DATA_DIR, "graph.json"), json);
  await fs.writeFile(path.join(PUBLIC_DIR, "graph.json"), json);

  // 4. Log counts.
  const byKind = edges.reduce((acc, e) => {
    acc[e.kind] = (acc[e.kind] || 0) + 1;
    return acc;
  }, {});
  console.log(`[okf-to-astro] bundle: ${BUNDLE}`);
  console.log(`[okf-to-astro] copied ${allFiles.length} markdown files`);
  console.log(`[okf-to-astro] nodes: ${nodes.length}`);
  console.log(`[okf-to-astro] edges: ${edges.length}`);
  for (const k of ["grounding", "structural", "influence"]) {
    console.log(`[okf-to-astro]   ${k}: ${byKind[k] || 0}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
