# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Project Overview

**Tactech — Propuestas Comerciales** is a full-stack web application for creating, managing, and presenting commercial proposals. Built with Next.js 14, Tailwind CSS, Prisma ORM, SQLite, and NextAuth.js.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS (custom Tactech palette)
- **Database:** SQLite via Prisma ORM + `@prisma/adapter-libsql`
- **Auth:** NextAuth.js with JWT session + bcryptjs
- **Forms:** React Hook Form + Zod

## Development Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Production build
npm run lint     # ESLint check
npx prisma db push    # Sync schema to database
npx prisma studio     # Open Prisma Studio (DB GUI)
```

## Initial Setup

```bash
npm install
npx prisma generate
npx prisma db push
# Create admin user manually (see prisma/seed.ts pattern)
```

Create `.env.local`:
```
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"
```

## Default Admin Credentials

- **Usuario:** `admin`
- **Contraseña:** `tactech2024`

## Key Architecture Notes

### Prisma 7 + SQLite
Uses `@prisma/adapter-libsql` and `PrismaLibSql` as a factory pattern. The `lib/db.ts` singleton constructs the client with an absolute file path.

### JSON Fields
SQLite has no native JSON type. Arrays (confirmationSteps, timeline, price, team) are stored as JSON strings. Always use `serializeProposal()` / `deserializeProposal()` from `lib/proposals.ts` when reading/writing.

### Public vs Admin
- `/propuestas/[id]` — Public proposal viewer. Returns 404 for `draft` proposals.
- `/admin/*` — Protected by NextAuth middleware + server-side session check.

## Color Palette

```
#2D1640  Background dark / hero
#4B2E7B  Primary purple
#6F45B8  Mid purple
#8454DE  Accent purple
#D2C1EE  Light purple / borders
#72E6AD  Mint green (accent / CTA)
#FFFFFF  White
```

## Claude Code Hooks

A `SessionStart` hook at `.claude/hooks/session-start.sh` runs `npm install`, `prisma generate`, and `prisma db push` automatically in remote sessions.
