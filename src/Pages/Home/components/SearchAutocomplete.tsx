import { ModifierPhases, State } from '@popperjs/core';
import { Appearance, Input } from '@tablecheck/tablekit-input';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import { usePopper } from 'react-popper';
import { useDebounce } from 'react-use';

import { useAutocomplete } from 'api/autocomplete';
import { useAppDispatch, useSearchAppSelector } from 'app/hooks';
import {
  setDropdownOpen,
  setLocations,
  setSearchTerm
} from 'features/home/searchSlice';

import { SearchDropdown } from './SearchDropdown';

export function SearchAutoComplete(): JSX.Element {
  const { searchTerm, isDropdownOpen } = useSearchAppSelector();
  const [value, setValue] = React.useState(searchTerm);
  const dispatch = useAppDispatch();

  const [t] = useTranslation();
  const { isLoading, isFetching, data } = useAutocomplete(searchTerm);

  const [referenceElement, setReferenceElement] =
    React.useState<HTMLInputElement | null>(null);
  const [popperElement, setPopperElement] =
    React.useState<HTMLDivElement | null>(null);

  // @see https://github.com/floating-ui/floating-ui/issues/794#issuecomment-824220211
  const modifiers = React.useMemo(
    () => [
      {
        name: 'sameWidth',
        enabled: true,
        phase: 'beforeWrite' as ModifierPhases,
        requires: ['computeStyles'],
        fn({ state }: { state: State }) {
          state.styles.popper.minWidth = `${state.rects.reference.width}px`;
        }
      }
    ],
    []
  );
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-start',
    modifiers
  });

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const isClickedInPopper = !!(
        popperElement && popperElement?.contains(e.target as Node)
      );
      if (!isClickedInPopper) {
        dispatch(setDropdownOpen(false));
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [popperElement]);

  useDebounce(() => dispatch(setSearchTerm(value)), 500, [value]);

  React.useEffect(() => {
    if (data?.locations?.length) {
      dispatch(setLocations(data?.locations ?? []));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.locations]);

  React.useEffect(() => setValue(searchTerm), [searchTerm]);

  return (
    <>
      <Input
        value={value}
        id="search"
        appearance={
          isLoading && isFetching ? Appearance.Loading : Appearance.Default
        }
        name="name"
        shouldFitContainer
        placeholder={t('keywords.anonymous')}
        ref={setReferenceElement}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      {isDropdownOpen &&
        document.activeElement === referenceElement &&
        ReactDOM.createPortal(
          <div
            ref={setPopperElement}
            style={{ ...styles.popper }}
            {...attributes.popper}
          >
            {data?.locations?.length && <SearchDropdown />}
          </div>,
          document.querySelector('#root') as HTMLElement
        )}
    </>
  );
}
