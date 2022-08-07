import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

export interface Search {
  shops?: ShopsEntity[] | null;
  meta: Meta;
}
export interface ShopsEntity {
  location_kana_name: string;
  budget_lunch_max?: string | null;
  service_modes?: string[] | null;
  locale: string;
  location_name_translations?:
    | (NameTranslationsEntityOrContentBodyTranslationsEntityOrContentTitleTranslationsEntityOrTaglineTranslationsEntityOrLocationNameTranslationsEntity | null)[]
    | null;
  tags?: (string | null)[] | null;
  kana_name: string;
  cuisines?: string[] | null;
  budget_dinner_min?: string | null;
  booking_page_mode: string;
  is_smartpay: boolean;
  name_translations?:
    | NameTranslationsEntityOrContentBodyTranslationsEntityOrContentTitleTranslationsEntityOrTaglineTranslationsEntityOrLocationNameTranslationsEntity1[]
    | null;
  name?: string[] | null;
  content_body_translations?:
    | (NameTranslationsEntityOrContentBodyTranslationsEntityOrContentTitleTranslationsEntityOrTaglineTranslationsEntityOrLocationNameTranslationsEntity2 | null)[]
    | null;
  geocode: Geocode;
  currency: string;
  tagline_translations?:
    | (NameTranslationsEntityOrContentBodyTranslationsEntityOrContentTitleTranslationsEntityOrTaglineTranslationsEntityOrLocationNameTranslationsEntity3 | null)[]
    | null;
  content_title_translations?:
    | (NameTranslationsEntityOrContentBodyTranslationsEntityOrContentTitleTranslationsEntityOrTaglineTranslationsEntityOrLocationNameTranslationsEntity4 | null)[]
    | null;
  slug: string;
  budget_lunch_min?: string | null;
  budget_dinner_max?: string | null;
  distance: number | string;
  _id: string;
  availability?: null[] | null;
  search_image?: string | null;
}
export interface NameTranslationsEntityOrContentBodyTranslationsEntityOrContentTitleTranslationsEntityOrTaglineTranslationsEntityOrLocationNameTranslationsEntity {
  translation: string;
  locale: string;
}
export interface NameTranslationsEntityOrContentBodyTranslationsEntityOrContentTitleTranslationsEntityOrTaglineTranslationsEntityOrLocationNameTranslationsEntity1 {
  translation: string;
  locale: string;
}
export interface NameTranslationsEntityOrContentBodyTranslationsEntityOrContentTitleTranslationsEntityOrTaglineTranslationsEntityOrLocationNameTranslationsEntity2 {
  translation: string;
  locale: string;
}
export interface Geocode {
  lon: number;
  lat: number;
}
export interface NameTranslationsEntityOrContentBodyTranslationsEntityOrContentTitleTranslationsEntityOrTaglineTranslationsEntityOrLocationNameTranslationsEntity3 {
  translation: string;
  locale: string;
}
export interface NameTranslationsEntityOrContentBodyTranslationsEntityOrContentTitleTranslationsEntityOrTaglineTranslationsEntityOrLocationNameTranslationsEntity4 {
  translation: string;
  locale: string;
}
export interface Meta {
  record_count: number;
}
export interface SearchError {
  errors?: string[] | null;
}

export function useSearch(
  lat?: number,
  lon?: number
): {
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
  data?: Search;
  error: SearchError | null;
} {
  const [, { language }] = useTranslation();
  const { isLoading, isError, isFetching, error, data } = useQuery<
    Search,
    SearchError
  >(
    ['search', lat, lon],
    () =>
      fetch(
        `https://staging-snap.tablecheck.com/v2/shop_search?cuisines[]=kaiseki&geo_latitude=${lat}&geo_longitude=${lon}&shop_universe_id=57e0b91744aea12988000001&locale=${language}&per_page=50`
      ).then((res) => res.json()),
    {
      enabled: !!lat && !!lon
    }
  );

  return { isLoading, isFetching, isError, error, data };
}
