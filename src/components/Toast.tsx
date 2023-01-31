import React, { FC } from 'react';
import { ErrorToast, default as RNToast, ToastConfig } from 'react-native-toast-message';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, useThemeAwareObject } from '../theme/hooks';
import { Theme } from '../theme/types';
import { StyleSheet } from 'react-native';

const toastConfig = (theme: Theme): ToastConfig => ({
  error: (props) => <ErrorToast {...props} text1Style={styles(theme).title} />,
});

const Toast: FC = () => {
  const { top } = useSafeAreaInsets();
  const theme = useTheme();
  const config = useThemeAwareObject(toastConfig);

  return <RNToast config={config} position="top" bottomOffset={top + theme.sizes.l} />;
};

const styles = (theme: Theme) => {
  return StyleSheet.create({
    title: {
      ...theme.fonts.primary.bold,
      ...theme.fontSizes.m,
      color: theme.colors.text,
    },
  });
};

export default Toast;
