import React, { FC } from 'react';
import { FlatList, ListRenderItemInfo, TouchableOpacity } from 'react-native';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { Container, ListSeparator, PrimaryText, ScreenContainer, Svg } from '../components';
import { row } from '../theme/common';
import { LanguagesScreenProps } from '../navigation/types';
import { useTheme } from '../theme/hooks';
import { languages, Locales } from '../i18n/constants';
import { Language } from '../i18n/types';

const LanguagesScreen: FC<LanguagesScreenProps> = (props) => {
  const { navigation } = props;

  const { t } = useTranslation();
  const theme = useTheme();

  const handleLanguageSelect = async (code: Locales) => {
    if (code === Locales.system) {
      await i18n.changeLanguage();
    } else {
      await i18n.changeLanguage(code);
    }
    navigation.goBack();
  };

  const renderItem = (item: ListRenderItemInfo<Language>) => {
    const language = item.item;

    return (
      <TouchableOpacity style={theme.paddings.vertical.xl} onPress={() => handleLanguageSelect(language.value)}>
        <PrimaryText fontSize="m">{language.label}</PrimaryText>
      </TouchableOpacity>
    );
  };

  return (
    <ScreenContainer style={theme.paddings.top.m}>
      <Container style={theme.margins.bottom.m}>
        <TouchableOpacity onPress={navigation.goBack} style={[row, theme.margins.left.auto]}>
          <PrimaryText fontSize="m" style={theme.margins.right.s}>
            {t('buttons.close')}
          </PrimaryText>
          <Svg color="text" name="close" width={24} height={24} />
        </TouchableOpacity>
      </Container>
      <FlatList
        ItemSeparatorComponent={ListSeparator}
        contentContainerStyle={[theme.paddings.horizontal.xxl, theme.paddings.bottom.l]}
        keyExtractor={(item) => item.value}
        data={languages}
        renderItem={renderItem}
      />
    </ScreenContainer>
  );
};

export default LanguagesScreen;
