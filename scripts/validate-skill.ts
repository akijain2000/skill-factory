#!/usr/bin/env bun
/**
 * SKILL.md validator
 * Checks a skill directory against the Skill Factory quality spec.
 * Usage: bun run scripts/validate-skill.ts <path-to-skill-directory>
 */

import { readFileSync, existsSync, statSync } from "fs";
import { basename, join, resolve } from "path";

const BANNED_NAMES = new Set([
  "helper", "utils", "misc", "stuff", "manager", "handler",
  "tool", "tools", "agent", "ai", "assistant", "bot",
  "skill", "skills", "claude", "anthropic", "mcp",
]);

const WEAK_DESCRIPTION_WORDS = [
  "helps with", "a tool for", "handles", "does stuff",
  "assists with", "provides support",
];

const AI_SLOP_WORDS = [
  "delve", "crucial", "robust", "comprehensive", "nuanced",
  "multifaceted", "furthermore", "moreover", "additionally",
  "pivotal", "landscape", "tapestry", "underscore", "foster",
  "showcase", "intricate", "vibrant", "fundamental", "significant",
  "interplay", "facilitate", "leverage",
];

const TRIGGER_PHRASES = [
  "use when", "trigger", "activate when", "use for",
  "applies to", "invoke when", "run when",
];

const ACTION_VERBS = [
  "create", "generate", "build", "convert", "transform",
  "extract", "analyze", "validate", "process", "search",
  "find", "fetch", "review", "test", "deploy", "ship",
  "debug", "investigate", "monitor", "configure", "setup",
  "install", "compile", "lint", "format", "optimize",
  "guide", "navigate", "draft", "improve", "decompose",
  "break", "identify", "suggest", "check", "run",
  "audit", "scan", "inspect", "diagnose",
];

interface Issue {
  severity: "error" | "warning" | "info";
  message: string;
  line?: number;
}

function parseFrontmatter(content: string): { meta: Record<string, string>; body: string; bodyStartLine: number } {
  const lines = content.split("\n");
  if (lines[0]?.trim() !== "---") {
    return { meta: {}, body: content, bodyStartLine: 1 };
  }

  let endIdx = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i]?.trim() === "---") {
      endIdx = i;
      break;
    }
  }

  if (endIdx === -1) {
    return { meta: {}, body: content, bodyStartLine: 1 };
  }

  const meta: Record<string, string> = {};
  for (let i = 1; i < endIdx; i++) {
    const match = lines[i]?.match(/^(\w[\w-]*):\s*(.+)$/);
    if (match) {
      meta[match[1]] = match[2].replace(/^["']|["']$/g, "");
    }
  }

  return {
    meta,
    body: lines.slice(endIdx + 1).join("\n"),
    bodyStartLine: endIdx + 2,
  };
}

function validate(skillDir: string): Issue[] {
  const issues: Issue[] = [];
  const skillMdPath = join(skillDir, "SKILL.md");

  if (!existsSync(skillMdPath)) {
    issues.push({ severity: "error", message: "SKILL.md not found in directory" });
    return issues;
  }

  const content = readFileSync(skillMdPath, "utf-8");
  const { meta, body, bodyStartLine } = parseFrontmatter(content);
  const dirName = basename(resolve(skillDir));

  // --- Frontmatter checks ---
  if (!meta.name) {
    issues.push({ severity: "error", message: "Missing required 'name' field in frontmatter" });
  } else {
    if (meta.name !== meta.name.toLowerCase()) {
      issues.push({ severity: "error", message: `Name '${meta.name}' contains uppercase characters` });
    }
    if (/[^a-z0-9-]/.test(meta.name)) {
      issues.push({ severity: "error", message: `Name '${meta.name}' contains invalid characters (only lowercase, numbers, hyphens)` });
    }
    if (meta.name.startsWith("-") || meta.name.endsWith("-")) {
      issues.push({ severity: "error", message: `Name '${meta.name}' starts or ends with a hyphen` });
    }
    if (meta.name.includes("--")) {
      issues.push({ severity: "error", message: `Name '${meta.name}' contains consecutive hyphens` });
    }
    if (meta.name.length > 64) {
      issues.push({ severity: "error", message: `Name '${meta.name}' exceeds 64 characters (${meta.name.length})` });
    }
    if (meta.name !== dirName) {
      issues.push({ severity: "warning", message: `Name '${meta.name}' does not match directory name '${dirName}'` });
    }
    const nameParts = meta.name.split("-");
    if (nameParts.every((p: string) => BANNED_NAMES.has(p))) {
      issues.push({ severity: "warning", message: `Name '${meta.name}' contains only banned vague words` });
    }
  }

  if (!meta.description) {
    issues.push({ severity: "error", message: "Missing required 'description' field in frontmatter" });
  } else {
    if (meta.description.length > 1024) {
      issues.push({ severity: "error", message: `Description exceeds 1024 characters (${meta.description.length})` });
    }
    const descLower = meta.description.toLowerCase();
    if (WEAK_DESCRIPTION_WORDS.some((w) => descLower.includes(w))) {
      issues.push({ severity: "warning", message: "Description uses vague phrases ('helps with', 'handles', etc.)" });
    }
    if (!TRIGGER_PHRASES.some((t) => descLower.includes(t))) {
      issues.push({ severity: "warning", message: "Description missing a WHEN trigger clause ('Use when...', 'Activate when...', etc.)" });
    }
    if (!ACTION_VERBS.some((v) => descLower.includes(v))) {
      issues.push({ severity: "warning", message: "Description missing an action verb (Create, Generate, Analyze, etc.)" });
    }
    if (/^(I |You |We )/.test(meta.description)) {
      issues.push({ severity: "warning", message: "Description should use third person (not 'I', 'You', 'We')" });
    }
  }

  // --- Body checks ---
  const bodyLines = body.split("\n");
  const bodyLineCount = bodyLines.length;

  if (bodyLineCount > 800) {
    issues.push({ severity: "error", message: `Body is ${bodyLineCount} lines (max 800). Split into reference files.` });
  } else if (bodyLineCount > 500) {
    issues.push({ severity: "warning", message: `Body is ${bodyLineCount} lines (recommended max 500). Consider splitting.` });
  }

  // Windows paths
  for (let i = 0; i < bodyLines.length; i++) {
    if (/\\[a-zA-Z]/.test(bodyLines[i]) && !bodyLines[i].includes("\\n") && !bodyLines[i].includes("\\t")) {
      issues.push({ severity: "warning", message: `Line ${bodyStartLine + i}: Possible Windows-style backslash path`, line: bodyStartLine + i });
      break;
    }
  }

  // Empty sections
  for (let i = 0; i < bodyLines.length - 1; i++) {
    if (/^#{1,6}\s+.+/.test(bodyLines[i]) && /^#{1,6}\s+.+/.test(bodyLines[i + 1])) {
      issues.push({
        severity: "warning",
        message: `Line ${bodyStartLine + i}: Empty section (heading immediately followed by another heading)`,
        line: bodyStartLine + i,
      });
    }
  }

  // AI slop words
  const bodyLower = body.toLowerCase();
  const slopFound = AI_SLOP_WORDS.filter((w) => bodyLower.includes(w));
  if (slopFound.length > 0) {
    issues.push({ severity: "info", message: `Body contains AI slop words: ${slopFound.join(", ")}` });
  }

  // Nested file references (depth > 1)
  const refPattern = /\[.*?\]\(((?:references|scripts|assets)\/.*?)\)/g;
  let refMatch;
  while ((refMatch = refPattern.exec(body)) !== null) {
    const refPath = refMatch[1];
    if (refPath.split("/").length > 2) {
      issues.push({ severity: "warning", message: `Deeply nested file reference: ${refPath} (keep one level deep)` });
    }
  }

  // Test scenarios check (SKILL_SPEC requires >=3 real test scenarios)
  const hasTestSection = /#{1,3}\s*(test|evaluation|scenarios|verify)/i.test(body);
  if (!hasTestSection) {
    issues.push({ severity: "warning", message: "No test/evaluation section found. SKILL_SPEC recommends >=3 test scenarios (activation, workflow, edge case)." });
  }

  return issues;
}

// --- Main ---
const target = process.argv[2];
if (!target) {
  console.error("Usage: bun run scripts/validate-skill.ts <path-to-skill-directory>");
  process.exit(1);
}

const resolved = resolve(target);
if (!existsSync(resolved) || !statSync(resolved).isDirectory()) {
  console.error(`Error: '${target}' is not a directory`);
  process.exit(1);
}

const issues = validate(resolved);

if (issues.length === 0) {
  console.log(`PASS: ${basename(resolved)} - All checks passed`);
  process.exit(0);
}

const errors = issues.filter((i) => i.severity === "error");
const warnings = issues.filter((i) => i.severity === "warning");
const infos = issues.filter((i) => i.severity === "info");

console.log(`\n--- ${basename(resolved)} ---\n`);

for (const issue of errors) {
  console.log(`  ERROR: ${issue.message}`);
}
for (const issue of warnings) {
  console.log(`  WARN:  ${issue.message}`);
}
for (const issue of infos) {
  console.log(`  INFO:  ${issue.message}`);
}

console.log(`\n  ${errors.length} error(s), ${warnings.length} warning(s), ${infos.length} info(s)\n`);

process.exit(errors.length > 0 ? 1 : 0);
