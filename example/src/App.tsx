import React, { FC, useCallback } from 'react';
import OndatoSdk from 'idv-sdk-reactnative';

const App: FC = () => {
  // Important to use useCallback hook to avoid rerendering
  const onSuccess = useCallback(() => {
    console.log('Success');
  }, []);

  // Important to use useCallback hook to avoid rerendering
  const onError = useCallback(() => {
    console.log('Error');
  }, []);

  // Important to use useCallback hook to avoid rerendering
  const onClose = useCallback(() => {
    console.log('Close');
  }, []);

  return (
    <OndatoSdk
      onSuccess={onSuccess}
      onError={onError}
      onClose={onClose}
      identityVerificationId="YOUR-IDENTITY-VERIFICATION-ID"
    />
  );
};

export default App;
