import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

export interface Autocomplete {
  locations?: LocationsEntity[] | null;
  cuisines?: CuisinesEntity[] | null;
  shops?: ShopsEntity[] | null;
}
export interface LocationsEntity {
  text: string;
  type: string;
  payload: Payload;
}
export interface Payload {
  location_type: string;
  term: string;
  area?: string | null;
  geo: Geo;
}
export interface Geo {
  lat: number;
  lon: number;
}
export interface CuisinesEntity {
  text: string;
  type: string;
  payload: Payload1;
}
export interface Payload1 {
  term: string;
}
export interface ShopsEntity {
  text: string;
  type: string;
  payload: Payload2;
}
export interface Payload2 {
  shop_slug: string;
  location_name?: string | null;
}

export interface AutocompleteError {
  errors?: string[] | null;
}

export function useAutocomplete(searchTerm?: string): {
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
  data?: Autocomplete;
  error: AutocompleteError | null;
} {
  const [, { language }] = useTranslation();
  const { isLoading, isError, isFetching, error, data } = useQuery<
    Autocomplete,
    AutocompleteError
  >(
    ['autocomplete', searchTerm],
    () =>
      fetch(
        `https://staging-snap.tablecheck.com/v2/autocomplete?locale=${language}&shop_universe_id=57e0b91744aea12988000001&text=${searchTerm}`
      ).then((res) => res.json()),
    { enabled: !!searchTerm }
  );

  return { isLoading, isFetching, isError, error, data };
}
