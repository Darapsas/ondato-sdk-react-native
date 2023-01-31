import { useCallback, useEffect } from 'react';
import { KycClient } from '../api/clients';
import { useAppSelector } from '../core/store';
import { selectKycId } from '../modules/kyc/selectors';
import { RejectionReasons } from '../api/clients/kyc/constants';

interface Props {
  onSuccess: () => void;
  onError: (rejectionReason: RejectionReasons) => void;
}

const useResultsWaiting = (props: Props) => {
  const { onError, onSuccess } = props;
  const kycId = useAppSelector(selectKycId);

  const checkStatus = useCallback(async () => {
    if (!kycId) {
      throw new Error('KycIdentification id is not found');
    }
    return await KycClient.getStatus(kycId);
  }, [kycId]);

  const checkResult = useCallback(() => {
    const intervalId = setInterval(async () => {
      const { status, statusReason } = await checkStatus();

      if (status === 'Approved') {
        onSuccess();
        clearInterval(intervalId);
      }

      if (status === 'Rejected') {
        onError(statusReason);
        clearInterval(intervalId);
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [checkStatus, onSuccess, onError]);

  useEffect(() => {
    checkResult();
  }, [checkResult]);
};

export default useResultsWaiting;
