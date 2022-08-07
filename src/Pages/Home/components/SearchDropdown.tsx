import styled from '@emotion/styled';
import { Spacing } from '@tablecheck/tablekit-theme';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useSearchAppSelector } from 'app/hooks';
import { setLocation } from 'features/home/searchSlice';

export const StyledDropdown = styled.div`
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.inputBackground};
`;

export const StyledDropdownItem = styled.div`
  padding: ${Spacing.L3};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.accent};
  cursor: pointer;
`;

export function SearchDropdown(): JSX.Element {
  const dispatch = useAppDispatch();
  const { locations } = useSearchAppSelector();
  const navigate = useNavigate();
  const [, { language }] = useTranslation();

  return (
    <StyledDropdown>
      {locations?.map((location) => (
        <StyledDropdownItem
          onClick={() => {
            dispatch(setLocation(location));
            navigate(`/${language}/${location.text}`);
          }}
          key={`${location?.text}${location?.payload?.geo?.lat}${location?.payload?.geo?.lon}`}
        >
          {location?.text}
        </StyledDropdownItem>
      ))}
    </StyledDropdown>
  );
}
