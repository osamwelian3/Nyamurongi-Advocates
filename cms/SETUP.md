# Strapi CMS Setup — Nyamurongi Advocates Blog

## 1. Install Strapi (Community Edition, JavaScript — no TypeScript)

Run this in a **separate** folder, sibling to your Next.js app (not inside it):

```bash
npx create-strapi-app@latest nyamurongi-cms --js --no-example

cd nyamurongi-cms
```

When prompted, choose **SQLite** for local dev (fastest to get running; swap to
Postgres later for production — Strapi's DB config supports this via
`config/database.js` without touching your schemas).

## 2. Drop in the content-type schemas

Copy the folders from this repo's `cms/src/api/` directory into your Strapi
project's `src/api/` directory, overwriting nothing that doesn't already exist:

```bash
cp -r /path/to/nyamurongi-advocates/cms/src/api/* nyamurongi-cms/src/api/
```

Each content type's folder contains four things:
- `content-types/<name>/schema.json` — the data model
- `routes/<name>.js`, `controllers/<name>.js`, `services/<name>.js` — the
  standard core CRUD boilerplate that actually exposes it as a REST API

All four are required. The Content-Type Builder UI in the Strapi Admin
writes all four automatically when you create a type by hand there — but
since these were authored directly as files, all four had to be written
out explicitly. If a content type doesn't show up in **Settings → Users &
Permissions Plugin → Roles** with any actions to toggle, that's the
symptom of the routes/controllers/services trio being missing for it.

This gives you 7 content types:

| Content type      | Purpose                                                          |
|--------------------|-------------------------------------------------------------------|
| `article`          | Blog posts                                                        |
| `author`           | Blog post writers (e.g. Samuel Ian)                                |
| `category`         | Blog categories                                                   |
| `comment`          | Nested visitor comments — **moderated, defaults to `pending`**    |
| `practice-area`    | The firm's 7 legal service areas                                  |
| `team-member`      | Advocate/staff profiles (e.g. Herbert Nyamurongi)                  |
| `testimonial`      | Client testimonials — **moderated, defaults to `pending`**        |

Restart Strapi (`npm run develop`) — it will detect the new schemas, migrate
the local SQLite DB, and the content types will appear in the Admin sidebar.

## 3. Create your first Admin user

On first run, Strapi prompts you to create an Admin account at
`http://localhost:1337/admin`. This account is a **Super Admin** by default.

## 4. Configure the three role tiers

Go to **Settings → Administration Panel → Roles** (this is for people who log
into the Strapi Admin — separate from the public API roles in step 5).

- **Super Admin** — you, already created. Full access, manages other admin users.
- **Editor** — create this role for content creators/editors:
  - Go to **Settings → Administration Panel → Roles → Create new role**
  - Name: `Editor`
  - Permissions: check **Create / Read / Update / Delete** for `Article`,
    `Author`, `Category`, `Practice Area`, `Team Member`. Leave `Comment` and
    `Testimonial` at **Read + Update** only (so they can moderate, but the
    `status` field logic still runs through the lifecycle hooks either way).
  - Do **not** grant access to Settings, Users, or Roles — keeps editors out
    of admin-user management.
- Invite editors via **Settings → Administration Panel → Users → Invite user**,
  assign them the `Editor` role.

## 5. Configure the public API role (the actual website visitors)

Go to **Settings → Users & Permissions Plugin → Roles → Public**.

Enable **only**:
- `Article`: `find`, `findOne`
- `Author`: `find`, `findOne`
- `Category`: `find`, `findOne`
- `Practice-area`: `find`, `findOne`
- `Team-member`: `find`, `findOne`
- `Comment`: `find`, `findOne`, **`create`** (visitors can submit — never grant `update` or `delete` to Public)
- `Testimonial`: **`create`** only (do NOT grant `find`/`findOne` to Public — testimonials should only be readable once approved, which your Next.js app fetches through a scoped API token instead, see step 6)

Leave everything else unchecked. This is the single most important step for
security — an over-permissioned Public role is the most common Strapi
misconfiguration.

## 6. Generate an API token for the Next.js app

Go to **Settings → API Tokens → Create new API Token**.
- Name: `nextjs-frontend`
- Token type: **Read-only** (sufficient — public comment/testimonial
  *submission* uses the Public role's `create` permission over the standard
  REST API, not this token; this token is only for server-side reads,
  including reading testimonials with `status=approved` which the Public
  role can't do directly)
- Copy the generated token into your Next.js `.env.local` as `STRAPI_API_TOKEN`

## 7. Moderation workflow (comments & testimonials)

Both `comment` and `testimonial` content types:
- Default every new entry's `status` to `pending` via a `lifecycles.js`
  hook — this can't be bypassed by a crafted public API request, since it's
  enforced at the model layer, not the controller.
- The Next.js frontend only ever queries `filters[status][$eq]=approved`
  when displaying comments/testimonials publicly (see `lib/strapi.js` — Step
  5 of the main build).
- Editors/Admins approve or reject from **Content Manager → Comment /
  Testimonial**, filtering the list view by `status = pending`.

## 8. Nested replies

A comment reply is just a normal `comment` entry with its `parent` relation
set to the comment it's replying to. The Next.js blog page fetches all
`approved` comments for an article (populated with `parent`), then builds
the nested tree client-side (grouping by `parent.id`, one level of nesting —
matches the live site's existing "Reply" UI).
