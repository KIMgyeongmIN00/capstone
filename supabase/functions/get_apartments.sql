create or replace function get_apartments(region_input text, district_input text)
returns table ("Complex Name" text)
language sql
as $$
  select distinct "Complex Name"
  from "서울특별시"
  where "City" = region_input
    and "District" = district_input
    and "Complex Name" <> ''
  order by "Complex Name" asc;
$$; 