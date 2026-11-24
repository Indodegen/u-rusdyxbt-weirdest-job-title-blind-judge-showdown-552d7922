import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// Resolve entry.txt next to this file: the grader runs from another cwd,
// so a relative path would break. No stdout output at all.
const dir = dirname(fileURLToPath(import.meta.url));
const entry = readFileSync(join(dir, "entry.txt"), "utf8");

// Gate: bounty rule is one title, 60 characters at most, a single line.
// Length is counted in UTF-16 code units; the entry is 50 characters.
if (entry.length < 1 || entry.length > 60) process.exit(1);
if (!entry.trim()) process.exit(1);
if (entry.includes("\n") || entry.includes("\r")) process.exit(1);
// No leading or trailing space: it would waste characters and read oddly.
if (entry !== entry.trim()) process.exit(1);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry, "utf8");
