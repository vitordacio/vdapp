import React from 'react';
import {
  // DarkTheme,
  // DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
// import { useColorScheme } from 'react-native';
import useAuth, { AuthProvider } from '@contexts/auth';
import AuthRoutes from './auth.routes';
// import AppRoutes from './app.routes';
// import SignedRoutes from './signed.routes';
import AppRoutes from './app.routes';

const Routes: React.FC = () => {
  const { signed } = useAuth();

  // if (loading) {
  //   return <View />
  // }

  // return !signed ? <SignedRoutes /> : <AuthRoutes />;
  // return signed ? <AppRoutes /> : <AuthRoutes />;
  // const currentTheme = useColorScheme();
  return (
    <NavigationContainer
    // theme={currentTheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      {/* <StatusBar style="auto" /> */}
      <AuthProvider>{!signed ? <AppRoutes /> : <AuthRoutes />}</AuthProvider>
    </NavigationContainer>
  );
};

export default Routes;
