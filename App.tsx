import 'react-native-gesture-handler';
import Routes from '@routes/index';
import React from 'react';
import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter';
import { AuthProvider } from '@contexts/auth';
import { LoadingView } from '@components/View/Loading';

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
  });

  if (!fontsLoaded && !fontError) {
    <LoadingView />;
  }

  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}
