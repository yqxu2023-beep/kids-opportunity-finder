-- Archive only expired opportunities that are currently published.
-- No records are deleted and no records are published by this script.

begin;

update public.opportunities
set status = 'archived', updated_at = now()
where status = 'published'
  and end_date is not null
  and end_date < current_date;

update public.opportunities
set status = 'archived', updated_at = now()
where status = 'published'
  and end_date is null
  and start_date is not null
  and start_date < current_date
  and lower(coalesce(category, '')) not in ('ongoing', 'drop-in', 'drop in');

commit;
