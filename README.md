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

## Deploying to the VPS

The site runs as a normal Node server (not a static export) on the
InterServer VPS at `74.50.87.101`, alongside a Strapi instance on port
`1338`. Every page that reads from Strapi (`/`, `/blog`, `/blog/[slug]`)
is marked `export const dynamic = "force-dynamic"`, so content updates
show up on a plain refresh — no rebuild required for new articles or
approved comments.

A rebuild + restart is only needed when the code itself changes:

```bash
git pull
npm install   # only if package.json changed
npm run build
# then restart however the process is managed (e.g. pm2 restart <name>)
```

Make sure the VPS's actual runtime environment (not just a local
`.env.local`) has `NEXT_PUBLIC_STRAPI_URL` pointed at the VPS's Strapi —
currently `http://74.50.87.101:1338`.

