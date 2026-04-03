# Building an Agent Is More of an Art Than a Science

**Source**: [@trq212 (Thariq, Anthropic)](https://x.com/trq212/status/2027463795355095314)
**Date**: February 27, 2026
**Type**: Thread (49 tweets)

---

One of the hardest parts of building an agent harness is constructing its action space. Claude acts through Tool Calling, but there are a number of ways tools can be constructed in the Claude API with primitives like bash, skills and code execution.

Given all these options, how do you design the tools of your agent? To put myself in the mind of the model I like to imagine being given a difficult math problem. What tools would you want in order to solve it? It would depend on your own skills!

You want to give it tools that are shaped to its own abilities. But how do you know what those abilities are? You pay attention, read its outputs, experiment. You learn to see like an agent.

## Improving Elicitation: The AskUserQuestion Tool

### Attempt 1 -- Editing the ExitPlanTool

Added a parameter to the ExitPlanTool to have an array of questions alongside the plan. This confused Claude because we were simultaneously asking for a plan and a set of questions about the plan.

### Attempt 2 -- Changing Output Format

Tried modifying Claude's output instructions to serve a slightly modified markdown format. While this was the most general change we could make and Claude even seemed to be okay at outputting this, it was not guaranteed. Claude would append extra sentences, omit options, or use a different format altogether.

### Attempt 3 -- The AskUserQuestion Tool

Finally, we landed on creating a tool that Claude could call at any point, but it was particularly prompted to do so during plan mode. When the tool triggered we would show a modal to display the questions and block the agent's loop until the user answered.

This tool allowed us to prompt Claude for a structured output and it helped us ensure that Claude gave the user multiple options. Most importantly, Claude seemed to like calling this tool and we found its outputs worked well. Even the best designed tool doesn't work if Claude doesn't understand how to call it.

## Updating with Capabilities: Tasks & Todos

When we first launched Claude Code, we realized that the model needed a Todo list to keep it on track. To do this we gave Claude the TodoWrite tool, which would write or update Todos and display them to the user.

But even then we often saw Claude forgetting what it had to do. We inserted system reminders every 5 turns that reminded Claude of its goal.

But as models improved, they not only did not need to be reminded of the Todo List but could find it limiting. Being sent reminders of the todo list made Claude think that it had to stick to the list instead of modifying it. We also saw Opus 4.5 get much better at using subagents, but how could subagents coordinate on a shared Todo List?

We replaced TodoWrite with the Task Tool. Whereas Todos were about keeping the model on track, Tasks were more about helping agents communicate with each other. Tasks could include dependencies, share updates across subagents and the model could alter and delete them.

**Key insight**: As model capabilities increase, the tools that your models once needed might now be constraining them. It's important to constantly revisit previous assumptions on what tools are needed.

## Designing a Search Interface

When Claude Code first came out, we used a RAG vector database to find context for Claude. While RAG was powerful and fast it required indexing and setup and could be fragile. More importantly, Claude was given this context instead of finding the context itself.

But if Claude could search on the web, why not search your codebase? By giving Claude a Grep tool, we could let it search for files and build context itself.

This is a pattern we've seen as Claude gets smarter: it becomes increasingly good at building its context if it's given the right tools.

When we introduced Agent Skills we formalized the idea of progressive disclosure, which allows agents to incrementally discover relevant context through exploration.

Over the course of a year Claude went from not really being able to build its own context, to being able to do nested search across several layers of files to find the exact context it needed.

## Progressive Disclosure: The Claude Code Guide Agent

Claude Code currently has ~20 tools, and we are constantly asking ourselves if we need all of them. The bar to add a new tool is high, because this gives the model one more option to think about.

We noticed that Claude did not know enough about how to use Claude Code. We could have put all of this information in the system prompt, but it would have added context rot.

Instead, we tried progressive disclosure. We gave Claude a link to its docs which it could then load to search. This worked but Claude would load a lot of results into context.

So we built the Claude Code Guide subagent which Claude is prompted to call when you ask about itself. The subagent has extensive instructions on how to search docs well and what to return.

We were able to add things to Claude's action space without adding a tool.

## An Art, not a Science

Designing the tools for your models is as much an art as it is a science. It depends heavily on the model you're using, the goal of the agent and the environment it's operating in.

Experiment often, read your outputs, try new things. See like an agent.
