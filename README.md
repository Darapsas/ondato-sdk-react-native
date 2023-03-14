# Ondato React Native SDK

## Overview

This SDK provides a drop-in set of screens and tools for Android and iOS applications to allow capturing of identity documents and face photos/live videos for the purpose of identity verification. The SDK offers a number of benefits to help you create the best onboarding/identity verification experience for your customers:

- Carefully designed UI to guide your customers through the entire photo/video-capturing process
- Modular design to help you seamlessly integrate the photo/video-capturing process into your application flow
- Advanced image quality detection technology to ensure the quality of the captured images meets the requirement of the Ondato identity verification process, guaranteeing the best success rate
- Direct image upload to the Ondato service, to simplify integration\*

Note: the SDK is only responsible for capturing and uploading photos/videos. You still need to access the Ondato API to create and manage checks.

SDK supports iOS 12.0 and up, Android from 5.0.0 version and up.

### 1. SDK installation

1.1. Install the package

```bash
yarn add  https://github.com/ondato/ondato-sdk-react-native
```

1.2. Install dependencies

```bash
yarn add  react-native-gesture-handler@2.x \
          react-native-reanimated@2.x \
          react-native-screens@3.x \
          react-native-safe-area-context@4.x \
          react-native-fs@2.x \
          react-native-svg@13.x \
          react-native-svg-transformer@1.x \
          react-native-vision-camera@2.x \
          https://github.com/ondato/ondato-facetec-react-native.git
```

1.3. Configure them accordingly, here are some links to help you:

- https://docs.swmansion.com/react-native-gesture-handler/docs/installation
- https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation
- https://github.com/software-mansion/react-native-screens#installation
- https://github.com/itinance/react-native-fs
- https://www.npmjs.com/package/react-native-svg-transformer
- https://github.com/ondato/ondato-facetec-react-native.git

### 2. Creating the SDK configuration

| Prop                   | Default    | Type              |
| ---------------------- | ---------- | ----------------- |
| identityVerificationId | -          | string            |
| onError                | -          | func              |
| onSuccess              | -          | func              |
| onClose                | -          | func              |
| isConsentEnabled       | true       | boolean           |
| isOnboardingEnabled    | true       | boolean           |
| isLoggingEnabled       | true       | boolean           |
| locale                 | en         | Locales           |
| theme                  | lightTheme | ConfigurableTheme |

### 3. Customising SDK

#### 1. Loading Screen

You can override the default fragment used to show loading state by setting `LoadingScreen` prop when initializing.

#### 2. Onboarding Screen

You can override the default fragment used to start the verification process by setting `OnboardingScreen` with your own implementation of `OnboardingScreen`. Note that, when custom onboarding screen is used, it is up to you to start the verification process. Custom start fragment can start it by calling provided callback.

#### 3. Success Screen

You can define custom success screen which is shown when user data is successfully submitted. Set it using `SuccessScreen` and pass your `SuccessScreen` implementation. When success screen is override is up to you to call the provided callback, so the process can continue.

#### 4. Localisation

Ondato Android SDK already comes with out-of-the-box translations for the following locales:

- English (en) 🇬🇧
- Lithuanian (lt) 🇱🇹
- German (de) 🇩🇪
- Latvian (lv) 🇱🇻
- Estonian (et) 🇪🇪
- Russian (ru) 🇷🇺
- Albanian (sq) 🇦🇱
- System ⚙️ (if device language is not translated, everything will be in English)

#### 5. Theme Customization

In order to enhance the user experience on the transition between your application and the SDK, you can provide some customisation by defining certain colors inside your own theme:

#### ConfigurableTheme

| Prop   | Default | Type               |
| ------ | ------- | ------------------ |
| colors | -       | ConfigurableColors |

#### ConfigurableColors

| Prop       | Default   | Type   |
| ---------- | --------- | ------ |
| text       | `#2B2B2B` | string |
| primary    | `#FE5A27` | string |
| background | `#FFFFFF` | string |

### 6. Starting the flow

```typescript jsx
import React, { useCallback, useState } from 'react';
import OndatoSdk from 'ondato-react-native-sdk';

const App = () => {
  const [identityVerificationId, setIdentityVerificationId] = useState<string | null>(null);
  const [isStarted, setIsStarted] = useState<boolean>(false);

  const config = {
    isConsentEnabled: true,
    isLoggingEnabled: true,
    isOnboardingEnabled: true,
  };

  const theme = {
    colors: {
      primary: '#0000FF',
      background: '#FFFFFF',
      text: '#2B2B2B',
    },
  };

  // Important to use useCallback hook to avoid rerendering
  const onSuccess = useCallback(() => {
    setIdentityVerificationId(null);
    setIsStarted(false);
  }, []);

  // Important to use useCallback hook to avoid rerendering
  const onError = useCallback(() => {
    setIdentityVerificationId(null);
    setIsStarted(false);
  }, []);

  // Important to use useCallback hook to avoid rerendering
  const onClose = useCallback(() => {
    setIdentityVerificationId(null);
    setIsStarted(false);
  }, []);

  if (identityVerificationId && isStarted) {
    return (
      <OndatoSdk
        {...config}
        theme={theme}
        onSuccess={onSuccess}
        onError={onError}
        onClose={onClose}
        identityVerificationId={identityVerificationId}
      />
    );
  }
};

export default App;
```
