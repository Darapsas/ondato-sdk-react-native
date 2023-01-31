import { FlexStyle, ImageStyle, ViewStyle } from 'react-native';

export const flex1: ViewStyle = {
  flex: 1,
};

export const flexGrow: ViewStyle = {
  flexGrow: 1,
};

export const flexShrink: ViewStyle = {
  flexShrink: 1,
};

export const row: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
};

export const itemsStretch: ViewStyle = {
  alignItems: 'stretch',
};

export const itemsStart: ViewStyle = {
  alignItems: 'flex-start',
};

export const rowStart: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'flex-start',
};

export const rowEnd: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'flex-end',
};

export const center: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};

export const spaceBetween: ViewStyle = {
  justifyContent: 'space-between',
};

export const flexEnd: ViewStyle = {
  justifyContent: 'flex-end',
};

export const debug: ViewStyle = {
  borderColor: 'red',
  borderWidth: 1,
};

export const fullWidth: FlexStyle = {
  width: '100%',
};

export const fullHeight: FlexStyle = {
  height: '100%',
};

export const fullImageHeight: ImageStyle = {
  height: '100%',
};
