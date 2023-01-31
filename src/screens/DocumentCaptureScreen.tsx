import React, { FC, useMemo, useRef } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { PhotoFile, Camera as RNCamera } from 'react-native-vision-camera';
import { TFunction } from 'i18next';
import { Button, Camera, Container, FlowScreenContainer, PrimaryText, Svg } from '../components';
import {
  DocumentCaptureScreenProps,
  documentPrepareRoute,
  documentPreviewRoute,
  loadingRoute,
} from '../navigation/types';
import { flex1, row, spaceBetween } from '../theme/common';
import { Theme } from '../theme/types';
import { useThemeAwareObject } from '../theme/hooks';
import { useAppSelector } from '../core/store';
import { useTheme } from '../theme/hooks';
import { selectDocuments, selectIsSelfieWithDocumentEnabled } from '../modules/kyc/selectors';
import { BaseDocumentId, DocumentSideId, DocumentVariant } from '../modules/kyc/types';
import { reset } from '../navigation/actions';
import { IconName } from '../components/Svg';

const DocumentCaptureScreen: FC<DocumentCaptureScreenProps> = (props) => {
  const { navigation, route } = props;
  const { params } = route;
  const { variant } = params;

  const isSelfieWithDocumentEnabled = useAppSelector(selectIsSelfieWithDocumentEnabled);
  const documents = useAppSelector(selectDocuments);

  const isFocused = useIsFocused();
  const { t } = useTranslation();
  const theme = useTheme();
  const themedStyles = useThemeAwareObject(styles);
  const cameraRef = useRef<RNCamera>(null);

  const { title, iconName, cropDimensions } = useMemo(
    () => ({
      title: pageTitle(t)[variant.id][variant.sideId],
      iconName: pageIconName[variant.id][variant.sideId],
      cropDimensions: variant.id === 'SelfieWithDoc' ? { x: 5, y: 4 } : undefined,
    }),
    [variant, t]
  );

  const handleNavigation = (photo: PhotoFile) => {
    const currentDocument = documents.find((document) => document.id === variant.id);

    if (currentDocument || variant.id === 'SelfieWithDoc') {
      navigation.push(documentPreviewRoute, { variant, photo });
      return;
    }

    if (isSelfieWithDocumentEnabled && variant.id === 'Selfie') {
      const selfieWithDocumentVariant: DocumentVariant = { id: 'SelfieWithDoc', sideId: 'Front' };
      navigation.dispatch(reset(documentPrepareRoute, { variant: selfieWithDocumentVariant }));
      return;
    }

    navigation.dispatch(reset(loadingRoute));
  };

  const handleCapture = async () => {
    if (!cameraRef.current) {
      return;
    }
    const photo = await cameraRef.current.takePhoto();
    handleNavigation(photo);
  };

  return (
    <FlowScreenContainer>
      <Container style={theme.paddings.bottom.l}>
        <PrimaryText fontSize="xl" fontWeight="bold" center>
          {title}
        </PrimaryText>
      </Container>
      <View style={[flex1, themedStyles.cameraContainer]}>
        {isFocused && (
          <Camera
            isFrontCamera={variant.id === 'SelfieWithDoc'}
            cropDimensions={cropDimensions}
            iconHeight={80}
            iconName={iconName}
            style={flex1}
            ref={cameraRef}
          />
        )}
        <Container style={[spaceBetween, row, themedStyles.footer]}>
          <TouchableOpacity onPress={navigation.goBack}>
            <Svg color="white" name="help" width={32} height={32} />
          </TouchableOpacity>
          <Button onPress={handleCapture} label={t('buttons.capture')} />
          <View style={themedStyles.iconPlaceholder} />
        </Container>
      </View>
    </FlowScreenContainer>
  );
};

const styles = (theme: Theme) => {
  return StyleSheet.create({
    cameraContainer: {
      position: 'relative',
      backgroundColor: theme.colors.black,
    },
    iconPlaceholder: {
      width: 32,
    },
    footer: {
      position: 'absolute',
      bottom: theme.sizes.l,
      left: 0,
      right: 0,
    },
  });
};

const pageTitle = (t: TFunction): Record<BaseDocumentId, Record<DocumentSideId, string | null>> => ({
  IdCard: {
    Front: t('document_capture.id_card.front.title'),
    Back: t('document_capture.id_card.back.title'),
  },
  DriverLicense: {
    Front: t('document_capture.driving_license.front.title'),
    Back: t('document_capture.driving_license.back.title'),
  },
  Passport: {
    Front: t('document_capture.passport.title'),
    Back: null,
  },
  Selfie: {
    Front: t('document_capture.selfie.title'),
    Back: null,
  },
  SelfieWithDoc: {
    Front: t('document_capture.document_with_selfie.title'),
    Back: null,
  },
});

const pageIconName: Record<BaseDocumentId, Record<DocumentSideId, IconName | undefined>> = {
  IdCard: {
    Front: 'idCardFrontFrameWhite',
    Back: 'idCardBackFrameWhite',
  },
  DriverLicense: {
    Front: 'drivingLicenseFrontFrameWhite',
    Back: 'drivingLicenseBackFrameWhite',
  },
  Passport: {
    Front: 'passportFrontFrameWhite',
    Back: undefined,
  },
  Selfie: {
    Front: undefined,
    Back: undefined,
  },
  SelfieWithDoc: {
    Front: 'documentWithSelfieFrontFrameWhite',
    Back: undefined,
  },
};

export default DocumentCaptureScreen;
