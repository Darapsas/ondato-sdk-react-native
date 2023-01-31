import {
  FaceTecEnroll2dRequest,
  FaceTecEnroll3dRequest,
  GetKycIdRequest,
  GetKycIdResponse,
  KycConfig,
  KycStatus,
  UploadAdditionalDocumentRequest,
  UploadDocumentRequest,
  UploadScreenRecordingRequest,
} from './types';
import httpClient from '../../httpClient';

const baseUrl = '/kyc-identifications';

export const getConfig = (id: string) => {
  return httpClient.get<void, KycConfig>(`${baseUrl}/${id}/setup`);
};

export const getKycId = (request: GetKycIdRequest) => {
  return httpClient.post<GetKycIdRequest, GetKycIdResponse>(baseUrl, request);
};

export const getStatus = (id: string) => {
  return httpClient.get<void, KycStatus>(`${baseUrl}/${id}`);
};

export const verify = (id: string) => {
  return httpClient.put(`${baseUrl}/${id}/verification`);
};

export const complete = (id: string) => {
  return httpClient.put(`${baseUrl}/${id}/complete`);
};

export const retry = (id: string) => {
  return httpClient.put(`${baseUrl}/${id}/resubmit`);
};

export const uploadDocument = (id: string, request: UploadDocumentRequest) => {
  return httpClient.put<UploadDocumentRequest>(`${baseUrl}/${id}/document`, request);
};

export const uploadScreenRecording = (id: string, request: UploadScreenRecordingRequest) => {
  return httpClient.put<UploadScreenRecordingRequest>(`${baseUrl}/${id}/session-screen-recording`, request);
};

export const uploadAdditionalDocument = (id: string, request: UploadAdditionalDocumentRequest) => {
  return httpClient.put<UploadAdditionalDocumentRequest>(`${baseUrl}/${id}/additional-document`, request);
};

export const enrollFaceTec3d = (id: string, request: FaceTecEnroll3dRequest) => {
  return httpClient.put<FaceTecEnroll3dRequest>(`${baseUrl}/${id}/face-tec-enrollment-3d`, request);
};

export const enrollFaceTec2d = (id: string, request: FaceTecEnroll2dRequest) => {
  return httpClient.put<FaceTecEnroll2dRequest>(`${baseUrl}/${id}/face-tec-liveness-2d`, request);
};
