# Homepage images managed in Strapi

Built against the two archives you uploaded (not an older copy).

## How it works
- Strapi has a new **Home Page** single type with one block per homepage section
  (Hero section, Firm strip section). Each image slot is a small reusable
  "Image" component: the picture, its alt text, and a "focus" (which part of
  the photo stays visible when the site crops it).
- The homepage reads that page once per request, in parallel with the
  Insights fetch. Each slot becomes `{ src, alt, focus }` and is drawn by
  `<CmsImage>`, which uses `next/image` (resized + WebP/AVIF, only the width
  the visitor needs).
- **Nothing breaks if a slot is empty**, the entry isn't published yet, or
  Strapi is down: that slot shows the old gradient placeholder, and the
  error is logged on the server.
- Text for each section can be added to these same blocks later, one section
  at a time. Other pages follow the same recipe (bottom of this file).

## 1. CMS (do this first), nyamurongi-cms
1. Unzip `nyamurongi-home-images-cms.zip` into the CMS project root. It adds
   `src/components/{shared,sections}/*.json` and `src/api/home-page/**`
   (nothing existing is overwritten).
2. Production: `npm run build` (rebuilds the admin) then `pm2 restart` Strapi.
   Local: `npm run develop`.
3. Admin -> Settings -> Users & Permissions -> Roles -> **Public** ->
   **Home-page** -> tick **find** -> Save.
4. Admin -> Content Manager -> **Home Page** (under Single types):
   - Hero section -> add the component -> Background image -> choose the
     file. Alt text: leave blank for a purely decorative background.
   - Firm strip section -> same.
   - **Save, then Publish.** Draft & Publish is on; until published, the API
     answers 404 and the site keeps showing placeholders.
5. If the entry is published but the images still don't appear, also tick
   Public -> **Upload** -> **find** (Strapi only populates what the role may read).

## 2. Frontend, Nyamurongi-Advocates
Either unzip `nyamurongi-home-images-frontend.zip` over the project, or from
the project root:

    git apply --check home-images.patch && git apply home-images.patch

(`--check` first: if you've edited strapi.js / Hero.jsx / page.js since the
archive you sent, it tells you instead of overwriting.)
New: `src/lib/cms-image.js`, `src/components/CmsImage.jsx`.
Changed: `src/lib/strapi.js` (+`getHomePage`, `toImage`),
`src/components/Hero.jsx` (takes a `backgroundImage` prop),
`src/app/page.js` (fetches + passes images). Then `npm run build` and restart.

## Image guide for the dummy images
| Slot | Shape | Size | Notes |
|---|---|---|---|
| Hero background | landscape | 2400 x 1350 (min 1920 wide) | covered by a dark overlay |
| Firm strip | portrait/square | 1200 x 1500 (min 1200 wide) | left half on desktop |
Use JPG/PNG/WebP, ideally under ~2 MB each. **SVG uploads are blocked** by
your CMS upload settings (config/plugins.js). Next resizes per visitor, so
the original only needs to be a good size, not tiny.
"Focus" matters when the crop differs from the photo's shape: faces near
the top -> choose `top`.

## Things you will notice / decisions for you
- **The hero overlay is 70% ink**, so photos look subdued behind the
  headline. I left your design as it is. Say if you want it lighter or
  controllable from Strapi.
- Real photos aren't blurred-in while loading; the slot's gradient shows
  until the image arrives.
- The first view of each image size is generated on demand and cached on the
  VPS (`.next/cache/images`), so the very first visitor to a new size waits
  a moment longer.
- If, in `npm run dev` only, images from `localhost:1337` fail with an error
  about a private/local IP, add `dangerouslyAllowLocalIP: true` under
  `images` in next.config.js for development. The VPS (public IP) doesn't
  need it. I couldn't test this here.

## Adding an image slot to another page (the recipe)
1. CMS: create `src/api/<page>/...` single type (copy home-page's four files)
   with a section component that has an `image` -> `shared.image` field.
2. Frontend: `getXPage()` in strapi.js, same shape as `getHomePage`, with
   populate path `"<section>.<field>.file"`.
3. In the page: `toImage(page?.section?.image)`.
4. Render `<CmsImage image=... sizes=... placeholderLabel=... />` inside a
   `relative`/`absolute` container that sets the size.
Other placeholders still on the site: Practice area rows, inner-page heroes
(PageHero `image` flag), About banner, blog/author fallbacks.

## Tested / not tested
Tested here: schema files (valid JSON, component refs resolve, UIDs, no
reserved/problem field names, enum values valid), the image-mapping logic
(16 cases incl. malformed/hostile focus values), JSX/JS syntax of all touched
files with tsc (and that tsc catches a deliberately broken file), and that the
patch applies cleanly to your snapshot and reproduces my files exactly.
NOT tested: a real Next build, a running Strapi, or a browser; I had no
network or node_modules. Your repo's AGENTS.md asks agents to read the docs
bundled in node_modules/next before coding; node_modules wasn't in the
archive, so I kept to long-stable `next/image` props (fill, sizes, priority)
and checked the Strapi populate syntax against Strapi's current docs.
Please run a build and look at the homepage once Home Page is published.

## Housekeeping spotted in your archive (not changed)
- `next.config.mjs` is ignored: `next.config.js` wins. Safe to delete the .mjs
  (and `postcss.config.mjs` if `postcss.config.js` is the one you use).
- `src/{data,hooks,app` is an empty junk folder (a shell typo from early on). Delete it.
- The `cms/` folder inside the frontend repo is a stale copy of the schemas
  (its comment type still uses the old `status` field). The real CMS repo
  supersedes it; consider deleting it so nobody copies from it by mistake.
- `layout.js` has `text-fg` on <body>; that colour token no longer exists
  (harmless, globals.css already sets the text colour).
