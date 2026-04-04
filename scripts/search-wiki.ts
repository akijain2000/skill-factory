#!/usr/bin/env bun
/**
 * search-wiki.ts — Full-text search across wiki/ articles.
 *
 * Usage: bun scripts/search-wiki.ts <query> [--limit N] [--path wiki/]
 *
 * Returns ranked results: file path, line number, matching line with
 * context. Case-insensitive by default.
 */

import { readdir, readFile } from "node:fs/promises";
import { join, relative } from "node:path";

interface SearchHit {
  file: string;
  line: number;
  text: string;
  score: number;
}

async function collectMarkdown(dir: string): Promise<string[]> {
  const files: string[] = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      files.push(...(await collectMarkdown(full)));
    } else if (e.name.endsWith(".md")) {
      files.push(full);
    }
  }
  return files;
}

async function search(
  root: string,
  query: string,
  limit: number,
): Promise<SearchHit[]> {
  const files = await collectMarkdown(root);
  const pattern = new RegExp(query, "gi");
  const hits: SearchHit[] = [];

  for (const file of files) {
    const content = await readFile(file, "utf-8");
    const lines = content.split("\n");
    for (let i = 0; i < lines.length; i++) {
      const matches = lines[i].match(pattern);
      if (matches) {
        hits.push({
          file: relative(process.cwd(), file),
          line: i + 1,
          text: lines[i].trim(),
          score: matches.length,
        });
      }
    }
  }

  hits.sort((a, b) => b.score - a.score);
  return hits.slice(0, limit);
}

// --- CLI ---
const args = process.argv.slice(2);
if (args.length === 0 || args.includes("--help")) {
  console.log("Usage: bun scripts/search-wiki.ts <query> [--limit N] [--path wiki/]");
  process.exit(0);
}

const query = args[0];
let limit = 20;
let searchPath = "wiki";

for (let i = 1; i < args.length; i++) {
  if (args[i] === "--limit" && args[i + 1]) limit = parseInt(args[i + 1], 10);
  if (args[i] === "--path" && args[i + 1]) searchPath = args[i + 1];
}

const hits = await search(searchPath, query, limit);

if (hits.length === 0) {
  console.log(`No results for "${query}" in ${searchPath}/`);
  process.exit(0);
}

console.log(`\n${hits.length} results for "${query}":\n`);
for (const h of hits) {
  console.log(`  ${h.file}:${h.line}  (${h.score} match${h.score > 1 ? "es" : ""})`);
  console.log(`    ${h.text.substring(0, 120)}`);
  console.log();
}
