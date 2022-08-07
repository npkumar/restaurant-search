import { IdProvider } from '@radix-ui/react-id';
import '@tablecheck/tablekit-free-icon-config';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as React from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { useAsync } from 'react-use';

import { AppThemeProvider } from 'Common/Theme';
import { MainWrapper } from 'Layouts';
import { store } from 'app/store';
import { getI18nextInstance, initI18n } from 'i18n';

import { Router } from './router';

export function App(): JSX.Element {
  const [isDarkMode, setDarkMode] = React.useState(false);
  const i18nState = useAsync(() => initI18n());
  if (i18nState.loading) return <span />;
  const i18next = getI18nextInstance();
  const queryClient = new QueryClient();

  return (
    <IdProvider>
      <I18nextProvider i18n={i18next}>
        <AppThemeProvider isDarkMode={isDarkMode} setDarkMode={setDarkMode}>
          <BrowserRouter basename={CONFIG.baseName}>
            <ReduxProvider store={store}>
              <QueryClientProvider client={queryClient}>
                <MainWrapper>
                  <Router isDarkMode={isDarkMode} setDarkMode={setDarkMode} />
                </MainWrapper>
              </QueryClientProvider>
            </ReduxProvider>
          </BrowserRouter>
        </AppThemeProvider>
      </I18nextProvider>
    </IdProvider>
  );
}
