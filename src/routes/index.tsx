import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Message } from '@components/Message';
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

  if (loading) {
    return (
      <View>
        <Text>TELA DE LOADING</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1, position: 'relative' }}>
      <SafeAreaProvider>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: 'transparent',
          }}
        >
          <Message />
          <NavigationContainer>
            {/* <StatusBar style="auto" /> */}
            {signed ? <AppRoutes /> : <AuthRoutes />}
          </NavigationContainer>
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default Routes;
