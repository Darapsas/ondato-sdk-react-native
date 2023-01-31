import { GetFaceTecLicenseResponse, GetFaceTecSessionTokenResponse } from './types';
import httpClient from '../../httpClient';

const baseUrl = '/face-tec';

export const getFaceTecLicense = () => {
  return httpClient.get<void, GetFaceTecLicenseResponse>(`${baseUrl}/mobile-license`);
};

export const getFaceTecSessionToken = () => {
  return httpClient.get<void, GetFaceTecSessionTokenResponse>(`${baseUrl}/sessions`);
};
