import { render, screen } from '@testing-library/react';
import { Provider as ReduxProvider } from 'react-redux';

import { AppThemeProvider } from 'Common/Theme';
import { LocationsEntity } from 'api/autocomplete';
import { resetSearch, setLocations } from 'features/home/searchSlice';

import { store } from '../../../app/store';

import { SearchDropdown } from './SearchDropdown';

import '@testing-library/jest-dom';

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate HoC receive the t function as a prop
  /* tslint:disable-next-line:variable-name */
  useTranslation: () => [null, { language: 'en' }]
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn()
}));

describe('SearchDropdown', () => {
  beforeAll(() => {
    store.dispatch(
      setLocations([
        {
          text: 'London',
          type: 'location'
        },
        {
          text: 'Singapore',
          type: 'location'
        }
      ] as LocationsEntity[])
    );
  });

  afterAll(() => {
    store.dispatch(resetSearch());
  });

  test('should render', () => {
    const { container } = render(
      <AppThemeProvider isDarkMode setDarkMode={() => null}>
        <ReduxProvider store={store}>
          <SearchDropdown />
        </ReduxProvider>
      </AppThemeProvider>
    );
    expect(container).toBeInTheDocument();
    expect(screen.getByText('London')).toBeInTheDocument();
    expect(screen.getByText('Singapore')).toBeInTheDocument();
  });
});
