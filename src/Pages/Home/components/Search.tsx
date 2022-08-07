import { SearchAutoComplete } from './SearchAutocomplete';
import { SearchListing } from './SearchListing';

export function Search(): JSX.Element {
  return (
    <>
      <SearchAutoComplete />
      <SearchListing />
    </>
  );
}
