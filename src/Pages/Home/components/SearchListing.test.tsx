import { render, screen } from '@testing-library/react';
import { Provider as ReduxProvider } from 'react-redux';

import { AppThemeProvider } from 'Common/Theme';
import * as searchApi from 'api/search';

import { store } from '../../../app/store';

import { SearchListing } from './SearchListing';

import '@testing-library/jest-dom';

const mockReturnValue = {
  isError: false,
  isFetching: false,
  isLoading: false,
  error: null,
  data: {
    shops: [
      { _id: '5e9f8f8f8f8f8f8f8f8f8f8' },
      { _id: '5e9f8f8f8f8f8f8f8f8f8f9' }
    ] as searchApi.ShopsEntity[],
    meta: {
      record_count: 0
    }
  }
};

jest.mock('./ShopItem', () => ({
  ShopItem: () => <div>ShopItem</div>
}));

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate HoC receive the t function as a prop
  /* tslint:disable-next-line:variable-name */
  useTranslation: () => [() => 'Error', { language: 'en' }]
}));

describe('ShopListing', () => {
  beforeAll(() => {
    jest.spyOn(searchApi, 'useSearch').mockReturnValue(mockReturnValue);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  test('should render', () => {
    const { container } = render(
      <AppThemeProvider isDarkMode setDarkMode={() => null}>
        <ReduxProvider store={store}>
          <SearchListing />
        </ReduxProvider>
      </AppThemeProvider>
    );
    expect(container).toBeInTheDocument();
    expect(screen.getAllByText('ShopItem')).toHaveLength(2);
  });

  test('should render spinner', () => {
    jest.spyOn(searchApi, 'useSearch').mockReturnValue({
      ...mockReturnValue,
      isLoading: true,
      isFetching: true
    });

    const { container } = render(
      <AppThemeProvider isDarkMode setDarkMode={() => null}>
        <ReduxProvider store={store}>
          <SearchListing />
        </ReduxProvider>
      </AppThemeProvider>
    );
    expect(container).toBeInTheDocument();
    expect(screen.queryByText('ShopItem')).not.toBeInTheDocument();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  test('should render error message', () => {
    jest.spyOn(searchApi, 'useSearch').mockReturnValue({
      ...mockReturnValue,
      isLoading: false,
      isFetching: false,
      isError: true
    });

    const { container } = render(
      <AppThemeProvider isDarkMode setDarkMode={() => null}>
        <ReduxProvider store={store}>
          <SearchListing />
        </ReduxProvider>
      </AppThemeProvider>
    );
    expect(container).toBeInTheDocument();
    expect(screen.queryByText('Error')).toBeInTheDocument();
    expect(screen.queryByText('ShopItem')).not.toBeInTheDocument();
  });
});
