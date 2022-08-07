import styled from '@emotion/styled';
import { Spinner, SpinnerSize } from '@tablecheck/tablekit-spinner';

import { useSearch } from 'api/search';
import { useSearchAppSelector } from 'app/hooks';

import { ShopItem } from './ShopItem';

const StyledSpinner = styled(Spinner)`
  display: flex;
  height: calc(100% - 50vh);
`;

export function SearchListing(): JSX.Element {
  const { location } = useSearchAppSelector();

  const { isLoading, isFetching, data } = useSearch(
    location?.payload?.geo?.lat,
    location?.payload?.geo?.lon
  );

  if (isLoading && isFetching) {
    return <StyledSpinner size={SpinnerSize.Large} />;
  }

  return (
    <div>
      {data?.shops?.map((shop) => (
        <ShopItem key={shop._id} shop={shop} />
      ))}
    </div>
  );
}
