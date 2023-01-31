import { useMutation } from '@tanstack/react-query';
import { useAppSelector } from '../core/store';
import { selectKycId } from '../modules/kyc/selectors';
import { KycClient } from '../api/clients';
import { UploadDocumentRequest } from '../api/clients/kyc/types';

const useUploadDocument = () => {
  const kycId = useAppSelector(selectKycId);

  const mutationFn = async (request: UploadDocumentRequest) => {
    if (!kycId) {
      throw new Error('KycIdentification id is not found');
    }
    await KycClient.uploadDocument(kycId, request);
  };

  const { mutateAsync, isLoading } = useMutation(mutationFn);

  return { uploadDocument: mutateAsync, isLoading };
};

export default useUploadDocument;
