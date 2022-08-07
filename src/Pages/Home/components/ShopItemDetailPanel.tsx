import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { ButtonAppearance } from '@tablecheck/tablekit-button';
import { Icon } from '@tablecheck/tablekit-icon';
import { PanelPosition } from '@tablecheck/tablekit-panel';
import { useTranslation } from 'react-i18next';
import { useMedia } from 'react-use';
import { tciSun } from 'tablecheck-icons/tciSun';
import { tciSunrise } from 'tablecheck-icons/tciSunrise';

import { BREAKPOINTS } from 'Layouts';
import { useSearchAppSelector } from 'app/hooks';

import {
  CloseButton,
  ShopItemDesktopHeadline,
  StyledContentContainer,
  StyledImageContainer,
  StyledLink,
  StyledPanel,
  StyledPriceContainer,
  StyledTag
} from './ShopItemDetailPanel.styles';

export function ShopItemDetailPanel({
  isOpen,
  setIsOpen
}: {
  isOpen: boolean;
  setIsOpen: (arg0: boolean) => void;
}): JSX.Element {
  const [, { language }] = useTranslation();
  const { shop } = useSearchAppSelector();
  const isTableSizeAndAbove = useMedia(`(min-width: ${BREAKPOINTS.tablet})`);

  return (
    <StyledPanel
      isOpen={isOpen}
      width={isTableSizeAndAbove ? '400px' : '100%'}
      position={
        isTableSizeAndAbove ? PanelPosition.Right : PanelPosition.Bottom
      }
      onClickOutside={() => setIsOpen(false)}
    >
      <CloseButton
        onClick={() => setIsOpen(!isOpen)}
        appearance={ButtonAppearance.Subtle}
        iconBefore={<Icon icon={faTimes} />}
      />
      <StyledImageContainer>
        <img src={shop?.search_image ?? ''} alt={shop?.slug} />
      </StyledImageContainer>
      <StyledContentContainer>
        <div>
          <StyledLink
            href={`https://maps.google.com/?q=${shop?.geocode?.lat},${shop?.geocode?.lon}`}
            target="_blank"
            rel="noreferrer"
          >
            <ShopItemDesktopHeadline>
              {shop?.name ?? ''}
            </ShopItemDesktopHeadline>
          </StyledLink>
        </div>
        <div>
          {shop?.content_title_translations?.find((c) => c?.locale === language)
            ?.translation ?? ''}
        </div>
        <div>
          {shop?.cuisines?.map((cuisine) => (
            <StyledTag key={cuisine}>{cuisine}</StyledTag>
          ))}
        </div>
        <div>
          {shop?.tags?.map((tag) => (
            <StyledTag key={tag}>{tag}</StyledTag>
          ))}
        </div>
        <div>
          {shop?.content_body_translations?.find((c) => c?.locale === language)
            ?.translation ?? ''}
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
    </StyledPanel>
  );
}
