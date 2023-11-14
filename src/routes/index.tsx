import React from 'react';
import {
  // DarkTheme,
  // DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
// import { useColorScheme } from 'react-native';
import useAuth from '@contexts/auth';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Text } from '@components/Text';
import { View } from '@components/View';
import { SafeAreaView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

const Routes: React.FC = () => {
  const { signed, loading } = useAuth();
  // const { signed } = useAuth();

  if (loading) {
    return (
      <View>
        <Text>TELA DE LOADING</Text>
      </View>
    );
  }

  // const currentTheme = useColorScheme();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: 'transparent',
          }}
        >
          <NavigationContainer
          // theme={currentTheme === 'dark' ? DarkTheme : DefaultTheme}
          >
            {/* <StatusBar style="auto" /> */}
            {signed ? <AppRoutes /> : <AuthRoutes />}
          </NavigationContainer>
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default Routes;
