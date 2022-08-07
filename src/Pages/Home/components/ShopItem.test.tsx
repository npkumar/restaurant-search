import { render, screen } from '@testing-library/react';
import { Provider as ReduxProvider } from 'react-redux';

import { AppThemeProvider } from 'Common/Theme';
import { ShopsEntity } from 'api/search';
import '@testing-library/jest-dom';

import { store } from '../../../app/store';

import { ShopItem } from './ShopItem';

jest.mock('./ShopItemDetailPanel', () => ({
  ShopItemDetailPanel: () => 'ShopItemDetailPanel'
}));

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
    budget_lunch_min: '100',
    budget_lunch_max: '200',
    budget_dinner_min: '300',
    budget_dinner_max: '400'
  };

  test('should render', () => {
    const { container } = render(
      <AppThemeProvider isDarkMode setDarkMode={() => null}>
        <ReduxProvider store={store}>
          <ShopItem shop={shop as ShopsEntity} />
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

    // Cusine tags
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Japanese');

    // Budget
    expect(screen.getByText('100 ~ 200')).toBeInTheDocument();
    expect(screen.getByText('300 ~ 400')).toBeInTheDocument();
  });
});
