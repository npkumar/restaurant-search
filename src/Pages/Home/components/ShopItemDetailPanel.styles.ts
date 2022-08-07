import styled from '@emotion/styled';
import { Button } from '@tablecheck/tablekit-button';
import { Panel } from '@tablecheck/tablekit-panel';
import { Tag } from '@tablecheck/tablekit-tag';
import { TypographySize } from '@tablecheck/tablekit-typography';

import { GRID_MARGIN } from 'Layouts';

export const CloseButton = styled(Button)`
  position: absolute;
  right: ${GRID_MARGIN};
`;

export const StyledPanel = styled(Panel)`
  padding: ${GRID_MARGIN};
`;

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledImageContainer = styled.div`
  flex: 1;
  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    object-position: center;
  }
`;

export const StyledContentContainer = styled.div`
  flex: 2;
  overflow: scroll;

  > div {
    margin: 1rem 0;
  }
`;

export const StyledLink = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.primary};
`;

export const ShopItemDesktopHeadline = styled.h4`
  ${TypographySize.Heading4};
`;

export const StyledTag = styled(Tag)`
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
`;

export const StyledPriceContainer = styled.div`
  span {
    margin-right: 0.5rem;
  }

  svg {
    margin-right: 0.5rem;
  }
`;
