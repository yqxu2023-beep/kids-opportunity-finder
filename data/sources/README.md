# Source imports

Source records are maintained in `data/sources/sources.json`. The import upserts
records into `public.sources` using `provider_name`, so it is safe to run again.

## Environment variables

The importer loads `.env.local` when that file exists and requires:

```text
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

If `SUPABASE_SERVICE_ROLE_KEY` is not already in `.env.local`, add it locally and
also add it to the project's Vercel Environment Variables. Never commit the key
or `.env.local` to Git, and never expose the service role key in browser code.

## Import

From PowerShell, run:

```powershell
npm run seed:sources
```

The command validates the source records and prints the number loaded and
inserted or updated. It exits with an error when validation or upload fails.
