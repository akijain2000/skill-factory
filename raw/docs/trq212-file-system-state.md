# Your Agent Should Use a File System

**Source**: [@trq212 (Thariq, Anthropic)](https://x.com/trq212/status/1970243253061783669)
**Date**: March 21, 2026
**Type**: Thread (6 tweets)

---

This is a hill I will die on. Every agent can use a file system. The file system is an elegant way of representing state that your agent could read into context and allowing it to verify its work.

Claude Code was what proved this to me. Before CC, people thought context windows would get long enough that you could just fit a codebase into context. But that is not how programming works. You don't need to remember everything, you just need to know how to find it.

## Example: Email Agent

Instead of dumping a ton of emails into context, write them to a file and let the agent grep across those files. Fundamentally this works because it lets your agent have multiple passes at a problem and let it fix its work. It can try different address searches, correlate them to exact lines to make sure it doesn't hallucinate, and extract them in a structured way.

## Other Examples

- **Memory**: Your agent can search previous conversation as markdown or JSON files to find context and link to exact architecture.
- **Creating React Artifacts**: Agents make mistakes writing code. To display a react artifact, have your agent write to a file and then run a linting script and fix errors. This iteration is much easier than writing a file from scratch.
- **Deep Research**: Spin off multiple sub agents that write their findings to the file system as markdown files. Have the orchestrator agent read and search across those files to summarize, ground itself in references, etc.
- **Planning & Scratch Pads**: Use the file system to store a plan and notes on solving a problem. Especially for hard problems with multiple subagents, this can be key to make sure you're not redoing work.
- **Dungeons & Dragons**: Instead of having an AI DM that has to remember everything, let it write files that describe locations, characters, monsters, secrets, etc. The AI DM will then read in the context it needs depending on what is happening to the party.

## Key Insight

Agents are trained like humans and so we need to give them the resources and the tools that we use -- like the file system.

File systems are a big responsibility. As agents become more general, the problem shifts to permissions.
