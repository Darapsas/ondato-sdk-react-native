import React, { FC, ReactNode, useMemo } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { DeviceUtils, DimensionsUtils } from '../utils';

export interface Dimensions {
  x: number;
  y: number;
}

export interface DimensionContainerProps {
  style?: StyleProp<ViewStyle>;
  dimensions?: Dimensions;
  children?: ReactNode;
  width?: number;
}

const DimensionContainer: FC<DimensionContainerProps> = (props) => {
  const { style, dimensions = { x: 3, y: 2 }, children, width = DeviceUtils.windowWidth } = props;

  const containerStyle = useMemo<ViewStyle>(
    () => ({
      height: DimensionsUtils.getHeight(width, dimensions),
    }),
    [dimensions, width]
  );

  return <View style={[containerStyle, style]}>{children}</View>;
};

export default DimensionContainer;
