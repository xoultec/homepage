# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

XoulTec corporate website — bilingual (ES/EN), built with Next.js, React 19, Tailwind CSS v4.

## Project Structure

- `app/` — Next.js App Router pages and API routes
  - `app/layout.tsx` — Root layout (Navbar, Footer, ChatWidget, Providers)
  - `app/page.tsx` — Homepage
  - `app/productos/[slug]/page.tsx` — Dynamic product pages (9 products)
  - `app/api/chat/route.ts` — AI chat API (Groq)
- `src/components/` — React components (Navbar, Footer, ProductHero, FeatureCard, ContactForm, ChatWidget, etc.)
- `src/lib/` — Utilities and data
  - `products.ts` — Centralized product data (add new products here)
  - `i18n.tsx` — Language context and `useLanguage()` hook
  - `chat-prompt.ts` — System prompt builder for AI chat
- `src/styles.css` — Global styles + Tailwind CSS
- `public/` — Static assets (images)

### GitHub Access

Claude Code has the GitHub MCP server configured and `gh` CLI available. Use these to read GitHub Actions results, manage secrets, PRs, issues, etc. Prefer `gh` CLI for concise output (e.g., `gh run list`, `gh run view --log-failed`).

## i18n Pattern

```tsx
const { t } = useLanguage()
t('Texto en español', 'English text')
```

All user-facing text uses the `t()` helper. Default language is Spanish. Toggle stored in localStorage.

## Dev Commands

- `npm run dev` — Dev server (port 3000)
- `npm run build` — Production build
- `npm start` — Run production server

## Commits & Versioning (MUST FOLLOW)

### Conventional Commits

All commit messages **must** use [Conventional Commits](https://www.conventionalcommits.org/) format. **Do not** add `Co-Authored-By` trailers.

```
type(scope): description
```

| Type | When to Use |
|------|-------------|
| `feat` | New feature or functionality |
| `fix` | Bug fix |
| `chore` | Maintenance, dependencies, config |
| `ci` | CI/CD changes |
| `docs` | Documentation only |
| `refactor` | Code restructuring (no behavior change) |
| `perf` | Performance improvement |
| `test` | Adding or updating tests |

Scope is optional but encouraged (e.g., `feat(products): add dental product page`).

### Semver Version Bumping

The project version lives in `package.json` (`"version"`) and follows [Semantic Versioning](https://semver.org/):

| Commit Type | Version Bump |
|-------------|-------------|
| `feat` | **Minor** (1.0.0 → 1.1.0) |
| `fix`, `perf` | **Patch** (1.0.0 → 1.0.1) |
| `BREAKING CHANGE` in body/footer | **Major** (1.0.0 → 2.0.0) |
| `chore`, `ci`, `docs`, `refactor`, `test` | **Patch** (1.0.0 → 1.0.1) |

### Pre-Push Workflow (MUST FOLLOW)

**Never propose pushing** — the user decides when to push. When the user asks to push (or says **"deploy"**):

1. `git log origin/main..HEAD --oneline` — read all unpushed commits
2. Determine the **single highest** version bump needed across all commits
3. Update `"version"` in `package.json`
4. Prepend new entries to `CHANGELOG.md` under a new `## [x.y.z] - YYYY-MM-DD` heading (newest first)
5. Commit: `chore: bump version to x.y.z`
6. Push

**"Deploy" = commit all changes, update changelog, bump version, commit, push.** Every push to `main` is a production deploy.

### Changelog Format

Single `CHANGELOG.md` at repo root. Newest version first. **Do not** include CLAUDE.md changes in the changelog.

```markdown
## [1.1.0] - 2026-03-01
- feat(products): add dental product page
- fix(chat): handle API timeout

## [1.0.0] - 2026-02-28
- Initial release
```

## Deployment (Vercel)

Pushing to `main` auto-deploys to Vercel. **NEVER deploy manually.** Follow the [Pre-Push Workflow](#pre-push-workflow-must-follow) before pushing.

Environment variables (secrets) are managed in the Vercel dashboard. Never commit `.env` files.

## Key Info

- **Contact**: sales@xoultec.com, +1(816)919-3349 (USA), +1(809)252-4007 (RD)
- **Stripe Portal**: https://pay.xoultec.com/p/login/6oE8xf7s9bKQ1xKaEE
- **Tailwind colors**: primary=#1e3a5f, secondary=#f59e0b, accent=#10b981, dark=#0f172a
- **Country flags**: Use flagcdn.com URLs (emoji flags don't render consistently)
