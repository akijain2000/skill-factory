# Anti-Pattern Example: ui-skills

Source: raw/repos/antigravity-awesome-skills/skills/ui-skills/SKILL.md  
Rating: Bad
Issues:
- Description restates the title in abstract terms ("opinionated, evolving constraints") without a concrete **Use when** trigger (which UI work? which stack?).
- Body is circular: Overview, When to Use, and Instructions all say the same thing in different words.
- No procedures, checklists, tokens, components, or constraints—only a link to an external repo, so the skill adds no portable context at load time.
- Wastes a routing slot: the agent cannot tell from the skill alone what to do differently.

How to fix:
- Put a one-line **Use when** in YAML (e.g. "Use when building React interfaces with the ibelick ui-skills design rules in this repo").
- Inline the actual rules or point to `references/` files shipped with the skill; add 3–5 concrete do/don't bullets.

---

---
name: ui-skills
description: "Opinionated, evolving constraints to guide agents when building interfaces"
risk: safe
source: "https://github.com/ibelick/ui-skills"
date_added: "2026-02-27"
---

# Ui Skills

## Overview

Opinionated, evolving constraints to guide agents when building interfaces

## When to Use This Skill

Use this skill when you need to work with opinionated, evolving constraints to guide agents when building interfaces.

## Instructions

This skill provides guidance and patterns for opinionated, evolving constraints to guide agents when building interfaces.

For more information, see the [source repository](https://github.com/ibelick/ui-skills).
