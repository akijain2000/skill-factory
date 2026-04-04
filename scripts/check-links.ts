#!/usr/bin/env bun
/**
 * check-links.ts — Validate internal markdown links across wiki/ and course/.
 *
 * Usage: bun scripts/check-links.ts [dir1] [dir2] ...
 *        bun scripts/check-links.ts wiki/ course/
 *
 * Reports broken links (target file does not exist) and suggests fixes.
 */

import { readdir, readFile, access } from "node:fs/promises";
import { join, dirname, relative, resolve } from "node:path";

interface BrokenLink {
  source: string;
  line: number;
  linkText: string;
  target: string;
  resolvedPath: string;
}

async function collectMarkdown(dir: string): Promise<string[]> {
  const files: string[] = [];
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const e of entries) {
      const full = join(dir, e.name);
      if (e.isDirectory() && !e.name.startsWith(".")) {
        files.push(...(await collectMarkdown(full)));
      } else if (e.name.endsWith(".md")) {
        files.push(full);
      }
    }
  } catch {
    // directory doesn't exist
  }
  return files;
}

async function fileExists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function checkLinks(dirs: string[]): Promise<BrokenLink[]> {
  const broken: BrokenLink[] = [];
  const linkPattern = /\[([^\]]*)\]\(([^)]+)\)/g;

  for (const dir of dirs) {
    const files = await collectMarkdown(dir);

    for (const file of files) {
      const content = await readFile(file, "utf-8");
      const lines = content.split("\n");
      const fileDir = dirname(file);

      for (let i = 0; i < lines.length; i++) {
        let m: RegExpExecArray | null;
        linkPattern.lastIndex = 0;
        while ((m = linkPattern.exec(lines[i])) !== null) {
          const target = m[2].split("#")[0].split("?")[0];

          if (
            !target ||
            target.startsWith("http") ||
            target.startsWith("mailto:") ||
            target.startsWith("#")
          ) {
            continue;
          }

          const resolvedPath = resolve(fileDir, target);
          const exists = await fileExists(resolvedPath);

          if (!exists) {
            broken.push({
              source: relative(process.cwd(), file),
              line: i + 1,
              linkText: m[1],
              target: m[2],
              resolvedPath: relative(process.cwd(), resolvedPath),
            });
          }
        }
      }
    }
  }

  return broken;
}

// --- CLI ---
const dirs = process.argv.slice(2);
if (dirs.length === 0) {
  dirs.push("wiki", "course");
}

console.log(`\nChecking links in: ${dirs.join(", ")}\n`);

const broken = await checkLinks(dirs);

if (broken.length === 0) {
  console.log("All internal links are valid.\n");
  process.exit(0);
}

console.log(`Found ${broken.length} broken link(s):\n`);
for (const b of broken) {
  console.log(`  ${b.source}:${b.line}`);
  console.log(`    [${b.linkText}](${b.target})`);
  console.log(`    -> resolved: ${b.resolvedPath} (NOT FOUND)`);
  console.log();
}

process.exit(1);
