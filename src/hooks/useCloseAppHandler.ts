import { useCallback, useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';

const useCloseAppHandler = (onClose: () => void) => {
  const handleOnAppStateChange = useCallback(
    (status: AppStateStatus) => {
      if (status === 'inactive') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    AppState.addEventListener('change', handleOnAppStateChange);
    return () => AppState.removeEventListener('change', handleOnAppStateChange);
  }, [handleOnAppStateChange]);
};

export default useCloseAppHandler;
