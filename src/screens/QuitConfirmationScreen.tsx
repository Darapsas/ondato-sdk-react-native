import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Container, ScreenContainer, ScreenHeader, Svg } from '../components';
import { center, flex1, flexShrink, row, spaceBetween } from '../theme/common';
import { QuitConfirmationScreenProps } from '../navigation/types';
import { useTheme } from '../theme/hooks';
import { useCallbacks } from '../core/screens-config/hooks';

const QuitConfirmationScreen: FC<QuitConfirmationScreenProps> = (props) => {
  const { navigation } = props;

  const theme = useTheme();
  const { t } = useTranslation();
  const { onClose } = useCallbacks();

  return (
    <ScreenContainer style={[theme.paddings.top.xxl, theme.paddings.bottom.l]}>
      <ScreenHeader title={t('quit_confirmation.title')} description={t('quit_confirmation.description')} />
      <Container style={[flex1, center]}>
        <Svg color="primary" name="quitConfirmation" />
      </Container>
      <Container style={[row, spaceBetween, theme.paddings.top.l]}>
        <Button
          style={[theme.margins.right.m, flexShrink]}
          onPress={onClose}
          variant="secondary"
          label={t('buttons.quit')}
        />
        <Button style={flexShrink} onPress={navigation.goBack} label={t('buttons.continue')} />
      </Container>
    </ScreenContainer>
  );
};

export default QuitConfirmationScreen;
