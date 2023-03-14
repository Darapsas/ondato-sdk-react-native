import React, { FC, memo, useMemo } from 'react';
import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './core/query';
import { store } from './core/store';
import { StatusBar } from './components';
import RootNavigator from './navigation/RootNavigator';
import { ScreenConfigProvider } from './core/screens-config/provider';
import { ThemeProvider } from './theme/provider';
import { Callbacks, UserConfig } from './modules/kyc/types';
import { ErrorBoundary } from './core/error-boundary';
import { ConfigurableColors, ConfigurableTheme } from './theme/types';
import { Locales } from './i18n/constants';
import { setupTranslations } from './i18n';
import { GlobalLoader } from './core/global-loader';
import Toast from 'react-native-toast-message';
import { ConfigProvider } from './core/config/provider';

setupTranslations();

export interface OndatoSdkProps {
  identityVerificationId: string;
  onError: () => void;
  onClose: () => void;
  onSuccess: () => void;
  isConsentEnabled?: boolean;
  isOnboardingEnabled?: boolean;
  isLoggingEnabled?: boolean;
  locale?: Locales;
  theme?: ConfigurableTheme;
}

const OndatoSdk: FC<OndatoSdkProps> = (props) => {
  const {
    identityVerificationId,
    locale = Locales.en,
    isLoggingEnabled = true,
    isConsentEnabled = true,
    isOnboardingEnabled = true,
    onError,
    onSuccess,
    onClose,
    theme,
  } = props;

  const config = useMemo<UserConfig & Callbacks>(
    () => ({
      isConsentEnabled,
      isOnboardingEnabled,
      isLoggingEnabled,
      onError,
      onSuccess,
      onClose,
    }),
    [isConsentEnabled, isOnboardingEnabled, isLoggingEnabled, onError, onSuccess, onClose]
  );

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ScreenConfigProvider locale={locale} identityVerificationId={identityVerificationId} {...config}>
            <ThemeProvider configurableTheme={theme}>
              <StatusBar />
              <GlobalLoader>
                <ConfigProvider>
                  <RootNavigator />
                </ConfigProvider>
              </GlobalLoader>
            </ThemeProvider>
          </ScreenConfigProvider>
        </Provider>
      </QueryClientProvider>
      <Toast />
    </ErrorBoundary>
  );
};

export default memo(OndatoSdk);

export { UserConfig, ConfigurableColors, ConfigurableTheme };
