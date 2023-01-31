import React, { FC, useCallback, useState } from 'react';
import { Button, SafeAreaView, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import OndatoSdk from 'idv-sdk-reactnative';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App: FC = () => {
  const [identityVerificationId, setIdentityVerificationId] = useState<string | null>(
    'dac1c7c6-ff13-49d7-b773-4712cd440dcb'
  );
  const [isStarted, setIsStarted] = useState<boolean>(false);

  const [config, setConfig] = useState({
    isConsentEnabled: true,
    isLoggingEnabled: true,
    isOnboardingEnabled: true,
  });

  const [theme, setTheme] = useState({
    colors: {
      primary: '#0000FF',
      background: '#FFFFFF',
      text: '#2B2B2B',
    },
  });

  // Important to use useCallback hook to avoid rerendering
  const onSuccess = useCallback(() => {
    console.log('Success');
    setIdentityVerificationId(null);
    setIsStarted(false);
  }, []);

  // Important to use useCallback hook to avoid rerendering
  const onError = useCallback(() => {
    console.log('Error');
    setIdentityVerificationId(null);
    setIsStarted(false);
  }, []);

  // Important to use useCallback hook to avoid rerendering
  const onClose = useCallback(() => {
    console.log('Close');
    setIdentityVerificationId(null);
    setIsStarted(false);
  }, []);

  const handleOnConfigChange = (key: string, value: boolean) => {
    setConfig((prevState) => ({ ...prevState, [key]: value }));
  };

  const handleOnThemeChange = (key: string, value: string) => {
    setTheme((prevState) => ({ ...prevState, colors: { ...prevState.colors, [key]: value } }));
  };

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

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={styles.title}>Configuration</Text>
            <View style={styles.section}>
              <Text style={[styles.subtitle, styles.noMargin]}>Identity verification id</Text>
              <TextInput
                value={identityVerificationId ?? undefined}
                style={[styles.input, styles.fullWidthInput]}
                onChangeText={setIdentityVerificationId}
              />
            </View>
            <View style={styles.section}>
              <Text style={styles.subtitle}>User configuration</Text>
              <View style={styles.row}>
                <Text style={styles.label}>Onboarding</Text>
                <Switch
                  onValueChange={(value) => handleOnConfigChange('isOnboardingEnabled', value)}
                  value={config.isOnboardingEnabled}
                />
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Consent</Text>
                <Switch
                  onValueChange={(value) => handleOnConfigChange('isConsentEnabled', value)}
                  value={config.isConsentEnabled}
                />
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Logging</Text>
                <Switch
                  onValueChange={(value) => handleOnConfigChange('isLoggingEnabled', value)}
                  value={config.isLoggingEnabled}
                />
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.subtitle}>Theme</Text>
              <View style={styles.row}>
                <Text style={styles.label}>Primary color</Text>
                <TextInput
                  value={theme.colors?.primary}
                  style={styles.input}
                  onChangeText={(event) => handleOnThemeChange('primary', event)}
                />
                <View style={[styles.color, { backgroundColor: theme.colors?.primary }]} />
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Text color</Text>
                <TextInput
                  value={theme.colors?.text}
                  style={styles.input}
                  onChangeText={(event) => handleOnThemeChange('text', event)}
                />
                <View style={[styles.color, { backgroundColor: theme.colors?.text }]} />
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Background color</Text>
                <TextInput
                  value={theme.colors?.background}
                  style={styles.input}
                  onChangeText={(event) => handleOnThemeChange('background', event)}
                />
                <View style={[styles.color, { backgroundColor: theme.colors?.background }]} />
              </View>
            </View>
          </ScrollView>
          <View style={styles.footer}>
            <Button disabled={!identityVerificationId} title="Start" onPress={() => setIsStarted(true)} />
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  section: {
    marginBottom: 16,
  },
  noMargin: {
    marginBottom: 0,
  },
  fullWidthInput: {
    width: '100%',
    textAlign: 'left',
  },
  input: {
    padding: 0,
    borderColor: '#a9a9a9',
    borderBottomWidth: 1,
    width: 100,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontWeight: '500',
    marginRight: 32,
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  footer: {
    padding: 16,
  },
  color: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    marginLeft: 8,
    borderColor: '#a9a9a9',
  },
});

export default App;
