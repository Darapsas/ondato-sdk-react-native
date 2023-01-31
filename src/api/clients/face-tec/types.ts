export interface GetFaceTecLicenseResponse {
  deviceKeyIdentifier: string;
  expiryDate: string;
  publicFaceScanEncryptionKey: string;
  key: string;
  appId: string;
}

export interface GetFaceTecSessionTokenResponse {
  sessionToken: string;
}
