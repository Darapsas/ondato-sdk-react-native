import React, { FC } from 'react';
import { View } from 'react-native';
import Svg from './Svg';
import { center, flex1 } from '../theme/common';

const Splash: FC = () => {
  return (
    <View style={[flex1, center]}>
      <Svg color="primary" name="logo" height={104} />
    </View>
  );
};

export default Splash;
