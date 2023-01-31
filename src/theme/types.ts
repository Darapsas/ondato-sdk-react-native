import { TextStyle } from 'react-native';

export interface ConfigurableColors {
  text?: string;
  primary?: string;
  background?: string;
}

export interface ConfigurableTheme {
  colors?: ConfigurableColors;
  fonts?: Fonts;
}

export interface Colors extends ConfigurableColors {
  white: string;
  black: string;
  danger: string;
  grey: string;
  lightGrey: string;
  disabled: string;
}

export interface BorderRadius {
  s: number;
  m: number;
  l: number;
}

export interface Sizes {
  auto: 'auto';
  xxs: number;
  xs: number;
  s: number;
  m: number;
  l: number;
  xl: number;
  xxl: number;
  full: '100%';
}

export interface FontSizeVariant {
  lineHeight: number;
  fontSize: number;
}

export interface FontSizes {
  xs: FontSizeVariant;
  s: FontSizeVariant;
  m: FontSizeVariant;
  l: FontSizeVariant;
  xl: FontSizeVariant;
  xxl: FontSizeVariant;
  xxxl: FontSizeVariant;
}

export type Direction = 'base' | 'top' | 'right' | 'left' | 'bottom' | 'horizontal' | 'vertical';

export type MarginVariant<
  D extends Direction,
  P extends
    | 'margin'
    | 'marginTop'
    | 'marginRight'
    | 'marginLeft'
    | 'marginBottom'
    | 'marginHorizontal'
    | 'marginVertical'
> = Record<D, Record<keyof Sizes, Record<P, Sizes[keyof Sizes]>>>;

export type Margins = MarginVariant<'base', 'margin'> &
  MarginVariant<'top', 'marginTop'> &
  MarginVariant<'right', 'marginRight'> &
  MarginVariant<'left', 'marginLeft'> &
  MarginVariant<'bottom', 'marginBottom'> &
  MarginVariant<'horizontal', 'marginHorizontal'> &
  MarginVariant<'vertical', 'marginVertical'>;

export type PaddingVariant<
  D extends Direction,
  P extends
    | 'padding'
    | 'paddingTop'
    | 'paddingRight'
    | 'paddingLeft'
    | 'paddingBottom'
    | 'paddingHorizontal'
    | 'paddingVertical'
> = Record<D, Record<keyof Sizes, Record<P, Sizes[keyof Sizes]>>>;

export type Paddings = PaddingVariant<'base', 'padding'> &
  PaddingVariant<'top', 'paddingTop'> &
  PaddingVariant<'right', 'paddingRight'> &
  PaddingVariant<'left', 'paddingLeft'> &
  PaddingVariant<'bottom', 'paddingBottom'> &
  PaddingVariant<'horizontal', 'paddingHorizontal'> &
  PaddingVariant<'vertical', 'paddingVertical'>;

export interface FontVariant {
  fontFamily: string;
  fontWeight: TextStyle['fontWeight'];
}

export interface Fonts {
  primary: {
    regular: FontVariant;
    bold: FontVariant;
  };
}

export interface BoxShadowVariant {
  elevation: number;
  shadowColor: string;
  shadowRadius: number;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
}

export interface BoxShadows {
  m: BoxShadowVariant;
  l: BoxShadowVariant;
}

export interface Theme {
  colors: Colors;
  borderRadius: BorderRadius;
  sizes: Sizes;
  fontSizes: FontSizes;
  fonts: Fonts;
  boxShadows: BoxShadows;
  margins: Margins;
  paddings: Paddings;
}
