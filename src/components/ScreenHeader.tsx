import React, { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Container from './Container';
import PrimaryText from './PrimaryText';
import { useTheme } from '../theme/hooks';

export interface ScreenHeaderProps {
  title: string;
  description?: string | null;
  style?: StyleProp<ViewStyle>;
}

const ScreenHeader: FC<ScreenHeaderProps> = (props) => {
  const { description, title, style } = props;
  const theme = useTheme();

  return (
    <Container style={style}>
      <PrimaryText style={theme.margins.bottom.m} fontSize="xl" fontWeight="bold" center>
        {title}
      </PrimaryText>
      {description && (
        <PrimaryText fontSize="s" center>
          {description}
        </PrimaryText>
      )}
    </Container>
  );
};

export default ScreenHeader;
