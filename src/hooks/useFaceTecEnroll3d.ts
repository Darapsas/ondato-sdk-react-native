import { useMutation } from '@tanstack/react-query';
import { useAppSelector } from '../core/store';
import { selectIsSelfieWithDocumentEnabled, selectKycId } from '../modules/kyc/selectors';
import { FaceTecEnroll3dRequest } from '../api/clients/kyc/types';
import { KycClient } from '../api/clients';
import { selectFaceTecSessionToken } from '../modules/face-tec/selectors';
import { documentPrepareRoute, loadingRoute } from '../navigation/types';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/RootNavigator';
import { reset } from '../navigation/actions';

const useFaceTecEnroll3d = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const kycId = useAppSelector(selectKycId);
  const sessionToken = useAppSelector(selectFaceTecSessionToken);
  const isSelfieWithDocumentEnabled = useAppSelector(selectIsSelfieWithDocumentEnabled);

  const mutationFn = async (request: FaceTecEnroll3dRequest) => {
    if (!kycId) {
      throw new Error('KycIdentification id is not found');
    }
    await KycClient.enrollFaceTec3d(kycId, request);
  };

  const { mutateAsync, isLoading } = useMutation(mutationFn, {
    onSuccess: () => {
      if (isSelfieWithDocumentEnabled) {
        navigation.dispatch(reset(documentPrepareRoute, { variant: { id: 'SelfieWithDoc', sideId: 'Front' } }));
      } else {
        navigation.dispatch(reset(loadingRoute));
      }
    },
  });

  const enroll = (request: FaceTecEnroll3dRequest) => {
    if (!sessionToken) {
      throw new Error('Session token is not found');
    }

    return mutateAsync(request);
  };

  return { enroll, isLoading };
};

export default useFaceTecEnroll3d;
