import styled from '@emotion/styled';
import { Tag } from '@tablecheck/tablekit-tag';
import { TypographySize } from '@tablecheck/tablekit-typography';

import { BREAKPOINTS } from 'Layouts';

export const ShopItemDesktopHeadline = styled.h4`
  ${TypographySize.Heading4};
`;

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  cursor: pointer;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  @media (min-width: ${BREAKPOINTS.tablet}) {
    flex-direction: row;
  }
`;

export const StyledImageContainer = styled.div`
  flex: 1;

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    object-position: center;
  }
`;

export const StyledContentContainer = styled.div`
  flex: 3;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 200px;

  @media (min-width: ${BREAKPOINTS.tablet}) {
    padding: 1rem;
  }
`;

export const StyledTag = styled(Tag)`
  margin-right: 0.5rem;
`;

export const StyledPriceContainer = styled.div`
  span {
    margin-right: 0.5rem;
  }

  svg {
    margin-right: 0.5rem;
  }
`;
