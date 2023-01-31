import React, { FC, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import { ErrorScreenProps } from '../navigation/types';
import { Button, Container, PrimaryText, ScreenContainer, Svg } from '../components';
import { center, flex1, flexShrink, row, spaceBetween } from '../theme/common';
import { useCompleteIdentification, useRetryIdentification } from '../hooks';
import { resetToDocumentSelectRoute } from '../navigation/actions';
import { useTheme } from '../theme/hooks';
import { CriticalReasons, RejectionReasons } from '../api/clients/kyc/constants';
import { useCallbacks } from '../core/screens-config/hooks';

interface PageContent {
  title: string;
  description: string;
}

const ErrorScreen: FC<ErrorScreenProps> = (props) => {
  const { route, navigation } = props;
  const { params } = route;
  const { rejectionReason } = params;

  const { onError } = useCallbacks();
  const theme = useTheme();
  const { t } = useTranslation();
  const { retry } = useRetryIdentification();
  const { complete, isLoading } = useCompleteIdentification();

  const pageContent = useMemo<PageContent | undefined>(() => content(t)[rejectionReason], [rejectionReason, t]);
  const isCriticalReason = useMemo<boolean>(() => CriticalReasons.includes(rejectionReason), [rejectionReason]);

  const handleOnRetry = useCallback(async () => {
    await retry();
    navigation.dispatch(resetToDocumentSelectRoute());
  }, [retry, navigation]);

  const handleOnClose = useCallback(async () => {
    await complete();
    onError();
  }, [onError, complete]);

  return (
    <ScreenContainer>
      <Container style={[flex1, center]}>
        <Svg color="primary" name="error" style={theme.margins.bottom.xxl} width={72} height={72} />
        <PrimaryText style={theme.margins.bottom.l} fontSize="xl" fontWeight="bold" center>
          {pageContent?.title ?? t('reject_reasons.unknown.title')}
        </PrimaryText>
        <PrimaryText fontSize="m" center>
          {pageContent?.description ?? t('reject_reasons.unknown.description')}
        </PrimaryText>
      </Container>
      <Container style={[row, isCriticalReason ? center : spaceBetween, theme.paddings.vertical.l]}>
        <Button
          disabled={isLoading}
          style={flexShrink}
          variant="secondary"
          onPress={handleOnClose}
          label={t('buttons.close')}
        />
        {!isCriticalReason && (
          <Button
            variant="primary"
            style={[flexShrink, theme.margins.left.m]}
            onPress={handleOnRetry}
            label={t('buttons.try_again')}
          />
        )}
      </Container>
    </ScreenContainer>
  );
};

const content = (t: TFunction): Record<RejectionReasons, PageContent> => ({
  [RejectionReasons.missingDocumentPhoto]: {
    title: t('reject_reasons.missing_document_photo.title'),
    description: t('reject_reasons.missing_document_photo.description'),
  },
  [RejectionReasons.documentNotAccepted]: {
    title: t('reject_reasons.document_not_accepted.title'),
    description: t('reject_reasons.document_not_accepted.description'),
  },
  [RejectionReasons.dataDoesNotMatch]: {
    title: t('reject_reasons.data_does_not_match.title'),
    description: t('reject_reasons.data_does_not_match.description'),
  },
  [RejectionReasons.sanctioned]: {
    title: t('reject_reasons.sanctioned.title'),
    description: t('reject_reasons.sanctioned.description'),
  },
  [RejectionReasons.missingSelfiePhoto]: {
    title: t('reject_reasons.missing_selfie_photo.title'),
    description: t('reject_reasons.missing_selfie_photo.description'),
  },
  [RejectionReasons.facesDoesNotMatch]: {
    title: t('reject_reasons.faces_does_not_match.title'),
    description: t('reject_reasons.faces_does_not_match.description'),
  },
  [RejectionReasons.poorPhotoQuality]: {
    title: t('reject_reasons.poor_photo_quality.title'),
    description: t('reject_reasons.poor_photo_quality.description'),
  },
  [RejectionReasons.poorPhotoLighting]: {
    title: t('reject_reasons.poor_photo_lighting.title'),
    description: t('reject_reasons.poor_photo_lighting.description'),
  },
  [RejectionReasons.blurredPhoto]: {
    title: t('reject_reasons.blurred_photo.title'),
    description: t('reject_reasons.blurred_photo.description'),
  },
  [RejectionReasons.badMediaFormat]: {
    title: t('reject_reasons.bad_media_format.title'),
    description: t('reject_reasons.bad_media_format.description'),
  },
  [RejectionReasons.miscellaneous]: {
    title: t('reject_reasons.miscellaneous.title'),
    description: t('reject_reasons.miscellaneous.description'),
  },
  [RejectionReasons.possibleFraudAttempt]: {
    title: t('reject_reasons.possible_fraud_attempt.title'),
    description: t('reject_reasons.possible_fraud_attempt.description'),
  },
  [RejectionReasons.unrelatedPhoto]: {
    title: t('reject_reasons.unrelated_photo.title'),
    description: t('reject_reasons.unrelated_photo.description'),
  },
  [RejectionReasons.moreThanOnePerson]: {
    title: t('reject_reasons.more_than_one_person.title'),
    description: t('reject_reasons.more_than_one_person.description'),
  },
  [RejectionReasons.prohibitedCountryOrState]: {
    title: t('reject_reasons.prohibited_country_or_state.title'),
    description: t('reject_reasons.prohibited_country_or_state.description'),
  },
  [RejectionReasons.documentIsExpired]: {
    title: t('reject_reasons.document_is_expired.title'),
    description: t('reject_reasons.document_is_expired.description'),
  },
  [RejectionReasons.documentWithNonLatinCharacters]: {
    title: t('reject_reasons.document_with_non_latin_characters.title'),
    description: t('reject_reasons.document_with_non_latin_characters.description'),
  },
  [RejectionReasons.partOfDocumentIsCovered]: {
    title: t('reject_reasons.part_of_document_is_covered.title'),
    description: t('reject_reasons.part_of_document_is_covered.description'),
  },
  [RejectionReasons.underagePerson]: {
    title: t('reject_reasons.underage_person.title'),
    description: t('reject_reasons.underage_person.description'),
  },
  [RejectionReasons.partOfFaceIsCovered]: {
    title: t('reject_reasons.part_of_face_is_covered.title'),
    description: t('reject_reasons.part_of_face_is_covered.description'),
  },
  [RejectionReasons.prohibitedNationality]: {
    title: t('reject_reasons.prohibited_nationality.title'),
    description: t('reject_reasons.prohibited_nationality.description'),
  },
  [RejectionReasons.duplicatedInfo]: {
    title: t('reject_reasons.duplicated_info.title'),
    description: t('reject_reasons.duplicated_info.description'),
  },
  [RejectionReasons.nameMismatch]: {
    title: t('reject_reasons.unknown.title'),
    description: t('reject_reasons.unknown.description'),
  },
  [RejectionReasons.expirationDateMismatch]: {
    title: t('reject_reasons.unknown.title'),
    description: t('reject_reasons.unknown.description'),
  },
  [RejectionReasons.incorrectInformationProvided]: {
    title: t('reject_reasons.unknown.title'),
    description: t('reject_reasons.unknown.description'),
  },
  [RejectionReasons.docAndBioAgeDoesntMatch]: {
    title: t('reject_reasons.unknown.title'),
    description: t('reject_reasons.unknown.description'),
  },
});

export default ErrorScreen;
