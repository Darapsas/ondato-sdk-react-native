import { useMutation } from '@tanstack/react-query';
import { useAppSelector } from '../core/store';
import { selectKycId } from '../modules/kyc/selectors';
import { KycClient } from '../api/clients';
import { UploadAdditionalDocumentRequest } from '../api/clients/kyc/types';

const useUploadAdditionalDocument = () => {
  const kycId = useAppSelector(selectKycId);

  const mutationFn = async (request: UploadAdditionalDocumentRequest) => {
    if (!kycId) {
      throw new Error('KycIdentification id is not found');
    }
    await KycClient.uploadAdditionalDocument(kycId, request);
  };

  const { mutateAsync, isLoading } = useMutation(mutationFn);

  return { uploadAdditionalDocument: mutateAsync, isLoading };
};

export default useUploadAdditionalDocument;
