#!/usr/bin/env bun
/**
 * wiki-stats.ts — Knowledge base statistics: article count, word count,
 * link count, orphan detection, category breakdown.
 *
 * Usage: bun scripts/wiki-stats.ts [wiki/]
 */

import { readdir, readFile } from "node:fs/promises";
import { join, relative } from "node:path";

interface Stats {
  totalFiles: number;
  totalWords: number;
  totalLinks: number;
  orphans: string[];
  categories: Record<string, number>;
  topByWords: { file: string; words: number }[];
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

async function computeStats(root: string): Promise<Stats> {
  const files = await collectMarkdown(root);
  const linkPattern = /\[([^\]]*)\]\(([^)]+\.md[^)]*)\)/g;
  const allTargets = new Set<string>();
  const allLinked = new Set<string>();
  const categories: Record<string, number> = {};
  const fileSizes: { file: string; words: number }[] = [];
  let totalWords = 0;
  let totalLinks = 0;

  for (const file of files) {
    const rel = relative(root, file);
    allTargets.add(rel);

    const parts = rel.split("/");
    const cat = parts.length > 1 ? parts[0] : "(root)";
    categories[cat] = (categories[cat] || 0) + 1;

    const content = await readFile(file, "utf-8");
    const words = content.split(/\s+/).filter(Boolean).length;
    totalWords += words;
    fileSizes.push({ file: rel, words });

    let m: RegExpExecArray | null;
    while ((m = linkPattern.exec(content)) !== null) {
      totalLinks++;
      const target = m[2].split("#")[0];
      if (target && !target.startsWith("http")) {
        allLinked.add(join(parts.slice(0, -1).join("/"), target).replace(/^\//, ""));
      }
    }
  }

  const orphans = [...allTargets].filter(
    (f) => f !== "INDEX.md" && f !== "GLOSSARY.md" && !allLinked.has(f),
  );

  fileSizes.sort((a, b) => b.words - a.words);

  return {
    totalFiles: files.length,
    totalWords,
    totalLinks,
    orphans,
    categories,
    topByWords: fileSizes.slice(0, 10),
  };
}

// --- CLI ---
const root = process.argv[2] || "wiki";
const stats = await computeStats(root);

console.log(`\n=== Wiki Statistics: ${root}/ ===\n`);
console.log(`  Total articles:  ${stats.totalFiles}`);
console.log(`  Total words:     ${stats.totalWords.toLocaleString()}`);
console.log(`  Total links:     ${stats.totalLinks}`);
console.log(`  Orphan articles: ${stats.orphans.length}`);

console.log(`\n--- Categories ---`);
for (const [cat, count] of Object.entries(stats.categories).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${cat}: ${count} articles`);
}

console.log(`\n--- Top 10 by word count ---`);
for (const { file, words } of stats.topByWords) {
  console.log(`  ${words.toLocaleString().padStart(7)} words  ${file}`);
}

if (stats.orphans.length > 0) {
  console.log(`\n--- Orphan articles (no inbound links) ---`);
  for (const o of stats.orphans) {
    console.log(`  ${o}`);
  }
}

console.log();
