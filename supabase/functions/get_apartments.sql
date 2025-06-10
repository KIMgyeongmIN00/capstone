create or replace function get_apartments(region_input text, district_input text)
returns table ("Complex Name" text)
language sql
as $$
  select distinct "Complex Name"
  from (
    select "Complex Name", "City", "District" from "서울특별시"
    union all
    select "Complex Name", "City", "District" from "광주광역시"
    union all
    select "Complex Name", "City", "District" from "경기도"
  ) as combined_data
  where "City" = region_input
    and "District" = district_input
    and "Complex Name" <> ''
  order by "Complex Name" asc;
$$; 