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
      Next.js API client wired at `src/lib/strapi.js`.
- [x] Step 4 — GSAP preloader + global ScrollTrigger setup (`src/lib/gsap.js`,
      `src/components/Preloader.jsx`, `src/components/SiteHeader.jsx`,
      `src/components/SiteFooter.jsx`, wired into `src/app/layout.js`)
- [x] Step 5a — Home page complete (Hero, About/Stats, Services grid,
      CTA banner, Testimonials carousel, Latest Insights) — see
      `src/app/page.js` and `src/components/`
- [ ] Step 5b — Practice Area detail pages
- [ ] Step 5c — Team / About page
- [ ] Step 5d — Contact page + form wiring
- [ ] Step 5e — Blog index + article pages + nested comment UI

## Real content extracted from the live site (via uploaded page exports)

- 7 practice areas with full "what it covers" + "example situations" copy
- Herbert Nyamurongi (Sr. Advocate, CEO), 25+ years experience, 91% case success rate
- Contact: +254 711 205 997 · info@nyamurongiadvocates.local · Lengetia Place, 2nd Floor, Moi Highway, Kisii
- 3 real blog posts, testimonials, and the "Submit a Testimonial" form fields
