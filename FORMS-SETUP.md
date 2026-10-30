# Contact, Testimonials and Submit-a-testimonial: rebuilt

Built against the archives you uploaded on 20 Oct (not an older copy). The
earlier contact/testimonial files were from before the redesign: old fonts and
colours, a made-up `.local` email, a hard-coded phone, and an API route that
only `console.log`ged, so **contact messages were never saved anywhere**.

## What changed

**Contact** (`/contact`): same look as the finished pages (PageHero, repeating
scroll reveals). Phone, email, address and hours all come from `site-config.js`
(nothing hard-coded). Floating-label form, honest success/failure messages,
"Get directions" link. Messages are saved in Strapi (new **Contact Message**
type) where the chambers can read them and tick **handled**.

**Testimonials** (`/testimonials`): shows only testimonials an admin has
**approved** in Strapi. Stars animate in on every scroll pass. **The three dummy
reviews (John Doe / samuel / Jane Doe) are gone from the public site.** With
none approved, it says so honestly instead of showing placeholders.

**Submit a testimonial** (`/testimonials/submit`): star-rating picker (keyboard
accessible), character counter, privacy note. **Fixed a real bug:** the old page
told the visitor "Testimonial submitted" even when saving failed. It now says so
only when the server confirmed it.

**How submissions are protected:** the browser no longer talks to Strapi for
these forms. It posts to our own `/api/contact` and `/api/testimonials`, which
validate, drop spam (hidden honeypot field), rate-limit (5 contact messages / 3
testimonials per 10 minutes per IP), reject line breaks in single-line fields
(email-header injection), and only then save to Strapi with a restricted
server-side token. New testimonials always arrive as `pending`.

## Setup (in this order)

### 1. CMS
1. Unzip `nyamurongi-forms-cms.zip` into the CMS project root (adds
   `src/api/contact-message/`; nothing existing is overwritten).
2. `npm run build`, then restart Strapi (pm2).

### 2. Create the forms token (Admin -> Settings -> API Tokens -> Create new)
- Name: `Website forms`, Duration: Unlimited, Token type: **Custom**
- Tick only: **Contact-message -> create** and **Testimonial -> create**
- Save, then copy the token (Strapi shows it once).

### 3. Frontend
1. On the VPS, add to `.env.production` (no quotes, no `NEXT_PUBLIC_` prefix):
   `STRAPI_FORMS_TOKEN=<the token>`
2. Apply the code: unzip `nyamurongi-forms-frontend.zip` over the project, or
   `git apply --check forms-pages.patch && git apply forms-pages.patch`
   (`--check` first: it tells you if you've edited any of the 5 changed files
   instead of overwriting them).
3. `npm run build` and restart.

### 4. Close the old back door
Admin -> Settings -> Users & Permissions -> Roles -> **Public**:
- **Testimonial**: untick `create` (and anything else). Otherwise anyone could
  still post straight to Strapi and skip the spam checks.
- **Contact-message**: leave everything unticked.
(Comments are unchanged and still work as they do today.)

### 5. Test it (about 5 minutes)
- Send a message on `/contact` -> it appears in Admin -> Content Manager ->
  Contact Message.
- Submit a testimonial -> appears in Testimonial with `moderationStatus: pending`
  -> set it to `approved` and Save -> refresh `/testimonials`: it shows.
- Negative test: temporarily put a wrong value in `STRAPI_FORMS_TOKEN`, rebuild,
  submit. The visitor must see a plain error (no mention of tokens/Strapi),
  not a success message. Put the right token back.
- Submit 6 contact messages quickly: the 6th should be refused politely.

## Get an email when someone writes (optional, off by default)
Messages otherwise wait unseen in the Admin panel. The CMS zip includes a hook
that emails the chambers per message, but it needs a mail account:
1. In the CMS: `npm i @strapi/provider-email-nodemailer`
2. Add an `email` block next to your existing keys in `config/plugins.js`:

       email: {
         config: {
           provider: 'nodemailer',
           providerOptions: {
             host: env('SMTP_HOST'),
             port: env.int('SMTP_PORT', 587),
             auth: { user: env('SMTP_USERNAME'), pass: env('SMTP_PASSWORD') },
           },
           settings: { defaultFrom: env('SMTP_FROM'), defaultReplyTo: env('SMTP_FROM') },
         },
       },

3. CMS `.env`: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USERNAME`, `SMTP_PASSWORD`,
   `SMTP_FROM`, and `CONTACT_NOTIFY_TO=info@nyamurongiadvocates.com`.
Until `CONTACT_NOTIFY_TO` is set the hook does nothing. If email sending ever
fails it is logged and the message is still saved. I couldn't test real
sending (no mail server here); the hook logic itself is tested.

## Decisions I made, and what's not included
- **No photo upload** on the testimonial form (the original site had one).
  Letting the public upload files into your Media Library needs extra
  moderation and file checks. Testimonials show an initials tile; an admin can
  add a photo in Strapi and it appears. Ask if you want public uploads.
- **Contact message text is optional** (as on the original site). Easy to require.
- The rate limiter is in memory: it resets when the app restarts, and it needs
  your reverse proxy to pass `X-Forwarded-For` to see real visitor IPs. If it
  can't, everyone shares one larger bucket rather than being locked out.
- The contact page links to `/blog/how-to-instruct-these-chambers`. That
  article exists in your Strapi today; if you ever rename/delete it, update the link.
- Unused now, safe to delete: `src/lib/data/testimonials.js` (the dummy
  reviews), `src/components/TestimonialCarousel.jsx`, and `submitTestimonial`
  in `src/lib/strapi.js`.

## Tested / not tested
Tested here: 91 checks on the validation, spam, rate-limit and failure logic
(including hostile input), plus mutation checks (I broke the code on purpose in
5 ways and the tests caught each, including the old "failure shown as success"
bug); the Strapi type (valid, no reserved/problem field names, all fields
private); the email hook (disabled / sends correctly / mail server down);
JSX/JS syntax of all 14 files with tsc; every import resolves; no leftover old
fonts/hex colours/`.local` email; and the patch applies cleanly to your snapshot.
NOT tested: a real Next build, a running Strapi, a browser, or real email. I had
no network or node_modules. The floating-label animation uses Tailwind arbitrary
variants (`peer-[:not(:placeholder-shown)]`); I expect them to work but haven't
seen them render. Please run a build and click through the 5-step test above.

## Still to do (next)
404 page, Privacy Policy and Terms (your footer links to them and they 404
today; I'll make them editable in Strapi rather than hard-coded), then the
CMS-managed images for the remaining pages.
