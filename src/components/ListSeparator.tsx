import React, { FC, useMemo } from 'react';
import { StyleProp, TextStyle, View, ViewStyle } from 'react-native';
import { Colors } from '../theme/types';
import { useTheme } from '../theme/hooks';

export interface ListSeparatorProps {
  color?: keyof Colors;
  height?: number;
  style?: StyleProp<ViewStyle>;
}

const ListSeparator: FC<ListSeparatorProps> = (props) => {
  const { style, color = 'lightGrey', height = 2 } = props;
  const theme = useTheme();

  const themedStyle = useMemo<TextStyle>(
    () => ({
      backgroundColor: theme.colors[color],
      height,
    }),
    [height, color, theme]
  );

  return <View style={[themedStyle, style]} />;
};

export default ListSeparator;
