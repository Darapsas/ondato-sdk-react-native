import { useMutation } from '@tanstack/react-query';
import { useAppSelector } from '../core/store';
import { selectIdentityVerificationId } from '../modules/kyc/selectors';
import { IdentityClient } from '../api/clients';

const useCompleteIdentification = () => {
  const identityVerificationId = useAppSelector(selectIdentityVerificationId);

  const mutationFn = async () => {
    if (!identityVerificationId) {
      throw new Error('Identity verification id is not found');
    }

    await IdentityClient.complete(identityVerificationId);
  };

  const { mutateAsync, isLoading } = useMutation(mutationFn);

  return { complete: mutateAsync, isLoading };
};

export default useCompleteIdentification;
