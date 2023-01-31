import React, { FC, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import ConfigContext, { ConfigContextValue } from './ConfigContext';
import { useAppSelector } from '../../store';
import { selectIdentityVerificationId } from '../../../modules/kyc/selectors';
import { selectFullAccessToken } from '../../../modules/sessions/selectors';
import { useInit } from '../../../hooks';
import { DocumentVariant } from '../../../modules/kyc/types';
import {
  consentRoute,
  DocumentPrepareRoute,
  documentPrepareRoute,
  documentSelectRoute,
  onboardingRoute,
} from '../../../navigation/types';
import { RootStackParamList } from '../../../navigation/RootNavigator';
import { ScreenContainer, Splash } from '../../../components';

interface Props {
  children: ReactNode;
}

const ConfigProvider: FC<Props> = (props) => {
  const { children } = props;

  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [params, setParams] = useState<Partial<RootStackParamList[DocumentPrepareRoute]>>();
  const [initialRouteName, setInitialRouteName] = useState<keyof RootStackParamList>(onboardingRoute);

  const { isOnboardingEnabled, isConsentEnabled } = useAppSelector((state) => state.kyc.config);
  const identityVerificationId = useAppSelector(selectIdentityVerificationId);
  const fullAccessToken = useAppSelector(selectFullAccessToken);
  const { init } = useInit();

  const getInitialRouteName = useCallback((): keyof RootStackParamList => {
    return isOnboardingEnabled ? onboardingRoute : isConsentEnabled ? consentRoute : documentSelectRoute;
  }, [isOnboardingEnabled, isConsentEnabled]);

  const initialize = useCallback(async () => {
    if (!identityVerificationId || isInitialized) {
      return;
    }

    const documents = await init(identityVerificationId);
    setIsInitialized(true);

    if (documents.length === 1) {
      const [document] = documents;
      const [sideId] = document.sidesIds;
      const variant: DocumentVariant = { id: document.id, sideId };
      setParams({ variant });
      setInitialRouteName(documentPrepareRoute);
    } else {
      setInitialRouteName(getInitialRouteName());
    }
  }, [init, identityVerificationId, getInitialRouteName, isInitialized]);

  useEffect(() => {
    if (!fullAccessToken) {
      initialize();
    }
  }, [initialize, fullAccessToken]);

  const memoizedValue = useMemo<ConfigContextValue>(() => ({ initialRouteName, params }), [initialRouteName, params]);

  return (
    <ConfigContext.Provider value={memoizedValue}>
      {isInitialized ? (
        children
      ) : (
        <ScreenContainer>
          <Splash />
        </ScreenContainer>
      )}
    </ConfigContext.Provider>
  );
};

export default ConfigProvider;
