# Source imports

Source records are maintained in `data/sources/sources.json`. The import upserts
records into `public.sources` using `provider_name`, so it is safe to run again.

## Environment variables

The importer loads `.env.local` when that file exists and requires:

```text
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ADMIN_SECRET=choose-a-strong-admin-review-secret
```

If `SUPABASE_SERVICE_ROLE_KEY` is not already in `.env.local`, add it locally and
also add it to the project's Vercel Environment Variables. Never commit the key
or `.env.local` to Git, and never expose the service role key in browser code.

`ADMIN_SECRET` protects the read-only admin review page. After setting it locally
and in Vercel, open `/admin/review?secret=ADMIN_SECRET_VALUE`, replacing
`ADMIN_SECRET_VALUE` with the configured value. Requests with a missing or
incorrect secret are denied.

## Import

From PowerShell, run:

```powershell
npm run seed:sources
```

The command validates the source records and prints the number loaded and
inserted or updated. It exits with an error when validation or upload fails.
