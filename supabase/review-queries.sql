-- 1. Draft opportunities
select * from public.opportunities
where status = 'draft'
order by updated_at desc;

-- 2. Opportunities awaiting review
select * from public.opportunities
where status = 'needs_review'
order by updated_at desc;

-- 3. Published opportunities expiring in the next seven days
select * from public.opportunities
where status = 'published'
  and end_date between current_date and current_date + 7
order by end_date;

-- 4. Opportunities missing important information
select * from public.opportunities
where status in ('draft', 'needs_review', 'published')
  and (
    age_min is null or age_max is null or start_date is null
    or nullif(trim(registration_url), '') is null
    or nullif(trim(source_url), '') is null
  )
order by updated_at desc;

-- 5. Published opportunities whose verification is missing or stale
select * from public.opportunities
where status = 'published'
  and (last_verified_at is null or last_verified_at < now() - interval '30 days')
order by last_verified_at asc nulls first;
