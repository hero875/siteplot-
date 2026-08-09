# SEO Outcome-as-a-Service Platform Monorepo

Welcome to the production-ready monorepo workspace for **SitePilot**, the productized SEO Outcome-as-a-Service Platform.

## Core Pillars
1. **Performance-Based Escrow**: Clients only pay when third-party verified milestones (DataForSEO rank, GA4 traffic, backlinks) are successfully hit.
2. **Pod Delivery Structure**: Projects are auto-assigned to 4-person delivery squads (Strategist, Content, Tech, Link Builder) containing niche capacity.
3. **AI Content Factory**: Sequential outline generation, brand-voice aligned drafting, readability check, factual QA, and automatic indexing.
4. **Algorithmic Volatility Insurance**: Protection against Google Core update volatility with automatic claim filing and recovery pod assignment.

---

## Workspace Directory Structure

```text
seo-outcome-platform/
├── .github/workflows/         # Automation crons & deployment actions
├── apps/
│   └── web/                   # Next.js 14 Client Portal & Marketing App
│       └── prisma/            # Database schema source
├── packages/
│   ├── ui/                    # React Component & Chart Library
│   ├── db/                    # Shared Prisma Client queries & mutations
│   ├── seo-core/              # SEO API wrappers (DataForSEO, GSC, GA4, Indexing)
│   └── ai/                    # AI Content Factory Orchestrator Pipelines
```

---

## Local Development Setup

### 1. Requirements
Ensure you have Node.js (v20+), `pnpm` (v9+), and a running PostgreSQL instance (or Supabase project) ready.

### 2. Install Workspace dependencies
From the workspace root, run:
```bash
pnpm install
```

### 3. Setup credentials
Copy `.env.example` to `.env` in the root:
```bash
cp .env.example .env
```
Fill in the credentials for Clerk, Supabase, DataForSEO, OpenAI, and payments (Stripe/RazorpayX).

### 4. Database Setup & Client Generation
Push the schema to your database and generate client models:
```bash
pnpm run db:push
pnpm run db:generate
```

### 5. Start Development Servers
```bash
pnpm run dev
```
The client portal will be available locally at `http://localhost:3000`.

---

## Commands Reference

- `pnpm run dev`: Run Next.js and Tailwind watcher environments.
- `pnpm run build`: Compile all workspace apps and packages inside turbo pipeline.
- `pnpm run lint`: Run eslint checks across the monorepo.
- `pnpm run clean`: Remove build caches and node modules.
