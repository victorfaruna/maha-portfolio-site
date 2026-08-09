# Dashboard Admin — README

This document explains how to set up, log in, and manage content in the admin dashboard.

---

## 1 — Supabase Project Setup

### Step 1: Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and sign in.
2. Click **New Project** → fill in the name, database password, and region → **Create New Project**.
3. Wait for the project to finish provisioning (~1 min).

### Step 2: Run the Schema Migration
1. In your Supabase project, open **SQL Editor** (sidebar → SQL Editor).
2. Click **New Query**.
3. Copy the contents of [`supabase/migrations/001_initial_schema.sql`](./supabase/migrations/001_initial_schema.sql) and paste it into the editor.
4. Click **Run**. This creates the three tables, sets up RLS policies, and seeds all existing content.

### Step 3: Verify Storage Buckets Were Created

The SQL you ran in Step 2 already includes commands to create the two storage buckets
(these are the folders where uploaded book cover images and gallery photos will be saved).

**Check they exist:**
1. In your Supabase project, click **Storage** in the left sidebar.
2. You should see two buckets listed:
   - `book-covers` — stores book cover images
   - `media-gallery` — stores photo gallery images

**If either bucket is missing** (this can happen if your Supabase plan restricts storage SQL):
1. Click **New bucket**.
2. Enter the name exactly as shown (e.g. `book-covers`).
3. Toggle **Public bucket** ON — this is required so the images show on the public website.
4. Click **Save**.
5. Repeat for `media-gallery`.

> ✅ Nothing to copy/paste here — just verify the buckets exist after running the SQL from Step 2.

### Step 4: Create Admin User (Maha's Account)
1. Go to **Authentication → Users → Invite User**.
2. Enter Maha's email address.
3. She'll receive an email to set her password.

Alternatively, via the SQL Editor:
```sql
-- Set email and password for the admin user
SELECT auth.create_user(
  '{"email": "maha@example.com", "password": "SecurePassword123!", "email_confirm": true}'::jsonb
);
```

### Step 5: Configure Environment Variables
1. In your Supabase project: **Settings → API**.
2. Copy the following values:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon / public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY`
3. Create a `.env.local` file in the project root (copy from `.env.local.example`):

```bash
cp .env.local.example .env.local
```

4. Paste the values into `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

> ⚠️ **Never commit `.env.local` to git.** It's already listed in `.gitignore`.

---

## 2 — Logging In

1. Start the dev server: `npm run dev`
2. Visit [http://localhost:3000/dashboard/login](http://localhost:3000/dashboard/login)
3. Enter Maha's email and password.
4. You'll be redirected to the dashboard overview.

To **log out**, click the **Log Out** button at the bottom of the left sidebar.

---

## 3 — Managing Publications

Publications are the research papers, policy briefs, and articles shown on the `/research` page with the category filter tabs.

### Add a New Publication
1. In the dashboard sidebar, click **Publications**.
2. Click **Add New** in the top-right corner.
3. Fill in:
   - **Title** — full publication title
   - **Category** — choose Policy Brief, Academic Paper, or Article
   - **Excerpt** — 2–3 sentence summary shown on the card
   - **Source / Publisher Label** — e.g. "HIKMA AI Policy Group" (optional)
   - **Year** — 4-digit publication year
   - **External Link** — full URL to the publication (optional)
4. Click **Save Publication**.

### Edit a Publication
1. From the dashboard overview (Publications tab), click **Edit** next to any entry.
2. Modify any fields and click **Save Changes**.

### Delete a Publication
1. From the dashboard overview, click **Delete** next to any entry.
2. Confirm the deletion in the browser dialog.

---

## 4 — Managing Books

Books are shown in the "Published Books" section of the `/research` page.

### Add a New Book
1. In the sidebar, click **Books** → **Add New**.
2. Fill in:
   - **Arabic Title** — entered in the RTL input field (renders right-to-left)
   - **English Title** — transliterated/translated title
   - **Published Year** — 4-digit year
   - **Description** — shown below the book cover on the research page
   - **Cover Image** — upload a JPG/PNG/WebP (recommended: 400×560px)
   - **External Link** — URL to purchase or read the book (optional)
3. Click **Save Book**.

### Edit a Book
1. Click **Edit** next to any book in the Books table.
2. To replace the cover image, upload a new file (leave the upload field blank to keep the existing one).
3. Click **Save Changes**.

### Delete a Book
1. Click **Delete** next to any book and confirm.

---

## 5 — Managing Media Gallery

The Media Gallery is the photo carousel at the bottom of the `/research` page.

### Add a Gallery Image
1. In the sidebar, click **Media Gallery** → **Add New**.
2. Fill in:
   - **Image** — upload the photo (JPG/PNG/WebP, 16:10 aspect ratio recommended)
   - **Title** — short title shown in the carousel sidebar
   - **Category Tag** — e.g. "Keynote Address", "Community Workshop" (optional)
   - **Context Note** — the descriptive paragraph shown next to the image
   - **Year** — year of the event/photo (optional)
   - **Sort Order** — integer controlling display order (1 = first, lower = earlier)
3. Click **Save Image**.

### Edit a Gallery Item
1. Click **Edit** next to any item in the Media Gallery table.
2. To replace the image, upload a new file (leave blank to keep the existing one).
3. Click **Save Changes**.

### Delete a Gallery Item
1. Click **Delete** next to any item and confirm.

---

## 6 — Where Settings Live

| Setting | Location |
|---|---|
| Supabase project URL & keys | Supabase Dashboard → Settings → API |
| Admin user password | Supabase Dashboard → Authentication → Users |
| Database tables | Supabase Dashboard → Table Editor |
| Storage buckets | Supabase Dashboard → Storage |
| Environment variables | `.env.local` in the project root |

---

## 7 — Extending the Dashboard

The dashboard is structured to make adding new sections easy. Each section follows the same pattern:

```
src/app/dashboard/<section>/
  new/page.tsx          ← create form
  [id]/edit/
    page.tsx            ← server loader
    Edit<Section>Form.tsx ← client form

src/app/actions/<section>.ts  ← server actions (create/update/delete)
```

To add a new section (e.g. "AI Solutions"):
1. Create the DB table and run a new migration.
2. Add the type to `src/lib/supabase/types.ts`.
3. Create `src/app/actions/ai-solutions.ts` with CRUD actions.
4. Create `src/app/dashboard/ai-solutions/new/page.tsx` and `[id]/edit/` pages.
5. Add a new nav item to `DashboardSidebar.tsx`:
   ```tsx
   { label: 'AI Solutions', href: '/dashboard/ai-solutions', icon: <BrainCircuit /> }
   ```

The sidebar's `navItems` prop makes it easy to add new links without modifying layout logic.
