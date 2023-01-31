import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, View } from 'react-native';
import { ConsentScreenProps } from '../navigation/types';
import { Button, Container, PrimaryText, ScreenContainer, Svg } from '../components';
import { center, flexShrink, itemsStart, row, spaceBetween } from '../theme/common';
import { ScrollUtils } from '../utils';
import { useAppSelector } from '../core/store';
import { useConsent, useLogging } from '../hooks';
import { useTheme } from '../theme/hooks';
import { selectAfterConsentRouteName } from '../modules/kyc/selectors';
import { LogActions } from '../api/clients/identity/constants';
import { useCallbacks } from '../core/screens-config/hooks';
import { reset } from '../navigation/actions';

const ConsentScreen: FC<ConsentScreenProps> = (props) => {
  const { navigation } = props;
  const nextRouteName = useAppSelector(selectAfterConsentRouteName);

  const { onClose } = useCallbacks();
  const { log } = useLogging();
  const theme = useTheme();
  const { t } = useTranslation();
  const { consent, isLoading } = useConsent();

  const [isEndReached, setIsEndReached] = useState<boolean>(false);

  useEffect(() => {
    log(LogActions.termsShown);
  }, [log]);

  const handleOnScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isEndReached) {
      return;
    }
    const isCloseToBottom = ScrollUtils.isCloseToBottom(event.nativeEvent);
    if (isCloseToBottom) {
      setIsEndReached(true);
    }
  };

  const handleOnAgree = async () => {
    await consent({ isConsented: true });
    log(LogActions.termsAgreed);
    navigation.dispatch(reset(nextRouteName));
  };

  const handleOnDisagree = async () => {
    await consent({ isConsented: false });
    log(LogActions.termsDisagreed);
    onClose();
  };

  const renderListItem = (text: string) => (
    <View style={[row, itemsStart]}>
      <PrimaryText style={[styles.bullet, theme.margins.right.s]}>{'\u2B24'}</PrimaryText>
      <PrimaryText fontSize="s">{text}</PrimaryText>
    </View>
  );

  return (
    <ScreenContainer style={[theme.paddings.top.xxl, theme.paddings.bottom.l]}>
      <Container style={theme.paddings.bottom.l}>
        <PrimaryText fontSize="xl" fontWeight="bold" center>
          {t('consent.title')}
        </PrimaryText>
      </Container>
      <ScrollView
        onScroll={handleOnScroll}
        contentContainerStyle={[theme.paddings.horizontal.l, theme.paddings.bottom.l]}
      >
        <PrimaryText style={theme.margins.bottom.m} fontSize="l" fontWeight="bold">
          {t('consent.section_title1')}
        </PrimaryText>
        <View style={theme.margins.bottom.xl}>
          {renderListItem(t('consent.item1'))}
          {renderListItem(t('consent.item2'))}
          {renderListItem(t('consent.item3'))}
        </View>
        <PrimaryText style={theme.margins.bottom.m} fontSize="l" fontWeight="bold">
          {t('consent.section_title2')}
        </PrimaryText>
        <PrimaryText style={theme.margins.bottom.s} fontSize="s" fontWeight="bold">
          {t('consent.paragraph_title1')}
        </PrimaryText>
        <PrimaryText style={theme.margins.bottom.xl} fontSize="s">
          {t('consent.paragraph1')}
        </PrimaryText>
        <PrimaryText style={theme.margins.bottom.s} fontSize="s" fontWeight="bold">
          {t('consent.paragraph_title2')}
        </PrimaryText>
        <PrimaryText style={theme.margins.bottom.xl} fontSize="s">
          {t('consent.paragraph2')}
        </PrimaryText>
        <PrimaryText style={theme.margins.bottom.s} fontSize="s" fontWeight="bold">
          {t('consent.paragraph_title3')}
        </PrimaryText>
        <PrimaryText style={theme.margins.bottom.m} fontSize="s">
          {t('consent.paragraph3')}
        </PrimaryText>
        <PrimaryText style={theme.margins.bottom.xxl} fontSize="s">
          {t('consent.paragraph4')}
        </PrimaryText>
        <View style={[row, center]}>
          <View style={[theme.margins.right.xxl, center]}>
            <Svg name="iso" style={theme.margins.bottom.m} />
            <Svg name="gdpr" />
          </View>
          <View style={center}>
            <Svg name="ibeta" style={theme.margins.bottom.m} />
            <Svg name="ibeta" />
          </View>
        </View>
      </ScrollView>
      <Container style={[row, spaceBetween, theme.paddings.top.l]}>
        <Button
          style={[theme.margins.right.m, flexShrink]}
          disabled={isLoading}
          onPress={handleOnDisagree}
          variant="secondary"
          label={t('buttons.disagree')}
        />
        <Button
          style={flexShrink}
          disabled={!isEndReached || isLoading}
          onPress={handleOnAgree}
          label={t('buttons.start')}
        />
      </Container>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  bullet: {
    fontSize: 8,
  },
});

export default ConsentScreen;
