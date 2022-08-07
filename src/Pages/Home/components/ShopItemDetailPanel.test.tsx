import { render, screen } from '@testing-library/react';
import { Provider as ReduxProvider } from 'react-redux';
import * as reactUse from 'react-use';

import { AppThemeProvider } from 'Common/Theme';
import { ShopsEntity } from 'api/search';
import { resetSearch, setShop } from 'features/home/searchSlice';

import { store } from '../../../app/store';

import { ShopItemDetailPanel } from './ShopItemDetailPanel';

import '@testing-library/jest-dom';

jest.spyOn(reactUse, 'useMedia').mockReturnValue(true);

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate HoC receive the t function as a prop
  /* tslint:disable-next-line:variable-name */
  useTranslation: () => [null, { language: 'en' }]
}));

describe('ShopItem', () => {
  const shop: Partial<ShopsEntity> = {
    _id: '5e9f8f8f8f8f8f8f8f8f8f8',
    search_image: 'https://picsum.photos/200',
    name: ['Shop Name'],
    slug: 'shop-name',
    content_title_translations: [
      {
        locale: 'en',
        translation: 'Shop Name'
      }
    ],
    content_body_translations: [
      {
        locale: 'en',
        translation: 'Shop Body'
      }
    ],
    cuisines: ['Japanese'],
    tags: ['Family'],
    budget_lunch_min: '100',
    budget_lunch_max: '200',
    budget_dinner_min: '300',
    budget_dinner_max: '400'
  };

  beforeAll(() => {
    store.dispatch(setShop(shop as ShopsEntity));
  });

  afterAll(() => {
    store.dispatch(resetSearch());
  });

  test('should render', () => {
    const { container } = render(
      <AppThemeProvider isDarkMode setDarkMode={() => null}>
        <ReduxProvider store={store}>
          <ShopItemDetailPanel isOpen setIsOpen={() => null} />
        </ReduxProvider>
      </AppThemeProvider>
    );
    expect(container).toBeInTheDocument();
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByRole('heading')).toHaveTextContent('Shop Name');
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      'https://picsum.photos/200'
    );
    // Panel close button
    expect(screen.getAllByRole('button')[0]).toBeInTheDocument();
    // Cuisine tags
    expect(screen.getAllByRole('button')[1]).toBeInTheDocument();
    expect(screen.getAllByRole('button')[1]).toHaveTextContent('Japanese');

    // Tags
    expect(screen.getAllByRole('button')[2]).toBeInTheDocument();
    expect(screen.getAllByRole('button')[2]).toHaveTextContent('Family');

    // Budget
    expect(screen.getByText('100 ~ 200')).toBeInTheDocument();
    expect(screen.getByText('300 ~ 400')).toBeInTheDocument();

    // Content body
    expect(screen.getByText('Shop Body')).toBeInTheDocument();
  });
});
