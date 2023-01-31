import { FaceTecLicense } from './types';
import { RootState } from '../../core/store';

export const selectFaceTecLicense = (state: RootState): FaceTecLicense | null => {
  return state.faceTec.license;
};

export const selectFaceTecSessionToken = (state: RootState): string | null => {
  return state.faceTec.sessionToken;
};

export const selectFaceTecProductionKeyText = (state: RootState): string | null => {
  const license = selectFaceTecLicense(state);

  if (!license) {
    return null;
  }

  return `appId = ${license.appId}\nexpiryDate = ${license.expiryDate}\nkey = ${license.key}`;
};
