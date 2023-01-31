import React, { FC } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Theme } from '../theme/types';
import { useThemeAwareObject } from '../theme/hooks';

export interface ProgressBarProps {
  progress: number;
  style?: StyleProp<ViewStyle>;
}

const ProgressBar: FC<ProgressBarProps> = (props) => {
  const { style, progress } = props;
  const themedStyles = useThemeAwareObject(styles);

  return (
    <View style={[themedStyles.container, style]}>
      <View style={[themedStyles.bar, { width: `${progress}%` }]} />
    </View>
  );
};

const styles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      height: 4,
      backgroundColor: theme.colors.lightGrey,
    },
    bar: {
      flex: 1,
      backgroundColor: theme.colors.primary,
    },
  });
};

export default ProgressBar;
