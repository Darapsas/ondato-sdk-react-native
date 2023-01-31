import React, { FC } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { useThemeAwareObject } from '../theme/hooks';
import { Theme } from '../theme/types';

const Container: FC<ViewProps> = (props) => {
  const { children, style, ...rest } = props;
  const themedStyles = useThemeAwareObject(styles);

  return (
    <View {...rest} style={[themedStyles.container, style]}>
      {children}
    </View>
  );
};

const styles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      paddingHorizontal: theme.sizes.l,
    },
  });
};

export default Container;
