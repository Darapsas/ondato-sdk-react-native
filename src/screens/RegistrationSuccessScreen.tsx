import React, { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { RegistrationSuccessScreenProps } from '../navigation/types';
import { Button, Container, PrimaryText, ScreenContainer, Svg } from '../components';
import { center, flex1 } from '../theme/common';
import { useTheme } from '../theme/hooks';
import { useCallbacks } from '../core/screens-config/hooks';
import { useCompleteIdentification } from '../hooks';

const RegistrationSuccessScreen: FC<RegistrationSuccessScreenProps> = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { onSuccess } = useCallbacks();
  const { complete, isLoading } = useCompleteIdentification();

  const handleOnClose = useCallback(async () => {
    await complete();
    onSuccess();
  }, [complete, onSuccess]);

  return (
    <ScreenContainer>
      <Container style={[flex1, center]}>
        <Svg color="primary" name="success" style={theme.margins.bottom.xxl} width={72} height={72} />
        <PrimaryText style={theme.margins.bottom.l} fontSize="xl" fontWeight="bold" center>
          {t('registration_success.title')}
        </PrimaryText>
        <PrimaryText fontSize="m" center>
          {t('registration_success.description')}
        </PrimaryText>
      </Container>
      <Container style={[center, theme.paddings.vertical.l]}>
        <Button disabled={isLoading} onPress={handleOnClose} label={t('buttons.close')} />
      </Container>
    </ScreenContainer>
  );
};

export default RegistrationSuccessScreen;
