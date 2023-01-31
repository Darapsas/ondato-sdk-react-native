import { BackendConfig, Document, DocumentId, DocumentSideId } from './types';
import {
  Document as ApiDocument,
  DocumentName as ApiDocumentName,
  DocumentSideName as ApiDocumentSideName,
  KycConfig as ApiKycConfig,
} from '../../api/clients/kyc/types';

const isSelfieWithDocumentEnabled = (apiKycConfig: ApiKycConfig) => {
  if (!apiKycConfig.additionalDocument || !apiKycConfig.additionalDocument.enabled) {
    return false;
  }
  return !!apiKycConfig.additionalDocument.types.find((type) => type.name === 'SelfieWithDoc');
};

const documentIdMap: Record<ApiDocumentName, DocumentId> = {
  IdCard: 'IdCard',
  Passport: 'Passport',
  DriverLicense: 'DriverLicense',
};

const documentSideIdMap: Record<ApiDocumentSideName, DocumentSideId> = {
  Front: 'Front',
  FrontCover: 'Front',
  Back: 'Back',
  DataPage: 'Front',
};

const mapDocument = (document: ApiDocument): Document => ({
  id: documentIdMap[document.name],
  sidesIds: document.parts.map((side) => documentSideIdMap[side.name]),
});

export const mapBackendConfig = (apiKycConfig: ApiKycConfig): BackendConfig => ({
  isDocumentsEnabled: apiKycConfig.document.enabled,
  documents: apiKycConfig.document.types.map(mapDocument),
  isSelfieEnabled: apiKycConfig.face.enabled,
  selfieMode: apiKycConfig.face.activeLivenessEnabled ? 'Active' : 'Passive',
  isResultsWaitingEnabled: apiKycConfig.resultsWaiting?.enabled ?? false,
  isSelfieWithDocumentEnabled: isSelfieWithDocumentEnabled(apiKycConfig),
});
