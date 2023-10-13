import { createNativeStackNavigator } from '@react-navigation/native-stack';

import React from 'react';

import Welcome from '@screens/Welcome';
import SignUp from '@screens/SignUp';
import Login from '@screens/Login';

const Stack = createNativeStackNavigator();

const AuthRoutes: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export default AuthRoutes;
