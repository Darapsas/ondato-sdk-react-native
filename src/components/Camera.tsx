import React, { forwardRef, useMemo } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { CameraDevice, Camera as RNCamera } from 'react-native-vision-camera';
import hexToRgba from 'hex-to-rgba';
import DimensionContainer, { Dimensions } from './DimensionContainer';
import Svg, { IconName } from './Svg';
import { useCameraPermissions } from '../hooks';
import { center, flex1, fullHeight, fullWidth, itemsStretch, row } from '../theme/common';
import { Theme } from '../theme/types';
import { useTheme, useThemeAwareObject } from '../theme/hooks';

export interface CameraProps {
  iconName?: IconName;
  iconHeight?: number;
  style?: StyleProp<ViewStyle>;
  cropDimensions?: Dimensions;
  isFrontCamera?: boolean;
}

const Camera = forwardRef<RNCamera, CameraProps>((props, ref) => {
  const { style, iconName, isFrontCamera = true, iconHeight = 0, cropDimensions = { x: 3, y: 2 } } = props;

  const { backDevice, frontDevice } = useCameraPermissions();
  const theme = useTheme();
  const themedStyles = useThemeAwareObject(styles);

  const device = useMemo<CameraDevice | undefined>(
    () => (isFrontCamera ? frontDevice : backDevice),
    [isFrontCamera, backDevice, frontDevice]
  );

  const footerStyle = useMemo<ViewStyle>(
    () => ({
      paddingBottom: 46 + iconHeight + theme.sizes.l * 2,
    }),
    [theme, iconHeight]
  );

  return (
    <View style={[themedStyles.container, style]}>
      {!!device && <RNCamera photo ref={ref} style={flex1} device={device} isActive />}
      <View style={themedStyles.overlay}>
        <View style={[themedStyles.overlayBackground, themedStyles.overlayHeader]} />
        <View style={[row, itemsStretch]}>
          <View style={[themedStyles.overlayBackground, themedStyles.sideOverlay]} />
          <DimensionContainer style={themedStyles.crop} dimensions={cropDimensions} />
          <View style={[themedStyles.overlayBackground, themedStyles.sideOverlay]} />
        </View>
        <View style={[themedStyles.overlayBackground, themedStyles.overlayFooter, footerStyle]}>
          {!!iconName && <Svg style={themedStyles.bottomIcon} name={iconName} height={iconHeight} />}
        </View>
      </View>
    </View>
  );
});

const styles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      position: 'relative',
      backgroundColor: theme.colors.black,
    },
    crop: {
      ...flex1,
      borderWidth: 4,
      borderStyle: 'dashed',
      borderRadius: 6,
      borderColor: theme.colors.white,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      ...center,
    },
    overlayBackground: {
      backgroundColor: hexToRgba(theme.colors.black, 0.32),
    },
    overlayHeader: {
      ...flex1,
      ...fullWidth,
    },
    sideOverlay: {
      ...fullHeight,
      width: theme.sizes.m,
    },
    overlayFooter: {
      ...flex1,
      ...fullWidth,
      alignItems: 'center',
      paddingTop: theme.sizes.l,
    },
    bottomIcon: {
      width: '100%',
    },
  });
};

Camera.displayName = 'Camera';

export default Camera;
