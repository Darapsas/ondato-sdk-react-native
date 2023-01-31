import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from './RootNavigator';

export type InitialRoute = 'Initial';
export const initialRoute: InitialRoute = 'Initial';
export type InitialScreenProps = StackScreenProps<RootStackParamList, InitialRoute>;

export type OnboardingRoute = 'Onboarding';
export const onboardingRoute: OnboardingRoute = 'Onboarding';
export type OnboardingScreenProps = StackScreenProps<RootStackParamList, OnboardingRoute>;

export type LanguagesRoute = 'Languages';
export const languagesRoute: LanguagesRoute = 'Languages';
export type LanguagesScreenProps = StackScreenProps<RootStackParamList, LanguagesRoute>;

export type ConsentRoute = 'Consent';
export const consentRoute: ConsentRoute = 'Consent';
export type ConsentScreenProps = StackScreenProps<RootStackParamList, ConsentRoute>;

export type DocumentSelectRoute = 'DocumentSelect';
export const documentSelectRoute: DocumentSelectRoute = 'DocumentSelect';
export type DocumentSelectScreenProps = StackScreenProps<RootStackParamList, DocumentSelectRoute>;

export type DocumentPrepareRoute = 'DocumentPrepare';
export const documentPrepareRoute: DocumentPrepareRoute = 'DocumentPrepare';
export type DocumentPrepareScreenProps = StackScreenProps<RootStackParamList, DocumentPrepareRoute>;

export type DocumentCaptureRoute = 'DocumentCapture';
export const documentCaptureRoute: DocumentCaptureRoute = 'DocumentCapture';
export type DocumentCaptureScreenProps = StackScreenProps<RootStackParamList, DocumentCaptureRoute>;

export type SelfieCaptureRoute = 'SelfieCapture';
export const selfieCaptureRoute: SelfieCaptureRoute = 'SelfieCapture';
export type SelfieCaptureScreenProps = StackScreenProps<RootStackParamList, SelfieCaptureRoute>;

export type DocumentPreviewRoute = 'DocumentPreview';
export const documentPreviewRoute: DocumentPreviewRoute = 'DocumentPreview';
export type DocumentPreviewScreenProps = StackScreenProps<RootStackParamList, DocumentPreviewRoute>;

export type QuitConfirmationRoute = 'QuitConfirmation';
export const quitConfirmationRoute: QuitConfirmationRoute = 'QuitConfirmation';
export type QuitConfirmationScreenProps = StackScreenProps<RootStackParamList, QuitConfirmationRoute>;

export type LoadingRoute = 'Loading';
export const loadingRoute: LoadingRoute = 'Loading';
export type LoadingScreenProps = StackScreenProps<RootStackParamList, LoadingRoute>;

export type ResultsWaitingRoute = 'ResultsWaiting';
export const resultsWaitingRoute: ResultsWaitingRoute = 'ResultsWaiting';
export type ResultsWaitingScreenProps = StackScreenProps<RootStackParamList, ResultsWaitingRoute>;

export type SuccessRoute = 'Success';
export const successRoute: SuccessRoute = 'Success';
export type SuccessScreenProps = StackScreenProps<RootStackParamList, SuccessRoute>;

export type ErrorRoute = 'Error';
export const errorRoute: ErrorRoute = 'Error';
export type ErrorScreenProps = StackScreenProps<RootStackParamList, ErrorRoute>;

export type RegistrationSuccessRoute = 'RegistrationSuccess';
export const registrationSuccessRoute: RegistrationSuccessRoute = 'RegistrationSuccess';
export type RegistrationSuccessScreenProps = StackScreenProps<RootStackParamList, RegistrationSuccessRoute>;
