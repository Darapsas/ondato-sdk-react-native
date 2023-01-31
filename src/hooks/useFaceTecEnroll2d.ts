import { useMutation } from '@tanstack/react-query';
import { useAppSelector } from '../core/store';
import { selectIsSelfieWithDocumentEnabled, selectKycId } from '../modules/kyc/selectors';
import { FaceTecEnroll2dRequest } from '../api/clients/kyc/types';
import { KycClient } from '../api/clients';
import { documentPrepareRoute, loadingRoute } from '../navigation/types';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/RootNavigator';
import { reset } from '../navigation/actions';

const useFaceTecEnroll2d = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const kycId = useAppSelector(selectKycId);
  const isSelfieWithDocumentEnabled = useAppSelector(selectIsSelfieWithDocumentEnabled);

  const mutationFn = async (request: FaceTecEnroll2dRequest) => {
    if (!kycId) {
      throw new Error('KycIdentification id is not found');
    }
    await KycClient.enrollFaceTec2d(kycId, request);
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

  return { enroll: mutateAsync, isLoading };
};

export default useFaceTecEnroll2d;
