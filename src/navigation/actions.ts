import { CommonActions } from '@react-navigation/native';
import { documentSelectRoute } from './types';
import { RootStackParamList } from './RootNavigator';

export const reset = (name: keyof RootStackParamList, params?: object) => {
  return CommonActions.reset({
    index: 0,
    routes: [{ name, params }],
  });
};

export const resetToDocumentSelectRoute = () => {
  return CommonActions.reset({
    index: 0,
    routes: [{ name: documentSelectRoute }],
  });
};
