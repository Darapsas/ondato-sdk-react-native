import { useMutation } from '@tanstack/react-query';
import { useAppSelector } from '../core/store';
import { selectKycId } from '../modules/kyc/selectors';
import { KycClient } from '../api/clients';

const useRetryIdentification = () => {
  const kycId = useAppSelector(selectKycId);

  const mutationFn = async () => {
    if (!kycId) {
      throw new Error('KycIdentification id is not found');
    }
    await KycClient.retry(kycId);
  };

  const { mutateAsync, isLoading } = useMutation(mutationFn);

  return { retry: mutateAsync, isLoading };
};

export default useRetryIdentification;
