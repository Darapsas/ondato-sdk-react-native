import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { SelfieCaptureScreenProps } from '../navigation/types';
import { useFaceTecEnroll2d, useFaceTecEnroll3d } from '../hooks';
import { useAppSelector } from '../core/store';
import { selectFaceTecLicense, selectFaceTecProductionKeyText } from '../modules/face-tec/selectors';
import { selectAccessToken } from '../modules/sessions/selectors';
import { selectSelfieMode } from '../modules/kyc/selectors';
// @ts-ignore
import { FaceTecConfig, FaceTecState, FaceTecView } from 'react-native-facetec';

const SelfieCaptureScreen: FC<SelfieCaptureScreenProps> = () => {
  const license = useAppSelector(selectFaceTecLicense);
  const productionKeyText = useAppSelector(selectFaceTecProductionKeyText);
  const sessionToken = useAppSelector(selectAccessToken);
  const selfieMode = useAppSelector(selectSelfieMode);
  const [isFaceTecVisible, setIsFaceTecVisible] = useState<boolean>(false);

  const { enroll: enroll2d } = useFaceTecEnroll2d();
  const { enroll: enroll3d } = useFaceTecEnroll3d();

  useEffect(() => {
    setIsFaceTecVisible(true);
    return () => setIsFaceTecVisible(false);
  }, []);

  const config = useMemo<FaceTecConfig>(
    () => ({
      deviceKeyIdentifier: license?.deviceKeyIdentifier,
      faceScanEncryptionKey: license?.publicFaceScanEncryptionKey,
      productionKeyText,
      sessionToken,
    }),
    [license?.deviceKeyIdentifier, license?.publicFaceScanEncryptionKey, productionKeyText, sessionToken]
  );

  const handleOnStateChange = useCallback(
    async (state: FaceTecState) => {
      console.log('state', state);

      if (!!state && state.status === 'Succeeded') {
        if (selfieMode === 'Active') {
          await enroll3d({
            sessionId: state.load.sessionId,
            faceScanBase64: state.load.faceScanBase64,
            auditImagesBase64: state.load.auditImagesBase64,
            lowQualityAuditImagesBase64: state.load.lowQualityAuditTrailImagesBase64,
            sessionUserAgent: state.load.userAgent,
          });
        }

        if (selfieMode === 'Passive') {
          await enroll2d({
            auditImagesBase64: state.load.auditImagesBase64,
          });
        }
      }
    },
    [selfieMode, enroll2d, enroll3d]
  );

  return <FaceTecView config={config} onStateUpdate={handleOnStateChange} mode="enroll" show={isFaceTecVisible} />;
};

export default SelfieCaptureScreen;
