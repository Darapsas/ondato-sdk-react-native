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
    const subscription = AppState.addEventListener('change', handleOnAppStateChange);

    return () => subscription.remove();
  }, [handleOnAppStateChange]);
};

export default useCloseAppHandler;
