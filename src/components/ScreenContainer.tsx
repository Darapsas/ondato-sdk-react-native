import React, { FC } from 'react';
import { SafeAreaView, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { flex1 } from '../theme/common';
import { Theme } from '../theme/types';
import { useThemeAwareObject } from '../theme/hooks';

export interface ScreenContainerProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const ScreenContainer: FC<ScreenContainerProps> = (props) => {
  const { children, style } = props;
  const themedStyles = useThemeAwareObject(styles);

  return (
    <SafeAreaView style={[themedStyles.container, flex1]}>
      <View style={[flex1, style]}>{children}</View>
    </SafeAreaView>
  );
};

const styles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
    },
  });
};

export default ScreenContainer;
