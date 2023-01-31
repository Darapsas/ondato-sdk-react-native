import { StatusBar as RNStatusBar } from 'react-native';
import React, { FC } from 'react';
import { useTheme } from '../theme/hooks';

const StatusBar: FC = () => {
  const theme = useTheme();

  return <RNStatusBar animated backgroundColor={theme.colors.primary} />;
};

export default StatusBar;
