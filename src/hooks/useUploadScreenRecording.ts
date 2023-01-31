import { useMutation } from '@tanstack/react-query';
import { useAppSelector } from '../core/store';
import { selectKycId } from '../modules/kyc/selectors';
import { KycClient } from '../api/clients';
import { RecordingSuccessResponse } from 'react-native-record-screen';
import { FileUtils } from '../utils';

const useUploadScreenRecording = () => {
  const kycId = useAppSelector(selectKycId);

  const mutationFn = async (response: RecordingSuccessResponse) => {
    if (!kycId) {
      throw new Error('KycIdentification id is not found');
    }

    const outputUrl = response.result.outputURL;
    const videoBase64 = await FileUtils.getBase64File(outputUrl);

    await KycClient.uploadScreenRecording(kycId, { videoFileType: 'Mp4', videoBase64 });
  };

  const { mutateAsync, isLoading } = useMutation(mutationFn);

  return { uploadScreenRecording: mutateAsync, isLoading };
};

export default useUploadScreenRecording;
