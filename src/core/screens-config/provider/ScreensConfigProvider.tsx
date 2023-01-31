import React, { FC, PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react';
import i18n from 'i18next';
import ScreensConfigContext, { ScreensConfigContextValue } from './ScreensConfigContext';
import { Callbacks, UserConfig } from '../../../modules/kyc/types';
import { setIdentityVerificationId, setUserConfig } from '../../../modules/kyc/slice';
import { useAppDispatch } from '../../store';
import { Locales } from '../../../i18n/constants';
import { reset } from '../../../modules/global/slice';
import { useCloseAppHandler } from '../../../hooks';

interface Props extends UserConfig, Callbacks {
  locale: Locales;
  identityVerificationId: string;
}

const ScreensConfigProvider: FC<PropsWithChildren<Props>> = (props) => {
  const { identityVerificationId, locale, children, onError, onSuccess, onClose, ...userConfig } = props;

  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const init = useCallback(async () => {
    if (isInitialized) {
      return;
    }

    setIsInitialized(true);
    await i18n.changeLanguage(locale);
    await dispatch(setIdentityVerificationId({ identityVerificationId }));
    await dispatch(setUserConfig({ userConfig }));
  }, [locale, identityVerificationId, userConfig, dispatch, isInitialized]);

  const saveSdkState = useCallback(async () => {
    await dispatch(reset());
  }, [dispatch]);

  const handleOnClose = useCallback(async () => {
    await saveSdkState();
    setTimeout(() => onClose());
  }, [onClose, saveSdkState]);

  const handleOnSuccess = useCallback(async () => {
    await saveSdkState();
    setTimeout(() => onSuccess());
  }, [onSuccess, saveSdkState]);

  const handleOnError = useCallback(async () => {
    await saveSdkState();
    setTimeout(() => onError());
  }, [onError, saveSdkState]);

  useCloseAppHandler(handleOnClose);

  useEffect(() => {
    init();
  }, [init]);

  const memoizedValue = useMemo<ScreensConfigContextValue>(
    () => ({ onError: handleOnError, onSuccess: handleOnSuccess, onClose: handleOnClose }),
    [handleOnError, handleOnSuccess, handleOnClose]
  );

  return <ScreensConfigContext.Provider value={memoizedValue}>{children}</ScreensConfigContext.Provider>;
};

export default ScreensConfigProvider;
