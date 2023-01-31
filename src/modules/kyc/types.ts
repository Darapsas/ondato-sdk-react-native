import { FC } from 'react';
import { LoadingScreenProps, OnboardingScreenProps, SuccessScreenProps } from '../../navigation/types';

export type DocumentId = 'IdCard' | 'DriverLicense' | 'Passport';
export type AdditionalDocumentId = 'SelfieWithDoc';
export type SelfieId = 'Selfie';
export type DocumentSideId = 'Front' | 'Back';
export type SelfieMode = 'Active' | 'Passive';
export type BaseDocumentId = DocumentId | AdditionalDocumentId | SelfieId;

export interface Document {
  id: DocumentId;
  sidesIds: DocumentSideId[];
}

export interface DocumentVariant {
  id: BaseDocumentId;
  sideId: DocumentSideId;
}

export interface BackendConfig {
  isDocumentsEnabled: boolean;
  documents: Document[];
  isSelfieEnabled: boolean;
  selfieMode: SelfieMode;
  isResultsWaitingEnabled: boolean;
  isSelfieWithDocumentEnabled: boolean;
}

export interface UserConfig {
  isConsentEnabled: boolean;
  isOnboardingEnabled: boolean;
  isLoggingEnabled: boolean;
}

export interface ScreensConfig {
  SuccessScreen: FC<SuccessScreenProps>;
  OnboardingScreen: FC<OnboardingScreenProps>;
  LoadingScreen: FC<LoadingScreenProps>;
}

export interface Callbacks {
  onSuccess: () => void;
  onError: () => void;
  onClose: () => void;
}

export type Config = BackendConfig & UserConfig;
