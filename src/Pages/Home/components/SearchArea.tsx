import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppDispatch, useSearchAppSelector } from 'app/hooks';
import { setLocation, setSearchTerm } from 'features/home/searchSlice';

import { SearchAutoComplete } from './SearchAutocomplete';
import { SearchListing } from './SearchListing';

export function SearchArea(): JSX.Element {
  const { area } = useParams();
  const dispatch = useAppDispatch();
  const [, { language }] = useTranslation();
  const navigate = useNavigate();
  const { location, locations } = useSearchAppSelector();

  React.useEffect(() => {
    if (area) {
      dispatch(setSearchTerm(area));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [area]);

  React.useEffect(() => {
    if (!location && !!locations && locations.length > 0) {
      const firstLocation = locations[0];
      dispatch(setLocation(firstLocation));
      navigate(`/${language}/${firstLocation?.text}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, locations]);

  return (
    <>
      <SearchAutoComplete />
      <SearchListing />
    </>
  );
}
