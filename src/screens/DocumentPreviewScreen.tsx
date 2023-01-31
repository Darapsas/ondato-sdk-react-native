import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { documentPrepareRoute, DocumentPreviewScreenProps, loadingRoute } from '../navigation/types';
import { Button, Container, DimensionContainer, FlowScreenContainer, PrimaryText, Svg } from '../components';
import { center, flex1, flexShrink, row, spaceBetween } from '../theme/common';
import { useUploadAdditionalDocument, useUploadDocument } from '../hooks';
import { DeviceUtils, FileUtils } from '../utils';
import { useTheme } from '../theme/hooks';
import { BaseDocumentId, DocumentSideId, DocumentVariant } from '../modules/kyc/types';
import { useAppSelector } from '../core/store';
import { selectDocuments, selectIsSelfieEnabled, selectIsSelfieWithDocumentEnabled } from '../modules/kyc/selectors';
import { reset } from '../navigation/actions';
import { IconName } from '../components/Svg';

const DocumentPreviewScreen: FC<DocumentPreviewScreenProps> = (props) => {
  const { navigation, route } = props;
  const { params } = route;
  const { variant, photo } = params;

  const isSelfieWithDocumentEnabled = useAppSelector(selectIsSelfieWithDocumentEnabled);
  const documents = useAppSelector(selectDocuments);
  const isSelfieEnabled = useAppSelector(selectIsSelfieEnabled);

  const theme = useTheme();
  const { t } = useTranslation();
  const { uploadDocument } = useUploadDocument();
  const { uploadAdditionalDocument } = useUploadAdditionalDocument();
  const currentDocument = useMemo(
    () => documents.find((document) => document.id === variant.id),
    [documents, variant.id]
  );
  const imageWidth = useMemo(() => DeviceUtils.windowWidth - theme.sizes.l * 2, [theme]);

  const { iconName, dimensions } = useMemo(
    () => ({
      iconName: documentIconName[variant.id][variant.sideId],
      dimensions: variant.id === 'SelfieWithDoc' ? { x: 1, y: 1 } : undefined,
    }),
    [variant]
  );

  const handleNavigationAfterSubmit = () => {
    if (currentDocument) {
      const sidesIds = currentDocument.sidesIds;
      const sideIdIndex = sidesIds.findIndex((sideId) => sideId === variant.sideId);
      const hasNext = sideIdIndex < sidesIds.length - 1;

      if (hasNext) {
        const nextSideVariant: DocumentVariant = { id: variant.id, sideId: sidesIds[sideIdIndex + 1] };
        navigation.dispatch(reset(documentPrepareRoute, { variant: nextSideVariant }));
        return;
      }
    }

    if (isSelfieEnabled && variant.id !== 'Selfie' && variant.id !== 'SelfieWithDoc') {
      const selfieVariant: DocumentVariant = { id: 'Selfie', sideId: 'Front' };
      navigation.dispatch(reset(documentPrepareRoute, { variant: selfieVariant }));
      return;
    }

    if (isSelfieWithDocumentEnabled && variant.id !== 'SelfieWithDoc') {
      const selfieWithDocumentVariant: DocumentVariant = { id: 'SelfieWithDoc', sideId: 'Front' };
      navigation.dispatch(reset(documentPrepareRoute, { variant: selfieWithDocumentVariant }));
      return;
    }

    navigation.dispatch(reset(loadingRoute));
  };

  const onUpload = async () => {
    const base64Image = await FileUtils.getBase64File(photo.path);
    const fileType = FileUtils.getImageFileType();

    if (currentDocument) {
      await uploadDocument({
        part: variant.sideId,
        type: currentDocument.id,
        imageFileType: fileType,
        imageBase64: base64Image,
      });
    } else if (variant.id === 'SelfieWithDoc') {
      await uploadAdditionalDocument({
        imageFileType: fileType,
        imageBase64: base64Image,
        type: 'SelfieWithDoc',
      });
    }

    handleNavigationAfterSubmit();
  };

  return (
    <FlowScreenContainer style={theme.paddings.bottom.l}>
      <Container style={flex1}>
        <PrimaryText style={theme.paddings.bottom.m} fontSize="xl" fontWeight="bold" center>
          {t('document_preview.title')}
        </PrimaryText>
        <PrimaryText style={theme.paddings.bottom.l} fontSize="s" center>
          {t('document_preview.description')}
        </PrimaryText>
        <DimensionContainer width={imageWidth} dimensions={dimensions}>
          <ImageBackground
            style={[styles.imageContainer, { width: imageWidth }]}
            imageStyle={[styles.image, { width: imageWidth }]}
            source={{ uri: FileUtils.getImageUri(photo.path) }}
          />
        </DimensionContainer>
        {!!iconName && (
          <View style={[center, theme.margins.top.l]}>
            <Svg color="text" name={iconName} width={109} />
          </View>
        )}
      </Container>
      <Container style={[row, spaceBetween, theme.paddings.top.l]}>
        <Button
          style={[theme.margins.right.m, flexShrink]}
          onPress={navigation.goBack}
          variant="secondary"
          label={t('buttons.try_again')}
        />
        <Button style={flexShrink} onPress={onUpload} label={t('buttons.continue')} />
      </Container>
    </FlowScreenContainer>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    overflow: 'hidden',
    height: '100%',
  },
  image: {
    height: 400,
  },
});

const documentIconName: Record<BaseDocumentId, Record<DocumentSideId, IconName | undefined>> = {
  IdCard: {
    Front: 'idCardFrontFrame',
    Back: 'idCardBackFrame',
  },
  DriverLicense: {
    Front: 'drivingLicenseFrontFrame',
    Back: 'drivingLicenseBackFrame',
  },
  Passport: {
    Front: 'passportFrontFrame',
    Back: undefined,
  },
  Selfie: {
    Front: undefined,
    Back: undefined,
  },
  SelfieWithDoc: {
    Front: undefined,
    Back: undefined,
  },
};

export default DocumentPreviewScreen;
