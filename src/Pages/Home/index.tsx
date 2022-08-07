import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';

import { PageWrapper } from 'Layouts';

import { HomeHeadline } from './styles';

export function Home(): JSX.Element {
  const [t, { language }] = useTranslation();

  return (
    <PageWrapper>
      <HomeHeadline>{t('attributes.titles.headline')}</HomeHeadline>
      <Outlet />
      <Helmet>
        <title lang={language}>{`${t('attributes.titles.headline')} - ${t(
          'keywords.app_name'
        )}`}</title>
      </Helmet>
    </PageWrapper>
  );
}
