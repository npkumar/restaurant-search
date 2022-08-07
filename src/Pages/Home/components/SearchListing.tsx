import styled from '@emotion/styled';
import { Spinner, SpinnerSize } from '@tablecheck/tablekit-spinner';
import { useTranslation } from 'react-i18next';

import { useSearch } from 'api/search';
import { useSearchAppSelector } from 'app/hooks';

import { ShopItem } from './ShopItem';

const StyledSpinner = styled(Spinner)`
  display: flex;
  height: calc(100% - 50vh);
`;

const StyledErrorMessage = styled.div`
  text-align: center;
`;

export function SearchListing(): JSX.Element {
  const [t] = useTranslation();
  const { location } = useSearchAppSelector();

  const { isError, isLoading, isFetching, data } = useSearch(
    location?.payload?.geo?.lat,
    location?.payload?.geo?.lon
  );

  if (isError) {
    return (
      <StyledErrorMessage>{t('keywords.error_generic')}</StyledErrorMessage>
    );
  }

  if (isLoading && isFetching) {
    return <StyledSpinner size={SpinnerSize.Large} data-testid="spinner" />;
  }

  return (
    <div>
      {data?.shops?.map((shop) => (
        <ShopItem key={shop._id} shop={shop} />
      ))}
    </div>
  );
}
