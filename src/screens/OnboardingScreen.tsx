import React, { FC, useMemo } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { languagesRoute, OnboardingScreenProps } from '../navigation/types';
import { Button, Container, PrimaryText, ScreenContainer, Svg } from '../components';
import { center, flex1, flexEnd, row } from '../theme/common';
import { Theme } from '../theme/types';
import { useTheme, useThemeAwareObject } from '../theme/hooks';
import { useAppSelector } from '../core/store';
import { selectAfterOnboardingRouteName } from '../modules/kyc/selectors';
import { IconName } from '../components/Svg';

interface OnboardingStep {
  iconName: IconName;
  label: string;
}

const OnboardingScreen: FC<OnboardingScreenProps> = (props) => {
  const { navigation } = props;
  const nextRouteName = useAppSelector(selectAfterOnboardingRouteName);

  const { t } = useTranslation();
  const theme = useTheme();
  const themedStyles = useThemeAwareObject(styles);

  const steps = useMemo<OnboardingStep[]>(
    () => [
      { iconName: 'onboardingDocument', label: t('onboarding.choose_document') },
      { iconName: 'photoDocument', label: t('onboarding.take_a_photo_of_your_document') },
      { iconName: 'selfie', label: t('onboarding.take_a_selfie') },
    ],
    [t]
  );

  const handleOnStart = () => {
    navigation.push(nextRouteName);
  };

  return (
    <ScreenContainer style={[theme.paddings.top.m, theme.paddings.bottom.l]}>
      <View style={[row, flexEnd, theme.margins.bottom.s]}>
        <TouchableOpacity onPress={() => navigation.navigate(languagesRoute)} style={[themedStyles.container, center]}>
          <PrimaryText fontSize="s" fontWeight="bold" color="white">
            {i18n.language}
          </PrimaryText>
        </TouchableOpacity>
      </View>
      <Container style={theme.paddings.bottom.l}>
        <PrimaryText fontSize="xl" fontWeight="bold">
          {t('onboarding.title')}
        </PrimaryText>
      </Container>
      <ScrollView contentContainerStyle={theme.paddings.horizontal.l}>
        <PrimaryText style={theme.margins.bottom.xxl} fontSize="s">
          {t('onboarding.description')}
        </PrimaryText>
        {steps.map((step, index) => (
          <View key={index} style={[row, theme.margins.bottom.m]}>
            <Svg width={103} height={103} color="primary" name={step.iconName} style={theme.margins.right.l} />
            <PrimaryText style={flex1} fontSize="m">
              {`${index + 1}. ${step.label}`}
            </PrimaryText>
          </View>
        ))}
      </ScrollView>
      <Container style={[center, theme.paddings.top.l]}>
        <Button onPress={handleOnStart} label={t('buttons.start')} />
      </Container>
    </ScreenContainer>
  );
};

const styles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      height: 50,
      borderBottomLeftRadius: 25,
      borderTopLeftRadius: 25,
      backgroundColor: theme.colors.primary,
      ...theme.paddings.right.xs,
      ...theme.paddings.left.s,
    },
  });
};

export default OnboardingScreen;
