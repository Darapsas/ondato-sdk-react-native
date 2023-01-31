import { useMutation } from '@tanstack/react-query';
import { useAppSelector } from '../core/store';
import { selectKycId } from '../modules/kyc/selectors';
import { KycClient } from '../api/clients';

const useVerifyIdentification = () => {
  const kycId = useAppSelector(selectKycId);

  const mutationFn = async () => {
    if (!kycId) {
      throw new Error('KycIdentification id is not found');
    }

    await KycClient.verify(kycId);
    await KycClient.complete(kycId);
  };

  const { mutateAsync, isLoading } = useMutation(mutationFn, {
    onMutate: undefined,
    onSettled: undefined,
  });

  return { verify: mutateAsync, isLoading };
};

export default useVerifyIdentification;
