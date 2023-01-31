import { RejectionReasons } from './constants';
import { BaseConfigProperty } from '../../types';

export type PassportSideName = 'FrontCover' | 'DataPage';
export type IdCardSideName = 'Front' | 'Back';
export type DriverLicenseSideName = 'Front' | 'Back';
export type DocumentName = 'IdCard' | 'Passport' | 'DriverLicense';
export type DocumentSideName = PassportSideName | IdCardSideName | DriverLicenseSideName;

export type AdditionalDocumentName = 'SelfieWithDoc';

export type DocumentImageFileType = 'Jpeg' | 'Png' | 'jpeg';
export type VideoFileType = 'Mp4';
export type IdentificationStatus = 'Awaiting' | 'Approved' | 'Rejected';

export interface GetKycIdRequest {
  setupId: string;
  identityVerificationId: string;
}

export interface GetKycIdResponse {
  id: string;
}

export interface UploadDocumentRequest {
  type: DocumentName;
  part: DocumentSideName;
  imageBase64: string;
  imageFileType: DocumentImageFileType;
}

export interface UploadScreenRecordingRequest {
  videoBase64: string;
  videoFileType: VideoFileType;
}

export interface UploadAdditionalDocumentRequest {
  imageBase64: string;
  imageFileType: DocumentImageFileType;
  type: AdditionalDocumentName;
}

export interface Setup {
  id: string;
  versionId: string;
}

export interface KycStatus {
  id: string;
  applicationId: string;
  createdUtc: string;
  completedUtc: string;
  setup: Setup;
  status: IdentificationStatus;
  identityVerificationId: string;
  statusReason: RejectionReasons;
}

interface DocumentSide {
  name: PassportSideName | IdCardSideName | DriverLicenseSideName;
}

interface BaseDocument {
  name: DocumentName;
  parts: DocumentSide[];
}

interface PassportSide extends DocumentSide {
  name: PassportSideName;
}

interface PassportDocument extends BaseDocument {
  name: 'Passport';
  parts: PassportSide[];
}

interface IdCardSide extends DocumentSide {
  name: IdCardSideName;
}

export interface IdCardDocument extends BaseDocument {
  name: 'IdCard';
  parts: IdCardSide[];
}

interface DriverLicenseSide extends DocumentSide {
  name: DriverLicenseSideName;
}

interface DriverLicenseDocument extends BaseDocument {
  name: 'DriverLicense';
  parts: DriverLicenseSide[];
}

export type Document = PassportDocument | IdCardDocument | DriverLicenseDocument;

interface DocumentConfigProperty extends BaseConfigProperty {
  types: Document[];
}

interface FaceConfigProperty extends BaseConfigProperty {
  activeLivenessEnabled: boolean;
  passiveLivenessEnabled: boolean;
}

interface ResultsWaitingProperty extends BaseConfigProperty {
  autoCompleteSkip: boolean;
}

interface AdditionalDocument {
  name: AdditionalDocumentName;
}

interface AdditionalDocumentProperty extends BaseConfigProperty {
  types: AdditionalDocument[];
}

export interface KycConfig {
  id: string;
  document: DocumentConfigProperty;
  face: FaceConfigProperty;
  resultsWaiting?: ResultsWaitingProperty;
  additionalDocument?: AdditionalDocumentProperty;
}

export interface FaceTecEnroll3dRequest {
  sessionId: string;
  faceScanBase64: string;
  auditImagesBase64: string[];
  lowQualityAuditImagesBase64: string[];
  sessionUserAgent: string;
}

export interface FaceTecEnroll2dRequest {
  auditImagesBase64: string[];
}
