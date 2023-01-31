import React, { FC, useEffect, useMemo } from 'react';
import { ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import { documentCaptureRoute, DocumentPrepareScreenProps, selfieCaptureRoute } from '../navigation/types';
import { Button, Container, FlowScreenContainer, MistakesListItem, PrimaryText, Svg } from '../components';
import { center, flexShrink, row, rowStart, spaceBetween } from '../theme/common';
import { Mistake } from '../api/types';
import { useTheme } from '../theme/hooks';
import { BaseDocumentId, DocumentSideId } from '../modules/kyc/types';
import { useLogging } from '../hooks';
import { LogActions } from '../api/clients/identity/constants';
import { IconName } from '../components/Svg';
import { reset } from '../navigation/actions';

const DocumentPrepareScreen: FC<DocumentPrepareScreenProps> = (props) => {
  const { navigation, route } = props;
  const { params } = route;
  const { variant } = params;

  const { log } = useLogging();
  const theme = useTheme();
  const { t } = useTranslation();
  const canGoBack = navigation.canGoBack();

  const { title, description, iconName, mistakes, iconSize } = useMemo(
    () => ({
      title: pageTitle(t)[variant.id][variant.sideId],
      description: pageDescription(t)[variant.id][variant.sideId],
      iconName: pageIconName[variant.id][variant.sideId],
      iconSize: pageIconSize[variant.id],
      mistakes: pageMistakes(t)[variant.id],
    }),
    [variant, t]
  );

  useEffect(() => {
    if (variant.id === 'SelfieWithDoc') {
      log(LogActions.selfieWithDocumentPage);
    }
    if (variant.id === 'IdCard' && variant.sideId === 'Front') {
      log(LogActions.idCardFrontPage);
    }
    if (variant.id === 'IdCard' && variant.sideId === 'Back') {
      log(LogActions.idCardBackPage);
    }
    if (variant.id === 'Passport' && variant.sideId === 'Front') {
      log(LogActions.passportFrontPage);
    }
    if (variant.id === 'Passport' && variant.sideId === 'Back') {
      log(LogActions.passportBackPage);
    }
    if (variant.id === 'DriverLicense' && variant.sideId === 'Front') {
      log(LogActions.driverLicenseFrontPage);
    }
    if (variant.id === 'Passport' && variant.sideId === 'Back') {
      log(LogActions.driverLicenseBackPage);
    }
  }, [log, variant]);

  const handleOnStart = () => {
    if (variant.id === 'Selfie') {
      navigation.dispatch(reset(selfieCaptureRoute));
      return;
    }

    if (variant.id === 'SelfieWithDoc') {
      navigation.push(documentCaptureRoute, { variant });
      return;
    }

    navigation.push(documentCaptureRoute, { variant });
  };

  return (
    <FlowScreenContainer style={theme.paddings.bottom.l}>
      <Container style={theme.paddings.bottom.m}>
        <PrimaryText fontSize="xl" fontWeight="bold" center>
          {title}
        </PrimaryText>
      </Container>
      <ScrollView contentContainerStyle={theme.paddings.horizontal.l}>
        <PrimaryText style={theme.margins.bottom.xxl} fontSize="s" center>
          {description}
        </PrimaryText>
        {!!iconName && (
          <View style={center}>
            <Svg {...iconSize} color="primary" name={iconName} />
          </View>
        )}
        {mistakes.length > 0 && (
          <View style={theme.margins.top.xxl}>
            <PrimaryText style={theme.margins.bottom.m} fontSize="s" center>
              {t('mistakes.title')}
            </PrimaryText>
            <View style={[rowStart, spaceBetween]}>
              {mistakes.map((mistake, index) => (
                <MistakesListItem iconHeight={variant.id === 'Selfie' ? 92 : undefined} mistake={mistake} key={index} />
              ))}
            </View>
          </View>
        )}
      </ScrollView>
      <Container style={[row, canGoBack ? spaceBetween : center, theme.paddings.top.l]}>
        {canGoBack && (
          <Button
            style={[theme.margins.right.m, flexShrink]}
            onPress={navigation.goBack}
            variant="secondary"
            label={t('buttons.go_back')}
          />
        )}
        <Button style={flexShrink} onPress={handleOnStart} label={t('buttons.start')} />
      </Container>
    </FlowScreenContainer>
  );
};

const pageTitle = (t: TFunction): Record<BaseDocumentId, Record<DocumentSideId, string | null>> => ({
  IdCard: {
    Front: t('document_preparation.id_card.front.title'),
    Back: t('document_preparation.id_card.back.title'),
  },
  DriverLicense: {
    Front: t('document_preparation.driving_license.front.title'),
    Back: t('document_preparation.driving_license.back.title'),
  },
  Passport: {
    Front: t('document_preparation.passport.title'),
    Back: null,
  },
  Selfie: {
    Front: t('document_preparation.selfie.title'),
    Back: null,
  },
  SelfieWithDoc: {
    Front: t('document_preparation.document_with_selfie.title'),
    Back: null,
  },
});

const pageDescription = (t: TFunction): Record<BaseDocumentId, Record<DocumentSideId, string | null>> => ({
  IdCard: {
    Front: t('document_preparation.id_card.front.description'),
    Back: t('document_preparation.id_card.back.description'),
  },
  DriverLicense: {
    Front: t('document_preparation.driving_license.front.description'),
    Back: t('document_preparation.driving_license.back.description'),
  },
  Passport: {
    Front: t('document_preparation.passport.description'),
    Back: null,
  },
  Selfie: {
    Front: t('document_preparation.selfie.description'),
    Back: null,
  },
  SelfieWithDoc: {
    Front: t('document_preparation.document_with_selfie.description'),
    Back: null,
  },
});

const pageIconName: Record<BaseDocumentId, Record<DocumentSideId, IconName | undefined>> = {
  IdCard: {
    Front: 'idCardFront',
    Back: 'idCardBack',
  },
  DriverLicense: {
    Front: 'drivingLicenseFront',
    Back: 'drivingLicenseBack',
  },
  Passport: {
    Front: 'passportFront',
    Back: undefined,
  },
  Selfie: {
    Front: 'selfieFront',
    Back: undefined,
  },
  SelfieWithDoc: {
    Front: 'documentWithSelfieFront',
    Back: undefined,
  },
};

const pageIconSize: Record<BaseDocumentId, { width: number; height: number } | undefined> = {
  IdCard: { width: 258, height: 203 },
  DriverLicense: { width: 258, height: 203 },
  Passport: { width: 167, height: 212 },
  Selfie: { width: 220, height: 227 },
  SelfieWithDoc: { width: 231, height: 238 },
};

const pageMistakes = (t: TFunction): Record<BaseDocumentId, Mistake[]> => ({
  IdCard: [
    { iconName: 'cardTooBlurry', label: t('mistakes.too_blurry') },
    { iconName: 'cardTooSmall', label: t('mistakes.too_small') },
    { iconName: 'cardTooDark', label: t('mistakes.too_dark') },
  ],
  DriverLicense: [
    { iconName: 'cardTooBlurry', label: t('mistakes.too_blurry') },
    { iconName: 'cardTooSmall', label: t('mistakes.too_small') },
    { iconName: 'cardTooDark', label: t('mistakes.too_dark') },
  ],
  Passport: [
    { iconName: 'passportTooBlurry', label: t('mistakes.too_blurry') },
    { iconName: 'passportTooSmall', label: t('mistakes.too_small') },
    { iconName: 'passportTooDark', label: t('mistakes.too_dark') },
  ],
  Selfie: [
    { iconName: 'selfieTooBlurry', label: t('mistakes.too_blurry') },
    { iconName: 'selfieBadLighting', label: t('mistakes.bad_lightning') },
    { iconName: 'selfieNotNeutral', label: t('mistakes.not_a_neutral_face') },
  ],
  SelfieWithDoc: [],
});

export default DocumentPrepareScreen;
