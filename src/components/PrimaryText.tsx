import React, { FC, useMemo } from 'react';
import { Text as RNText, TextProps, TextStyle } from 'react-native';
import { Colors, Fonts, FontSizes } from '../theme/types';
import { useTheme } from '../theme/hooks';

export interface PrimaryTextProps extends TextProps {
  fontSize?: keyof FontSizes;
  fontWeight?: keyof Fonts['primary'];
  color?: keyof Colors;
  center?: boolean;
  children: string | React.ReactNode;
}

const PrimaryText: FC<PrimaryTextProps> = (props) => {
  const { children, center, fontSize = 's', color = 'text', fontWeight = 'regular', style, ...rest } = props;
  const theme = useTheme();

  const themedStyle = useMemo<TextStyle>(
    () => ({
      color: theme.colors[color],
      textAlign: center ? 'center' : 'auto',
      ...theme.fonts.primary[fontWeight],
      ...theme.fontSizes[fontSize],
    }),
    [theme, fontSize, color, center, fontWeight]
  );

  return (
    <RNText style={[themedStyle, style]} {...rest}>
      {children}
    </RNText>
  );
};

export default PrimaryText;
