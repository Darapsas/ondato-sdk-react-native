export enum LogActions {
  documentTypeSelectPage = 'DOCUMENT_TYPE_SELECT_PAGE', // +
  idCardFrontPage = 'DOCUMENT_ID_CARD_FRONT_PAGE', // +
  idCardBackPage = 'DOCUMENT_ID_CARD_BACK_PAGE', // +
  passportFrontPage = 'DOCUMENT_PASSPORT_FRONT_PAGE', // +
  passportBackPage = 'DOCUMENT_PASSPORT_BACK_PAGE', // +
  driverLicenseFrontPage = 'DOCUMENT_DRIVER_LICENSE_FRONT_PAGE', // +
  driverLicenseBackPage = 'DOCUMENT_DRIVER_LICENSE_BACK_PAGE', // +
  selfieWithDocumentPage = 'SELFIE_WITH_DOCUMENT_PAGE', // +
  noCameraPermissions = 'NO_CAMERA_PERMISSIONS', // +
  waitingPage = 'WAITING_PAGE', // +
  termsShown = 'TERMS_SHOWN', // +
  termsAgreed = 'TERMS_AGREED', // +
  termsDisagreed = 'TERMS_DISAGREED', // +
  recordingStarted = 'RECORDING_STARTED', // +
  recordingStopped = 'RECORDING_STOPPED', // +

  identifyFacePage = 'IDENTIFY_FACE_PAGE', // selfie screen

  sessionStarted = 'SESSION_STARTED', // idvId start

  sessionCompleted = 'SESSION_COMPLETED', // success and failed
  sessionStartOver = 'SESSION_START_OVER', // try again

  identificationFailed = 'IDENTIFICATION_FAILED', // error
  identificationSuccess = 'IDENTIFICATION_SUCCESS', // success

  frontPhotoTaken = 'FRONT_PHOTO_TAKEN', // capture
  backPhotoTaken = 'BACK_PHOTO_TAKEN', // capture
  faceTaken = 'FACE_TAKEN', // capture

  faceFound = 'FACE_FOUND', // facetec success
  faceNotFound = 'FACE_NOT_FOUND', // facetec error

  cameraFound = 'CAMERA_FOUND', // on capture screen loaded
  cameraNotFound = 'CAMERA_NOT_FOUND', // on capture screen loaded
  cameraStarted = 'CAMERA_STARTED', // on capture screen loaded

  recorderError = 'RECORDER_ERROR',
  recordingNotFound = 'RECORDING_NOT_FOUND', // check if screen recorder file exist
  recordingUploaded = 'RECORDING_UPLOAD_SUCCESS',
  recordingUploadFailed = 'RECORDING_UPLOAD_FAIL',

  frontPhotoNotFound = 'FRONT_PHOTO_NOT_FOUND', // ???
  backPhotoNotFound = 'BACK_PHOTO_NOT_FOUND', // ???
  frontPhotoFound = 'FRONT_PHOTO_FOUND', // ???
  backPhotoFound = 'BACK_PHOTO_FOUND', // ???
}
