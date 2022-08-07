import { Icon } from '@tablecheck/tablekit-icon';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { tciSun } from 'tablecheck-icons/tciSun';
import { tciSunrise } from 'tablecheck-icons/tciSunrise';

import { ShopsEntity } from 'api/search';
import { useAppDispatch } from 'app/hooks';
import { setShop } from 'features/home/searchSlice';

import {
  ShopItemDesktopHeadline,
  StyledContainer,
  StyledContentContainer,
  StyledImageContainer,
  StyledPriceContainer,
  StyledTag
} from './ShopItem.styles';
import { ShopItemDetailPanel } from './ShopItemDetailPanel';

export function ShopItem({ shop }: { shop: ShopsEntity }): JSX.Element {
  const [, { language }] = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);
  const dispatch = useAppDispatch();

  return (
    <>
      <StyledContainer
        onClick={() => {
          setIsOpen(true);
          dispatch(setShop(shop));
        }}
      >
        <StyledImageContainer>
          <img src={shop?.search_image ?? ''} alt={shop?.slug} />
        </StyledImageContainer>
        <StyledContentContainer>
          <ShopItemDesktopHeadline>{shop?.name}</ShopItemDesktopHeadline>
          <div>
            {shop?.content_title_translations?.find(
              (c) => c?.locale === language
            )?.translation ?? ''}
          </div>
          <div>
            {shop?.cuisines?.map((cuisine) => (
              <StyledTag key={cuisine}>{cuisine}</StyledTag>
            ))}
          </div>
          <StyledPriceContainer>
            {shop?.budget_lunch_min && shop?.budget_lunch_max && (
              <span>
                <Icon icon={tciSun} />
                {shop?.budget_lunch_min} ~ {shop?.budget_lunch_max}
              </span>
            )}
            {shop?.budget_dinner_min && shop?.budget_dinner_max && (
              <span>
                <Icon icon={tciSunrise} />
                {shop?.budget_dinner_min} ~ {shop?.budget_dinner_max}
              </span>
            )}
          </StyledPriceContainer>
        </StyledContentContainer>
      </StyledContainer>
      <ShopItemDetailPanel isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
