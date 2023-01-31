import React, { FC, ReactNode } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../store';
import { selectIsLoading } from '../../modules/global/selectors';
import { Theme } from '../../theme/types';
import { useThemeAwareObject } from '../../theme/hooks';

interface Props {
  children: ReactNode;
}

const GlobalLoader: FC<Props> = (props) => {
  const { children } = props;
  const isLoading = useAppSelector(selectIsLoading);
  const { t } = useTranslation();
  const themedStyles = useThemeAwareObject(styles);

  return (
    <>
      {children}
      <Spinner
        cancelable={false}
        size={32}
        textContent={t('common.loading') ?? undefined}
        textStyle={themedStyles.spinnerTextStyle}
        visible={isLoading}
      />
    </>
  );
};

const styles = (theme: Theme) => {
  return StyleSheet.create({
    spinnerTextStyle: {
      fontSize: 14,
      marginTop: -40,
      color: theme.colors.white,
    },
  });
};

export default GlobalLoader;
