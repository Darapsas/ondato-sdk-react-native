import React, { FC, useMemo } from 'react';
import { SvgProps } from 'react-native-svg';

import Close from '../../assets/svg/close.svg';
import QuitConfirmation from '../../assets/svg/quit-confirmation.svg';
import Iso from '../../assets/svg/iso.svg';
import IBeta from '../../assets/svg/ibeta.svg';
import Gdpr from '../../assets/svg/gdpr.svg';
import OnboardingDocument from '../../assets/svg/onboarding-document.svg';
import PhotoDocument from '../../assets/svg/onboarding-photo-document.svg';
import Selfie from '../../assets/svg/onboarding-selfie.svg';
import Help from '../../assets/svg/help.svg';
import ArrowRight from '../../assets/svg/arrow-right.svg';
import Error from '../../assets/svg/error.svg';
import Logo from '../../assets/svg/logo.svg';
import Success from '../../assets/svg/success.svg';
import Danger from '../../assets/svg/danger.svg';
import IdCard from '../../assets/svg/id-card.svg';
import Passport from '../../assets/svg/passport.svg';
import DrivingLicense from '../../assets/svg/driving-license.svg';
import IdCardFront from '../../assets/svg/id-card-front.svg';
import IdCardBack from '../../assets/svg/id-card-back.svg';
import DrivingLicenseFront from '../../assets/svg/driving-license-front.svg';
import DrivingLicenseBack from '../../assets/svg/driving-license-back.svg';
import PassportFront from '../../assets/svg/passport-front.svg';
import SelfieFront from '../../assets/svg/selfie-front.svg';
import DocumentWithSelfieFront from '../../assets/svg/document-with-selfie-front.svg';
import DocumentWithSelfieFrontFrameWhite from '../../assets/svg/document-with-selfie-front-frame-white.svg';
import IdCardFrontFrame from '../../assets/svg/id-card-front-frame.svg';
import IdCardBackFrame from '../../assets/svg/id-card-back-frame.svg';
import DrivingLicenseFrontFrame from '../../assets/svg/driving-license-front-frame.svg';
import DrivingLicenseBackFrame from '../../assets/svg/driving-license-back-frame.svg';
import PassportFrontFrame from '../../assets/svg/passport-front-frame.svg';
import CardTooBlurry from '../../assets/svg/card-too-blurry.svg';
import CardTooSmall from '../../assets/svg/card-too-small.svg';
import CardTooDark from '../../assets/svg/card-too-dark.svg';
import PassportTooBlurry from '../../assets/svg/passport-too-blurry.svg';
import PassportTooSmall from '../../assets/svg/passport-too-small.svg';
import PassportTooDark from '../../assets/svg/passport-too-dark.svg';
import SelfieTooBlurry from '../../assets/svg/selfie-too-blurry.svg';
import SelfieBadLighting from '../../assets/svg/selfie-bad-lighting.svg';
import SelfieNotNeutral from '../../assets/svg/selfie-not-neutral.svg';
import DrivingLicenseFrontFrameWhite from '../../assets/svg/driving-license-front-frame-white.svg';
import DrivingLicenseBackFrameWhite from '../../assets/svg/driving-license-back-frame-white.svg';
import IdCardFrontFrameWhite from '../../assets/svg/id-card-front-frame-white.svg';
import IdCardBackFrameWhite from '../../assets/svg/id-card-back-frame-white.svg';
import PassportFrontFrameWhite from '../../assets/svg/passport-front-frame-white.svg';
import DangerTriangle from '../../assets/svg/danger-triangle.svg';
import { Colors } from '../theme/types';
import hexToRgba from 'hex-to-rgba';
import { useTheme } from '../theme/hooks';

export type IconName =
  | 'close'
  | 'quitConfirmation'
  | 'iso'
  | 'ibeta'
  | 'gdpr'
  | 'onboardingDocument'
  | 'photoDocument'
  | 'selfie'
  | 'help'
  | 'idCardFront'
  | 'idCardBack'
  | 'drivingLicenseFront'
  | 'drivingLicenseBack'
  | 'passportFront'
  | 'documentWithSelfieFrontFrameWhite'
  | 'documentWithSelfieFront'
  | 'idCardFrontFrame'
  | 'idCardBackFrame'
  | 'drivingLicenseFrontFrame'
  | 'drivingLicenseBackFrame'
  | 'passportFrontFrame'
  | 'idCard'
  | 'passport'
  | 'drivingLicense'
  | 'arrowRight'
  | 'error'
  | 'logo'
  | 'cardTooBlurry'
  | 'cardTooSmall'
  | 'cardTooDark'
  | 'passportTooBlurry'
  | 'passportTooSmall'
  | 'passportTooDark'
  | 'selfieTooBlurry'
  | 'selfieBadLighting'
  | 'selfieNotNeutral'
  | 'success'
  | 'danger'
  | 'selfieFront'
  | 'drivingLicenseFrontFrameWhite'
  | 'drivingLicenseBackFrameWhite'
  | 'idCardFrontFrameWhite'
  | 'idCardBackFrameWhite'
  | 'passportFrontFrameWhite'
  | 'dangerTriangle';

const icons: Record<IconName, FC<SvgProps>> = {
  close: Close,
  quitConfirmation: QuitConfirmation,
  iso: Iso,
  ibeta: IBeta,
  gdpr: Gdpr,
  onboardingDocument: OnboardingDocument,
  photoDocument: PhotoDocument,
  selfie: Selfie,
  help: Help,
  idCardFront: IdCardFront,
  idCardBack: IdCardBack,
  drivingLicenseFront: DrivingLicenseFront,
  drivingLicenseBack: DrivingLicenseBack,
  passportFront: PassportFront,
  documentWithSelfieFrontFrameWhite: DocumentWithSelfieFrontFrameWhite,
  idCardFrontFrame: IdCardFrontFrame,
  idCardBackFrame: IdCardBackFrame,
  drivingLicenseFrontFrame: DrivingLicenseFrontFrame,
  drivingLicenseBackFrame: DrivingLicenseBackFrame,
  passportFrontFrame: PassportFrontFrame,
  idCard: IdCard,
  passport: Passport,
  drivingLicense: DrivingLicense,
  arrowRight: ArrowRight,
  error: Error,
  logo: Logo,
  success: Success,
  danger: Danger,
  selfieFront: SelfieFront,
  documentWithSelfieFront: DocumentWithSelfieFront,
  cardTooBlurry: CardTooBlurry,
  cardTooDark: CardTooDark,
  cardTooSmall: CardTooSmall,
  passportTooBlurry: PassportTooBlurry,
  passportTooDark: PassportTooDark,
  passportTooSmall: PassportTooSmall,
  selfieBadLighting: SelfieBadLighting,
  selfieNotNeutral: SelfieNotNeutral,
  selfieTooBlurry: SelfieTooBlurry,
  drivingLicenseFrontFrameWhite: DrivingLicenseFrontFrameWhite,
  drivingLicenseBackFrameWhite: DrivingLicenseBackFrameWhite,
  idCardFrontFrameWhite: IdCardFrontFrameWhite,
  idCardBackFrameWhite: IdCardBackFrameWhite,
  passportFrontFrameWhite: PassportFrontFrameWhite,
  dangerTriangle: DangerTriangle,
};

interface Props extends Omit<SvgProps, 'color'> {
  name: IconName;
  color?: keyof Colors;
}

const Svg: FC<Props> = (props) => {
  const { name, color = 'primary', opacity = 1, ...rest } = props;

  const theme = useTheme();
  const Icon = useMemo(() => icons[name], [name]);

  const themeColor = useMemo<string | undefined>(
    () => hexToRgba(theme.colors[color] as string, opacity),
    [color, opacity, theme.colors]
  );

  return <Icon color={themeColor} {...rest} />;
};

export default Svg;
