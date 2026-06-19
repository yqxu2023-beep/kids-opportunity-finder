-- Re-running this seed is safe. It only inserts or updates source metadata.
-- Keep data/sources/sources_upload.csv in sync when adding more providers.

begin;

insert into public.sources (
  id,
  provider_name,
  website_url,
  perfectmind_url,
  source_type,
  notes
)
values
  (
    gen_random_uuid(),
    'City of Yellowknife',
    'https://www.yellowknife.ca/programs-and-registration',
    'https://yellowknife.perfectmind.com/',
    'municipal',
    'City programs, events, and recreation registrations.'
  ),
  (
    gen_random_uuid(),
    'Yellowknife Public Library',
    'https://www.yellowknife.ca/city-facilities/library/',
    null,
    'library',
    'Library programs, events, and family resources.'
  )
on conflict (provider_name) do update set
  website_url = excluded.website_url,
  perfectmind_url = excluded.perfectmind_url,
  source_type = excluded.source_type,
  notes = excluded.notes,
  updated_at = now();

commit;
