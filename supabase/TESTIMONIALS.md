# Testimonials setup

The dashboard section is at `/dashboard/speaking/testimonials` under Speaking & Media.

1. Open the SQL Editor for the same Supabase project used by this site.
2. Run all of `migrations/003_testimonials.sql`. This creates a dedicated table and the `testimonial-photos` bucket; it does not change existing content.
3. Refresh the local dashboard and choose **Add testimonial**.
4. Enter an approved quote and name, optionally add a role, organisation/event and portrait, and set the display order.
5. Leave **Publish on the website** unchecked to save a draft. Check it and save when ready to show the entry on `/speaking#testimonials`.

Published entries replace the three clearly labelled temporary samples automatically. If all entries are drafts or deleted, the samples return. Draft rows cannot be read with the public Supabase key. Photos are public and must be JPG, PNG or WebP, at most 2 MB.

The migration is provided for manual execution; it has not been applied to the shared database by this local code change. No deployment or push is required to test once the database is set up. The existing live code does not consume this new table until separately deployed.
