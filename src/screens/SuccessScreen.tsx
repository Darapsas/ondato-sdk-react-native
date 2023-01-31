import React, { FC, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../theme/hooks';
import { useCallbacks } from '../core/screens-config/hooks';
import { SuccessScreenProps } from '../navigation/types';
import { Button, Container, PrimaryText, ScreenContainer, Svg } from '../components';
import { center, flex1 } from '../theme/common';
import { useCompleteIdentification } from '../hooks';

const SuccessScreen: FC<SuccessScreenProps> = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { onSuccess } = useCallbacks();
  const { complete, isLoading } = useCompleteIdentification();
  const [timeLeft, setTimeLeft] = useState<number>(3);

  const handleOnContinue = useCallback(async () => {
    await complete();
    onSuccess();
  }, [complete, onSuccess]);

  const decreaseCount = useCallback(async () => {
    if (timeLeft === 0) {
      await handleOnContinue();
    }

    setTimeLeft((prevState) => prevState - 1);
  }, [timeLeft, handleOnContinue]);

  useEffect(() => {
    const timer = setInterval(decreaseCount, 1000);
    return () => clearInterval(timer);
  }, [decreaseCount]);

  return (
    <ScreenContainer>
      <Container style={[flex1, center]}>
        <Svg color="primary" name="success" style={theme.margins.bottom.xxl} width={72} height={72} />
        <PrimaryText style={theme.margins.bottom.l} fontSize="xl" fontWeight="bold" center>
          {t('success.title')}
        </PrimaryText>
        <PrimaryText fontSize="m" center>
          {t('success.description')}
        </PrimaryText>
      </Container>
      <Container style={[center, theme.paddings.vertical.l]}>
        <Button disabled={isLoading} onPress={handleOnContinue} label={t('buttons.continue_in', { count: timeLeft })} />
      </Container>
    </ScreenContainer>
  );
};

export default SuccessScreen;
