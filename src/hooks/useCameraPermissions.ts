import { useCallback, useEffect, useState } from 'react';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import useLogging from './useLogging';
import { LogActions } from '../api/clients/identity/constants';

const useCameraPermissions = () => {
  const { log } = useLogging();
  const devices = useCameraDevices('wide-angle-camera');

  const [isGranted, setIsGranted] = useState<boolean>(false);

  const requestCameraPermissions = useCallback(async () => {
    const permission = await Camera.requestCameraPermission();
    const isAuthorized = permission === 'authorized';
    if (!isAuthorized) {
      log(LogActions.noCameraPermissions);
    }

    setIsGranted(isAuthorized);
  }, [log]);

  useEffect(() => {
    requestCameraPermissions();
  }, [requestCameraPermissions]);

  return { isGranted, backDevice: devices.back, frontDevice: devices.front };
};

export default useCameraPermissions;
