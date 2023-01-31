import { useContext } from 'react';
import ScreensConfigContext from '../provider/ScreensConfigContext';

const useCallbacks = () => {
  const { onSuccess, onError, onClose } = useContext(ScreensConfigContext);

  return { onSuccess, onError, onClose };
};

export default useCallbacks;
