import { createContext } from 'react';
import { RootStackParamList } from '../../../navigation/RootNavigator';
import { DocumentPrepareRoute, onboardingRoute } from '../../../navigation/types';

export interface ConfigContextValue {
  initialRouteName: keyof RootStackParamList;
  params?: Partial<RootStackParamList[DocumentPrepareRoute]>;
}

const ConfigContext = createContext<ConfigContextValue>({
  initialRouteName: onboardingRoute,
});

export default ConfigContext;
