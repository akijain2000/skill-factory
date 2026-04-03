# Bash Is All You Need

**Source**: [@trq212 (Thariq, Anthropic)](https://x.com/trq212/status/1982869394482139206)
**Date**: 2026
**Type**: Thread (7 tweets)

---

Why even non-coding agents need bash. I've done dozens of calls with companies making general agents over the past few weeks and my advice generally boils down to: "use the bash tool more."

## Example: Email Agent

The user asks: "How much did I spend on ride sharing this week?"

With tool calls, you have to fetch emails and then have the model figure it out from there. You might have fetched ~100 emails and it will be hard for the model to find this data.

With the bash tool, you can save these results to files and then search. This lets the model:
- Ground its results in reproducible code
- Take multiple steps at finding everything
- Double check its work and verify it

## Other Examples

- **Chaining API Calls**: Compose a series of API calls, for example "get all the contacts I've sent emails to this week" which would involve fetching all your emails, deduping contacts and then doing an individual API request per contact.
- **Video & File Editing**: The models are great at using tools like ffmpeg to process videos, searching their captions to find particular time slices.
- **Recurring Tasks**: Within a container for your agent you could use cronjobs or the "at" command to dynamically create recurring jobs as the user requests it.

## Safety

The Bash tool is one of the most powerful general purpose tools you can give an agent, but you also want to add in guardrails to make it safe. With the Claude Agent SDK we built a bash parser and permission system.
