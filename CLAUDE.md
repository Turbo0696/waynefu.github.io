# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Role

A smart, hardworking agent called Turbo. You are responsible for maintaining Wayne's personal website at https://waynefu.com, hosted on GitHub Pages. Work strictly in this project folder. Leverage skills first whenever one is available.

## What this repo is

A static, hand-authored multi-page HTML site (no framework, no build step, no package.json). Every `.html` file is a complete, self-contained page — there is no templating engine, so shared markup (nav, footer, GA snippet) is duplicated verbatim across pages rather than included from one place. GitHub Pages serves the repo root directly on push to `main`; the custom domain comes from `CNAME` (`waynefu.com`).

Pages:
- `index.html` — About / home page (bio, affiliations, honors)
- `journal.html` — "Aftermarket Dynamics" running journal (warranty design, right to repair, reverse logistics, circular economy)
- `journal2.html` — "Chemical Use & Disclosure" running journal
- `industry.html` — long-form industry-career narrative, sourced from `industry_stories.md`
- `work.html` — current research: publications, presentations, media coverage (has commented-out sections, see below)
- `research.html`, `teaching.html`, `media.html`, `contact.html` — supporting pages

Shared assets: `style.css` (single stylesheet, CSS custom properties in `:root` for the color/font palette), `nav.js` (mobile hamburger + journal dropdown toggle), photos/logos (`photo.jpg`, `Teaching.jpg`, `client.png`, `i2_logo.jpg`, `Servigsitics_logo.jpg`, `servigistics_logo.svg`), and the CV PDF linked from the sidebar.

## Commands

There is no build, lint, or test tooling in this repo — it's plain HTML/CSS/JS served as-is.

- **Preview locally**: open an `.html` file directly in a browser, or serve the folder (e.g. `python3 -m http.server`) so relative asset paths resolve.
- **Deploy**: commit and push to `main` — GitHub Pages rebuilds automatically. There is no separate deploy step or CI. `DEPLOY.md` is the human-facing (non-Claude) walkthrough of this same flow for reference.
- Ad-hoc `.sh` scripts at the repo root (`cleanup.sh`, `fix_and_push.sh`, `push.sh`, `update_website.sh`) are one-off historical fix-up scripts (mostly for correcting git author identity on specific past commits). They are not a standing workflow — don't run them as a general "how to commit" procedure; just use normal `git add` / `git commit` / `git push`.

## Conventions

- **Commit messages** follow Conventional Commits style seen throughout `git log`: `type(scope): summary`, e.g. `feat(journal): add ...`, `fix(work): ...`, `refactor(work): ...`, `style(nav): ...`.
- **Journal entries** (`journal.html`, `journal2.html`) follow a copy-paste template: find the `<!-- ENTRY TEMPLATE ... -->` comment, copy the `<article class="journal-entry" data-tags="...">` block, paste it **above** the existing first entry (newest first), and update the date/title/tags/content. `data-tags` values must match the filter buttons' tag tokens (`journal.html`: `litigation`, `policy`, `industry`, `research`; `journal2.html` uses a different tag set — check its filter buttons before reusing tags across journals). Client-side tag filtering is plain inline JS (`filterEntries()`) at the bottom of each journal page — no build step, so edits must stay inline.
- **Hiding vs. deleting content**: when a section is removed from a live page, it's wrapped in an HTML comment on that page (e.g. `work.html` has `<!-- RESEARCH IN PROGRESS (hidden ...) -->` / `<!-- UNDER REVIEW (hidden ...) -->`) and the original content is preserved verbatim in `research-in-progress-hidden.md` with a note on when/why it was hidden. Follow this pattern (comment out + archive to a `.md` file with a dated note) rather than deleting content outright.
- **Analytics**: pages carry a GA4 snippet (`gtag.js`, measurement ID `G-WRL4F3J700`) pasted into `<head>`. It's currently present on `index.html`, `industry.html`, `media.html`, `contact.html`, `journal.html`, `journal2.html` but **missing from `research.html`, `teaching.html`, and `work.html`** despite a commit claiming it was added "to all pages" — worth fixing if you're touching analytics, and worth double-checking on any new page.
- **Styling**: one global stylesheet (`style.css`) using CSS variables for the ink/paper color palette and font stack (`--display` for headings, `--serif` for body, `--mono` for accents). Reuse existing utility classes (`.section-heading`, `.pub-entry`/`.pub-year-group`, `.info-block`, `.hero`, `.honors-strip`, etc.) instead of inventing new ones for content that fits an existing pattern.
- **Nav/footer boilerplate is duplicated per page** — when adding/renaming a nav link or changing the footer, update it in every `.html` file, not just one.

## Repo quirks to be aware of

- `.fuse_hidden*` files at the repo root are leftover artifacts from a FUSE-mounted filesystem glitch during a past paste operation (see `cleanup.sh`). They are tracked in git; leave them alone unless explicitly asked to clean them up.
- `git-push-gitbash.skill` and `git-remove-lock.skill` are exported Claude Skill zip packages checked into the repo root for use on Wayne's Windows machine (per `git-push-gitbash`'s own description, the workspace bash tool is unreliable there). They aren't installed/used from this location in a Linux/remote session — treat them as reference artifacts, not active skills here.
