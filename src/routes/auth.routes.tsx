import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '@screens/Auth/Login';
import SignUp from '@screens/Auth/SignUp';
import Welcome from '@screens/Auth/Welcome';
import { screenOptionsDefault } from '@styles/screenOptions';

import React from 'react';

const Auth = createNativeStackNavigator();

const AuthRoutes: React.FC = () => {
  return (
    <Auth.Navigator
      screenOptions={() => screenOptionsDefault({})}
      initialRouteName="Welcome"
    >
      <Auth.Screen
        options={{ headerShown: false }}
        name="Welcome"
        component={Welcome}
      />
      <Auth.Screen
        name="Login"
        component={Login}
        options={{ headerTitle: 'Entrar' }}
      />
      <Auth.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerTitle: 'Criar Conta' }}
      />
    </Auth.Navigator>
  );
};

export default AuthRoutes;
