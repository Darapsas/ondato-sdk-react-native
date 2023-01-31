import { useCallback } from 'react';
import { useAppSelector } from '../core/store';
import { selectIdentityVerificationId } from '../modules/kyc/selectors';
import { IdentityClient } from '../api/clients';
import { LogActions } from '../api/clients/identity/constants';

const useLogging = () => {
  const identityVerificationId = useAppSelector(selectIdentityVerificationId);

  const log = useCallback(
    (action: LogActions) => {
      if (!identityVerificationId) {
        return;
      }
      IdentityClient.log(identityVerificationId, { action });
    },
    [identityVerificationId]
  );

  return { log };
};

export default useLogging;
