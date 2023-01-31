import React, { FC, useCallback, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';
import { PrimaryText, ScreenContainer } from '../components';
import { center } from '../theme/common';
import { LoadingScreenProps, registrationSuccessRoute, resultsWaitingRoute } from '../navigation/types';
import { useVerifyIdentification } from '../hooks';
import { useAppSelector } from '../core/store';
import { selectIsResultsWaitingEnabled } from '../modules/kyc/selectors';
import { useTheme } from '../theme/hooks';
import { reset } from '../navigation/actions';

const LoadingScreen: FC<LoadingScreenProps> = (props) => {
  const { navigation } = props;
  const isResultsWaitingEnabled = useAppSelector(selectIsResultsWaitingEnabled);

  const theme = useTheme();
  const { verify } = useVerifyIdentification();
  const { t } = useTranslation();

  const completeIdentification = useCallback(async () => {
    await verify();

    if (!isResultsWaitingEnabled) {
      navigation.dispatch(reset(registrationSuccessRoute));
      return;
    }

    navigation.dispatch(reset(resultsWaitingRoute));
  }, [verify, navigation, isResultsWaitingEnabled]);

  useEffect(() => {
    completeIdentification();
  }, [completeIdentification]);

  return (
    <ScreenContainer style={center}>
      <ActivityIndicator size={72} color={theme.colors.primary} style={theme.margins.bottom.xxl} />
      <PrimaryText fontWeight="bold" fontSize="xl" center style={theme.margins.bottom.l}>
        {t('loading.title')}
      </PrimaryText>
      <PrimaryText fontSize="m" center>
        {t('loading.description')}
      </PrimaryText>
    </ScreenContainer>
  );
};

export default LoadingScreen;
