# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Project Overview

**claude-code-sandbox** is a sandbox repository for testing and iterating with Claude Code on the web.

## Repository Structure

```
.
├── CLAUDE.md          # This file
├── README.md          # Project readme
└── .claude/
    ├── settings.json  # Claude Code settings (hooks, permissions)
    └── hooks/
        └── session-start.sh  # SessionStart hook for remote sessions
```

## Development Notes

- This is a minimal sandbox environment with no external dependencies.
- Use this repository to experiment with Claude Code features, hooks, and workflows.

## Claude Code Hooks

A `SessionStart` hook is configured at `.claude/hooks/session-start.sh`. It runs automatically at the start of each remote Claude Code session to set up the environment.
