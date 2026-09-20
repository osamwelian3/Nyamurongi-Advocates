# Nyamurongi & Co. Advocates — Website Rebuild

Starter scaffold for Steps 1–2 of the project. Vanilla JavaScript (no TypeScript),
Next.js App Router, Tailwind CSS, GSAP + ScrollTrigger, lucide-react icons.

## Setup on Arch Linux

```bash
# 1. Install nvm (if not already installed)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc

# 2. Install & use latest LTS Node
nvm install --lts
nvm use --lts

# 3. Install dependencies
npm install

# 4. Copy the env template
cp .env.local.example .env.local

# 5. Run the dev server
npm run dev
```

Visit http://localhost:3000

## Project status

- [x] Step 1 — Node/NVM environment
- [x] Step 2 — Next.js app + dependencies scaffolded
- [x] Step 3 — Strapi content-type schemas (`cms/`): Article, Author, Category,
      Comment (nested replies + moderation), Practice Area, Team Member,
      Testimonial (moderation). See `cms/SETUP.md` for install + role config.
      Next.js API client wired at `src/lib/strapi.js` (not yet connected —
      site currently runs on the static data files in `src/lib/data/`).
- [x] Step 4 — GSAP preloader + global ScrollTrigger setup
- [x] Home (`/`)
- [x] Practice Areas (`/practice-areas`, `/practice-areas/[slug]`) — 6 divisions
- [x] Team (`/team`, `/team/[slug]`)
- [x] About (`/about`)
- [ ] Blog (`/blog`, `/blog/[slug]`) — index + nested comment UI wired to Strapi
- [ ] Contact (`/contact`) — form + address/phone/hours block
- [ ] Testimonials (`/testimonials`, submission form) — wired to Strapi
- [ ] Swap static data files for live Strapi fetches once a Strapi instance exists
- [ ] Strapi hosting decision + deployment
- [ ] Polish pass: custom 404, sitemap.xml, robots.txt, Open Graph tags, favicon

## Real content, sourced from the reference codebase (confirmed factual)

- 6 practice divisions: Litigation, Probate & Succession, Conveyancing & Real
  Estate, Commercial & Corporate, Employment & Labour, Land & Environment
- Counsel: H. Nyamurongi (Managing Partner), L. Kebungo (Associate Advocate)
- Contact: +254 711 205 997 · info@nyamurongiadvocates.com · Lengetia Place,
  2nd Floor, Moi Highway, Kisii — all centralized in `src/lib/site-config.js`
- 6 real blog articles, 4 matters on the public record, firm stats and values

## Deploying to GitHub Pages

One-time setup:

```bash
npm install
```

Then, whenever you want to publish the current state of the site:

```bash
npm run deploy
```

This builds a static export (`out/`) with the GitHub Pages subpath baked
in, then pushes it to the `gh-pages` branch via the `gh-pages` package.

**One-time repo setting** (not something a script can do for you): in the
GitHub repo, go to **Settings → Pages**, set **Source** to **"Deploy from
a branch"**, and **Branch** to **gh-pages**. After the first `npm run
deploy`, the site is live at:

`https://osamwelian3.github.io/Nyamurongi-Advocates/`

Note: only one Pages source can be active at a time. If a GitHub Actions
workflow for Pages exists, remove it (or switch the Source setting away
from "GitHub Actions") before using this branch-based approach — the two
will otherwise conflict over which deploy "wins."
