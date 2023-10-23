import 'react-native-gesture-handler';

import Routes from '@routes/index';
import React from 'react';

import AppLoading from 'expo-app-loading';
import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter';
import { AuthProvider } from '@contexts/auth';

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
  });

  if (!fontsLoaded && !fontError) {
    <AppLoading />;
  }

  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}
